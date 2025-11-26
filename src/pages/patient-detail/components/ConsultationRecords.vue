<template>
  <view class="consultation-records-card">
    <view class="card-title">
      就诊记录
    </view>
    <view class="records-content">
      <view v-if="records && records.length > 0" class="records-list">
        <view v-for="record in records" :key="record.id" class="record-item" @click="goToMedicalRecord(record.id)">
          <view class="record-header">
            <text class="record-date">{{ record.visitDate }}</text>
            <text class="record-status" :class="getStatusClass(record.status)">
              {{ getStatusText(record.status) }}
            </text>
          </view>
          <view class="record-info">
            <view class="info-row">
              <text class="info-label">门诊号：</text>
              <text class="info-value">{{ record.outpatientNo }}</text>
            </view>
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
          </view>
          <view class="record-footer">
            <text class="view-detail">点击查看病历详情 ></text>
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
  patientId?: string
}

defineProps<Props>()

function getStatusClass(status: string) {
  const statusMap: Record<string, string> = {
    completed: 'status-completed',
    ongoing: 'status-ongoing',
    cancelled: 'status-cancelled',
  }
  return statusMap[status] || ''
}

function getStatusText(status: string) {
  const statusMap: Record<string, string> = {
    completed: '已完成',
    ongoing: '进行中',
    cancelled: '已取消',
  }
  return statusMap[status] || status
}

function goToMedicalRecord(recordId: string) {
  uni.navigateTo({
    url: `/pages/patient-detail/medical-record/medical-record?recordId=${recordId}`,
  })
}
</script>

<style lang="scss" scoped>
.consultation-records-card {
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

  .records-content {
    .records-list {
      .record-item {
        background-color: #fafafa;
        border-radius: 12rpx;
        padding: 24rpx;
        margin-bottom: 20rpx;
        border: 1rpx solid #f0f0f0;
        transition: all 0.2s ease;

        &:last-child {
          margin-bottom: 0;
        }

        &:active {
          transform: scale(0.98);
          background-color: #f5f5f5;
        }

        .record-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16rpx;
          padding-bottom: 14rpx;
          border-bottom: 1rpx solid #eee;

          .record-date {
            font-size: 28rpx;
            font-weight: 600;
            color: #333;
          }

          .record-status {
            font-size: 24rpx;
            padding: 6rpx 16rpx;
            border-radius: 20rpx;

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
              color: #888;
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

        .record-footer {
          margin-top: 18rpx;
          padding-top: 14rpx;
          border-top: 1rpx solid #eee;
          text-align: right;

          .view-detail {
            font-size: 24rpx;
            color: #666;
          }
        }
      }
    }

    .empty-records {
      text-align: center;
      padding: 80rpx 0;

      .empty-text {
        font-size: 28rpx;
        color: #999;
      }
    }
  }
}
</style>
