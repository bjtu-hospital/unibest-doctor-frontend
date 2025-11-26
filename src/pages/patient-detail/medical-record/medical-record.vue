<template>
  <view class="medical-record-page">
    <!-- 病历单 -->
    <view class="record-paper">
      <!-- 医院头部：左校徽 中标题 右院徽（标题两行居中） -->
      <view class="hospital-header">
        <image class="school-logo" src="/static/BJTU-images/BJTU-logo.png" mode="aspectFit" />
        <view class="hospital-title">
          <view class="title-main">
            <text class="title-line line1">北京交通大学</text>
            <text class="title-line line2">校医院</text>
          </view>
          <text class="record-type">门（急）诊病历</text>
        </view>
        <image class="hospital-logo" src="/static/BJTU-images/hospital_logo.png" mode="aspectFit" />
      </view>

      <!-- 患者信息行 -->
      <view class="patient-row">
        <text class="patient-item">姓名：{{ patientInfo?.name || '-' }}</text>
        <text class="patient-item">性别：{{ patientInfo?.gender || '-' }}</text>
        <text class="patient-item">年龄：{{ patientInfo?.age || '-' }}</text>
      </view>

      <!-- 就诊信息行 -->
      <view class="visit-row">
        <text class="visit-item">门诊号：{{ recordData?.outpatientNo || '-' }}</text>
        <text class="visit-item">科别：{{ recordData?.department || '-' }}</text>
      </view>
      <view class="visit-row">
        <text class="visit-item">就诊日期：{{ recordData?.visitDate || '-' }}</text>
      </view>

      <!-- 分隔线 -->
      <view class="divider-line" />

      <!-- 病历内容区 -->
      <view class="record-body">
        <view class="record-field">
          <text class="field-label">主诉：</text>
          <text class="field-value">{{ recordData?.chiefComplaint || '-' }}</text>
        </view>

        <view class="record-field">
          <text class="field-label">现病史：</text>
          <text class="field-value">{{ recordData?.presentIllness || '-' }}</text>
        </view>

        <view v-if="recordData?.auxiliaryExam" class="record-field">
          <text class="field-label">辅助检查：</text>
          <text class="field-value">{{ recordData.auxiliaryExam }}</text>
        </view>

        <view class="record-field">
          <text class="field-label">初步诊断：</text>
          <text class="field-value">{{ recordData?.diagnosis || '-' }}</text>
        </view>

        <view v-if="recordData?.prescription" class="record-field">
          <text class="field-label">处置：</text>
          <text class="field-value prescription">{{ recordData.prescription }}</text>
        </view>
      </view>

      <!-- 医师签名 -->
      <view class="doctor-sign">
        <text class="sign-label">医师签名：</text>
        <text class="sign-name">{{ recordData?.doctorName || '-' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { BasicInfo, ConsultationRecord } from '../types'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { mockPatientDetail } from '../mock'

definePage({
  style: {
    navigationBarTitleText: '病历详情',
  },
})

const recordId = ref<string>('')
const patientId = ref<string>('')
const recordData = ref<ConsultationRecord>()
const patientInfo = ref<BasicInfo>()

// 接收页面参数
onLoad((options) => {
  console.log('病历详情页 onLoad, 参数:', options)
  if (options?.recordId) {
    recordId.value = options.recordId as string
    patientId.value = options.patientId as string || ''
    fetchRecordDetail()
  }
  else {
    uni.showToast({
      title: '缺少记录ID',
      icon: 'none',
    })
  }
})

// 获取病历详情数据
function fetchRecordDetail() {
  // TODO: 替换为真实API调用
  // 目前使用 mock 数据
  const mockData = mockPatientDetail
  patientInfo.value = mockData.basicInfo

  // 根据 recordId 查找对应的就诊记录
  const record = mockData.consultationRecords.find(r => r.id === recordId.value)
  if (record) {
    recordData.value = record
    console.log('病历详情获取成功:', record)
  }
  else {
    uni.showToast({
      title: '未找到病历记录',
      icon: 'none',
    })
  }
}
</script>

<style lang="scss" scoped>
.medical-record-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}

.record-paper {
  background-color: #fff;
  border-radius: 8rpx;
  padding: 40rpx 32rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

// 医院头部
.hospital-header {
  display: grid;
  grid-template-columns: 160rpx 1fr 160rpx;
  align-items: center;
  justify-items: center;
  column-gap: 16rpx;
  margin-bottom: 32rpx;
  padding-bottom: 24rpx;
  border-bottom: 2rpx solid #ddd;

  .school-logo,
  .hospital-logo {
    width: 160rpx;
    height: 160rpx;
  }

  .hospital-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .title-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 700;
      color: #333;
      line-height: 1.2;
    }

    .title-line {
      letter-spacing: 2rpx;
    }

    .line1,
    .line2 {
      font-size: 40rpx;
    }

    .record-type {
      font-size: 28rpx;
      color: #666;
      margin-top: 8rpx;
      letter-spacing: 4rpx;
    }
  }
}

// 患者信息行
.patient-row {
  display: flex;
  flex-wrap: wrap;
  padding: 12rpx 0;

  .patient-item {
    font-size: 28rpx;
    color: #333;
    margin-right: 48rpx;
    line-height: 1.8;
  }
}

// 就诊信息行
.visit-row {
  display: flex;
  flex-wrap: wrap;
  padding: 8rpx 0;

  .visit-item {
    font-size: 28rpx;
    color: #333;
    margin-right: 48rpx;
    line-height: 1.8;
  }
}

// 分隔线
.divider-line {
  height: 2rpx;
  background-color: #333;
  margin: 20rpx 0;
}

// 病历内容区
.record-body {
  padding: 16rpx 0;

  .record-field {
    margin-bottom: 28rpx;
    line-height: 1.8;

    &:last-child {
      margin-bottom: 0;
    }

    .field-label {
      font-size: 28rpx;
      font-weight: 600;
      color: #333;
    }

    .field-value {
      font-size: 28rpx;
      color: #333;

      &.prescription {
        white-space: pre-wrap;
        display: block;
        margin-top: 8rpx;
        padding-left: 4rpx;
      }
    }
  }
}

// 医师签名
.doctor-sign {
  display: flex;
  justify-content: flex-end;
  margin-top: 48rpx;
  padding-top: 24rpx;
  border-top: 1rpx solid #e5e5e5;

  .sign-label {
    font-size: 28rpx;
    color: #333;
  }

  .sign-name {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
  }
}
</style>
