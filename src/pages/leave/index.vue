<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navbar -->
    <wd-navbar title="请假管理" placeholder safe-area-inset-top left-arrow fixed @click-left="handleBack">
      <template #right>
        <div class="flex items-center gap-1 text-gray-600" @click="showHistory = true">
          <span class="text-lg">🕒</span>
          <span class="text-sm">记录</span>
        </div>
      </template>
    </wd-navbar>

    <!-- Main Content -->
    <div class="flex flex-1 flex-col gap-4 p-4">
      <!-- Calendar -->
      <LeaveCalendar
        :refresh-trigger="refreshTrigger"
        @select="handleDateSelect"
      />

      <!-- Bottom Info Card -->
      <div class="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
        <div class="flex flex-1 flex-col items-center border-r border-gray-100">
          <span class="text-xs text-gray-400">本月排班</span>
          <span class="text-xl text-blue-600 font-bold">12<span class="ml-1 text-xs text-gray-400 font-normal">天</span></span>
        </div>
        <div class="flex flex-1 flex-col items-center">
          <span class="text-xs text-gray-400">已请假</span>
          <span class="text-xl text-orange-500 font-bold">2<span class="ml-1 text-xs text-gray-400 font-normal">天</span></span>
        </div>
      </div>
    </div>

    <!-- Drawers -->
    <LeaveApplyDrawer
      v-model="showApply"
      :selected-date="selectedDate"
      @submitted="handleSubmitted"
    />

    <LeaveHistoryDrawer
      v-model="showHistory"
    />

    <wd-toast />
  </div>
</template>

<script setup lang="ts">
import type { ScheduleItem } from '@/types/leave'
import { ref } from 'vue'
import LeaveApplyDrawer from './components/LeaveApplyDrawer.vue'
import LeaveCalendar from './components/LeaveCalendar.vue'
import LeaveHistoryDrawer from './components/LeaveHistoryDrawer.vue'

definePage({
  style: {
    navigationBarTitleText: '请假管理',
    navigationStyle: 'custom',
  },
})

const showApply = ref(false)
const showHistory = ref(false)
const selectedDate = ref<ScheduleItem>()
const refreshTrigger = ref(0)

function handleDateSelect(item: ScheduleItem) {
  selectedDate.value = item
  showApply.value = true
}

function handleSubmitted() {
  refreshTrigger.value++ // Refresh calendar
}

function handleBack() {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style scoped>
</style>
