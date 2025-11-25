<template>
  <wd-popup
    v-model="visible"
    position="bottom"
    custom-style="height: 70%; border-radius: 16px 16px 0 0; overflow: hidden; display: flex; flex-direction: column;"
    @close="handleClose"
  >
    <!-- Drag Indicator -->
    <div class="h-6 w-full flex items-center justify-center bg-white" @click="handleClose">
      <div class="h-1 w-10 rounded-full bg-gray-300" />
    </div>

    <div class="flex-1 overflow-y-auto bg-white p-4">
      <div class="mb-4 text-lg font-bold">
        📅 请假申请
      </div>

      <!-- Info Card -->
      <div class="mb-6 rounded-lg bg-blue-50 p-3">
        <div class="mb-1 text-sm text-gray-700">
          选中日期：{{ formatDate(selectedDate?.date) }}
        </div>
        <div class="text-sm text-gray-700">
          排班信息：{{ selectedDate?.shiftInfo || '无排班' }}
        </div>
      </div>

      <!-- Shift Selection -->
      <div class="mb-6">
        <div class="mb-2 text-sm font-bold">
          请假班次 <span class="text-red-500">*</span>
        </div>
        <div class="flex gap-3">
          <div
            v-for="option in shiftOptions"
            :key="option.value"
            class="border rounded-lg px-4 py-2 text-sm transition-colors"
            :class="form.shift === option.value ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-200'"
            @click="form.shift = option.value"
          >
            {{ option.label }}
          </div>
        </div>
      </div>

      <!-- Reason Input -->
      <div class="mb-6">
        <div class="mb-2 text-sm font-bold">
          请假原因 <span class="text-red-500">*</span>
        </div>
        <div class="relative">
          <textarea
            v-model="form.reason"
            class="h-32 w-full resize-none border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-blue-500"
            placeholder="请详细说明请假原因..."
            :maxlength="200"
          />
          <div class="absolute bottom-2 right-2 text-xs text-gray-400">
            {{ form.reason.length }}/200字
          </div>
        </div>
      </div>

      <!-- Attachments -->
      <div class="mb-6">
        <div class="mb-2 text-sm font-bold">
          证明材料（选填）
        </div>
        <div class="flex gap-3">
          <div
            v-for="(img, index) in form.attachments"
            :key="index"
            class="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100"
          >
            <img :src="img" class="h-full w-full object-cover">
            <div class="absolute right-0 top-0 h-5 w-5 flex items-center justify-center rounded-bl-lg bg-black/50 text-white" @click="removeAttachment(index)">
              ×
            </div>
          </div>
          <div
            v-if="form.attachments.length < 3"
            class="h-20 w-20 flex flex-col items-center justify-center border border-gray-300 rounded-lg border-dashed bg-gray-50 text-gray-400"
            @click="addAttachment"
          >
            <span class="text-2xl">+</span>
            <span class="text-xs">图片</span>
          </div>
        </div>
        <div class="mt-1 text-xs text-gray-400">
          最多上传3张
        </div>
      </div>
    </div>

    <!-- Footer Buttons -->
    <div class="flex gap-4 border-t border-gray-100 bg-white p-4">
      <button class="flex-1 rounded-full bg-gray-100 py-3 text-sm text-gray-600 font-bold" @click="handleClose">
        取消
      </button>
      <button class="flex-1 rounded-full bg-blue-500 py-3 text-sm text-white font-bold" @click="handleSubmitClick">
        提交申请
      </button>
    </div>

    <!-- Confirm Dialog (Custom implementation for control) -->
    <wd-popup v-model="showConfirm" position="center" custom-style="width: 80%; border-radius: 12px; overflow: hidden;">
      <div class="flex flex-col items-center bg-white p-6">
        <div class="mb-4 text-lg font-bold">
          📋 确认提交
        </div>
        <div class="mb-6 w-full text-sm text-gray-600 space-y-2">
          <div class="flex">
            <span class="w-20 text-gray-400">请假日期：</span><span>{{ formatDate(selectedDate?.date) }}</span>
          </div>
          <div class="flex">
            <span class="w-20 text-gray-400">请假班次：</span><span>{{ getShiftLabel(form.shift) }}</span>
          </div>
          <div class="flex">
            <span class="w-20 text-gray-400">请假原因：</span><span class="flex-1 truncate">{{ form.reason }}</span>
          </div>
          <div class="mt-4 text-center text-xs text-gray-400">
            提交后将通知科室主任审批
          </div>
        </div>
        <div class="w-full flex gap-4">
          <button class="flex-1 border border-gray-300 rounded-full py-2 text-sm text-gray-600" @click="showConfirm = false">
            再想想
          </button>
          <button class="flex-1 rounded-full bg-blue-500 py-2 text-sm text-white" @click="confirmSubmit">
            确认提交
          </button>
        </div>
      </div>
    </wd-popup>
  </wd-popup>
</template>

<script setup lang="ts">
import type { ScheduleItem, ShiftType } from '@/types/leave'
import { computed, ref, watch } from 'vue'
import { useToast } from 'wot-design-uni'
import { submitLeaveApplication } from '@/service/leave'

const props = defineProps<{
  modelValue: boolean
  selectedDate?: ScheduleItem
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submitted'): void
}>()

const toast = useToast()
const visible = ref(false)
const showConfirm = ref(false)

const form = ref({
  shift: 'full' as ShiftType,
  reason: '',
  attachments: [] as string[],
})

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    // Reset form
    form.value = {
      shift: 'full',
      reason: '',
      attachments: [],
    }
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const shiftOptions = computed(() => {
  const options: { label: string, value: ShiftType }[] = [{ label: '全天', value: 'full' }]

  if (props.selectedDate?.shiftInfo?.includes('上午')) {
    options.push({ label: '上午', value: 'morning' })
  }
  if (props.selectedDate?.shiftInfo?.includes('下午')) {
    options.push({ label: '下午', value: 'afternoon' })
  }

  // Fallback if no specific info parsed, or just show all for demo
  if (options.length === 1) {
    options.push({ label: '上午', value: 'morning' })
    options.push({ label: '下午', value: 'afternoon' })
  }

  return options
})

function formatDate(dateStr?: string) {
  if (!dateStr)
    return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

function getShiftLabel(val: ShiftType) {
  return shiftOptions.value.find(o => o.value === val)?.label || val
}

function handleClose() {
  visible.value = false
}

function addAttachment() {
  // Mock upload
  uni.chooseImage({
    count: 1,
    success: (res) => {
      form.value.attachments.push(res.tempFilePaths[0])
    },
  })
}

function removeAttachment(index: number) {
  form.value.attachments.splice(index, 1)
}

function handleSubmitClick() {
  if (!form.value.reason.trim()) {
    toast.warning('请填写请假原因')
    return
  }
  showConfirm.value = true
}

async function confirmSubmit() {
  if (!props.selectedDate)
    return

  showConfirm.value = false

  const success = await submitLeaveApplication({
    date: props.selectedDate.date,
    shift: form.value.shift,
    reason: form.value.reason,
    attachments: form.value.attachments,
  })

  if (success) {
    toast.success('请假申请已提交')
    visible.value = false
    emit('submitted')
  }
  else {
    toast.error('提交失败')
  }
}
</script>

<style scoped>
</style>
