<template>
  <view class="medical-history-card">
    <view class="card-title">
      病史信息
    </view>
    <view class="history-content">
      <!-- 既往病史 -->
      <view class="history-section">
        <view class="section-title">
          既往病史
        </view>
        <view v-if="medicalHistory?.pastHistory && medicalHistory.pastHistory.length > 0" class="history-list">
          <view v-for="(item, index) in medicalHistory.pastHistory" :key="index" class="history-item">
            <text class="dot">•</text>
            <text class="history-text">{{ item }}</text>
          </view>
        </view>
        <view v-else class="empty-text">
          无
        </view>
      </view>

      <!-- 过敏史 -->
      <view class="history-section">
        <view class="section-title">
          过敏史
        </view>
        <view v-if="medicalHistory?.allergyHistory && medicalHistory.allergyHistory.length > 0" class="history-list">
          <view v-for="(item, index) in medicalHistory.allergyHistory" :key="index" class="history-item">
            <text class="dot">•</text>
            <text class="history-text">{{ item }}</text>
          </view>
        </view>
        <view v-else class="empty-text">
          无
        </view>
      </view>

      <!-- 家族史 -->
      <view class="history-section">
        <view class="section-title">
          家族史
        </view>
        <view v-if="medicalHistory?.familyHistory && medicalHistory.familyHistory.length > 0" class="history-list">
          <view v-for="(item, index) in medicalHistory.familyHistory" :key="index" class="history-item">
            <text class="dot">•</text>
            <text class="history-text">{{ item }}</text>
          </view>
        </view>
        <view v-else class="empty-text">
          无
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { MedicalHistory } from '../types'

interface Props {
  medicalHistory?: MedicalHistory
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.medical-history-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow:
    0 2rpx 8rpx rgba(0, 0, 0, 0.04),
    0 4rpx 16rpx rgba(0, 0, 0, 0.04);

  .card-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 24rpx;
    padding-bottom: 16rpx;
    padding-left: 16rpx;
    border-bottom: 1rpx solid #eee;
    border-left: 6rpx solid #333;
  }

  .history-content {
    .history-section {
      margin-bottom: 28rpx;
      padding: 20rpx;
      background-color: #fafafa;
      border-radius: 12rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .section-title {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 16rpx;
        padding-left: 12rpx;
        border-left: 4rpx solid #666;
      }

      .history-list {
        .history-item {
          display: flex;
          align-items: flex-start;
          padding: 10rpx 0;
          font-size: 26rpx;

          .dot {
            color: #666;
            margin-right: 12rpx;
            line-height: 1.6;
          }

          .history-text {
            flex: 1;
            color: #555;
            line-height: 1.6;
          }
        }
      }

      .empty-text {
        font-size: 26rpx;
        color: #999;
        padding: 8rpx 12rpx;
      }
    }
  }
}
</style>
