<template>
  <view class="consultation-records-card">
    <view class="card-title">
      <wd-icon name="calendar" size="24px" color="#4a90e2" />
      <text class="title-text">就诊记录</text>
      <view v-if="records && records.length > 0" class="record-count">
        <text>共 {{ records.length }} 条</text>
      </view>
    </view>
    <view class="records-content">
      <view v-if="records && records.length > 0" class="records-list">
        <view v-for="record in records" :key="record.id" class="record-item" @click="goToMedicalRecord(record.id)">
          <!-- 左侧时间线 -->
          <view class="timeline">
            <view class="timeline-dot" :class="getStatusClass(record.status)" />
            <view class="timeline-line" />
          </view>

          <!-- 右侧内容 -->
          <view class="record-content">
            <view class="record-header">
              <view class="date-section">
                <text class="record-date">{{ formatDate(record.visitDate) }}</text>
                <text class="record-time">{{ formatTime(record.visitDate) }}</text>
              </view>
              <text class="record-status" :class="getStatusClass(record.status)">
                {{ getStatusText(record.status) }}
              </text>
            </view>

            <view class="record-body">
              <view class="department-doctor">
                <text class="department">{{ record.department }}</text>
                <text class="doctor">{{ record.doctorName }} 医生</text>
              </view>

              <view class="diagnosis-section">
                <text class="diagnosis-label">诊断：</text>
                <text class="diagnosis-value">{{ record.diagnosis }}</text>
              </view>

              <view class="chief-complaint">
                <text class="complaint-text">{{ record.chiefComplaint }}</text>
              </view>
            </view>

            <view class="record-footer">
              <text class="outpatient-no">门诊号：{{ record.outpatientNo }}</text>
              <view class="view-btn">
                <text class="view-text">查看详情</text>
                <text class="arrow">→</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="empty-records">
        <view class="empty-icon">
          <wd-icon name="chat-empty" size="60px" color="#ccc" />
        </view>
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

const props = defineProps<Props>()

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

function formatDate(dateStr: string) {
  if (!dateStr)
    return '-'
  return dateStr.split(' ')[0]
}

function formatTime(dateStr: string) {
  if (!dateStr)
    return ''
  const parts = dateStr.split(' ')
  return parts[1] || ''
}

function goToMedicalRecord(recordId: string) {
  uni.navigateTo({
    url: `/pages/patient-detail/medical-record/medical-record?recordId=${recordId}&patientId=${props.patientId || ''}`,
  })
}
</script>

<style lang="scss" scoped>
.consultation-records-card {
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
      flex: 1;
    }

    .record-count {
      font-size: 24rpx;
      color: #4a90e2;
      background: #e6f2ff;
      padding: 6rpx 16rpx;
      border-radius: 20rpx;
    }
  }

  .records-content {
    padding: 8rpx 32rpx 32rpx;
    .records-list {
      .record-item {
        display: flex;
        margin-bottom: 0;

        &:last-child {
          .timeline-line {
            display: none;
          }
        }

        // 时间线
        .timeline {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 20rpx;

          .timeline-dot {
            width: 24rpx;
            height: 24rpx;
            border-radius: 50%;
            background: #00d5d9;
            border: 4rpx solid #fff;
            box-shadow: 0 0 0 4rpx #e6f2ff;
            z-index: 1;

            &.status-completed {
              background: #00d5d9;
              box-shadow: 0 0 0 4rpx #e6f2ff;
            }

            &.status-ongoing {
              background: #00d5d9;
              box-shadow: 0 0 0 4rpx #e6f2ff;
            }

            &.status-cancelled {
              background: #00d5d9;
              box-shadow: 0 0 0 4rpx #e6f2ff;
            }
          }

          .timeline-line {
            width: 4rpx;
            flex: 1;
            background: linear-gradient(180deg, #e0e0e0 0%, #f5f5f5 100%);
            min-height: 40rpx;
          }
        }

        // 内容区
        .record-content {
          flex: 1;
          background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
          border-radius: 16rpx;
          padding: 24rpx;
          margin-bottom: 20rpx;
          border: 1rpx solid #eef0f2;
          transition: all 0.2s ease;

          &:active {
            transform: scale(0.98);
            background: linear-gradient(135deg, #f0f2f5 0%, #ebedf0 100%);
          }

          .record-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16rpx;

            .date-section {
              .record-date {
                display: block;
                font-size: 30rpx;
                font-weight: 700;
                color: #333;
              }

              .record-time {
                font-size: 24rpx;
                color: #888;
              }
            }

            .record-status {
              font-size: 22rpx;
              padding: 6rpx 16rpx;
              border-radius: 20rpx;
              font-weight: 500;

              &.status-completed {
                background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
                color: #2e7d32;
              }

              &.status-ongoing {
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
                color: #1565c0;
              }

              &.status-cancelled {
                background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%);
                color: #c62828;
              }
            }
          }

          .record-body {
            .department-doctor {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 12rpx;
              margin-bottom: 12rpx;

              .department {
                font-size: 26rpx;
                color: #1e3a8a;
                background: #e0e7ff;
                padding: 4rpx 12rpx;
                border-radius: 8rpx;
                font-weight: 500;
              }

              .doctor {
                font-size: 26rpx;
                color: #666;
              }
            }

            .diagnosis-section {
              display: flex;
              align-items: flex-start;
              margin-bottom: 8rpx;

              .diagnosis-label {
                font-size: 26rpx;
                color: #888;
                flex-shrink: 0;
              }

              .diagnosis-value {
                font-size: 26rpx;
                color: #c41e3a;
                font-weight: 600;
              }
            }

            .chief-complaint {
              .complaint-text {
                font-size: 24rpx;
                color: #888;
                line-height: 1.6;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
            }
          }

          .record-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 16rpx;
            padding-top: 16rpx;
            border-top: 1rpx dashed #e0e0e0;

            .outpatient-no {
              font-size: 22rpx;
              color: #999;
            }

            .view-btn {
              display: flex;
              align-items: center;
              color: #1e3a8a;
              font-size: 24rpx;
              font-weight: 500;

              .arrow {
                margin-left: 8rpx;
                transition: transform 0.2s;
              }
            }
          }
        }
      }
    }

    .empty-records {
      text-align: center;
      padding: 80rpx 0;

      .empty-icon {
        font-size: 80rpx;
        margin-bottom: 20rpx;
      }

      .empty-text {
        font-size: 28rpx;
        color: #999;
      }
    }
  }
}
</style>
