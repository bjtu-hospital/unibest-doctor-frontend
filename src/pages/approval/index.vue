<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navbar -->
    <wd-navbar title="请假审批" placeholder safe-area-inset-top left-arrow fixed @click-left="handleBack" />

    <!-- Stats Cards -->
    <div class="grid grid-cols-3 gap-3 p-4">
      <div class="flex flex-col items-center rounded-lg bg-white p-3 shadow-sm">
        <div class="mb-1 text-xs text-gray-500">
          待审批
        </div>
        <div class="text-xl text-blue-600 font-bold">
          {{ stats.pending }}
        </div>
      </div>
      <div class="flex flex-col items-center rounded-lg bg-white p-3 shadow-sm">
        <div class="mb-1 text-xs text-gray-500">
          本月已审批
        </div>
        <div class="text-xl text-green-600 font-bold">
          {{ stats.approvedMonth }}
        </div>
      </div>
      <div class="flex flex-col items-center rounded-lg bg-white p-3 shadow-sm">
        <div class="mb-1 text-xs text-gray-500">
          本月拒绝
        </div>
        <div class="text-xl text-red-500 font-bold">
          {{ stats.rejectedMonth }}
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="sticky top-[var(--window-top)] z-10 bg-white shadow-sm">
      <wd-tabs v-model="currentTab" @change="handleTabChange">
        <wd-tab title="待审批" name="pending" />
        <wd-tab title="已通过" name="approved" />
        <wd-tab title="已拒绝" name="rejected" />
        <wd-tab title="全部" name="all" />
      </wd-tabs>
    </div>

    <!-- List -->
    <div class="flex-1 p-4 space-y-3">
      <div
        v-for="item in list"
        :key="item.id"
        class="rounded-lg bg-white p-4 shadow-sm transition-transform active:scale-[0.99]"
        @click="openDetail(item)"
      >
        <div class="mb-2 flex items-start justify-between">
          <div class="flex items-center gap-2">
            <div class="text-lg text-gray-800 font-bold">
              {{ item.doctor.name }}
            </div>
            <div class="text-xs text-gray-500">
              {{ item.doctor.dept }}
            </div>
            <div v-if="isUrgent(item)" class="animate-pulse rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-600 font-bold">
              紧急
            </div>
          </div>
          <div class="text-xs text-gray-400">
            {{ formatTimeAgo(item.applyTime) }}
          </div>
        </div>

        <div class="mb-1 text-sm text-gray-700">
          <span class="text-gray-500">请假日期：</span>
          <span class="font-bold">{{ item.leaveDate }}</span>
          <span class="ml-2 rounded bg-gray-100 px-1.5 text-xs">{{ getShiftLabel(item.shift) }}</span>
        </div>

        <div class="line-clamp-1 mb-3 text-sm text-gray-500">
          原因：{{ item.reason }}
        </div>

        <div class="flex items-center justify-between border-t border-gray-50 pt-2">
          <div class="flex items-center gap-1">
            <div class="h-2 w-2 rounded-full" :class="getStatusColor(item.status)" />
            <span class="text-xs" :class="getStatusTextColor(item.status)">{{ getStatusText(item.status) }}</span>
          </div>
          <div class="text-xs text-blue-500 font-bold">
            查看详情 >
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="list.length === 0" class="flex flex-col items-center justify-center py-20 text-gray-400">
        <div class="i-carbon-document-blank mb-2 text-6xl text-gray-300" />
        <div class="text-sm">
          暂无相关申请
        </div>
      </div>
    </div>

    <!-- Components -->
    <ApprovalDrawer
      v-model="showDrawer"
      :detail="selectedItem"
      @approve="showApproveDialog = true"
      @reject="showRejectDialog = true"
    />

    <ApproveDialog
      v-model="showApproveDialog"
      :detail="selectedItem"
      @confirm="handleApproveConfirm"
    />

    <RejectDialog
      v-model="showRejectDialog"
      :detail="selectedItem"
      @confirm="handleRejectConfirm"
    />

    <wd-toast />
  </div>
</template>

<script setup lang="ts">
import type { ApprovalStats, ApprovalStatus, LeaveApplicationDetail } from '@/types/approval'
import { onMounted, ref } from 'vue'
import { useToast } from 'wot-design-uni'
import { approveApplication, getApprovalList, getApprovalStats, rejectApplication } from '@/service/approval'
import ApprovalDrawer from './components/ApprovalDrawer.vue'
import ApproveDialog from './components/ApproveDialog.vue'
import RejectDialog from './components/RejectDialog.vue'

definePage({
  style: {
    navigationBarTitleText: '请假审批',
    navigationStyle: 'custom',
  },
})

const toast = useToast()
const currentTab = ref<string>('pending')
const list = ref<LeaveApplicationDetail[]>([])
const stats = ref<ApprovalStats>({ pending: 0, approvedMonth: 0, rejectedMonth: 0 })

const showDrawer = ref(false)
const showApproveDialog = ref(false)
const showRejectDialog = ref(false)
const selectedItem = ref<LeaveApplicationDetail>()

async function fetchData() {
  uni.showLoading({ title: '加载中' })
  const status = currentTab.value === 'all' ? 'all' : (currentTab.value as ApprovalStatus)
  list.value = await getApprovalList(status)
  stats.value = await getApprovalStats()
  uni.hideLoading()
}

function handleTabChange({ name }: { name: string }) {
  currentTab.value = name
  fetchData()
}

function openDetail(item: LeaveApplicationDetail) {
  selectedItem.value = item
  showDrawer.value = true
}

async function handleApproveConfirm(remark: string) {
  if (!selectedItem.value)
    return

  const success = await approveApplication(selectedItem.value.id, remark)
  if (success) {
    toast.success('审批通过')
    showDrawer.value = false
    fetchData()
  }
}

async function handleRejectConfirm(reason: string) {
  if (!selectedItem.value)
    return

  const success = await rejectApplication(selectedItem.value.id, reason)
  if (success) {
    toast.success('已驳回申请')
    showDrawer.value = false
    fetchData()
  }
}

function handleBack() {
  uni.navigateBack()
}

// Helpers
function isUrgent(item: LeaveApplicationDetail) {
  if (item.status !== 'pending')
    return false
  const leaveDate = new Date(item.leaveDate).getTime()
  const applyDate = new Date(item.applyTime).getTime()
  const diffDays = Math.ceil((leaveDate - applyDate) / (1000 * 60 * 60 * 24))
  return diffDays <= 1
}

function formatTimeAgo(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)

  if (diffMins < 60)
    return `${diffMins}分钟前`
  if (diffHours < 24)
    return `${diffHours}小时前`
  return `${Math.floor(diffHours / 24)}天前`
}

function getShiftLabel(shift: string) {
  const map: Record<string, string> = { full: '全天', morning: '上午', afternoon: '下午', evening: '晚间' }
  return map[shift] || shift
}

function getStatusColor(status: ApprovalStatus) {
  switch (status) {
    case 'approved': return 'bg-green-500'
    case 'rejected': return 'bg-red-500'
    default: return 'bg-yellow-500'
  }
}

function getStatusTextColor(status: ApprovalStatus) {
  switch (status) {
    case 'approved': return 'text-green-600'
    case 'rejected': return 'text-red-600'
    default: return 'text-yellow-600'
  }
}

function getStatusText(status: ApprovalStatus) {
  switch (status) {
    case 'approved': return '已通过'
    case 'rejected': return '已拒绝'
    default: return '待审批'
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
</style>
