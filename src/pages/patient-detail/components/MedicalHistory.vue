<template>
  <view class="medical-history-card">
    <view class="card-title">
      <wd-icon name="notes" size="24px" color="#4a90e2" />
      <text class="title-text">病史信息</text>
    </view>
    <view class="history-content">
      <!-- 既往病史 -->
      <view class="history-section past-history">
        <view class="section-header">
          <view class="section-icon">
            <wd-icon name="flag" size="20px" color="#4a90e2" />
          </view>
          <text class="section-title">既往病史</text>
        </view>
        <view v-if="medicalHistory?.pastHistory && medicalHistory.pastHistory.length > 0" class="history-list">
          <view v-for="(item, index) in medicalHistory.pastHistory" :key="index" class="history-item">
            <view class="item-dot" />
            <text class="history-text">{{ item }}</text>
          </view>
        </view>
        <view v-else class="empty-text">
          <text>暂无记录</text>
        </view>
      </view>

      <!-- 过敏史 -->
      <view class="history-section allergy-history">
        <view class="section-header">
          <view class="section-icon">
            <wd-icon name="warning" size="20px" color="#4a90e2" />
          </view>
          <text class="section-title">过敏史</text>
        </view>
        <view v-if="medicalHistory?.allergyHistory && medicalHistory.allergyHistory.length > 0" class="history-list">
          <view v-for="(item, index) in medicalHistory.allergyHistory" :key="index" class="history-item">
            <view class="item-dot" />
            <text class="history-text">{{ item }}</text>
          </view>
        </view>
        <view v-else class="empty-text">
          <text>暂无记录</text>
        </view>
      </view>

      <!-- 家族史 -->
      <view class="history-section family-history">
        <view class="section-header">
          <view class="section-icon">
            <wd-icon name="user-circle" size="20px" color="#4a90e2" />
          </view>
          <text class="section-title">家族史</text>
        </view>
        <view v-if="medicalHistory?.familyHistory && medicalHistory.familyHistory.length > 0" class="history-list">
          <view v-for="(item, index) in medicalHistory.familyHistory" :key="index" class="history-item">
            <view class="item-dot" />
            <text class="history-text">{{ item }}</text>
          </view>
        </view>
        <view v-else class="empty-text">
          <text>暂无记录</text>
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
  margin-bottom: 24rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);

  .card-title {
    display: flex;
    align-items: center;
    padding: 32rpx;
    background: #f0f8ff;
    border-bottom: 1rpx solid #e6f2ff;
    gap: 12rpx;

    .title-text {
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
    }
  }

  .history-content {
    padding: 8rpx 32rpx 32rpx;
    .history-section {
      margin-bottom: 24rpx;
      padding: 24rpx;
      background-color: #fafbfc;
      border-radius: 12rpx;
      border: 1rpx solid #f0f0f0;
      transition: all 0.2s;

      &:last-child {
        margin-bottom: 0;
      }

      &.past-history {
        background: #fafbfc;
      }

      &.allergy-history {
        background: #fafbfc;
        border-color: #f0f0f0;
      }

      &.family-history {
        background: #fafbfc;
      }

      .section-header {
        display: flex;
        align-items: center;
        margin-bottom: 16rpx;

        .section-icon {
          width: 32rpx;
          height: 32rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8rpx;
        }

        .section-title {
          font-size: 28rpx;
          font-weight: 600;
          color: #333;
          flex: 1;
        }
      }

      .history-list {
        padding-left: 8rpx;

        .history-item {
          display: flex;
          align-items: flex-start;
          padding: 10rpx 0;
          font-size: 26rpx;

          .item-dot {
            width: 12rpx;
            height: 12rpx;
            border-radius: 50%;
            background: #4a90e2;
            margin-right: 16rpx;
            margin-top: 12rpx;
            flex-shrink: 0;
          }

          .history-text {
            flex: 1;
            color: #555;
            line-height: 1.7;
          }
        }
      }

      .empty-text {
        font-size: 26rpx;
        color: #999;
        padding: 8rpx 0;
        padding-left: 60rpx;
      }
    }
  }
}
</style>
