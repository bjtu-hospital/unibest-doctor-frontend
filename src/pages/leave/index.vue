<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navbar -->
    <wd-navbar title="请假管理" placeholder safe-area-inset-top left-arrow fixed @click-left="handleBack" />

    <!-- Main Content -->
    <div class="flex flex-1 flex-col gap-4 p-4">
      <!-- Calendar -->
      <LeaveCalendar
        :refresh-trigger="refreshTrigger"
        @select="handleDateSelect"
      />

      <!-- History Button -->
      <div
        class="flex items-center justify-center rounded-lg bg-white p-4 shadow-sm active:scale-[0.98]"
        @click="showHistory = true"
      >
        <div class="i-carbon-time mr-2 text-lg text-blue-500" />
        <span class="text-sm text-gray-600 font-bold">查看历史请假记录</span>
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
