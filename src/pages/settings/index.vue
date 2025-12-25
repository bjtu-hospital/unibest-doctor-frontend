<route lang="json5">
{
  style: {
    navigationBarTitleText: '设置',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <wd-navbar title="设置" placeholder left-arrow safe-area-inset-top fixed @click-left="handleBack" />

    <!-- 设置列表 -->
    <div class="mx-4 mt-4 overflow-hidden rounded-xl bg-white shadow-sm">
      <div class="flex items-center justify-between px-4 py-4">
        <div class="flex flex-col">
          <span class="text-sm text-gray-800 font-bold">首页显示消息详情</span>
          <span class="mt-1 text-xs text-gray-400">开启后，首页将展示详细的提醒事项列表</span>
        </div>
        <wd-switch v-model="showDetails" size="24px" active-color="#1890FF" @change="handleSwitchChange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const showDetails = ref(userStore.showNotificationDetailsOnHome)

function handleBack() {
  uni.navigateBack()
}

function handleSwitchChange({ value }: { value: boolean }) {
  userStore.toggleNotificationDetailsOnHome(value)
}
</script>
