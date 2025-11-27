<template>
  <view class="min-h-screen flex flex-col bg-gray-100 p-4">
    <!-- Header / Schedule Info -->
    <view class="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
      <view>
        <text class="block text-lg font-bold">我的接诊</text>
        <view v-if="currentSchedule" class="mt-1">
          <view class="text-sm text-gray-800 font-bold">
            {{ currentSchedule.department_name }} - {{ currentSchedule.doctor_name }}
          </view>
          <view class="mt-0.5 text-xs text-gray-500">
            {{ currentSchedule.date }} {{ currentSchedule.time_slot }} | {{ currentSchedule.clinic_type }}
          </view>
        </view>
        <text v-else class="text-sm text-gray-500">
          今日暂无排班
        </text>
      </view>
      <view v-if="queueData" class="text-right">
        <view class="text-xs text-gray-500">
          总号源: {{ queueData.stats.totalSlots }}
        </view>
        <view class="text-xs text-gray-500">
          候诊: {{ queueData.stats.waitingCount }}
        </view>
        <view v-if="currentSchedule" class="text-xs text-gray-500">
          剩余: {{ currentSchedule.remaining_slots }}
        </view>
      </view>
    </view>

    <template v-if="currentSchedule && queueData">
      <!-- Current Patient -->
      <CurrentPatient
        :patient="queueData.currentPatient"
        :next-patient="queueData.nextPatient"
        @pass="handlePass"
        @next="handleNext"
        @view-detail="handleViewDetail"
      />

      <!-- Queue List -->
      <QueueList
        :queue-data="queueData"
        @view-detail="handleViewDetail"
      />

      <!-- Add Button -->
      <view class="mt-4">
        <wd-button
          block
          size="large"
          @click="showAddDialog = true"
        >
          申请加号
        </wd-button>
      </view>
    </template>

    <view v-else-if="loading" class="flex flex-1 items-center justify-center">
      <wd-loading />
    </view>

    <view v-else class="flex flex-1 items-center justify-center">
      <wd-status-tip image="content" tip="暂无排班信息" />
    </view>

    <!-- Add Patient Dialog -->
    <AddPatientDialog
      v-if="currentSchedule"
      v-model:visible="showAddDialog"
      :schedule-id="currentSchedule.schedule_id"
      @submit="handleAddPatient"
    />
    <wd-toast />
    <wd-message-box />
  </view>
</template>

<script setup lang="ts">
import type { QueueData, Schedule } from '@/api/types/doctor'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { onUnmounted, ref } from 'vue'
import { useMessage, useToast } from 'wot-design-uni'
import {
  addPatient,
  callNextPatient,
  getConsultationQueue,
  getDoctorSchedules,
  passPatient,
} from '@/api/doctor'
import { useUserStore } from '@/store/user'
import AddPatientDialog from './components/AddPatientDialog.vue'
import CurrentPatient from './components/CurrentPatient.vue'
import QueueList from './components/QueueList.vue'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const currentSchedule = ref<Schedule | null>(null)
const queueData = ref<QueueData | null>(null)
const loading = ref(true)
const showAddDialog = ref(false)
let refreshTimer: any = null

async function fetchSchedules() {
  try {
    const doctorId = String(userStore.userInfo.doctor.id || '001') // Fallback for dev
    const res = await getDoctorSchedules(doctorId)
    if (res.schedules && res.schedules.length > 0) {
      currentSchedule.value = res.schedules[0]
      fetchQueue()
    }
    else {
      loading.value = false
    }
  }
  catch (e) {
    console.error(e)
    loading.value = false
    toast.error('获取排班失败')
  }
}

async function fetchQueue() {
  if (!currentSchedule.value)
    return
  try {
    const res = await getConsultationQueue(currentSchedule.value.schedule_id)
    queueData.value = res
  }
  catch (e) {
    console.error(e)
  }
  finally {
    loading.value = false
  }
}

async function handleNext() {
  if (!currentSchedule.value)
    return
  try {
    toast.loading('处理中...')
    await callNextPatient(currentSchedule.value.schedule_id)
    toast.close()
    toast.success('已呼叫下一位')
    fetchQueue()
  }
  catch (e) {
    console.error(e)
    toast.close()
    toast.error('操作失败')
  }
}

async function handlePass() {
  if (!queueData.value?.currentPatient)
    return
  try {
    await message.confirm({
      msg: '确定要将当前患者标记为过号吗？',
      title: '提示',
    })
    toast.loading('处理中...')
    await passPatient(queueData.value.currentPatient.orderId)
    toast.close()
    toast.success('已过号')
    fetchQueue()
  }
  catch (e) {
    if (e !== 'cancel') {
      console.error(e)
      toast.close()
      toast.error('操作失败')
    }
  }
}

async function handleAddPatient(data: { patientId: string, priority: number, reason: string }) {
  if (!currentSchedule.value)
    return
  try {
    toast.loading('提交中...')
    await addPatient({
      schedule_id: currentSchedule.value.schedule_id,
      patient_id: data.patientId,
      priority: data.priority,
      reason: data.reason,
    })
    toast.close()
    toast.success('加号成功')
    fetchQueue()
  }
  catch (e) {
    console.error(e)
    toast.close()
    toast.error('加号失败')
  }
}

function handleViewDetail(patientId: string) {
  uni.navigateTo({
    url: `/pages/patient-detail/patient-detail?patientId=${patientId}`,
  })
}

onLoad(() => {
  fetchSchedules()
})

onShow(() => {
  // Start auto refresh
  if (refreshTimer)
    clearInterval(refreshTimer)
  refreshTimer = setInterval(() => {
    if (currentSchedule.value) {
      fetchQueue()
    }
  }, 10000) // Refresh every 10s
})

onUnmounted(() => {
  if (refreshTimer)
    clearInterval(refreshTimer)
})
</script>

<style>
/* Add any specific styles here if needed, mostly using Tailwind/UnoCSS */
</style>
