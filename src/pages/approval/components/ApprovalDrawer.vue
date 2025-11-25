<template>
  <wd-popup
    v-model="visible"
    position="bottom"
    custom-style="height: 80%; border-radius: 16px 16px 0 0; overflow: hidden; display: flex; flex-direction: column;"
    @close="handleClose"
  >
    <!-- Drag Indicator -->
    <div class="h-6 w-full flex items-center justify-center bg-white" @click="handleClose">
      <div class="h-1 w-10 rounded-full bg-gray-300" />
    </div>

    <div class="flex-1 overflow-y-auto bg-gray-50">
      <div class="mb-2 bg-white px-4 pb-4">
        <div class="mb-4 flex items-center gap-2 text-lg font-bold">
          <div class="i-carbon-document-tasks text-blue-600" />
          请假申请详情
        </div>

        <!-- Doctor Info -->
        <div class="mb-6">
          <div class="mb-3 flex items-center gap-2">
            <div class="h-4 w-1 rounded-full bg-blue-500" />
            <div class="text-gray-800 font-bold">
              申请人信息
            </div>
          </div>
          <div class="rounded-lg bg-blue-50 p-4">
            <div class="mb-2 flex items-center gap-3">
              <div class="i-carbon-user-profile text-xl text-blue-600" />
              <div class="text-lg font-bold">
                {{ detail?.doctor.name }}
              </div>
              <div class="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                {{ detail?.doctor.title }}
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>科室：{{ detail?.doctor.dept }}</div>
              <div>工号：{{ detail?.doctor.id }}</div>
            </div>
          </div>
        </div>

        <!-- Leave Info -->
        <div class="mb-6">
          <div class="mb-3 flex items-center gap-2">
            <div class="h-4 w-1 rounded-full bg-blue-500" />
            <div class="text-gray-800 font-bold">
              请假信息
            </div>
          </div>
          <div class="rounded-lg bg-gray-50 p-4 space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">请假日期</span>
              <span class="text-gray-800 font-bold">{{ detail?.leaveDate }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">请假班次</span>
              <span class="text-gray-800 font-bold">{{ getShiftLabel(detail?.shift) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-2">
              <div class="mb-1 text-sm text-gray-500">
                原排班信息
              </div>
              <div v-for="(item, idx) in detail?.originalSchedule" :key="idx" class="mb-1 border-l-2 border-blue-200 pl-2 text-sm text-gray-700">
                {{ item }}
              </div>
            </div>
          </div>
        </div>

        <!-- Reason -->
        <div class="mb-6">
          <div class="mb-3 flex items-center gap-2">
            <div class="h-4 w-1 rounded-full bg-blue-500" />
            <div class="text-gray-800 font-bold">
              请假原因
            </div>
          </div>
          <div class="rounded-lg bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
            {{ detail?.reason }}
          </div>
        </div>

        <!-- Attachments -->
        <div v-if="detail?.attachments && detail.attachments.length > 0" class="mb-6">
          <div class="mb-3 flex items-center gap-2">
            <div class="h-4 w-1 rounded-full bg-blue-500" />
            <div class="text-gray-800 font-bold">
              证明材料
            </div>
          </div>
          <div class="flex gap-3">
            <div v-for="(img, idx) in detail.attachments" :key="idx" class="h-20 w-20 overflow-hidden rounded-lg bg-gray-200">
              <img :src="img" class="h-full w-full object-cover" @click="previewImage(img)">
            </div>
          </div>
        </div>

        <!-- Time -->
        <div class="text-right text-xs text-gray-400">
          申请时间：{{ detail?.applyTime }}
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div v-if="detail?.status === 'pending'" class="flex gap-4 border-t border-gray-100 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <button class="flex flex-1 items-center justify-center gap-1 border border-gray-200 rounded-full bg-white py-3 text-sm text-red-500 font-bold active:bg-gray-50" @click="onReject">
        <div class="i-carbon-close-outline text-lg" /> 拒绝
      </button>
      <button class="flex flex-1 items-center justify-center gap-1 rounded-full bg-blue-500 py-3 text-sm text-white font-bold active:bg-blue-600" @click="onApprove">
        <div class="i-carbon-checkmark-outline text-lg" /> 同意
      </button>
    </div>

    <!-- Readonly Footer for processed items -->
    <div v-else class="flex items-center justify-center gap-2 border-t border-gray-100 bg-white p-4 text-center text-sm font-bold" :class="detail?.status === 'approved' ? 'text-green-600' : 'text-red-600'">
      <div :class="detail?.status === 'approved' ? 'i-carbon-checkmark-filled' : 'i-carbon-close-filled'" class="text-lg" />
      {{ detail?.status === 'approved' ? '已通过' : '已拒绝' }}
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
  (e: 'approve'): void
  (e: 'reject'): void
}>()

const visible = ref(false)

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

function handleClose() {
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

function previewImage(url: string) {
  uni.previewImage({
    urls: [url],
  })
}

function onApprove() {
  emit('approve')
}

function onReject() {
  emit('reject')
}
</script>

<style scoped>
</style>
