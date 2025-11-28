import type { LeaveApplication, LeaveRecord, ScheduleItem } from '@/types/leave'
import { http } from '@/http/http'

const USE_MOCK = false

// Mock data
const mockHistory: LeaveRecord[] = [
  {
    id: '1',
    date: '2025-01-15',
    shift: 'full',
    reason: '家中有事需要处理...',
    status: 'pending',
    createTime: '2025-01-10',
  },
  {
    id: '2',
    date: '2025-01-08',
    shift: 'morning',
    reason: '参加学术会议',
    status: 'approved',
    createTime: '2025-01-05',
    approver: '张主任',
  },
  {
    id: '3',
    date: '2024-12-20',
    shift: 'afternoon',
    reason: '身体不适',
    status: 'rejected',
    createTime: '2024-12-18',
    rejectReason: '排班紧张',
  },
]

export const getSchedule = async (year: number, month: number): Promise<ScheduleItem[]> => {
  if (USE_MOCK) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const daysInMonth = new Date(year, month, 0).getDate()
        const schedule: ScheduleItem[] = []

        for (let i = 1; i <= daysInMonth; i++) {
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`
          const hasShift = i % 3 !== 0 // Mock: work 2 days, rest 1 day

          // Check if there is a leave record for this date
          const leave = mockHistory.find(l => l.date === dateStr)
          const todayStr = new Date().toISOString().split('T')[0]

          schedule.push({
            date: dateStr,
            day: i,
            hasShift,
            shiftInfo: hasShift ? (i % 2 === 0 ? '上午门诊' : '下午手术') : undefined,
            leaveStatus: leave?.status,
            isToday: dateStr === todayStr,
          })
        }
        resolve(schedule)
      }, 500)
    })
  }
  else {
    const res = await http.get<{ days: ScheduleItem[] }>('/doctor/leave/schedule', { year, month })
    // 兼容后端可能返回 { days: [...] } 或者直接返回 [...] 的情况
    // 根据接口文档，返回的是 { days: [...] }
    return res.days || []
  }
}

export const getLeaveHistory = async (page = 1, pageSize = 20): Promise<LeaveRecord[]> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockHistory])
      }, 500)
    })
  }
  else {
    const res = await http.get<{ list: LeaveRecord[], total: number }>('/doctor/leave/history', { page, pageSize })
    return res.list || []
  }
}

export const submitLeaveApplication = async (data: LeaveApplication): Promise<boolean> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitted:', data)
        // Add to mock history
        mockHistory.unshift({
          id: String(Date.now()),
          date: data.date,
          shift: data.shift,
          reason: data.reason,
          status: 'pending',
          createTime: new Date().toISOString().split('T')[0],
          attachments: data.attachments,
        })
        resolve(true)
      }, 1000)
    })
  }
  else {
    try {
      await http.post('/doctor/leave/apply', data)
      return true
    }
    catch (error) {
      console.error('Submit leave application failed:', error)
      return false
    }
  }
}
