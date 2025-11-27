<template>
  <view class="basic-info-card">
    <!-- 头部区域：头像 + 姓名性别年龄 -->
    <view class="card-header">
      <view class="avatar-section">
        <view class="avatar">
          <text class="avatar-text">{{ patientInfo?.name?.charAt(0) || '?' }}</text>
        </view>
        <view class="basic-summary">
          <text class="patient-name">{{ patientInfo?.name || '-' }}</text>
          <view class="patient-tags">
            <text class="tag">{{ patientInfo?.gender || '-' }}</text>
            <text class="tag">{{ patientInfo?.age || '-' }}岁</text>
            <text class="tag">{{ patientInfo?.height || '-' }}cm</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 详细信息区域 -->
    <view class="card-body">
      <view class="info-item">
        <view class="info-icon">
          <wd-icon name="phone" size="20px" color="#666" />
        </view>
        <view class="info-content">
          <text class="info-label">联系电话</text>
          <text class="info-value">{{ patientInfo?.phone || '-' }}</text>
        </view>
      </view>

      <view class="info-item">
        <view class="info-icon">
          <wd-icon name="manager" size="20px" color="#666" />
        </view>
        <view class="info-content">
          <text class="info-label">身份证号</text>
          <text class="info-value">{{ patientInfo?.idCard || '-' }}</text>
        </view>
      </view>

      <view class="info-item">
        <view class="info-icon">
          <wd-icon name="location" size="20px" color="#666" />
        </view>
        <view class="info-content">
          <text class="info-label">居住地址</text>
          <text class="info-value">{{ patientInfo?.address || '-' }}</text>
        </view>
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
  margin-bottom: 24rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

// 头部区域
.card-header {
  background: #f0f8ff;
  padding: 40rpx 32rpx;
  border-bottom: 1rpx solid #e6f2ff;

  .avatar-section {
    display: flex;
    align-items: center;

    .avatar {
      width: 96rpx;
      height: 96rpx;
      border-radius: 50%;
      background: #87ceeb;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24rpx;

      .avatar-text {
        font-size: 40rpx;
        font-weight: 600;
        color: #fff;
      }
    }

    .basic-summary {
      flex: 1;

      .patient-name {
        font-size: 36rpx;
        font-weight: 600;
        color: #333;
        display: block;
        margin-bottom: 12rpx;
      }

      .patient-tags {
        display: flex;
        gap: 10rpx;

        .tag {
          font-size: 22rpx;
          padding: 6rpx 14rpx;
          border-radius: 4rpx;
          background: #e6f2ff;
          color: #4a90e2;
        }
      }
    }
  }
}

// 详细信息区域
.card-body {
  padding: 8rpx 32rpx 32rpx;

  .info-item {
    display: flex;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .info-icon {
      width: 40rpx;
      height: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
    }

    .info-content {
      flex: 1;

      .info-label {
        display: block;
        font-size: 24rpx;
        color: #999;
        margin-bottom: 4rpx;
      }

      .info-value {
        display: block;
        font-size: 28rpx;
        color: #333;
        font-weight: 500;
        word-break: break-all;
      }
    }
  }
}
</style>
