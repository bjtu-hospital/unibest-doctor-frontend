<template>
  <wd-popup v-model="show" position="bottom" custom-style="max-height: 80vh; border-top-left-radius: 16px; border-top-right-radius: 16px;" @close="close">
    <view class="h-full flex flex-col">
      <view class="flex items-center justify-between border-b border-gray-100 p-4">
        <text class="text-lg font-bold">加号管理</text>
        <wd-icon name="close" size="20px" color="#9ca3af" @click="close" />
      </view>

      <wd-tabs v-model="activeTab">
        <wd-tab title="申请加号" name="apply">
          <view class="flex-1 overflow-y-auto p-4" style="height: 50vh;">
            <!-- Search -->
            <view class="mb-4 flex gap-2">
              <wd-search
                v-model="searchKeyword"
                placeholder="输入姓名/手机号搜索患者"
                hide-cancel
                class="flex-1"
                @search="handleSearch"
              />
              <wd-button size="small" @click="handleSearch">
                搜索
              </wd-button>
            </view>

            <!-- Search Results -->
            <view v-if="searchResults.length > 0" class="mb-4 max-h-40 overflow-y-auto border border-gray-100 rounded-lg">
              <view
                v-for="p in searchResults"
                :key="p.patient_id"
                class="flex items-center justify-between border-b border-gray-50 p-3 last:border-0 active:bg-blue-50"
                :class="selectedPatient?.patient_id === p.patient_id ? 'bg-blue-50' : ''"
                @click="selectedPatient = p"
              >
                <view>
                  <text class="mr-2 font-bold">{{ p.name }}</text>
                  <text class="text-xs text-gray-500">{{ p.gender }} | {{ p.age }}岁</text>
                </view>
                <wd-icon v-if="selectedPatient?.patient_id === p.patient_id" name="check" color="#2563eb" />
              </view>
            </view>
            <view v-else-if="hasSearched" class="mb-4 text-center text-sm text-gray-400">
              未找到相关患者
            </view>

            <!-- Options -->
            <view v-if="selectedPatient" class="space-y-4">
              <view>
                <text class="mb-2 block text-sm font-bold">号源类型</text>
                <view class="flex flex-wrap gap-2">
                  <view
                    v-for="type in slotTypes"
                    :key="type"
                    class="border rounded-lg px-3 py-1.5 text-sm transition-all"
                    :class="selectedSlotType === type ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-200'"
                    @click="selectedSlotType = type"
                  >
                    {{ type }}
                  </view>
                </view>
              </view>

              <view>
                <text class="mb-2 block text-sm font-bold">加号原因</text>
                <wd-textarea
                  v-model="reason"
                  placeholder="请输入加号原因"
                  :maxlength="100"
                  show-word-limit
                />
              </view>
            </view>
          </view>

          <view class="border-t border-gray-100 p-4">
            <wd-button
              block
              size="large"
              :disabled="!selectedPatient || !selectedSlotType"
              @click="handleSubmit"
            >
              提交申请
            </wd-button>
          </view>
        </wd-tab>

        <wd-tab title="申请记录" name="history">
          <view class="flex-1 overflow-y-auto p-4" style="height: 60vh;">
            <view v-if="loadingHistory" class="flex justify-center py-10">
              <wd-loading />
            </view>
            <view v-else-if="historyList.length === 0" class="py-10 text-center text-gray-400">
              暂无申请记录
            </view>
            <view v-else class="space-y-3">
              <view
                v-for="item in historyList"
                :key="item.audit_id"
                class="border border-gray-100 rounded-xl bg-white p-3 shadow-sm"
              >
                <view class="mb-2 flex items-start justify-between">
                  <view>
                    <view class="flex items-center gap-2">
                      <text class="text-gray-800 font-bold">申请加号</text>
                      <view
                        class="rounded px-2 py-0.5 text-xs"
                        :class="{
                          'bg-yellow-100 text-yellow-600': item.status === 'pending',
                          'bg-green-100 text-green-600': item.status === 'approved',
                          'bg-red-100 text-red-600': item.status === 'rejected',
                        }"
                      >
                        {{ getStatusText(item.status) }}
                      </view>
                    </view>
                    <text class="mt-1 text-xs text-gray-400">提交时间: {{ item.submit_time.replace('T', ' ') }}</text>
                  </view>
                  <wd-button
                    v-if="item.status === 'pending'"
                    size="small"
                    type="error"
                    plain
                    @click="handleCancel(item.audit_id)"
                  >
                    取消
                  </wd-button>
                </view>

                <view class="rounded-lg bg-gray-50 p-2 text-sm text-gray-600 space-y-1">
                  <view class="flex justify-between">
                    <text class="text-gray-400">患者ID:</text>
                    <text>{{ item.patient_id }}</text>
                  </view>
                  <view class="flex justify-between">
                    <text class="text-gray-400">号源类型:</text>
                    <text>{{ item.slot_type }}</text>
                  </view>
                  <view class="flex justify-between">
                    <text class="text-gray-400">原因:</text>
                    <text>{{ item.reason || '无' }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </wd-tab>
      </wd-tabs>
    </view>
  </wd-popup>
</template>

<script setup lang="ts">
import type { AddSlotAudit, SearchPatientResult } from '@/api/types/doctor'
import { computed, ref, watch } from 'vue'
import { useToast } from 'wot-design-uni'
import { cancelAddSlotAudit, getAddSlotAudits, searchPatientsExact } from '@/api/doctor'

const props = defineProps<{
  visible: boolean
  scheduleId: string | number
  slotTypes?: string[]
}>()

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
  (e: 'submit', data: { patientId: string, slotType: string, reason: string }): void
}>()

const toast = useToast()
const activeTab = ref('apply')

const show = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  },
})

function close() {
  emit('update:visible', false)
}

// Apply Tab Logic
const searchKeyword = ref('')
const searchResults = ref<SearchPatientResult['patients']>([])
const hasSearched = ref(false)
const selectedPatient = ref<SearchPatientResult['patients'][0] | null>(null)
const selectedSlotType = ref('')
const reason = ref('')

// History Tab Logic
const historyList = ref<AddSlotAudit[]>([])
const loadingHistory = ref(false)

watch(() => props.visible, (val) => {
  if (val) {
    // Reset Apply Tab
    searchKeyword.value = ''
    searchResults.value = []
    hasSearched.value = false
    selectedPatient.value = null
    reason.value = ''
    if (props.slotTypes && props.slotTypes.length > 0) {
      selectedSlotType.value = props.slotTypes[0]
    }

    // Fetch History
    fetchHistory()
  }
})

watch(activeTab, (val) => {
  if (val === 'history') {
    fetchHistory()
  }
})

async function handleSearch() {
  if (!searchKeyword.value)
    return
  try {
    const res = await searchPatientsExact(searchKeyword.value)
    searchResults.value = res.patients
    hasSearched.value = true
  }
  catch (e) {
    console.error(e)
    toast.error('搜索失败')
  }
}

function handleSubmit() {
  if (!selectedPatient.value || !selectedSlotType.value)
    return
  if (reason.value.length < 10) {
    toast.warning('加号原因至少需要10个字')
    return
  }
  emit('submit', {
    patientId: selectedPatient.value.patient_id,
    slotType: selectedSlotType.value,
    reason: reason.value,
  })
  // Don't close immediately, maybe wait for parent to succeed?
  // But parent closes it.
  close()
}

async function fetchHistory() {
  loadingHistory.value = true
  try {
    const res = await getAddSlotAudits()
    historyList.value = res.audits
  }
  catch (e) {
    console.error(e)
    toast.error('获取记录失败')
  }
  finally {
    loadingHistory.value = false
  }
}

async function handleCancel(auditId: number) {
  try {
    uni.showModal({
      title: '提示',
      content: '确定要取消该申请吗？',
      success: async (res) => {
        if (res.confirm) {
          toast.loading('取消中...')
          await cancelAddSlotAudit(auditId)
          toast.success('已取消')
          fetchHistory()
        }
      },
    })
  }
  catch (e) {
    console.error(e)
    toast.error('取消失败')
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'pending': return '待审核'
    case 'approved': return '已通过'
    case 'rejected': return '已拒绝'
    default: return status
  }
}
</script>
