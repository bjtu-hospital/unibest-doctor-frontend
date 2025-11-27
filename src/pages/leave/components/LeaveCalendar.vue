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

        <!-- Full Day Leave Display -->
        <template v-if="item.leaveStatus">
          <span class="mt-1 text-xs font-bold">全天请假</span>
          <!-- Status Icon for Full Day -->
          <div v-if="item.leaveStatus === 'approved'" class="absolute right-1 top-1 text-xs font-bold">
            ✓
          </div>
          <div v-if="item.leaveStatus === 'pending'" class="absolute right-1 top-1 text-xs">
            🕒
          </div>
          <div v-if="item.leaveStatus === 'rejected'" class="absolute right-1 top-1 text-xs font-bold">
            ✕
          </div>
        </template>

        <!-- Partial Day / Normal Display -->
        <template v-else>
          <span v-if="item.shiftInfo" class="mt-1 scale-90 text-xs">{{ item.shiftInfo }}</span>

          <!-- Calculated Partial Status -->
          <template v-if="getPartialLeaveStatus(item)">
            <!-- Approved -->
            <div v-if="getPartialLeaveStatus(item) === 'approved'" class="absolute bottom-0 left-0 top-0 w-1 bg-green-500" />
            <div v-if="getPartialLeaveStatus(item) === 'approved'" class="absolute right-1 top-1 text-xs text-green-500 font-bold">
              ✓
            </div>

            <!-- Pending -->
            <div v-if="getPartialLeaveStatus(item) === 'pending'" class="absolute bottom-0 left-0 top-0 w-1 bg-yellow-500" />
            <div v-if="getPartialLeaveStatus(item) === 'pending'" class="absolute right-1 top-1 text-xs text-yellow-500">
              🕒
            </div>

            <!-- Rejected -->
            <div v-if="getPartialLeaveStatus(item) === 'rejected'" class="absolute bottom-0 left-0 top-0 w-1 bg-red-500" />
            <div v-if="getPartialLeaveStatus(item) === 'rejected'" class="absolute right-1 top-1 text-xs text-red-500 font-bold">
              ✕
            </div>
          </template>
        </template>
      </div>
    </div>
    <wd-toast />
  </div>
</template>

<script setup lang="ts">
import type { LeaveStatus, ScheduleItem } from '@/types/leave'
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
  // Adjust so Monday is 0, Sunday is 6. Native getDay(): Sun=0, Mon=1...
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

function getPartialLeaveStatus(item: ScheduleItem): LeaveStatus | null {
  if (!item.shiftLeaveStatuses || item.shiftLeaveStatuses.length === 0)
    return null

  const statuses = item.shiftLeaveStatuses.map(s => s.leaveStatus)

  if (statuses.includes('pending'))
    return 'pending'
  if (statuses.includes('approved'))
    return 'approved'
  if (statuses.includes('rejected'))
    return 'rejected'

  return null
}

function getCellClass(item: ScheduleItem) {
  const classes = []

  // 1. 全天请假 (Full Day Leave) - 优先级最高，覆盖背景
  if (item.leaveStatus) {
    if (item.leaveStatus === 'approved') {
      classes.push('bg-green-100 border-green-200 text-green-800')
    }
    else if (item.leaveStatus === 'pending') {
      classes.push('bg-yellow-100 border-yellow-200 text-yellow-800')
    }
    else if (item.leaveStatus === 'rejected') {
      classes.push('bg-red-100 border-red-200 text-red-800')
    }
    return classes.join(' ')
  }

  // 2. 今天：蓝色背景高亮
  if (item.isToday) {
    classes.push('bg-blue-50 border-blue-200 text-blue-600')
  }
  // 3. 有排班未请假 (或分段请假)：白色背景 + 蓝色边框
  else if (item.hasShift) {
    classes.push('bg-white border-blue-100 text-gray-800')
  }
  // 4. 无排班：灰色背景 + 灰色文字
  else {
    classes.push('bg-gray-50 border-gray-100 text-gray-400')
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
