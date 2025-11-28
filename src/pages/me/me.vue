<script lang="ts" setup>
import type { ProfileStats } from '@/service/profile'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { LOGIN_PAGE } from '@/router/config'
import { getProfileStats } from '@/service/profile'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationBarTitleText: '个人中心',
    navigationStyle: 'custom',
  },
})

const userStore = useUserStore()
const tokenStore = useTokenStore()
const { userInfo } = storeToRefs(userStore)

// 计算属性 - 用户基本信息
const userName = computed(() => userInfo.value.doctor?.name || '医生')
const userTitle = computed(() => userInfo.value.doctor?.title || '未知职称')
const userDept = computed(() => userInfo.value.doctor?.department || '未知科室')
const userHospital = computed(() => userInfo.value.doctor?.hospital || '未知院区')
const isDeptHead = computed(() => userStore.isDepartmentHead)

// 统计数据
const statsData = ref<ProfileStats>({
  attendance: 0,
  monthlyConsult: 0,
  totalConsult: 0,
})

// 加载状态
const loading = ref(false)

// 加载统计数据
async function loadStats() {
  loading.value = true
  try {
    statsData.value = await getProfileStats()
  }
  catch (error) {
    console.error('Failed to load profile stats:', error)
    uni.showToast({
      title: '加载统计数据失败',
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  loadStats()
})

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '确认退出登录？',
    content: '退出后需要重新登录',
    confirmText: '确认退出',
    cancelText: '取消',
    success: async (res) => {
      if (res.confirm) {
        try {
          await tokenStore.logout()
          uni.showToast({
            title: '退出成功',
            icon: 'success',
          })
          // 延迟跳转到登录页
          setTimeout(() => {
            uni.reLaunch({ url: LOGIN_PAGE })
          }, 1500)
        }
        catch (error) {
          console.error('退出登录失败:', error)
          uni.showToast({
            title: '退出失败',
            icon: 'none',
          })
        }
      }
    },
  })
}

// 修改密码
function handleChangePassword() {
  uni.showToast({
    title: '功能开发中',
    icon: 'none',
  })
  // TODO: 跳转到修改密码页面
  // uni.navigateTo({ url: '/pages/change-password/index' })
}

// 消息通知设置
function handleNotificationSettings() {
  uni.showToast({
    title: '功能开发中',
    icon: 'none',
  })
  // TODO: 跳转到消息设置页面
  // uni.navigateTo({ url: '/pages/notification-settings/index' })
}

// 关于我们
function handleAbout() {
  uni.showToast({
    title: '功能开发中',
    icon: 'none',
  })
  // TODO: 跳转到关于我们页面
  // uni.navigateTo({ url: '/pages/about/index' })
}

// 版本信息
function handleVersion() {
  uni.showModal({
    title: '版本信息',
    content: 'BJTU医生工作系统 v1.0.0',
    showCancel: false,
  })
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- 自定义导航栏 -->
    <wd-navbar placeholder safe-area-inset-top fixed :left-arrow="false">
      <template #title>
        <div class="text-base font-bold">
          个人中心
        </div>
      </template>
    </wd-navbar>

    <!-- 个人信息卡片 -->
    <div class="mx-4 mt-3 rounded-2xl from-[#1890FF] to-[#096DD9] bg-gradient-to-br p-6 text-white shadow-lg">
      <!-- 头像 -->
      <div class="flex flex-col items-center">
        <div class="relative">
          <div class="h-30 w-30 flex items-center justify-center border-3 border-white/50 rounded-full bg-white/20">
            <div class="i-carbon-user-avatar text-16" />
          </div>
        </div>

        <!-- 姓名和职称 -->
        <div class="mt-4 flex items-center gap-2">
          <div class="text-xl font-bold">
            {{ userName }}
          </div>
          <span v-if="isDeptHead" class="rounded bg-[#FFD666] px-2 py-0.5 text-xs text-[#9C6A00] font-bold">科室长</span>
        </div>

        <!-- 职称和科室 -->
        <div class="mt-1 text-sm opacity-90">
          {{ userTitle }} | {{ userDept }}
        </div>
      </div>

      <!-- 详细信息 -->
      <div class="mt-6 rounded-lg bg-white/10 p-4 backdrop-blur-sm space-y-2">
        <div class="flex items-center gap-2 text-sm">
          <div class="i-carbon-location text-base" />
          <span class="opacity-90">院区：</span>
          <span>{{ userHospital }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <div class="i-carbon-identification text-base" />
          <span class="opacity-90">工号：</span>
          <span>{{ userInfo.doctor?.id || '未知' }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <div class="i-carbon-phone text-base" />
          <span class="opacity-90">科室ID：</span>
          <span>{{ userInfo.doctor?.department_id || '未知' }}</span>
        </div>
      </div>
    </div>

    <!-- 统计数据卡片 -->
    <div class="grid grid-cols-3 mx-4 mt-4 gap-3">
      <!-- 本月出勤 -->
      <div class="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm">
        <div class="h-12 w-12 flex items-center justify-center rounded-full from-[#1890FF] to-[#096DD9] bg-gradient-to-br">
          <div class="i-carbon-calendar text-xl text-white" />
        </div>
        <div class="mt-3 text-2xl text-gray-800 font-extrabold">
          {{ statsData.attendance }}
        </div>
        <div class="mt-1 text-xs text-gray-500">
          本月出勤
        </div>
      </div>

      <!-- 本月接诊 -->
      <div class="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm">
        <div class="h-12 w-12 flex items-center justify-center rounded-full from-[#52C41A] to-[#389E0D] bg-gradient-to-br">
          <div class="i-carbon-user-multiple text-xl text-white" />
        </div>
        <div class="mt-3 text-2xl text-gray-800 font-extrabold">
          {{ statsData.monthlyConsult }}
        </div>
        <div class="mt-1 text-xs text-gray-500">
          本月接诊
        </div>
      </div>

      <!-- 累计接诊 -->
      <div class="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm">
        <div class="h-12 w-12 flex items-center justify-center rounded-full from-[#FAAD14] to-[#FA8C16] bg-gradient-to-br">
          <div class="i-carbon-trophy text-xl text-white" />
        </div>
        <div class="mt-3 text-2xl text-gray-800 font-extrabold">
          {{ statsData.totalConsult }}
        </div>
        <div class="mt-1 text-xs text-gray-500">
          累计接诊
        </div>
      </div>
    </div>

    <!-- 设置列表 -->
    <div class="mx-4 mt-4 overflow-hidden rounded-xl bg-white shadow-sm">
      <!-- 修改密码 -->
      <div class="flex items-center justify-between border-b border-gray-100 px-4 py-4 active:bg-gray-50" @click="handleChangePassword">
        <div class="flex items-center gap-3">
          <div class="i-carbon-locked text-xl text-[#1890FF]" />
          <span class="text-sm text-gray-800">修改密码</span>
        </div>
        <div class="i-carbon-chevron-right text-base text-gray-400" />
      </div>

      <!-- 消息通知设置 -->
      <div class="flex items-center justify-between border-b border-gray-100 px-4 py-4 active:bg-gray-50" @click="handleNotificationSettings">
        <div class="flex items-center gap-3">
          <div class="i-carbon-notification text-xl text-[#52C41A]" />
          <span class="text-sm text-gray-800">消息通知设置</span>
        </div>
        <div class="i-carbon-chevron-right text-base text-gray-400" />
      </div>

      <!-- 关于我们 -->
      <div class="flex items-center justify-between border-b border-gray-100 px-4 py-4 active:bg-gray-50" @click="handleAbout">
        <div class="flex items-center gap-3">
          <div class="i-carbon-information text-xl text-[#722ED1]" />
          <span class="text-sm text-gray-800">关于我们</span>
        </div>
        <div class="i-carbon-chevron-right text-base text-gray-400" />
      </div>

      <!-- 版本信息 -->
      <div class="flex items-center justify-between px-4 py-4 active:bg-gray-50" @click="handleVersion">
        <div class="flex items-center gap-3">
          <div class="i-carbon-mobile text-xl text-[#FA8C16]" />
          <span class="text-sm text-gray-800">版本信息</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400">v1.0.0</span>
          <div class="i-carbon-chevron-right text-base text-gray-400" />
        </div>
      </div>
    </div>

    <!-- 退出登录按钮 -->
    <div class="mx-4 mb-8 mt-6">
      <button
        class="w-full border-2 border-[#FF4D4F] rounded-xl bg-white py-3.5 text-center text-sm text-[#FF4D4F] font-bold active:scale-98"
        @click="handleLogout"
      >
        <div class="flex items-center justify-center gap-2">
          <div class="i-carbon-logout text-lg" />
          <span>退出登录</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 优化点击效果 */
.active\:scale-98:active {
  transform: scale(0.98);
  transition: transform 0.1s;
}

.active\:bg-gray-50:active {
  background-color: #f9fafb;
  transition: background-color 0.15s;
}
</style>
