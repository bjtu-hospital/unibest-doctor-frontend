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
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

  .card-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 24rpx;
    padding-bottom: 16rpx;
    border-bottom: 2rpx solid #f0f0f0;
  }

  .info-content {
    .info-row {
      display: flex;
      padding: 16rpx 0;
      font-size: 28rpx;

      .label {
        color: #666;
        width: 160rpx;
        flex-shrink: 0;
      }

      .value {
        color: #333;
        flex: 1;
        word-break: break-all;
      }
    }
  }
}
</style>
