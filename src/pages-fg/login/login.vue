<script lang="ts" setup>
import { ref } from 'vue'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationBarTitleText: '登录',
  },
})

const tokenStore = useTokenStore()
const identifier = ref('')
const password = ref('')

async function doLogin() {
  if (tokenStore.hasLogin) {
    uni.navigateBack()
    return
  }
  if (!identifier.value || !password.value) {
    uni.showToast({
      title: '请输入工号和密码',
      icon: 'none',
    })
    return
  }
  try {
    // 调用登录接口
    await tokenStore.loginStaff({
      identifier: identifier.value,
      password: password.value,
    })
    uni.navigateBack()
  }
  catch (error) {
    console.log('登录失败', error)
  }
}
</script>

<template>
  <view class="login p-8">
    <view class="mb-8 text-center text-2xl font-bold">
      员工登录
    </view>
    <view class="mb-4">
      <input
        v-model="identifier"
        class="w-full border border-gray-300 rounded p-3"
        placeholder="请输入工号/手机号"
      >
    </view>
    <view class="mb-6">
      <input
        v-model="password"
        class="w-full border border-gray-300 rounded p-3"
        password
        placeholder="请输入密码"
      >
    </view>
    <button class="w-full rounded-full bg-blue-500 py-2 text-white" @click="doLogin">
      登录
    </button>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
