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
        class="relative h-20 flex flex-col items-center justify-center border rounded-lg transition-all"
        :class="getCellClass(item)"
        @click="handleDateClick(item)"
      >
        <span class="text-lg font-bold">{{ item.day }}</span>
        <span v-if="item.shiftInfo" class="mt-1 scale-90 text-xs">{{ item.shiftInfo }}</span>

        <!-- Status Icons/Indicators -->
        <div v-if="item.leaveStatus" class="absolute bottom-0 left-0 top-0 w-1 rounded-l-lg" :class="getStatusColor(item.leaveStatus)" />
        <div v-if="item.leaveStatus === 'approved'" class="absolute right-1 top-1 text-xs text-green-500">
          ✓
        </div>
        <div v-if="item.leaveStatus === 'pending'" class="absolute right-1 top-1 text-xs text-yellow-500">
          🕒
        </div>
        <div v-if="item.leaveStatus === 'rejected'" class="absolute right-1 top-1 text-xs text-red-500">
          ✕
        </div>
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

function getCellClass(item: ScheduleItem) {
  const classes = []

  if (item.isToday) {
    classes.push('bg-blue-50 border-blue-200')
  }
  else if (item.hasShift) {
    classes.push('bg-white border-blue-100 text-gray-800')
  }
  else {
    classes.push('bg-gray-50 border-gray-100 text-gray-400 pointer-events-none')
  }

  return classes.join(' ')
}

function getStatusColor(status: LeaveStatus) {
  switch (status) {
    case 'approved': return 'bg-green-500'
    case 'pending': return 'bg-yellow-500'
    case 'rejected': return 'bg-red-500'
    default: return ''
  }
}

function handleDateClick(item: ScheduleItem) {
  if (!item.hasShift)
    return

  const targetDate = new Date(item.date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 只能申请明天及以后的假期
  if (targetDate <= today) {
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
