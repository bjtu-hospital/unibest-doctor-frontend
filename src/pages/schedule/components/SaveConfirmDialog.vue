<template>
  <wd-popup
    v-model="visible"
    position="center"
    :z-index="1000"
    custom-style="width: 85%; border-radius: 12px; overflow: hidden; z-index: 1000;"
  >
    <div class="flex flex-col items-center bg-white p-6">
      <div class="mb-6 flex items-center gap-2 text-xl text-blue-600 font-bold">
        <div class="i-carbon-save" /> 确认保存排班
      </div>

      <div class="mb-6 w-full rounded-lg bg-gray-50 p-4 text-sm space-y-2">
        <div class="mb-2 text-gray-700 font-bold">
          本次修改涉及：
        </div>
        <div class="flex justify-between text-gray-600">
          <span>新增排班</span>
          <span class="text-green-600 font-bold">{{ stats.added }} 个时段</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>修改排班</span>
          <span class="text-blue-600 font-bold">{{ stats.modified }} 个时段</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>取消排班</span>
          <span class="text-red-600 font-bold">{{ stats.removed }} 个时段</span>
        </div>
      </div>

      <div class="mb-6 w-full">
        <div class="mb-2 text-gray-700 font-bold">
          受影响医生：
        </div>
        <div class="text-xs text-gray-500 leading-relaxed">
          {{ affectedDoctors }}
        </div>
      </div>

      <div class="mb-6 w-full flex items-center gap-2 px-2">
        <div class="i-carbon-checkbox-checked text-lg text-blue-500" />
        <span class="text-sm text-gray-600">保存后立即通知相关医生</span>
      </div>

      <div class="w-full flex gap-4">
        <button class="flex-1 border border-gray-300 rounded-full py-2.5 text-sm text-gray-600 font-bold" @click="handleClose">
          取消
        </button>
        <button class="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-500 py-2.5 text-sm text-white font-bold" @click="handleConfirm">
          <div v-if="loading" class="i-carbon-circle-dash animate-spin" />
          {{ loading ? '保存中...' : '确认保存' }}
        </button>
      </div>
    </div>
  </wd-popup>
</template>

<script setup lang="ts">
import type { ScheduleSlot } from '@/types/schedule'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  changes: ScheduleSlot[]
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()

const visible = ref(false)

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const stats = computed(() => {
  let added = 0
  let modified = 0
  let removed = 0

  props.changes.forEach((c) => {
    if (c.status === 'filled' && !c.isModified) {
      added += 1
    }
    else if (c.status === 'filled' && c.isModified) {
      modified += 1
    }
    else if (c.status === 'empty') {
      removed += 1
    }
  })

  return {
    added,
    modified,
    removed,
  }
})

const affectedDoctors = computed(() => {
  const names = new Set<string>()
  props.changes.forEach((c) => {
    if (c.doctorName)
      names.add(c.doctorName)
  })
  return Array.from(names).join('、') || '无'
})

function handleClose() {
  visible.value = false
}

function handleConfirm() {
  emit('confirm')
}
</script>
