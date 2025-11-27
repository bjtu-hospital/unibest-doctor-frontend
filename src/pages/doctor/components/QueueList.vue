<template>
  <view class="flex flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
    <wd-tabs v-model="activeTab" sticky>
      <wd-tab
        v-for="tab in tabs"
        :key="tab.key"
        :title="`${tab.name} (${getCount(tab.key)})`"
        :name="tab.key"
      >
        <scroll-view scroll-y class="h-[calc(100vh-400px)] p-2">
          <view v-if="currentList.length === 0" class="py-8 text-center text-sm text-gray-400">
            暂无数据
          </view>
          <view
            v-for="item in currentList"
            :key="item.orderId"
            class="mb-2 flex items-center rounded-lg bg-gray-50 p-3 transition-colors active:bg-gray-100"
            @click="$emit('view-detail', item.patientId)"
          >
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-white text-gray-600 font-bold shadow-sm">
              {{ item.queueNumber }}
            </view>
            <view class="flex-1">
              <view class="flex items-center justify-between">
                <text class="text-gray-800 font-bold">{{ item.patientName }}</text>
                <text class="text-xs text-gray-400">{{ item.visitTime }}</text>
              </view>
              <view class="mt-1 text-xs text-gray-500">
                {{ item.gender }} | {{ item.age }}岁
                <text v-if="item.passCount > 0" class="ml-2 rounded bg-red-50 px-1 text-red-500">
                  过号 {{ item.passCount }} 次
                </text>
              </view>
            </view>
          </view>
        </scroll-view>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script setup lang="ts">
import type { QueueData } from '@/api/types/doctor'
import { computed, ref } from 'vue'

const props = defineProps<{
  queueData: QueueData
}>()

const emit = defineEmits<{
  (e: 'view-detail', patientId: string): void
}>()

type TabKey = 'waiting' | 'passed' | 'completed'

const tabs = [
  { key: 'waiting' as TabKey, name: '候诊' },
  { key: 'passed' as TabKey, name: '过号' },
  { key: 'completed' as TabKey, name: '已完' },
]

const activeTab = ref<TabKey>('waiting')

function getCount(key: TabKey) {
  switch (key) {
    case 'waiting': return props.queueData.stats.waitingCount
    case 'passed': return props.queueData.stats.passedCount
    case 'completed': return props.queueData.stats.completedCount
    default: return 0
  }
}

const currentList = computed(() => {
  switch (activeTab.value) {
    case 'waiting': return props.queueData.queue
    case 'passed': return props.queueData.waitlist
    case 'completed': return props.queueData.completedList
    default: return []
  }
})
</script>
