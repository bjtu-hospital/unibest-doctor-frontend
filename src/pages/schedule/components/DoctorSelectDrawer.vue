<template>
  <wd-popup
    v-model="visible"
    position="bottom"
    :z-index="1000"
    custom-style="height: 70%; border-radius: 16px 16px 0 0; overflow: hidden; display: flex; flex-direction: column; z-index: 1000;"
    @close="handleClose"
  >
    <!-- Drag Indicator -->
    <div class="h-6 w-full flex items-center justify-center bg-white" @click="handleClose">
      <div class="h-1 w-10 rounded-full bg-gray-300" />
    </div>

    <div class="flex flex-1 flex-col overflow-hidden bg-gray-50">
      <!-- Header -->
      <div class="border-b border-gray-100 bg-white px-4 py-3">
        <div class="flex items-center gap-2 text-lg font-bold">
          <div class="i-carbon-user-md text-blue-600" />
          选择医生
        </div>
        <div class="mt-1 text-xs text-gray-500">
          {{ formatDate(targetSlot?.date) }} {{ getShiftLabel(targetSlot?.shift) }}
        </div>
      </div>

      <!-- Search -->
      <div class="bg-white px-4 py-2">
        <div class="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
          <div class="i-carbon-search text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            class="flex-1 bg-transparent text-sm outline-none"
            placeholder="搜索医生姓名或工号..."
          >
        </div>
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <!-- Recommended -->
        <div v-if="recommendedDoctors.length > 0">
          <div class="mb-2 flex items-center gap-1 text-xs text-gray-500 font-bold">
            <div class="i-carbon-checkmark-filled text-green-500" /> 推荐医生（无冲突）
          </div>
          <div class="space-y-2">
            <div
              v-for="doc in recommendedDoctors"
              :key="doc.id"
              class="flex items-center justify-between border border-gray-100 rounded-lg bg-white p-3 transition-colors active:bg-blue-50"
              @click="handleSelect(doc)"
            >
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-800 font-bold">{{ doc.name }}</span>
                  <span class="text-xs text-gray-500">{{ doc.title }}</span>
                </div>
                <div class="mt-1 text-xs text-gray-400">
                  工号: {{ doc.id }} | 本周已排 {{ doc.assignedCount }} 次
                </div>
              </div>
              <div class="h-5 w-5 flex items-center justify-center border border-gray-300 rounded-full" :class="selectedId === doc.id ? 'bg-blue-500 border-blue-500' : ''">
                <div v-if="selectedId === doc.id" class="i-carbon-checkmark text-xs text-white" />
              </div>
            </div>
          </div>
        </div>

        <!-- Conflict -->
        <div v-if="conflictDoctors.length > 0">
          <div class="mb-2 mt-4 flex items-center gap-1 text-xs text-gray-500 font-bold">
            <div class="i-carbon-warning-filled text-yellow-500" /> 有冲突医生
          </div>
          <div class="space-y-2">
            <div
              v-for="doc in conflictDoctors"
              :key="doc.id"
              class="flex items-center justify-between border border-yellow-100 rounded-lg bg-white p-3 opacity-80"
            >
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-800 font-bold">{{ doc.name }}</span>
                  <span class="text-xs text-gray-500">{{ doc.title }}</span>
                </div>
                <div class="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <div class="i-carbon-warning-alt" /> {{ doc.conflictReason }}
                </div>
              </div>
              <button class="border border-yellow-200 rounded bg-yellow-50 px-2 py-1 text-xs text-yellow-600" @click="handleSelect(doc)">
                强制选择
              </button>
            </div>
          </div>
        </div>

        <!-- Unavailable -->
        <div v-if="unavailableDoctors.length > 0">
          <div class="mb-2 mt-4 flex items-center gap-1 text-xs text-gray-500 font-bold">
            <div class="i-carbon-close-filled text-red-500" /> 不可用医生
          </div>
          <div class="space-y-2">
            <div
              v-for="doc in unavailableDoctors"
              :key="doc.id"
              class="flex items-center justify-between border border-gray-200 rounded-lg bg-gray-100 p-3 opacity-60 grayscale"
            >
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-800 font-bold">{{ doc.name }}</span>
                  <span class="text-xs text-gray-500">{{ doc.title }}</span>
                </div>
                <div class="mt-1 text-xs text-gray-500">
                  {{ doc.leaveReason }}
                </div>
              </div>
              <div class="text-xs text-gray-400">
                不可选
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex gap-4 border-t border-gray-100 bg-white p-4">
        <button class="flex-1 border border-gray-200 rounded-full py-3 text-sm text-gray-600 font-bold" @click="handleClear">
          清空该时段
        </button>
        <button class="flex-1 rounded-full bg-blue-500 py-3 text-sm text-white font-bold disabled:opacity-50" :disabled="!selectedId" @click="handleConfirm">
          确认选择
        </button>
      </div>
    </div>
  </wd-popup>
</template>

<script setup lang="ts">
import type { Doctor, ScheduleSlot } from '@/types/schedule'
import { computed, ref, watch } from 'vue'
import { getAvailableDoctors } from '@/service/schedule'

const props = defineProps<{
  modelValue: boolean
  targetSlot?: ScheduleSlot
  clinicId: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', doctor: Doctor | null): void
}>()

const visible = ref(false)
const searchQuery = ref('')
const doctors = ref<Doctor[]>([])
const selectedId = ref<string>('')

watch(() => props.modelValue, async (val) => {
  visible.value = val
  if (val && props.targetSlot) {
    selectedId.value = props.targetSlot.doctorId || ''
    searchQuery.value = ''
    await fetchDoctors()
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

async function fetchDoctors() {
  if (!props.targetSlot || !props.clinicId)
    return
  doctors.value = await getAvailableDoctors(props.clinicId, props.targetSlot.date, props.targetSlot.shift)
}

const filteredDoctors = computed(() => {
  if (!searchQuery.value)
    return doctors.value
  const q = searchQuery.value.toLowerCase()
  return doctors.value.filter(d => d.name.includes(q) || d.id.includes(q))
})

const recommendedDoctors = computed(() => filteredDoctors.value.filter(d => d.status === 'available'))
const conflictDoctors = computed(() => filteredDoctors.value.filter(d => d.status === 'conflict'))
const unavailableDoctors = computed(() => filteredDoctors.value.filter(d => d.status === 'leave'))

function handleClose() {
  visible.value = false
}

function handleSelect(doc: Doctor) {
  selectedId.value = doc.id
}

function handleClear() {
  selectedId.value = ''
  emit('select', null)
  visible.value = false
}

function handleConfirm() {
  const doc = doctors.value.find(d => d.id === selectedId.value)
  if (doc) {
    emit('select', doc)
    visible.value = false
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr)
    return ''
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

function getShiftLabel(shift?: string) {
  const map: Record<string, string> = { morning: '上午', afternoon: '下午', night: '晚间' }
  return shift ? map[shift] : ''
}
</script>

<style scoped>
</style>
