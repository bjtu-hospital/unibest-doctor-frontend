<template>
  <view v-if="patient" class="rounded-2xl bg-white p-4 shadow-md">
    <!-- Header -->
    <view class="mb-4 flex items-center justify-between">
      <view class="flex items-center gap-2">
        <view class="h-2 w-2 animate-pulse rounded-full bg-green-500" />
        <text class="text-base text-gray-800 font-bold">正在就诊</text>
      </view>
      <view v-if="nextPatient" class="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-400">
        <text>下一位:</text>
        <text class="text-gray-600 font-medium">{{ nextPatient.queueNumber }} {{ nextPatient.patientName }}</text>
      </view>
    </view>

    <!-- Patient Info -->
    <view class="mb-5 flex items-center rounded-xl from-blue-50 to-indigo-50 bg-gradient-to-r p-4" @click="onPatientClick">
      <view class="mr-4 h-14 w-14 flex items-center justify-center rounded-full from-blue-500 to-indigo-500 bg-gradient-to-br text-xl text-white font-bold shadow-md">
        {{ patient.patientName[0] }}
      </view>
      <view class="flex-1">
        <view class="mb-1 flex items-center gap-2">
          <text class="text-xl text-gray-800 font-bold">{{ patient.patientName }}</text>
          <view class="rounded-md bg-blue-500 px-2 py-0.5 text-sm text-white font-bold">
            {{ patient.queueNumber }}
          </view>
        </view>
        <view class="flex items-center gap-2 text-sm text-gray-500">
          <text>{{ patient.gender }}</text>
          <text class="text-gray-300">|</text>
          <text>{{ patient.age }}岁</text>
          <text class="text-gray-300">|</text>
          <text class="text-xs">{{ patient.callTime ? `呼叫 ${patient.callTime.slice(11, 16)}` : '--' }}</text>
        </view>
      </view>
      <wd-icon name="arrow-right" size="20px" color="#9ca3af" />
    </view>

    <!-- Action Buttons -->
    <view class="flex gap-3">
      <wd-button
        type="error"
        plain
        block
        size="large"
        class="flex-1"
        @click="$emit('pass')"
      >
        过号
      </wd-button>
      <wd-button
        type="success"
        block
        size="large"
        class="flex-1"
        @click="$emit('complete')"
      >
        完成就诊
      </wd-button>
    </view>
  </view>

  <!-- Empty State -->
  <view v-else class="flex flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-md">
    <view class="mb-4 h-20 w-20 flex items-center justify-center rounded-full bg-gray-100">
      <wd-icon name="user" size="40px" color="#9caaf" />
    </view>
    <text class="mb-1 text-gray-500">当前无就诊人</text>

    <text v-if="hasWaiting" class="mb-4 text-xs text-gray-400">点击下方按钮呼叫下一位患者</text>
    <text v-else class="mb-4 text-xs text-red-400">无等待患者，无法呼叫下一位</text>

    <wd-button
      :disabled="!hasWaiting"
      type="success"
      size="large"
      class="w-48"
      @click="onNext"
    >
      {{ hasWaiting ? '呼叫下一位' : '暂无候诊' }}
    </wd-button>
  </view>
</template>

<script setup lang="ts">
import type { Patient } from '@/api/types/doctor'

import { computed } from 'vue'

const props = defineProps<{
  patient: Patient | null
  nextPatient: Patient | null
  waitingCount?: number
}>()

const emit = defineEmits<{
  (e: 'pass'): void
  (e: 'next'): void
  (e: 'complete'): void
  (e: 'view-detail', patientId: string | number): void
}>()

const hasWaiting = computed(() => (props.waitingCount ?? 0) > 0)

function onPatientClick() {
  if (props.patient) {
    emit('view-detail', props.patient.patientId)
  }
}

function onNext() {
  if (!hasWaiting.value)
    return
  emit('next')
}
</script>
