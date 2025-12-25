<template>
  <div class="min-h-screen flex flex-col bg-[#f5f7fa]">
    <!-- 状态栏占位 -->
    <div class="h-[var(--status-bar-height)]" />

    <!-- 顶部个人信息卡片 -->
    <div class="mx-4 mt-3 rounded-2xl from-[#1890FF] to-[#096DD9] bg-gradient-to-r p-5 text-white shadow-md">
      <div class="flex items-center gap-4">
        <div class="h-12 w-12 flex items-center justify-center overflow-hidden border border-white/50 rounded-full bg-white/20">
          <img
            v-show="userAvatar && userAvatar.length > 0"
            :src="userAvatar"
            class="h-full w-full object-cover"
            style="border-radius: 50%;"
            @error="handleImageError"
            @load="handleImageLoad"
          >
          <div v-show="!userAvatar || userAvatar.length === 0" class="i-carbon-user-avatar text-2xl" />
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
    <div class="mx-4 mt-4 rounded-xl bg-white p-5 shadow-md">
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
          v-if="!currentShift"
          class="w-full rounded-lg bg-gray-100 py-3 text-center text-sm text-gray-400 font-bold"
          disabled
        >
          ☕️ 今日无排班，好好休息
        </button>
        <button
          v-else-if="currentShift?.status === 'checked_out'"
          class="w-full rounded-lg bg-gray-100 py-3 text-center text-sm text-gray-400 font-bold"
          disabled
        >
          ✅ 今日工作已完成
        </button>
        <button
          v-else-if="!checkedIn"
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
    <div class="mx-4 mt-4 gap-3" :class="userStore.isDepartmentHead ? 'grid grid-cols-2' : 'grid grid-cols-2'">
      <div class="flex flex-col justify-center rounded-lg bg-white p-4 shadow-md">
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <div class="i-carbon-calendar" /> 今日排班
        </div>
        <div class="mt-2 text-sm text-gray-800 font-bold">
          {{ todayScheduleBrief }}
        </div>
        <div v-if="currentShift" class="mt-1 text-xs text-gray-500">
          {{ currentShift.startTime }}-{{ currentShift.endTime }}
        </div>
        <div v-if="currentShift?.location" class="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <div class="i-carbon-location" />
          {{ currentShift.location }}
        </div>
      </div>

      <!-- 科室长：右侧上下布局 -->
      <template v-if="userStore.isDepartmentHead">
        <div class="flex flex-col gap-3">
          <div class="flex flex-1 flex-col justify-center rounded-lg bg-white p-3 shadow-md active:scale-[0.98]" @click="navigateTo('/pages/doctor/doctor')">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <div class="i-carbon-user-multiple" /> 待接诊
              </div>
              <div class="text-xl text-gray-800 font-extrabold">
                {{ waitingPatients }}
              </div>
            </div>
            <div class="mt-1 text-[10px] text-blue-500">
              点击进入接诊
            </div>
          </div>
          <div class="relative flex flex-1 flex-col justify-center rounded-lg bg-white p-3 shadow-md active:scale-[0.98]" @click="navigateTo('/pages/approval/index')">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <div class="i-carbon-notification" /> 待审批
              </div>
              <div class="text-xl text-gray-800 font-extrabold">
                {{ approvalStats.pending }}
              </div>
            </div>
            <div class="mt-1 text-[10px] text-gray-400">
              请假申请
            </div>
            <div v-if="approvalStats.pending > 0" class="absolute right-2 top-2 h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          </div>
        </div>
      </template>

      <!-- 普通医生：右侧单卡片 -->
      <template v-else>
        <div class="flex flex-col justify-center rounded-lg bg-white p-4 shadow-md active:scale-[0.98]" @click="navigateTo('/pages/doctor/doctor')">
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
      </template>
    </div>

    <!-- 功能区（角色区分） -->
    <div class="mx-4 mt-4" :class="showReminders ? 'mb-6' : 'mb-4'">
      <div class="mb-2 text-sm text-gray-800 font-bold">
        🎯 常用功能
      </div>
      <div class="grid grid-cols-4 gap-3">
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-3 shadow-md active:scale-[0.98]" @click="navigateTo('/pages/leave/index')">
          <div class="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <div class="i-carbon-calendar-add text-xl" />
          </div>
          <div class="mt-2 text-xs text-gray-700 font-bold">
            请假申请
          </div>
        </div>
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-3 shadow-md active:scale-[0.98]" @click="navigateTo('/pages/doctor/doctor')">
          <div class="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <div class="i-carbon-activity text-xl" />
          </div>
          <div class="mt-2 text-xs text-gray-700 font-bold">
            开始接诊
          </div>
        </div>
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-3 shadow-md active:scale-[0.98]" @click="navigateTo('/pages/date/date')">
          <div class="h-10 w-10 flex items-center justify-center rounded-xl bg-green-50 text-green-600">
            <div class="i-carbon-calendar text-xl" />
          </div>
          <div class="mt-2 text-xs text-gray-700 font-bold">
            我的排班
          </div>
        </div>
        <template v-if="userStore.isDepartmentHead">
          <div class="flex flex-col items-center justify-center rounded-lg bg-white p-3 shadow-md active:scale-[0.98]" @click="navigateTo('/pages/approval/index')">
            <div class="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <div class="i-carbon-task-approved text-xl" />
            </div>
            <div class="mt-2 text-xs text-gray-700 font-bold">
              审核请假
            </div>
          </div>
          <div class="flex flex-col items-center justify-center rounded-lg bg-white p-3 shadow-md active:scale-[0.98]" @click="navigateTo('/pages/schedule/index')">
            <div class="h-10 w-10 flex items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <div class="i-carbon-settings text-xl" />
            </div>
            <div class="mt-2 text-xs text-gray-700 font-bold">
              调整排班
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 提醒事项 -->
    <div v-if="showReminders" class="mx-4 mb-6 mt-4">
      <div class="mb-2 flex items-center justify-between" @click="navigateTo('/pages/notification/index')">
        <div class="text-sm text-gray-800 font-bold">
          🔔 提醒事项
        </div>
        <div class="i-carbon-chevron-right text-gray-400" />
      </div>
      <div class="space-y-2">
        <!-- 系统提醒 -->
        <div
          v-for="reminder in systemReminders"
          :key="reminder.id"
          class="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md"
        >
          <div
            class="h-10 w-10 flex items-center justify-center rounded-full"
            :class="{
              'bg-blue-50': reminder.type === 'system',
              'bg-green-50': reminder.type === 'schedule',
              'bg-orange-50': reminder.type === 'approval',
            }"
          >
            <div
              class="text-lg"
              :class="{
                'i-carbon-notification text-blue-500': reminder.type === 'system',
                'i-carbon-calendar text-green-500': reminder.type === 'schedule',
                'i-carbon-task-approved text-orange-500': reminder.type === 'approval',
              }"
            />
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

        <!-- 请假提醒 -->
        <div
          v-for="leave in leaveRecords"
          :key="leave.id"
          class="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md"
          :class="{
            'border-l-4 border-yellow-500': leave.status === 'pending',
            'border-l-4 border-green-500': leave.status === 'approved',
            'border-l-4 border-red-500': leave.status === 'rejected',
          }"
        >
          <div
            class="h-10 w-10 flex items-center justify-center rounded-full"
            :class="{
              'bg-yellow-50': leave.status === 'pending',
              'bg-green-50': leave.status === 'approved',
              'bg-red-50': leave.status === 'rejected',
            }"
          >
            <div
              class="text-lg"
              :class="{
                'i-carbon-time text-yellow-500': leave.status === 'pending',
                'i-carbon-checkmark-filled text-green-500': leave.status === 'approved',
                'i-carbon-close-filled text-red-500': leave.status === 'rejected',
              }"
            />
          </div>
          <div class="flex-1">
            <div class="text-sm text-gray-800 font-bold">
              <span v-if="leave.status === 'pending'">请假审批中</span>
              <span v-else-if="leave.status === 'approved'">请假已通过</span>
              <span v-else-if="leave.status === 'rejected'">请假已拒绝</span>
            </div>
            <div class="mt-0.5 text-xs text-gray-500">
              {{ dayjs(leave.date).format('MM月DD日') }}
              <span v-if="leave.shift === 'morning'">上午</span>
              <span v-else-if="leave.shift === 'afternoon'">下午</span>
              <span v-else-if="leave.shift === 'full'">全天</span>
              <span v-else-if="leave.shift === 'night'">夜班</span>
              <span v-if="leave.status === 'approved' && leave.approver"> · 审批人：{{ leave.approver }}</span>
              <span v-if="leave.status === 'rejected' && leave.rejectReason"> · {{ leave.rejectReason }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ShiftItem, WorkbenchData } from '@/service/workbench'
import type { LeaveRecord } from '@/types/leave'
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { getApprovalStats } from '@/service/approval'
import { getLeaveHistory } from '@/service/leave'
import {
  checkin,
  checkout,
  getShifts,
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
const userAvatar = computed(() => {
  const doctor = userStore.userInfo.doctor
  console.log('Index page computing userAvatar, doctor:', doctor)

  if (doctor?.photo_base64 && doctor?.photo_mime) {
    // 在微信小程序中，检查base64长度避免过大图片
    const base64Length = doctor.photo_base64.length
    console.log('Index Avatar base64 length:', base64Length, 'Doctor ID:', doctor.id, 'Name:', doctor.name)

    // 微信小程序建议base64图片不超过2MB（约2.7M base64字符）
    if (base64Length > 2700000) {
      console.warn('Index Avatar base64 too large for WeChat miniprogram:', base64Length)
      return ''
    }

    // 特殊处理：如果在微信小程序环境且图片过大，尝试使用网络图片
    // #ifdef MP-WEIXIN
    if (base64Length > 1000000) { // 1MB限制
      console.log('Index Using fallback for large image in WeChat miniprogram')
      return '' // 暂时返回空，使用默认图标
    }
    // #endif

    const avatarUrl = `data:${doctor.photo_mime};base64,${doctor.photo_base64}`
    console.log('Index Generated avatar URL length:', avatarUrl.length)
    return avatarUrl
  }

  console.log('Index No avatar data available')
  return ''
})

// 工作台数据
const workbenchData = ref<WorkbenchData | null>(null)
const loading = ref(false)
const todayShifts = ref<ShiftItem[]>([])

// 加载班次数据
async function loadShifts() {
  if (!userStore.userInfo.doctor?.id)
    return
  try {
    const shifts = await getShifts(userStore.userInfo.doctor.id)
    // 确保返回的数据不为null
    todayShifts.value = Array.isArray(shifts) ? shifts.filter(s => s != null) : []
    console.log('Loaded shifts:', todayShifts.value)
  }
  catch (error) {
    console.error('Failed to load shifts:', error)
    todayShifts.value = [] // 确保在错误时设置为空数组
  }
}

// 计算当前班次
const currentShift = computed(() => {
  if (todayShifts.value.length === 0)
    return null

  // 1. 优先找正在进行或待签退的（状态优先）
  const activeShift = todayShifts.value.find(s => s.status === 'checked_in' || s.status === 'checkout_pending')
  if (activeShift)
    return activeShift

  const now = dayjs()
  const nowTime = now.hour() * 60 + now.minute()

  // 辅助函数：将 HH:mm 转换为分钟数
  const getMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number)
    return h * 60 + m
  }

  // 2. 找时间正在进行中的班次
  const ongoingShift = todayShifts.value.find((s) => {
    const start = getMinutes(s.startTime)
    const end = getMinutes(s.endTime)
    return nowTime >= start && nowTime <= end
  })
  if (ongoingShift)
    return ongoingShift

  // 3. 找即将开始的班次（最近的一个）
  const upcomingShifts = todayShifts.value
    .filter(s => getMinutes(s.startTime) > nowTime)
    .sort((a, b) => getMinutes(a.startTime) - getMinutes(b.startTime))

  if (upcomingShifts.length > 0) {
    return upcomingShifts[0]
  }

  // 4. 如果都结束了，显示最后一个
  // 按结束时间排序
  const sortedShifts = [...todayShifts.value].sort((a, b) => getMinutes(a.endTime) - getMinutes(b.endTime))
  return sortedShifts[sortedShifts.length - 1]
})

// 签到签退状态
const checkedIn = computed(() => currentShift.value?.status === 'checked_in' || currentShift.value?.status === 'checkout_pending')
const checkInTime = computed(() => '') // 接口未返回签到时间

// 今日排班
const todayScheduleText = computed(() => {
  if (!currentShift.value)
    return '今日无排班'
  return `${currentShift.value.name} ${currentShift.value.startTime}-${currentShift.value.endTime}`
})
const todayScheduleBrief = computed(() => currentShift.value?.name || '无排班')
const attendanceTitle = computed(() => {
  const status = currentShift.value?.status
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

// 请假记录
const leaveRecords = ref<LeaveRecord[]>([])

// 系统提醒（排班、审批、系统消息）
const systemReminders = computed(() => {
  const list: { id: string, title: string, time: string, type: 'system' | 'schedule' | 'approval' }[] = []

  // 1. 排班提醒
  if (todayShifts.value.length > 0 && todayShifts.value[0]) {
    const shift = todayShifts.value[0]
    list.push({
      id: `shift-${shift.id}`,
      title: `今日排班：${shift.name}`,
      time: `${shift.startTime}-${shift.endTime}`,
      type: 'schedule',
    })
  }

  // 2. 待审批提醒
  if (approvalStats.value.pending > 0) {
    list.push({
      id: 'approval-pending',
      title: `有 ${approvalStats.value.pending} 条待审批申请`,
      time: '待处理',
      type: 'approval',
    })
  }

  // 3. 系统通知 (总是显示，确保开启开关后能看到内容)
  list.push({
    id: 'system-welcome',
    title: '欢迎使用医生工作台',
    time: dayjs().format('MM-DD'),
    type: 'system',
  })

  return list
})

// 是否显示提醒事项
const showReminders = computed(() => {
  if (!userStore.showNotificationDetailsOnHome)
    return false
  const hasReminders = systemReminders.value.length > 0
  const hasLeaves = leaveRecords.value.length > 0
  return hasReminders || hasLeaves
})

// 加载工作台数据
async function loadWorkbenchData() {
  // 接口已废弃
  // loading.value = true
  // try {
  //   const data = await getWorkbenchData()
  //   workbenchData.value = data

  //   // 更新接诊统计
  //   consultationStats.value = {
  //     pending: data.todayData.pendingConsultation,
  //     ongoing: data.todayData.ongoingConsultation,
  //     completed: data.todayData.completedConsultation,
  //     total: data.todayData.totalConsultation,
  //   }
  // }
  // catch (error) {
  //   console.error('Failed to load workbench data:', error)
  //   uni.showToast({
  //     title: '加载工作台数据失败',
  //     icon: 'none',
  //   })
  // }
  // finally {
  //   loading.value = false
  // }
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

// 加载请假记录（近期和今天的）
async function loadLeaveRecords() {
  try {
    const records = await getLeaveHistory(1, 10)
    // 只保留今天及未来7天的请假记录
    const today = dayjs()
    const sevenDaysLater = today.add(7, 'day')
    leaveRecords.value = records.filter((record) => {
      const leaveDate = dayjs(record.date)
      return leaveDate.isSame(today, 'day') || (leaveDate.isAfter(today) && leaveDate.isBefore(sevenDaysLater))
    })
  }
  catch (error) {
    console.error('Failed to load leave records:', error)
    leaveRecords.value = []
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
    await loadShifts()
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
    await loadShifts()
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

// 图片加载事件处理
function handleImageLoad() {
  console.log('Avatar loaded successfully')
}

function handleImageError(e: any) {
  console.error('Avatar load failed:', e)
  const doctor = userStore.userInfo.doctor
  if (doctor) {
    console.error('Doctor info:', {
      id: doctor.id,
      name: doctor.name,
      photo_mime: doctor.photo_mime,
      photo_base64_length: doctor.photo_base64?.length,
    })
  }
}

// 页面加载
onMounted(async () => {
  // 确保用户信息已加载
  if (!userStore.userInfo.doctor?.id || userStore.userInfo.doctor.id === -1) {
    try {
      console.log('Loading user info on index page...')
      await userStore.fetchUserInfo()
    }
    catch (error) {
      console.error('Failed to load user info on index page:', error)
    }
  }

  await Promise.all([
    loadShifts(),
    loadApprovalStats(),
    loadLeaveRecords(),
  ])
})
</script>

<style scoped>
</style>
