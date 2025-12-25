<template>
  <wd-popup
    v-model="visible"
    position="right"
    custom-style="width: 80%; height: 100%; background-color: #f5f5f5;"
    @close="handleClose"
  >
    <div class="h-full flex flex-col">
      <!-- Status Bar Placeholder -->
      <div class="h-[var(--status-bar-height)] bg-white" />

      <!-- Header -->
      <div class="z-10 flex items-center bg-white px-4 py-3 shadow-sm">
        <div class="flex-1 text-lg font-bold">
          请假记录
        </div>
        <div class="text-gray-500" @click="handleClose">
          ✕
        </div>
      </div>

      <!-- Tabs -->
      <div class="mt-1 flex justify-around border-b border-gray-100 bg-white py-2 text-sm">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          class="rounded-full px-4 py-1 transition-colors"
          :class="currentTab === tab.key ? 'bg-blue-100 text-blue-600 font-bold' : 'text-gray-500'"
          @click="currentTab = tab.key"
        >
          {{ tab.label }}
        </div>
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <div
          v-for="item in filteredHistory"
          :key="item.id"
          class="border-l-4 rounded-lg bg-white p-4 shadow-sm"
          :class="getStatusBorderClass(item.status)"
        >
          <div class="mb-2 flex items-start justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg font-bold">{{ item.status === 'pending' ? '🟡' : (item.status === 'approved' ? '🟢' : '🔴') }}</span>
              <span class="text-gray-800 font-bold">{{ getStatusText(item.status) }}</span>
            </div>
            <span class="text-xs text-gray-400">{{ item.createTime }}</span>
          </div>

          <div class="mb-1 text-sm text-gray-700">
            <span class="font-bold">{{ item.date }}</span>
            <span class="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs">{{ getShiftText(item.shift) }}</span>
          </div>

          <div class="line-clamp-2 mb-2 text-sm text-gray-500">
            原因：{{ item.reason }}
          </div>

          <div v-if="item.status === 'approved'" class="rounded bg-green-50 p-2 text-xs text-green-600">
            审批人：{{ item.approver }}
          </div>
          <div v-if="item.status === 'rejected'" class="rounded bg-red-50 p-2 text-xs text-red-600">
            驳回理由：{{ item.rejectReason }}
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredHistory.length === 0" class="flex flex-col items-center justify-center py-10 text-gray-400">
          <div class="mb-2 text-4xl">
            📭
          </div>
          <div class="text-sm">
            暂无记录
          </div>
        </div>
      </div>
    </div>
  </wd-popup>
</template>

<script setup lang="ts">
import type { LeaveRecord, LeaveStatus, ShiftType } from '@/types/leave'
import { computed, ref, watch } from 'vue'
import { getLeaveHistory } from '@/service/leave'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const visible = ref(false)
const currentTab = ref<string>('all')
const history = ref<LeaveRecord[]>([])

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待审批' },
  { key: 'approved', label: '已通过' },
  { key: 'rejected', label: '已拒绝' },
]

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    fetchHistory()
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

async function fetchHistory() {
  history.value = await getLeaveHistory()
}

const filteredHistory = computed(() => {
  if (currentTab.value === 'all')
    return history.value
  return history.value.filter(item => item.status === currentTab.value)
})

function getStatusBorderClass(status: LeaveStatus) {
  switch (status) {
    case 'approved': return 'border-green-500'
    case 'pending': return 'border-yellow-500'
    case 'rejected': return 'border-red-500'
    default: return 'border-gray-200'
  }
}

function getStatusText(status: LeaveStatus) {
  switch (status) {
    case 'approved': return '已通过'
    case 'pending': return '审批中'
    case 'rejected': return '已拒绝'
    default: return status
  }
}

function getShiftText(shift: ShiftType) {
  const map: Record<string, string> = {
    full: '全天',
    morning: '上午',
    afternoon: '下午',
    night: '晚间',
  }
  return map[shift] || shift
}

function handleClose() {
  visible.value = false
}
</script>

<style scoped>
</style>
