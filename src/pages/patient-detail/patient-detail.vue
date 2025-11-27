<template>
  <view class="patient-detail-page">
    <view class="page-header">
      <text class="page-title">患者详情</text>
    </view>

    <!-- 基本信息 -->
    <BasicInfo :patient-info="patientData?.basicInfo" />

    <!-- 病史信息 -->
    <MedicalHistory :medical-history="patientData?.medicalHistory" />

    <!-- 就诊记录 -->
    <ConsultationRecords :records="patientData?.consultationRecords" />
  </view>
</template>

<script setup lang="ts">
import type { PatientDetailData } from './types'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getPatientDetail } from '@/api/patient'
import BasicInfo from './components/BasicInfo.vue'
import ConsultationRecords from './components/ConsultationRecords.vue'
import MedicalHistory from './components/MedicalHistory.vue'

definePage({
  style: {
    navigationBarTitleText: '患者详情',
  },
})

const patientId = ref<string>('')
const patientData = ref<PatientDetailData>()
const loading = ref(false)

// 接收页面参数
onLoad((options) => {
  console.log('患者详情页 onLoad, 参数:', options)
  if (options?.patientId) {
    patientId.value = options.patientId as string
    fetchPatientDetail()
  }
  else {
    uni.showToast({
      title: '缺少患者ID',
      icon: 'none',
    })
  }
})

// 获取患者详情数据
async function fetchPatientDetail() {
  try {
    loading.value = true
    console.log('开始获取患者详情，ID:', patientId.value)
    const data = await getPatientDetail(patientId.value)
    patientData.value = data
    console.log('患者详情获取成功:', data)
  }
  catch (error) {
    console.error('获取患者详情失败:', error)
    uni.showToast({
      title: '加载失败',
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.patient-detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));

  .page-header {
    padding: 32rpx 24rpx;
    margin-bottom: 12rpx;
    background: #f0f8ff;
    border-bottom: 1rpx solid #e6f2ff;

    .page-title {
      font-size: 38rpx;
      font-weight: 600;
      color: #333;
      letter-spacing: 1rpx;
    }
  }
}
</style>
