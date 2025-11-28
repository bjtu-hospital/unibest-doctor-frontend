<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <wd-navbar placeholder safe-area-inset-top fixed :left-arrow="false">
      <template #title>
        <div class="text-left text-base font-bold" />
      </template>
    </wd-navbar>

    <!-- 顶部个人信息卡片 -->
    <div class="mx-4 mt-3 rounded-2xl from-[#1890FF] to-[#096DD9] bg-gradient-to-r p-5 text-white shadow-md">
      <div class="flex items-center gap-4">
        <div class="h-12 w-12 flex items-center justify-center border border-white/50 rounded-full bg-white/20">
          <div class="i-carbon-user-avatar text-2xl" />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2 text-base font-bold">
            {{ userName }}
            <span v-if="userStore.isDepartmentHead" class="rounded bg-[#FFD666] px-2 py-0.5 text-xs text-[#9C6A00] font-bold">科室长</span>
          </div>
          <div class="mt-0.5 text-xs opacity-90">
            {{ userDeptTitle }}
          </div>
        </div>
      </div>
      <div class="mt-3 text-xs opacity-90">
        今天是 {{ currentDate }} · {{ greeting }}
      </div>
    </div>

    <!-- 签到/签退板块 -->
    <div class="mx-4 mt-4 rounded-xl bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-800 font-bold">
          {{ attendanceTitle }}
        </div>
        <div class="text-xs text-gray-500">
          当前时间：{{ currentTime }}
        </div>
      </div>

      <div class="mt-3 text-xs text-gray-600">
        今日排班：{{ todayScheduleText }}
      </div>

      <div class="mt-4">
        <button
          v-if="!checkedIn"
          class="w-full rounded-lg from-green-500 to-emerald-500 bg-gradient-to-r py-3 text-center text-sm text-white font-bold active:opacity-90"
          @click="handleCheckIn"
        >
          🖐 点击签到
        </button>
        <div v-else class="flex items-center justify-between">
          <div class="text-sm text-green-600 font-bold">
            ✅ 已签到 {{ checkInTime }}
          </div>
          <button
            class="rounded-lg from-orange-500 to-amber-500 bg-gradient-to-r px-4 py-2 text-sm text-white font-bold active:opacity-90"
            @click="handleCheckOut"
          >
            👋 点击签退
          </button>
        </div>
      </div>
    </div>

    <!-- 今日工作概览（科室长含待审批） -->
    <div class="grid grid-cols-3 mx-4 mt-4 gap-3">
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <div class="i-carbon-calendar" /> 今日排班
        </div>
        <div class="mt-2 text-sm text-gray-800 font-bold">
          {{ todayScheduleBrief }}
        </div>
      </div>
      <div class="rounded-lg bg-white p-4 shadow-sm active:scale-[0.98]" @click="navigateTo('/pages/doctor/doctor')">
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <div class="i-carbon-user-multiple" /> 待接诊
        </div>
        <div class="mt-2 text-2xl text-gray-800 font-extrabold">
          {{ waitingPatients }}
        </div>
        <div class="mt-1 text-[10px] text-blue-500">
          点击进入接诊
        </div>
      </div>
      <div v-if="userStore.isDepartmentHead" class="relative rounded-lg bg-white p-4 shadow-sm" @click="navigateTo('/pages/approval/index')">
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <div class="i-carbon-notification" /> 待审批请假
        </div>
        <div class="mt-2 text-2xl text-gray-800 font-extrabold">
          {{ approvalStats.pending }}
        </div>
        <div class="absolute right-3 top-3 h-2 w-2 animate-pulse rounded-full bg-red-500" />
      </div>
    </div>

    <!-- 功能区（角色区分） -->
    <div class="mx-4 mb-6 mt-4">
      <div class="mb-2 text-sm text-gray-800 font-bold">
        🎯 常用功能
      </div>
      <div :class="userStore.isDepartmentHead ? 'grid grid-cols-3 gap-3' : 'grid grid-cols-2 gap-3'">
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-5 shadow-sm active:scale-[0.98]" @click="navigateTo('/pages/leave/index')">
          <div class="h-16 w-16 flex items-center justify-center rounded-full text-white" style="background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);">
            <div class="i-carbon-document-add text-2xl" />
          </div>
          <div class="mt-2 text-xs text-gray-700 font-bold">
            请假申请
          </div>
        </div>
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-5 shadow-sm active:scale-[0.98]" @click="navigateTo('/pages/doctor/doctor')">
          <div class="h-16 w-16 flex items-center justify-center rounded-full text-white" style="background: linear-gradient(135deg, #FF512F 0%, #F09819 100%);">
            <div class="i-carbon-user-activity text-2xl" />
          </div>
          <div class="mt-2 text-xs text-gray-700 font-bold">
            开始接诊
          </div>
        </div>
        <template v-if="userStore.isDepartmentHead">
          <div class="flex flex-col items-center justify-center rounded-lg bg-white p-5 shadow-sm active:scale-[0.98]" @click="navigateTo('/pages/approval/index')">
            <div class="h-16 w-16 flex items-center justify-center rounded-full text-white" style="background: linear-gradient(135deg, #FA8C16 0%, #FAAD14 100%);">
              <div class="i-carbon-checkmark-filled text-2xl" />
            </div>
            <div class="mt-2 text-xs text-gray-700 font-bold">
              审核请假
            </div>
          </div>
          <div class="flex flex-col items-center justify-center rounded-lg bg-white p-5 shadow-sm active:scale-[0.98]" @click="navigateTo('/pages/schedule/index')">
            <div class="h-16 w-16 flex items-center justify-center rounded-full text-white" style="background: linear-gradient(135deg, #2196F3 0%, #00BCD4 100%);">
              <div class="i-carbon-calendar text-2xl" />
            </div>
            <div class="mt-2 text-xs text-gray-700 font-bold">
              调整排班
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 提醒事项 -->
    <div v-if="workbenchData?.reminders && workbenchData.reminders.length > 0" class="mx-4 mt-4">
      <div class="mb-2 text-sm text-gray-800 font-bold">
        🔔 提醒事项
      </div>
      <div class="space-y-2">
        <div
          v-for="reminder in workbenchData.reminders"
          :key="reminder.id"
          class="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm"
        >
          <div class="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50">
            <div class="i-carbon-notification text-lg text-blue-500" />
          </div>
          <div class="flex-1">
            <div class="text-sm text-gray-800 font-bold">
              {{ reminder.title }}
            </div>
            <div class="mt-0.5 text-xs text-gray-500">
              {{ reminder.time }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近接诊记录 -->
    <div v-if="recentRecords && recentRecords.length > 0" class="mx-4 mb-6 mt-4">
      <div class="mb-2 text-sm text-gray-800 font-bold">
        📋 最近接诊
      </div>
      <div class="space-y-2">
        <div
          v-for="record in recentRecords"
          :key="record.id"
          class="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm active:scale-[0.98]"
          @click="navigateTo(`/pages/patient-detail/patient-detail?id=${record.id}`)"
        >
          <div class="h-10 w-10 flex items-center justify-center rounded-full bg-green-50">
            <div class="i-carbon-user text-lg text-green-500" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-800 font-bold">
                {{ record.patientName }}
              </div>
              <div class="text-xs text-gray-400">
                {{ record.consultationTime }}
              </div>
            </div>
            <div class="mt-0.5 text-xs text-gray-500">
              {{ record.diagnosis || '暂无诊断' }}
            </div>
          </div>
          <div class="i-carbon-chevron-right text-base text-gray-300" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RecentRecord, WorkbenchData } from '@/service/workbench'
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { getApprovalStats } from '@/service/approval'
import {
  checkin,
  checkout,
  getWorkbenchData,

} from '@/service/workbench'
import { useUserStore } from '@/store/user'

defineOptions({
  name: 'Home',
})

const userStore = useUserStore()
const currentDate = computed(() => dayjs().format('YYYY年MM月DD日'))
const currentTime = computed(() => dayjs().format('HH:mm'))
const greeting = computed(() => {
  const h = Number(dayjs().format('H'))
  if (h < 12)
    return '早上好'
  if (h < 18)
    return '下午好'
  return '晚上好'
})

const userName = computed(() => userStore.userInfo.doctor?.name || '医生')
const userDeptTitle = computed(() => `${userStore.userInfo.doctor?.department || '科室'}｜${userStore.userInfo.doctor?.title || ''}`)

// 工作台数据
const workbenchData = ref<WorkbenchData | null>(null)
const loading = ref(false)

// 签到签退状态
const shiftStatus = computed(() => workbenchData.value?.shiftStatus)
const checkedIn = computed(() => shiftStatus.value?.status === 'checked_in' || shiftStatus.value?.status === 'checkout_pending')
const checkInTime = computed(() => shiftStatus.value?.checkinTime || '')
const currentShift = computed(() => shiftStatus.value?.currentShift)

// 今日排班
const todayScheduleText = computed(() => {
  if (!currentShift.value)
    return '今日无排班'
  return `${currentShift.value.name} ${currentShift.value.startTime}-${currentShift.value.endTime}`
})
const todayScheduleBrief = computed(() => currentShift.value?.name || '无排班')
const attendanceTitle = computed(() => {
  const status = shiftStatus.value?.status
  if (status === 'checked_in')
    return '已签到，未签退'
  if (status === 'checked_out')
    return '已签退'
  if (status === 'checkout_pending')
    return '待签退'
  return '今日尚未签到'
})

// 接诊统计
const consultationStats = ref({
  pending: 0,
  ongoing: 0,
  completed: 0,
  total: 0,
})
const waitingPatients = computed(() => consultationStats.value.pending)

// 审批统计
const approvalStats = ref<{ pending: number, approvedMonth: number, rejectedMonth: number }>({
  pending: 0,
  approvedMonth: 0,
  rejectedMonth: 0,
})

// 最近接诊记录
const recentRecords = ref<RecentRecord[]>([])

// 加载工作台数据
async function loadWorkbenchData() {
  loading.value = true
  try {
    const data = await getWorkbenchData()
    workbenchData.value = data

    // 更新接诊统计
    consultationStats.value = {
      pending: data.todayData.pendingConsultation,
      ongoing: data.todayData.ongoingConsultation,
      completed: data.todayData.completedConsultation,
      total: data.todayData.totalConsultation,
    }

    // 更新最近记录
    recentRecords.value = data.recentRecords
  }
  catch (error) {
    console.error('Failed to load workbench data:', error)
    uni.showToast({
      title: '加载工作台数据失败',
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

// 加载审批统计（如果是科室长）
async function loadApprovalStats() {
  if (!userStore.isDepartmentHead)
    return

  try {
    approvalStats.value = await getApprovalStats()
  }
  catch (e) {
    approvalStats.value = { pending: 0, approvedMonth: 0, rejectedMonth: 0 }
  }
}

// 签到
async function handleCheckIn() {
  if (!currentShift.value) {
    uni.showToast({
      title: '今日无排班，无法签到',
      icon: 'none',
    })
    return
  }

  try {
    // 获取位置
    const location = await getLocation()

    const result = await checkin({
      shiftId: currentShift.value.id,
      latitude: location.latitude,
      longitude: location.longitude,
    })

    uni.showToast({
      title: result.message,
      icon: 'success',
    })

    // 重新加载数据
    await loadWorkbenchData()
  }
  catch (error: any) {
    console.error('Check in failed:', error)
    uni.showToast({
      title: error.message || '签到失败',
      icon: 'none',
    })
  }
}

// 签退
async function handleCheckOut() {
  if (!currentShift.value) {
    uni.showToast({
      title: '今日无排班，无法签退',
      icon: 'none',
    })
    return
  }

  try {
    // 获取位置
    const location = await getLocation()

    const result = await checkout({
      shiftId: currentShift.value.id,
      latitude: location.latitude,
      longitude: location.longitude,
    })

    uni.showToast({
      title: `${result.message}\n工作时长: ${result.workDuration}`,
      icon: 'success',
      duration: 3000,
    })

    // 重新加载数据
    await loadWorkbenchData()
  }
  catch (error: any) {
    console.error('Check out failed:', error)
    uni.showToast({
      title: error.message || '签退失败',
      icon: 'none',
    })
  }
}

// 获取位置信息
function getLocation(): Promise<{ latitude: number, longitude: number }> {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02',
      success: (res) => {
        resolve({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
      fail: (err) => {
        console.error('Get location failed:', err)
        // 如果获取位置失败，使用默认值（仅测试用）
        uni.showModal({
          title: '定位失败',
          content: '无法获取您的位置信息，是否使用默认位置进行签到？',
          success: (modalRes) => {
            if (modalRes.confirm) {
              resolve({
                latitude: 39.9042,
                longitude: 116.4074,
              })
            }
            else {
              reject(new Error('用户取消定位'))
            }
          },
        })
      },
    })
  })
}

function navigateTo(url: string) {
  uni.navigateTo({ url })
}

// 页面加载
onMounted(async () => {
  await Promise.all([
    loadWorkbenchData(),
    loadApprovalStats(),
  ])
})
</script>

<style scoped>
</style>
