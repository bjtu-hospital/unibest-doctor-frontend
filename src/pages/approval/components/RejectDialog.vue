<template>
  <wd-popup v-model="visible" position="center" custom-style="width: 85%; border-radius: 12px; overflow: hidden;">
    <div class="flex flex-col items-center bg-white p-6">
      <div class="mb-6 flex items-center gap-2 text-xl text-red-500 font-bold">
        <div class="i-carbon-close-filled" /> 驳回申请
      </div>

      <div class="mb-4 w-full text-center text-sm text-gray-600">
        将驳回 <span class="text-gray-800 font-bold">{{ detail?.doctor.name }}</span> 的请假申请
      </div>

      <div class="mb-4 w-full">
        <div class="mb-2 text-sm text-gray-700 font-bold">
          驳回理由 <span class="text-red-500">*</span>
        </div>
        <div class="relative">
          <textarea
            v-model="reason"
            class="h-24 w-full resize-none border border-gray-200 rounded-lg bg-white p-3 text-sm outline-none focus:border-red-500"
            placeholder="请详细说明驳回原因..."
            :maxlength="200"
          />
          <div class="absolute bottom-2 right-2 text-xs text-gray-400">
            {{ reason.length }}/200
          </div>
        </div>
      </div>

      <!-- Quick Reasons -->
      <div class="mb-6 w-full">
        <div class="mb-2 flex items-center gap-1 text-xs text-gray-400">
          <div class="i-carbon-idea text-yellow-500" /> 常用理由快捷选择：
        </div>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="item in quickReasons"
            :key="item"
            class="cursor-pointer rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 active:bg-gray-200"
            @click="reason = item"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="w-full flex gap-4">
        <button class="flex-1 border border-gray-300 rounded-full py-2.5 text-sm text-gray-600 font-bold" @click="handleClose">
          取消
        </button>
        <button class="flex-1 rounded-full bg-red-500 py-2.5 text-sm text-white font-bold" @click="handleConfirm">
          确认驳回
        </button>
      </div>
    </div>
  </wd-popup>
</template>

<script setup lang="ts">
import type { LeaveApplicationDetail } from '@/types/approval'
import { ref, watch } from 'vue'
import { useToast } from 'wot-design-uni'

const props = defineProps<{
  modelValue: boolean
  detail?: LeaveApplicationDetail
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', reason: string): void
}>()

const toast = useToast()
const visible = ref(false)
const reason = ref('')

const quickReasons = [
  '当日排班紧张',
  '需补充证明材料',
  '日期冲突',
  '科室人员安排紧张',
]

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val)
    reason.value = ''
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

function handleClose() {
  visible.value = false
}

function handleConfirm() {
  if (!reason.value.trim()) {
    toast.warning('请填写驳回理由')
    return
  }
  emit('confirm', reason.value)
  visible.value = false
}
</script>
