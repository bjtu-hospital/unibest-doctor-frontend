<template>
  <wd-popup v-model="visible" position="center" custom-style="width: 85%; border-radius: 12px; overflow: hidden;">
    <div class="flex flex-col items-center bg-white p-6">
      <div class="mb-6 flex items-center gap-2 text-xl text-green-600 font-bold">
        <div class="i-carbon-checkmark-filled" /> 确认通过
      </div>

      <div class="mb-6 w-full rounded-lg bg-gray-50 p-4 text-sm space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-500">申请人</span>
          <span class="font-bold">{{ detail?.doctor.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">请假日期</span>
          <span class="font-bold">{{ detail?.leaveDate }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">班次</span>
          <span class="font-bold">{{ getShiftLabel(detail?.shift) }}</span>
        </div>
      </div>

      <div class="mb-6 w-full">
        <div class="mb-2 text-sm text-gray-700 font-bold">
          备注（选填）
        </div>
        <textarea
          v-model="remark"
          class="h-20 w-full resize-none border border-gray-200 rounded-lg bg-white p-3 text-sm outline-none focus:border-blue-500"
          placeholder="可添加审批备注..."
        />
      </div>

      <div class="mb-6 flex items-center gap-1 text-xs text-gray-400">
        <div class="i-carbon-warning text-yellow-500" /> 通过后将自动通知申请人
      </div>

      <div class="w-full flex gap-4">
        <button class="flex-1 border border-gray-300 rounded-full py-2.5 text-sm text-gray-600 font-bold" @click="handleClose">
          取消
        </button>
        <button class="flex-1 rounded-full bg-green-500 py-2.5 text-sm text-white font-bold" @click="handleConfirm">
          确认通过
        </button>
      </div>
    </div>
  </wd-popup>
</template>

<script setup lang="ts">
import type { LeaveApplicationDetail } from '@/types/approval'
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  detail?: LeaveApplicationDetail
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', remark: string): void
}>()

const visible = ref(false)
const remark = ref('')

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val)
    remark.value = ''
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

function handleClose() {
  visible.value = false
}

function handleConfirm() {
  emit('confirm', remark.value)
  visible.value = false
}

function getShiftLabel(shift?: string) {
  const map: Record<string, string> = {
    full: '全天',
    morning: '上午',
    afternoon: '下午',
  }
  return shift ? (map[shift] || shift) : ''
}
</script>
