<template>
  <div class="rounded-lg bg-white p-4 shadow-sm">
    <!-- Month Switcher -->
    <div class="mb-4 flex items-center justify-between">
      <div class="text-xl text-gray-500" @click="prevMonth">
        &lt;
      </div>
      <div class="text-lg font-bold">
        {{ currentYear }}年{{ currentMonth }}月
      </div>
      <div class="text-xl text-gray-500" @click="nextMonth">
        &gt;
      </div>
    </div>

    <!-- Week Header -->
    <div class="grid grid-cols-7 mb-2 text-center text-sm text-gray-400">
      <div v-for="day in weekDays" :key="day">
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-2">
      <!-- Empty cells for start of month -->
      <div v-for="n in startDayOffset" :key="`empty-${n}`" class="h-20" />

      <!-- Days -->
      <div
        v-for="item in schedule"
        :key="item.date"
        class="relative h-20 flex flex-col items-center justify-center overflow-hidden border rounded-lg transition-all"
        :class="getCellClass(item)"
        @click="handleDateClick(item)"
      >
        <span class="text-lg font-bold">{{ item.day }}</span>

        <!-- Display Logic based on getLeaveDisplayState -->
        <template v-if="getLeaveDisplayState(item).type === 'style4'">
          <span class="mt-1 text-xs font-bold">全天请假</span>
          <div class="absolute right-1 top-1 text-xs font-bold">
            ✓
          </div>
        </template>

        <template v-else-if="getLeaveDisplayState(item).type === 'style7'">
          <span class="mt-1 text-xs font-bold">全天请假驳回</span>
          <div class="absolute right-1 top-1 text-xs font-bold">
            ✕
          </div>
        </template>

        <template v-else>
          <span v-if="item.shiftInfo" class="mt-1 scale-90 text-xs">{{ item.shiftInfo }}</span>

          <!-- Strip Styles -->
          <template v-if="['style3', 'style5', 'style6'].includes(getLeaveDisplayState(item).type)">
            <div class="absolute bottom-0 left-0 top-0 w-1" :class="getLeaveDisplayState(item).stripColor" />
            <div class="absolute right-1 top-1 text-xs font-bold" :class="getLeaveDisplayState(item).iconColor">
              {{ getLeaveDisplayState(item).icon }}
            </div>
          </template>
        </template>
      </div>
    </div>
    <wd-toast />
  </div>
</template>

<script setup lang="ts">
import type { ScheduleItem } from '@/types/leave'
import { computed, onMounted, ref, watch } from 'vue'
import { useToast } from 'wot-design-uni'
import { getSchedule } from '@/service/leave'

const props = defineProps<{
  refreshTrigger?: number
}>()

const emit = defineEmits<{
  (e: 'select', item: ScheduleItem): void
}>()

const toast = useToast()
const currentDate = ref(new Date())
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth() + 1)
const weekDays = ['一', '二', '三', '四', '五', '六', '日']

const schedule = ref<ScheduleItem[]>([])

const startDayOffset = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1).getDay()
  return firstDay === 0 ? 6 : firstDay - 1
})

async function fetchSchedule() {
  schedule.value = await getSchedule(currentYear.value, currentMonth.value)
}

function prevMonth() {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 2, 1)
  fetchSchedule()
}

function nextMonth() {
  currentDate.value = new Date(currentYear.value, currentMonth.value, 1)
  fetchSchedule()
}

function getLeaveDisplayState(item: ScheduleItem) {
  const statuses = (item.shiftLeaveStatuses || []).map(s => s.leaveStatus)
  const shifts = (item.shiftLeaveStatuses || []).map(s => s.shift)

  // Priority 1: Pending (Style 5)
  if (statuses.includes('pending')) {
    return { type: 'style5', stripColor: 'bg-yellow-500', iconColor: 'text-yellow-500', icon: '🕒' }
  }

  // Priority 2: Approved
  if (statuses.includes('approved')) {
    // Check for Full Day Approval (Style 4)
    // Condition: 'full' shift approved OR both 'morning' and 'afternoon' approved (heuristic for full day)
    const isFullDayApproved = shifts.includes('full') || (shifts.includes('morning') && shifts.includes('afternoon'))

    if (isFullDayApproved && statuses.every(s => s === 'approved')) {
      return { type: 'style4' }
    }
    // Partial Approval (Style 3)
    return { type: 'style3', stripColor: 'bg-green-500', iconColor: 'text-green-500', icon: '✓' }
  }

  // Priority 3: Rejected (Style 6 or 7)
  if (statuses.includes('rejected')) {
    // Check for Full Day Rejection (Style 7)
    const isFullDayRejected = shifts.includes('full') || (shifts.includes('morning') && shifts.includes('afternoon'))

    if (isFullDayRejected && statuses.every(s => s === 'rejected')) {
      return { type: 'style7' }
    }
    // Partial Rejection (Style 6)
    return { type: 'style6', stripColor: 'bg-red-500', iconColor: 'text-red-500', icon: '✕' }
  }

  // Default: No Leave Status
  return { type: 'none' }
}

function getCellClass(item: ScheduleItem) {
  const state = getLeaveDisplayState(item)
  const classes = []

  // Style 4: Full Day Approved (Green Bg)
  if (state.type === 'style4') {
    classes.push('bg-green-100 border-green-200 text-green-800')
  }
  // Style 7: Full Day Rejected (Red Bg)
  else if (state.type === 'style7') {
    classes.push('bg-red-100 border-red-200 text-red-800')
  }
  // Other Styles (Strip or None)
  else {
    // Today: Blue Bg Highlight (Style 8/Priority)
    // If it's today and NOT full day leave (which has its own bg), use blue bg
    if (item.isToday) {
      classes.push('bg-blue-50 border-blue-200 text-blue-600')
    }
    // Style 1: Has Shift, No Leave (or Partial Leave with Strip)
    else if (item.hasShift) {
      classes.push('bg-white border-blue-100 text-gray-800')
    }
    // Style 2: No Shift
    else {
      classes.push('bg-gray-50 border-gray-100 text-gray-400')
    }
  }

  // If Today and Full Day Leave (Style 4/7), add Blue Border to indicate Today
  if (item.isToday && (state.type === 'style4' || state.type === 'style7')) {
    classes.push('border-blue-500 border-2')
  }

  return classes.join(' ')
}

function handleDateClick(item: ScheduleItem) {
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  // 只能申请明天及以后的假期
  if (item.date <= todayStr) {
    toast.warning('只能申请明天及以后的假期')
    return
  }

  emit('select', item)
}

watch(() => props.refreshTrigger, () => {
  fetchSchedule()
})

onMounted(() => {
  fetchSchedule()
})
</script>

<style scoped>
/* Custom styles if needed, mostly using UnoCSS */
</style>
