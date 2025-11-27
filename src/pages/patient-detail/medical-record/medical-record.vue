<template>
  <view class="medical-record-page">
    <!-- 加载状态 -->
    <view v-if="loading" class="loading-container">
      <wd-loading size="60rpx" />
      <text class="loading-text">正在加载病历...</text>
    </view>

    <!-- 病历内容区域 -->
    <scroll-view v-else scroll-y class="record-scroll">
      <!-- 病历头部信息 -->
      <view class="record-header">
        <view class="header-left">
          <text class="patient-name">{{ patientInfo?.name || '-' }}</text>
          <text class="visit-date">就诊日期：{{ recordData?.visitDate || '-' }}</text>
        </view>
        <view class="header-right">
          <text class="tag department">{{ recordData?.department || '-' }}</text>
        </view>
      </view>

      <!-- 病历单卡片 -->
      <view id="medical-record-content" class="record-card">
        <!-- 医院标题 - 双logo -->
        <view class="hospital-header">
          <image class="logo logo-left" src="/static/BJTU-images/BJTU-logo.png" mode="aspectFit" />
          <view class="hospital-title">
            <text class="title-main">北京交通大学校医院</text>
            <text class="title-sub">Beijing Jiaotong University Hospital</text>
          </view>
          <image class="logo logo-right" src="/static/BJTU-images/hospital_logo.png" mode="aspectFit" />
        </view>

        <!-- 病历单标题 -->
        <view class="record-title">
          <text class="title-text">门 诊 病 历</text>
          <view class="title-line" />
        </view>

        <!-- 基本信息区 -->
        <view class="info-section">
          <view class="info-row">
            <view class="info-item">
              <text class="label">姓名：</text>
              <text class="value">{{ patientInfo?.name || '-' }}</text>
            </view>
            <view class="info-item">
              <text class="label">性别：</text>
              <text class="value">{{ patientInfo?.gender || '-' }}</text>
            </view>
            <view class="info-item">
              <text class="label">年龄：</text>
              <text class="value">{{ patientInfo?.age || '-' }}岁</text>
            </view>
          </view>
          <view class="info-row">
            <view class="info-item">
              <text class="label">门诊号：</text>
              <text class="value">{{ recordData?.outpatientNo || '-' }}</text>
            </view>
            <view class="info-item flex-2">
              <text class="label">就诊日期：</text>
              <text class="value">{{ recordData?.visitDate || '-' }}</text>
            </view>
          </view>
          <view class="info-row">
            <view class="info-item">
              <text class="label">科室：</text>
              <text class="value">{{ recordData?.department || '-' }}</text>
            </view>
            <view class="info-item flex-2">
              <text class="label">医生：</text>
              <text class="value">{{ recordData?.doctorName || '-' }}</text>
            </view>
          </view>
        </view>

        <!-- 分隔线 -->
        <view class="divider" />

        <!-- 主诉 -->
        <view class="content-section">
          <view class="section-title">
            <text class="title-icon">●</text>
            <text class="title-text">主诉</text>
          </view>
          <view class="section-content">
            <text class="content-text">{{ recordData?.chiefComplaint || '无' }}</text>
          </view>
        </view>

        <!-- 现病史 -->
        <view class="content-section">
          <view class="section-title">
            <text class="title-icon">●</text>
            <text class="title-text">现病史</text>
          </view>
          <view class="section-content">
            <text class="content-text">{{ recordData?.presentIllness || '无' }}</text>
          </view>
        </view>

        <!-- 辅助检查 -->
        <view v-if="recordData?.auxiliaryExam" class="content-section">
          <view class="section-title">
            <text class="title-icon">●</text>
            <text class="title-text">辅助检查</text>
          </view>
          <view class="section-content">
            <text class="content-text">{{ recordData?.auxiliaryExam }}</text>
          </view>
        </view>

        <!-- 诊断 -->
        <view class="content-section diagnosis-section">
          <view class="section-title">
            <text class="title-icon">●</text>
            <text class="title-text">诊断</text>
          </view>
          <view class="section-content">
            <text class="diagnosis-text">{{ recordData?.diagnosis || '无' }}</text>
          </view>
        </view>

        <!-- 处置/处方 -->
        <view v-if="recordData?.prescription" class="content-section">
          <view class="section-title">
            <text class="title-icon">●</text>
            <text class="title-text">处置/处方</text>
          </view>
          <view class="section-content">
            <text class="content-text prescription-text">{{ recordData?.prescription }}</text>
          </view>
        </view>

        <!-- 医师签名 -->
        <view class="signature-section">
          <view class="signature-row">
            <text class="signature-label">医师签名：</text>
            <text class="signature-value">{{ recordData?.doctorName || '-' }}</text>
          </view>
          <view class="signature-row">
            <text class="signature-label">日期：</text>
            <text class="signature-value">{{ recordData?.visitDate || '-' }}</text>
          </view>
        </view>

        <!-- 医院印章区域 -->
        <view class="stamp-area">
          <view class="stamp-placeholder">
            <text class="stamp-text">北京交通大学</text>
            <text class="stamp-text">校医院</text>
          </view>
        </view>
      </view>

      <!-- 底部安全区域占位 -->
      <view class="bottom-safe-area" />
    </scroll-view>

    <!-- 底部操作栏 -->
    <view class="action-bar">
      <wd-button type="primary" block class="download-btn" @click="downloadPdf">
        <wd-icon name="download" size="36rpx" />
        <text class="btn-text">下载病历 PDF</text>
      </wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { BasicInfo, ConsultationRecord } from '../types'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getPatientDetail } from '@/api/patient'

definePage({
  style: {
    navigationBarTitleText: '病历详情',
  },
})

const recordId = ref<string>('')
const patientId = ref<string>('')
const recordData = ref<ConsultationRecord>()
const patientInfo = ref<BasicInfo>()
const loading = ref(true)

// 接收页面参数
onLoad((options) => {
  console.log('病历详情页 onLoad, 参数:', options)
  if (options?.recordId && options?.patientId) {
    recordId.value = options.recordId as string
    patientId.value = options.patientId as string
    fetchRecordDetail()
  }
  else {
    loading.value = false
    uni.showToast({
      title: '缺少必要参数',
      icon: 'none',
    })
    console.error('缺少参数:', { recordId: options?.recordId, patientId: options?.patientId })
  }
})

// 获取病历详情数据（使用真实API）
async function fetchRecordDetail() {
  loading.value = true
  try {
    // 调用真实API获取患者详情
    const data = await getPatientDetail(patientId.value)
    console.log('获取到的患者数据:', data)

    patientInfo.value = data.basicInfo

    // 检查就诊记录是否存在
    if (!data.consultationRecords || data.consultationRecords.length === 0) {
      uni.showToast({
        title: '该患者暂无就诊记录',
        icon: 'none',
      })
      loading.value = false
      return
    }

    // 从就诊记录中找到对应的记录
    const record = data.consultationRecords.find(r => r.id === recordId.value)
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
  catch (error) {
    console.error('获取病历详情失败:', error)
    uni.showToast({
      title: '获取病历详情失败',
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

// 下载 PDF（调用后端接口生成PDF并下载）
async function downloadPdf() {
  uni.showLoading({
    title: '正在生成PDF...',
    mask: true,
  })

  try {
    // TODO: 调用后端接口生成PDF
    // 后端接口示例: GET /api/medical-record/{recordId}/pdf
    // 返回: { url: 'https://xxx.com/xxx.pdf' }
    // const res = await httpGet<{ url: string }>(`/medical-record/${recordId.value}/pdf`)
    // const pdfUrl = res.url

    // 模拟接口延迟
    await new Promise(resolve => setTimeout(resolve, 1500))

    uni.hideLoading()

    // 暂时显示提示
    uni.showModal({
      title: 'PDF下载',
      content: '该功能需要后端支持\n\n接口地址: GET /api/medical-record/{recordId}/pdf\n返回格式: { url: string }',
      showCancel: false,
      confirmText: '知道了',
    })

    // 后端完成后启用以下代码:
    // #ifdef H5
    // window.open(pdfUrl, '_blank')
    // #endif

    // #ifdef MP-WEIXIN
    // uni.downloadFile({
    //   url: pdfUrl,
    //   success: (res) => {
    //     if (res.statusCode === 200) {
    //       uni.openDocument({
    //         filePath: res.tempFilePath,
    //         fileType: 'pdf',
    //         showMenu: true,
    //       })
    //     }
    //   },
    // })
    // #endif
  }
  catch (error) {
    uni.hideLoading()
    console.error('生成PDF失败:', error)
    uni.showToast({
      title: '生成失败',
      icon: 'none',
    })
  }
}
</script>

<style lang="scss" scoped>
.medical-record-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

// 加载状态
.loading-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;

  .loading-text {
    margin-top: 24rpx;
    font-size: 28rpx;
    color: #999;
  }
}

// 滚动区域
.record-scroll {
  flex: 1;
  height: 0;
}

// 病历头部信息
.record-header {
  background-color: #fff;
  padding: 24rpx 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-left {
    display: flex;
    flex-direction: column;

    .patient-name {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
    }

    .visit-date {
      font-size: 26rpx;
      color: #888;
      margin-top: 8rpx;
    }
  }

  .header-right {
    .tag {
      font-size: 24rpx;
      padding: 8rpx 16rpx;
      border-radius: 8rpx;
      background-color: #e8f4ff;
      color: #1989fa;
    }
  }
}

// 病历单卡片
.record-card {
  background-color: #fff;
  margin: 20rpx;
  border-radius: 16rpx;
  padding: 40rpx 32rpx;
  box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.06);
}

// 医院标题区域 - 双logo
.hospital-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 32rpx;
  border-bottom: 2rpx solid #1e3a8a;

  .logo {
    width: 100rpx;
    height: 100rpx;
  }

  .logo-left {
    margin-right: 24rpx;
  }

  .logo-right {
    margin-left: 24rpx;
  }

  .hospital-title {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title-main {
      font-size: 36rpx;
      font-weight: 700;
      color: #1e3a8a;
      letter-spacing: 4rpx;
    }

    .title-sub {
      font-size: 20rpx;
      color: #666;
      margin-top: 4rpx;
    }
  }
}

// 病历单标题
.record-title {
  text-align: center;
  padding: 32rpx 0;

  .title-text {
    font-size: 40rpx;
    font-weight: 700;
    color: #333;
    letter-spacing: 16rpx;
  }

  .title-line {
    height: 4rpx;
    background: linear-gradient(90deg, transparent, #c41e3a, transparent);
    margin-top: 16rpx;
  }
}

// 基本信息区
.info-section {
  padding: 20rpx 0;

  .info-row {
    display: flex;
    margin-bottom: 16rpx;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .info-item {
    flex: 1;
    display: flex;
    font-size: 28rpx;

    &.flex-2 {
      flex: 2;
    }

    .label {
      color: #666;
      white-space: nowrap;
    }

    .value {
      color: #333;
      font-weight: 500;
    }
  }
}

// 分隔线
.divider {
  height: 2rpx;
  background-color: #eee;
  margin: 24rpx 0;
}

// 内容区块
.content-section {
  margin-bottom: 32rpx;

  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;

    .title-icon {
      color: #1e3a8a;
      font-size: 20rpx;
      margin-right: 12rpx;
    }

    .title-text {
      font-size: 30rpx;
      font-weight: 600;
      color: #333;
    }
  }

  .section-content {
    padding-left: 32rpx;

    .content-text {
      font-size: 28rpx;
      color: #555;
      line-height: 1.8;
    }

    .prescription-text {
      white-space: pre-wrap;
    }
  }
}

// 诊断区块特殊样式
.diagnosis-section {
  .section-content {
    background-color: #f0f4ff;
    padding: 20rpx;
    border-radius: 12rpx;
    border-left: 6rpx solid #1e3a8a;

    .diagnosis-text {
      font-size: 30rpx;
      font-weight: 600;
      color: #1e3a8a;
    }
  }
}

// 医师签名区域
.signature-section {
  margin-top: 48rpx;
  padding-top: 32rpx;
  border-top: 2rpx dashed #ddd;
  display: flex;
  justify-content: space-between;

  .signature-row {
    display: flex;
    font-size: 28rpx;

    .signature-label {
      color: #666;
    }

    .signature-value {
      color: #333;
      font-weight: 500;
      text-decoration: underline;
    }
  }
}

// 印章区域
.stamp-area {
  margin-top: 40rpx;
  display: flex;
  justify-content: flex-end;

  .stamp-placeholder {
    width: 160rpx;
    height: 160rpx;
    border: 4rpx solid #c41e3a;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0.6;

    .stamp-text {
      font-size: 22rpx;
      color: #c41e3a;
      font-weight: 600;
    }
  }
}

// 底部安全区域
.bottom-safe-area {
  height: 160rpx;
}

// 底部操作栏
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 24rpx 32rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);

  .download-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    .btn-text {
      margin-left: 12rpx;
    }
  }
}
</style>
