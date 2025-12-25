<route lang="json5">
{
  style: {
    navigationBarTitleText: '消息通知',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <wd-navbar title="消息通知" placeholder left-arrow safe-area-inset-top fixed @click-left="handleBack" />

    <!-- 消息列表 -->
    <div class="mx-4 mt-6">
      <div class="mb-3 text-sm text-gray-500 font-bold">
        消息列表
      </div>

      <div v-if="loading" class="py-10 text-center text-gray-400">
        加载中...
      </div>
      <div v-else-if="messages.length === 0" class="py-10 text-center text-gray-400">
        暂无消息
      </div>
      <div v-else class="space-y-3">
        <div v-for="item in messages" :key="item.id" class="rounded-xl bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2">
              <div
                class="h-2 w-2 rounded-full"
                :class="{
                  'bg-blue-500': item.type === 'system',
                  'bg-green-500': item.type === 'schedule',
                  'bg-yellow-500': item.type === 'leave',
                  'bg-red-500': item.type === 'approval',
                }"
              />
              <span class="text-sm text-gray-800 font-bold">{{ item.title }}</span>
            </div>
            <span class="text-xs text-gray-400">{{ item.time }}</span>
          </div>
          <div class="mt-2 text-xs text-gray-600 leading-relaxed">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { getApprovalStats } from '@/service/approval'
import { getLeaveHistory } from '@/service/leave'
import { getShifts } from '@/service/workbench'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const loading = ref(false)

interface MessageItem {
  id: string | number
  type: 'system' | 'schedule' | 'leave' | 'approval'
  title: string
  time: string
  content: string
  timestamp: number // 用于排序
}

const messages = ref<MessageItem[]>([])

function handleBack() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
  }
  else {
    uni.switchTab({ url: '/pages/index/index' })
  }
}

async function loadData() {
  loading.value = true
  const list: MessageItem[] = []

  try {
    // 1. 获取请假记录
    const leaveRecords = await getLeaveHistory(1, 10)
    leaveRecords.forEach((record) => {
      let title = '请假申请'
      let content = ''
      if (record.status === 'pending') {
        title = '请假审批中'
        content = `您申请的 ${dayjs(record.date).format('MM月DD日')} 请假正在审批中。`
      }
      else if (record.status === 'approved') {
        title = '请假已通过'
        content = `您申请的 ${dayjs(record.date).format('MM月DD日')} 请假已通过审批。`
      }
      else if (record.status === 'rejected') {
        title = '请假已拒绝'
        content = `您申请的 ${dayjs(record.date).format('MM月DD日')} 请假已被拒绝。原因：${record.rejectReason || '无'}`
      }

      list.push({
        id: `leave-${record.id}`,
        type: 'leave',
        title,
        time: dayjs(record.createTime || record.date).format('MM-DD HH:mm'), // 优先使用创建时间，如果没有则使用请假日期
        content,
        timestamp: dayjs(record.createTime || record.date).valueOf(),
      })
    })

    // 2. 获取今日排班
    if (userStore.userInfo.doctor?.id) {
      const shifts = await getShifts(userStore.userInfo.doctor.id)
      if (shifts.length > 0) {
        const todayShift = shifts[0] // 简单取第一个
        list.push({
          id: `shift-${todayShift.id}`,
          type: 'schedule',
          title: '今日排班提醒',
          time: dayjs().format('HH:mm'),
          content: `您今天有排班：${todayShift.name} (${todayShift.startTime}-${todayShift.endTime})，地点：${todayShift.location}。`,
          timestamp: dayjs().valueOf(),
        })
      }
      else {
        list.push({
          id: `shift-none`,
          type: 'schedule',
          title: '今日休息',
          time: dayjs().format('HH:mm'),
          content: `您今天没有排班，请好好休息。`,
          timestamp: dayjs().valueOf(),
        })
      }
    }

    // 3. 获取待审批数量 (如果是科室长)
    if (userStore.isDepartmentHead) {
      const stats = await getApprovalStats()
      if (stats.pending > 0) {
        list.push({
          id: 'approval-pending',
          type: 'approval',
          title: '待审批提醒',
          time: dayjs().format('HH:mm'),
          content: `您有 ${stats.pending} 条请假申请待审批，请及时处理。`,
          timestamp: dayjs().valueOf(),
        })
      }
    }

    // 4. 系统欢迎消息 (固定)
    list.push({
      id: 'system-welcome',
      type: 'system',
      title: '系统通知',
      time: dayjs().format('MM-DD HH:mm'),
      content: `欢迎使用医生工作台系统，今天是 ${dayjs().format('YYYY年MM月DD日')}。`,
      timestamp: dayjs().startOf('day').valueOf(),
    })

    // 排序：按时间倒序
    messages.value = list.sort((a, b) => b.timestamp - a.timestamp)
  }
  catch (error) {
    console.error('Failed to load notifications:', error)
    uni.showToast({ title: '加载消息失败', icon: 'none' })
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>
