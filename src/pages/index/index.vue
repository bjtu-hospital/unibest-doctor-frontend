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
      <div class="grid grid-cols-3 gap-3">
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
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-5 shadow-sm active:scale-[0.98]" @click="navigateTo('/pages/date/date')">
          <div class="h-16 w-16 flex items-center justify-center rounded-full text-white" style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);">
            <div class="i-carbon-calendar-heat-map text-2xl" />
          </div>
          <div class="mt-2 text-xs text-gray-700 font-bold">
            我的排班
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
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { getApprovalStats } from '@/service/approval'
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

// 签到签退状态（示例占位：可替换为真实接口与store）
const checkedIn = ref(false)
const checkInTime = ref('')
function handleCheckIn() {
  checkedIn.value = true
  checkInTime.value = dayjs().format('HH:mm')
  uni.showToast({ icon: 'none', title: '签到成功' })
}
function handleCheckOut() {
  checkedIn.value = false
  uni.showToast({ icon: 'none', title: '签退成功' })
}

// 今日排班（占位，后续可从排班接口读取今日排班）
const todayScheduleText = computed(() => '上午门诊 08:00-12:00')
const todayScheduleBrief = computed(() => '上午门诊')
const attendanceTitle = computed(() => (checkedIn.value ? '已签到，未签退' : '今日尚未签到'))

// 待接诊人数（占位）
const waitingPatients = ref(0)

// 审批统计
const approvalStats = ref<{ pending: number, approvedMonth: number, rejectedMonth: number }>({ pending: 0, approvedMonth: 0, rejectedMonth: 0 })

onMounted(async () => {
  try {
    approvalStats.value = await getApprovalStats()
  }
  catch (e) {
    approvalStats.value = { pending: 0, approvedMonth: 0, rejectedMonth: 0 }
  }
})

function navigateTo(url: string) {
  uni.navigateTo({ url })
}
</script>

<style scoped>
</style>
