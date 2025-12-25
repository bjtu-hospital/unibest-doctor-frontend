import type { IUserInfoRes } from '@/api/types/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getUserInfo,
} from '@/api/login'

// 初始化状态
const userInfoState: IUserInfoRes = {
  doctor: {
    id: -1,
    name: '',
    department: '',
    department_id: '',
    hospital: '',
    title: '',
    is_department_head: 'False',
    photo_mime: '',
    photo_base64: '',
  },
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<IUserInfoRes>({ ...userInfoState })

    // 是否是科室长
    const isDepartmentHead = computed(() => {
      const isHead = userInfo.value.doctor?.is_department_head
      // 兼容字符串 "True" 和布尔值 true
      return String(isHead) === 'True' || String(isHead) === 'true'
    })

    // 首页是否显示消息详情
    const showNotificationDetailsOnHome = ref(true)
    const toggleNotificationDetailsOnHome = (val: boolean) => {
      showNotificationDetailsOnHome.value = val
    }

    // 设置用户信息
    const setUserInfo = (val: IUserInfoRes) => {
      console.log('设置用户信息', val)
      userInfo.value = val
    }
    const setUserAvatar = (avatar: string) => {
      // userInfo.value.avatar = avatar
      console.log('设置用户头像', avatar)
    }
    // 删除用户信息
    const clearUserInfo = () => {
      userInfo.value = { ...userInfoState }
      uni.removeStorageSync('user')
    }

    /**
     * 获取用户信息
     */
    const fetchUserInfo = async () => {
      const res = await getUserInfo()
      setUserInfo(res)
      return res
    }

    return {
      userInfo,
      isDepartmentHead,
      clearUserInfo,
      fetchUserInfo,
      setUserInfo,
      setUserAvatar,
      showNotificationDetailsOnHome,
      toggleNotificationDetailsOnHome,
    }
  },
  {
    persist: true,
  },
)
