<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <wd-navbar title="工作台" placeholder safe-area-inset-top fixed :left-arrow="false" />

    <div class="flex-1 p-4">
      <div class="mb-4 rounded-lg bg-white p-6 shadow-sm">
        <div class="text-lg text-gray-800 font-bold">
          欢迎回来，{{ userStore.userInfo.doctor?.name || '医生' }}
        </div>
        <div class="mt-2 text-sm text-gray-500">
          {{ currentDate }}，祝您工作愉快
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="grid grid-cols-2 gap-4">
        <!-- 排班管理：仅科室长可见 -->
        <div
          v-if="userStore.isDepartmentHead"
          class="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm active:bg-gray-50"
          @click="navigateTo('/pages/schedule/index')"
        >
          <div class="i-carbon-calendar mb-2 text-3xl text-blue-500" />
          <div class="text-sm text-gray-700 font-bold">
            排班管理
          </div>
        </div>

        <!-- 请假申请：所有人可见 -->
        <div class="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm active:bg-gray-50" @click="navigateTo('/pages/leave/index')">
          <div class="i-carbon-plane mb-2 text-3xl text-orange-500" />
          <div class="text-sm text-gray-700 font-bold">
            请假申请
          </div>
        </div>

        <!-- 审批中心：仅科室长可见 -->
        <div
          v-if="userStore.isDepartmentHead"
          class="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm active:bg-gray-50"
          @click="navigateTo('/pages/approval/index')"
        >
          <div class="i-carbon-checkbox-checked mb-2 text-3xl text-green-500" />
          <div class="text-sm text-gray-700 font-bold">
            审批中心
          </div>
        </div>

        <!-- 我的排班：暂时隐藏或所有人可见（根据需求，目前先保留但如果不符合"只有请假"的要求可以隐藏，这里先保留作为基础功能） -->
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
import dayjs from 'dayjs'
import { computed } from 'vue'
import { useUserStore } from '@/store/user'

defineOptions({
  name: 'Home',
})

const userStore = useUserStore()
const currentDate = computed(() => dayjs().format('YYYY年MM月DD日'))

function navigateTo(url: string) {
  uni.navigateTo({ url })
}
</script>

<style scoped>
</style>
