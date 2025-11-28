<template>
  <view class="min-h-screen bg-gray-50">
    <!-- Scrollable Content -->
    <scroll-view
      scroll-y
      class="scroll-container"
      :style="{ height: '100vh' }"
    >
      <view class="p-4 space-y-4">
        <!-- Modern Header Card -->
        <view class="rounded-2xl from-blue-500 via-blue-600 to-indigo-600 bg-gradient-to-br p-5 shadow-xl">
          <view class="mb-3 flex items-start justify-between">
            <view class="flex-1">
              <text class="mb-1 block text-2xl text-white font-bold">我的接诊</text>
              <view v-if="currentSchedule" class="mt-2 flex items-center gap-2">
                <view class="flex items-center gap-1 rounded-lg bg-white/20 px-2 py-1">
                  <wd-icon name="clock" size="14px" color="#fff" />
                  <text class="text-xs text-white opacity-90">{{ currentSchedule.time_slot }}</text>
                </view>
                <view class="flex items-center gap-1 rounded-lg bg-white/20 px-2 py-1">
                  <text class="text-xs text-white opacity-90">{{ currentSchedule.date }}</text>
                </view>
              </view>
            </view>
            <view v-if="currentSchedule" class="text-right">
              <text class="mb-1 block text-xs text-white/70">科室</text>
              <text class="text-sm text-white font-medium">{{ currentSchedule.department_name }}</text>
            </view>
          </view>

          <!-- Stats Mini Cards -->
          <view v-if="queueData" class="grid grid-cols-4 mt-4 gap-2">
            <view class="rounded-xl bg-white/10 p-2 text-center backdrop-blur-sm">
              <view class="text-xl text-white font-bold">
                {{ queueData.stats.totalSlots }}
              </view>
              <view class="mt-0.5 text-xs text-white/70">
                总号源
              </view>
            </view>
            <view class="rounded-xl bg-white/10 p-2 text-center backdrop-blur-sm">
              <view class="text-xl text-white font-bold">
                {{ queueData.stats.waitingCount }}
              </view>
              <view class="mt-0.5 text-xs text-white/70">
                候诊
              </view>
            </view>
            <view class="rounded-xl bg-white/10 p-2 text-center backdrop-blur-sm">
              <view class="text-xl text-white font-bold">
                {{ queueData.stats.waitlistCount }}
              </view>
              <view class="mt-0.5 text-xs text-white/70">
                待诊
              </view>
            </view>
            <view class="rounded-xl bg-white/10 p-2 text-center backdrop-blur-sm">
              <view class="text-xl text-white font-bold">
                {{ queueData.stats.completedCount }}
              </view>
              <view class="mt-0.5 text-xs text-white/70">
                已诊
              </view>
            </view>
          </view>

          <text v-if="!currentSchedule" class="text-sm text-white/80">
            今日暂无排班
          </text>
        </view>

        <template v-if="currentSchedule && queueData">
          <!-- Current Patient -->
          <CurrentPatient
            :patient="queueData.currentPatient"
            :next-patient="queueData.nextPatient"
            @pass="handlePass"
            @next="handleNext"
            @complete="handleComplete"
            @view-detail="handleViewDetail"
          />

          <!-- Queue List -->
          <QueueList
            :queue-data="queueData"
            @view-detail="handleViewDetail"
          />

          <!-- Add Button -->
          <view class="pb-safe">
            <wd-button
              block
              size="large"
              @click="showAddDialog = true"
            >
              申请加号
            </wd-button>
          </view>
        </template>

        <view v-else-if="loading" class="flex items-center justify-center py-20">
          <wd-loading />
        </view>

        <view v-else class="flex items-center justify-center py-20">
          <wd-status-tip image="content" tip="暂无排班信息" />
        </view>
      </view>
    </scroll-view>

    <!-- Add Patient Dialog -->
    <AddPatientDialog
      v-if="currentSchedule"
      v-model:visible="showAddDialog"
      :schedule-id="currentSchedule.schedule_id"
      :slot-types="currentSchedule.available_slot_types"
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
  completeConsultation,
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

async function handleComplete() {
  if (!currentSchedule.value || !queueData.value?.currentPatient)
    return
  try {
    await message.confirm({
      msg: '确定要完成当前患者的就诊吗？',
      title: '提示',
    })
    toast.loading('处理中...')
    await completeConsultation({
      order_id: queueData.value.currentPatient.orderId,
    })
    toast.close()
    toast.success('就诊完成')
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

async function handlePass() {
  if (!queueData.value?.currentPatient)
    return
  try {
    await message.confirm({
      msg: '确定要将当前患者标记为过号吗？系统将自动呼叫下一位。',
      title: '提示',
    })
    toast.loading('处理中...')
    await passPatient({
      order_id: queueData.value.currentPatient.orderId,
    })
    toast.close()
    toast.success('已过号，自动呼叫下一位')
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

async function handleAddPatient(data: { patientId: string, slotType: string, reason: string }) {
  if (!currentSchedule.value)
    return
  try {
    toast.loading('提交中...')
    // Process patientId: remove 'P' prefix and convert to number
    const numericPatientId = Number(data.patientId.replace(/^P/i, ''))

    await addPatient({
      schedule_id: currentSchedule.value.schedule_id,
      patient_id: numericPatientId,
      slot_type: data.slotType,
      reason: data.reason,
    })
    toast.close()
    toast.success('加号申请已提交')
    // fetchQueue() // Queue might not update immediately if it needs approval
  }
  catch (e) {
    console.error(e)
    toast.close()
    toast.error('加号失败')
  }
}

function handleViewDetail(patientId: string | number) {
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
