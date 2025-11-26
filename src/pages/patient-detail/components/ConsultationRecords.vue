<template>
  <view class="consultation-records-card">
    <view class="card-title">
      就诊记录
    </view>
    <view class="records-content">
      <view v-if="records && records.length > 0" class="records-list">
        <view v-for="record in records" :key="record.id" class="record-item">
          <view class="record-header">
            <text class="record-date">{{ record.visitDate }}</text>
            <text class="record-status" :class="getStatusClass(record.status)">
              {{ record.status }}
            </text>
          </view>
          <view class="record-info">
            <view class="info-row">
              <text class="info-label">就诊科室：</text>
              <text class="info-value">{{ record.department }}</text>
            </view>
            <view class="info-row">
              <text class="info-label">接诊医生：</text>
              <text class="info-value">{{ record.doctorName }}</text>
            </view>
            <view class="info-row">
              <text class="info-label">主诉：</text>
              <text class="info-value">{{ record.chiefComplaint }}</text>
            </view>
            <view class="info-row">
              <text class="info-label">诊断：</text>
              <text class="info-value">{{ record.diagnosis }}</text>
            </view>
            <view v-if="record.prescription" class="info-row">
              <text class="info-label">处方：</text>
              <text class="info-value">{{ record.prescription }}</text>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="empty-records">
        <text class="empty-text">暂无就诊记录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { ConsultationRecord } from '../types'

interface Props {
  records?: ConsultationRecord[]
}

defineProps<Props>()

function getStatusClass(status: string) {
  const statusMap: Record<string, string> = {
    已完成: 'status-completed',
    进行中: 'status-ongoing',
    已取消: 'status-cancelled',
  }
  return statusMap[status] || ''
}
</script>

<style lang="scss" scoped>
.consultation-records-card {
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

  .records-content {
    .records-list {
      .record-item {
        background-color: #f8f9fa;
        border-radius: 12rpx;
        padding: 24rpx;
        margin-bottom: 16rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .record-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16rpx;
          padding-bottom: 12rpx;
          border-bottom: 1rpx solid #e5e5e5;

          .record-date {
            font-size: 28rpx;
            font-weight: 600;
            color: #333;
          }

          .record-status {
            font-size: 24rpx;
            padding: 4rpx 12rpx;
            border-radius: 8rpx;

            &.status-completed {
              background-color: #e8f5e9;
              color: #4caf50;
            }

            &.status-ongoing {
              background-color: #e3f2fd;
              color: #2196f3;
            }

            &.status-cancelled {
              background-color: #fce4ec;
              color: #f44336;
            }
          }
        }

        .record-info {
          .info-row {
            display: flex;
            margin-bottom: 12rpx;
            font-size: 26rpx;
            line-height: 1.6;

            &:last-child {
              margin-bottom: 0;
            }

            .info-label {
              color: #666;
              width: 140rpx;
              flex-shrink: 0;
            }

            .info-value {
              color: #333;
              flex: 1;
              word-break: break-all;
            }
          }
        }
      }
    }

    .empty-records {
      text-align: center;
      padding: 60rpx 0;

      .empty-text {
        font-size: 28rpx;
        color: #999;
      }
    }
  }
}
</style>
