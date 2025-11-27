<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <wd-navbar title="工作台" placeholder safe-area-inset-top fixed :left-arrow="false" />

    <div class="flex-1 p-4">
      <div class="mb-4 rounded-lg bg-white p-6 shadow-sm">
        <div class="text-lg text-gray-800 font-bold">
          欢迎回来，李医生
        </div>
        <div class="mt-2 text-sm text-gray-500">
          今天是 2025年11月27日，祝您工作愉快
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm active:bg-gray-50" @click="navigateTo('/pages/schedule/index')">
          <div class="i-carbon-calendar mb-2 text-3xl text-blue-500" />
          <div class="text-sm text-gray-700 font-bold">
            排班管理
          </div>
        </div>
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm active:bg-gray-50" @click="navigateTo('/pages/leave/index')">
          <div class="i-carbon-plane mb-2 text-3xl text-orange-500" />
          <div class="text-sm text-gray-700 font-bold">
            请假申请
          </div>
        </div>
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm active:bg-gray-50" @click="navigateTo('/pages/approval/index')">
          <div class="i-carbon-checkbox-checked mb-2 text-3xl text-green-500" />
          <div class="text-sm text-gray-700 font-bold">
            审批中心
          </div>
        </div>
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm active:bg-gray-50">
          <div class="i-carbon-user-md mb-2 text-3xl text-purple-500" />
          <div class="text-sm text-gray-700 font-bold">
            我的排班
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Home',
})

function navigateTo(url: string) {
  uni.navigateTo({ url })
}
</script>

<style scoped>
</style>
