<template>
  <view class="basic-info-card">
    <view class="card-title">
      基本信息
    </view>
    <view class="info-content">
      <view class="info-row">
        <text class="label">姓名：</text>
        <text class="value">{{ patientInfo?.name || '-' }}</text>
      </view>
      <view class="info-row">
        <text class="label">性别：</text>
        <text class="value">{{ patientInfo?.gender || '-' }}</text>
      </view>
      <view class="info-row">
        <text class="label">年龄：</text>
        <text class="value">{{ patientInfo?.age || '-' }}岁</text>
      </view>
      <view class="info-row">
        <text class="label">身高：</text>
        <text class="value">{{ patientInfo?.height || '-' }}cm</text>
      </view>
      <view class="info-row">
        <text class="label">联系电话：</text>
        <text class="value">{{ patientInfo?.phone || '-' }}</text>
      </view>
      <view class="info-row">
        <text class="label">身份证号：</text>
        <text class="value">{{ patientInfo?.idCard || '-' }}</text>
      </view>
      <view class="info-row">
        <text class="label">地址：</text>
        <text class="value">{{ patientInfo?.address || '-' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { BasicInfo } from '../types'

interface Props {
  patientInfo?: BasicInfo
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.basic-info-card {
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

  .info-content {
    .info-row {
      display: flex;
      padding: 14rpx 0;
      font-size: 28rpx;
      border-bottom: 1rpx solid #f5f5f5;
      transition: background-color 0.2s;

      &:last-child {
        border-bottom: none;
      }

      .label {
        color: #888;
        width: 160rpx;
        flex-shrink: 0;
      }

      .value {
        color: #333;
        flex: 1;
        word-break: break-all;
        font-weight: 500;
      }
    }
  }
}
</style>
