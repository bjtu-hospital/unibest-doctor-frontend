<template>
  <view v-if="patient" class="mb-4 rounded-lg bg-white p-4 shadow-sm">
    <view class="mb-4 flex items-center justify-between">
      <text class="text-lg font-bold">当前就诊</text>
      <text v-if="nextPatient" class="text-sm text-gray-500">
        下一位: {{ nextPatient.queueNumber }} {{ nextPatient.patientName }}
      </text>
    </view>

    <view class="mb-6 flex items-center" @click="onPatientClick">
      <view class="mr-4 h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-xl text-blue-600 font-bold">
        {{ patient.patientName[0] }}
      </view>
      <view class="flex-1">
        <view class="mb-1 flex items-center">
          <text class="mr-2 text-2xl font-bold">{{ patient.patientName }}</text>
          <text class="text-xl text-blue-600 font-bold">{{ patient.queueNumber }}</text>
        </view>
        <view class="text-sm text-gray-500">
          {{ patient.gender }} | {{ patient.age }}岁 | 报到时间: {{ patient.visitTime }}
        </view>
      </view>
      <wd-icon name="arrow-right" size="24px" color="#9ca3af" />
    </view>

    <view class="flex gap-4">
      <wd-button
        type="error"
        plain
        block
        class="flex-1"
        @click="$emit('pass')"
      >
        过号
      </wd-button>
      <wd-button
        type="success"
        block
        class="flex-1"
        @click="$emit('next')"
      >
        下一位
      </wd-button>
    </view>
  </view>
  <view v-else class="mb-4 flex flex-col items-center justify-center rounded-lg bg-white p-8 text-gray-400 shadow-sm">
    <wd-icon name="user-circle" size="48px" class="mb-2" />
    <text>当前无就诊人</text>
    <wd-button
      type="success"
      class="mt-4 px-8"
      @click="$emit('next')"
    >
      呼叫下一位
    </wd-button>
  </view>
</template>

<script setup lang="ts">
import type { NextPatientPreview, Patient } from '@/api/types/doctor'

const props = defineProps<{
  patient: Patient | null
  nextPatient: NextPatientPreview | null
}>()

const emit = defineEmits<{
  (e: 'pass'): void
  (e: 'next'): void
  (e: 'view-detail', patientId: string): void
}>()

function onPatientClick() {
  if (props.patient) {
    emit('view-detail', props.patient.patientId)
  }
}
</script>
