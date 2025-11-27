<template>
  <wd-popup v-model="show" position="bottom" custom-style="max-height: 80vh; border-top-left-radius: 16px; border-top-right-radius: 16px;" @close="close">
    <view class="h-full flex flex-col">
      <view class="flex items-center justify-between border-b border-gray-100 p-4">
        <text class="text-lg font-bold">申请加号</text>
        <wd-icon name="close" size="20px" color="#9ca3af" @click="close" />
      </view>

      <view class="flex-1 overflow-y-auto p-4">
        <!-- Search -->
        <view class="mb-4 flex gap-2">
          <wd-search
            v-model="searchKeyword"
            placeholder="输入姓名搜索患者"
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
            <text class="mb-2 block text-sm font-bold">加号位置</text>
            <view class="flex gap-2">
              <wd-button
                :type="priority === 1 ? 'primary' : 'info'"
                :plain="priority !== 1"
                size="small"
                class="flex-1"
                @click="priority = 1"
              >
                队尾 (普通)
              </wd-button>
              <wd-button
                :type="priority === 0 ? 'primary' : 'info'"
                :plain="priority !== 0"
                size="small"
                class="flex-1"
                @click="priority = 0"
              >
                下一位 (优先)
              </wd-button>
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
          :disabled="!selectedPatient"
          @click="handleSubmit"
        >
          确认加号
        </wd-button>
      </view>
    </view>
  </wd-popup>
</template>

<script setup lang="ts">
import type { SearchPatientResult } from '@/api/types/doctor'
import { computed, ref, watch } from 'vue'
import { searchPatientsExact } from '@/api/doctor'

const props = defineProps<{
  visible: boolean
  scheduleId: string | number
}>()

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
  (e: 'submit', data: { patientId: string, priority: number, reason: string }): void
}>()

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

const searchKeyword = ref('')
const searchResults = ref<SearchPatientResult['patients']>([])
const hasSearched = ref(false)
const selectedPatient = ref<SearchPatientResult['patients'][0] | null>(null)
const priority = ref(1)
const reason = ref('')

watch(() => props.visible, (val) => {
  if (val) {
    // Reset
    searchKeyword.value = ''
    searchResults.value = []
    hasSearched.value = false
    selectedPatient.value = null
    priority.value = 1
    reason.value = ''
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
    uni.showToast({ title: '搜索失败', icon: 'none' })
  }
}

function handleSubmit() {
  if (!selectedPatient.value)
    return
  emit('submit', {
    patientId: selectedPatient.value.patient_id,
    priority: priority.value,
    reason: reason.value,
  })
  close()
}
</script>
