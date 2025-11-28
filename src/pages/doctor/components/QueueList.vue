<template>
  <view class="overflow-hidden rounded-2xl bg-white shadow-md">
    <wd-tabs v-model="activeTab" line-width="40px" line-height="3px">
      <wd-tab
        v-for="tab in tabs"
        :key="tab.key"
        :title="`${tab.name} (${getCount(tab.key)})`"
        :name="tab.key"
      />
    </wd-tabs>

    <!-- Limited height scroll container -->
    <scroll-view
      scroll-y
      class="px-3 py-2"
      style="max-height: 400px;"
    >
      <view v-if="currentList.length === 0" class="py-12 text-center">
        <view class="mx-auto mb-3 h-16 w-16 flex items-center justify-center rounded-full bg-gray-100">
          <wd-icon name="folder-open" size="32px" color="#d1d5db" />
        </view>
        <text class="text-sm text-gray-400">暂无数据</text>
      </view>
      <view
        v-for="(item, index) in currentList"
        :key="item.orderId"
        class="mb-2 flex items-center rounded-xl bg-gray-50 p-3 transition-all active:bg-gray-100"
        :class="{ 'border-l-4 border-blue-500 bg-blue-50': index === 0 && activeTab === 'waiting' }"
        @click="$emit('view-detail', item.patientId)"
      >
        <view
          class="mr-3 h-11 w-11 flex items-center justify-center rounded-full text-sm font-bold shadow-sm"
          :class="activeTab === 'waiting' ? 'bg-blue-500 text-white' : activeTab === 'completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'"
        >
          {{ item.queueNumber || (index + 1) }}
        </view>
        <view class="min-w-0 flex-1">
          <view class="flex items-center justify-between">
            <text class="truncate text-gray-800 font-bold">{{ item.patientName }}</text>
            <text v-if="activeTab === 'completed' && item.completedTime" class="ml-2 flex-shrink-0 text-xs text-gray-400">
              完诊 {{ item.completedTime?.slice(11, 16) }}
            </text>
            <text v-else-if="item.callTime" class="ml-2 flex-shrink-0 text-xs text-gray-400">
              {{ item.callTime?.slice(11, 16) }}
            </text>
          </view>
          <view class="mt-1 flex items-center gap-2 text-xs text-gray-500">
            <text>{{ item.gender }}</text>
            <text v-if="item.age">{{ item.age }}岁</text>
            <view v-if="item.passCount && item.passCount > 0" class="rounded-full bg-red-100 px-2 py-0.5 text-red-500">
              {{ item.passCount >= 2 ? '已取消 (过号2次)' : `过号 ${item.passCount} 次` }}
            </view>
          </view>
        </view>
        <wd-icon name="arrow-right" size="16px" color="#d1d5db" />
      </view>

      <!-- Show more indicator -->
      <view v-if="currentList.length > 5" class="py-2 text-center text-xs text-gray-400">
        <text>滑动查看更多 ({{ currentList.length }} 人)</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import type { QueueData } from '@/api/types/doctor'
import { computed, ref } from 'vue'

const props = defineProps<{
  queueData: QueueData
}>()

const emit = defineEmits<{
  (e: 'view-detail', patientId: string | number): void
}>()

type TabKey = 'waiting' | 'completed'

const tabs = [
  { key: 'waiting' as TabKey, name: '候诊' },
  { key: 'completed' as TabKey, name: '已诊' },
]

const activeTab = ref<TabKey>('waiting')

const waitingList = computed(() => {
  return props.queueData.queue.filter(p => (p.passCount || 0) < 2)
})

const completedList = computed(() => {
  const disqualified = props.queueData.queue.filter(p => (p.passCount || 0) >= 2)
  return [...(props.queueData.completedQueue || []), ...disqualified]
})

function getCount(key: TabKey) {
  switch (key) {
    case 'waiting': return waitingList.value.length
    case 'completed': return completedList.value.length
    default: return 0
  }
}

const currentList = computed(() => {
  switch (activeTab.value) {
    case 'waiting': return waitingList.value
    case 'completed': return completedList.value
    default: return []
  }
})
</script>
