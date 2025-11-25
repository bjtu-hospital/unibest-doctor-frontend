import type { LeaveApplicationDetail, ApprovalStats, ApprovalStatus } from '@/types/approval'

const mockList: LeaveApplicationDetail[] = [
  {
    id: '1',
    doctor: { name: '李医生', dept: '心内科', title: '主治医师', id: 'D20230156' },
    leaveDate: '2025-01-20',
    shift: 'full',
    originalSchedule: ['上午：门诊 08:00-12:00', '下午：查房 14:00-17:00'],
    reason: '需参加北京举办的心血管学术会议，会议时间为1月20日全天。已提前与同事协调好工作交接。',
    attachments: [],
    applyTime: '2025-01-18 15:30:00',
    status: 'pending'
  },
  {
    id: '2',
    doctor: { name: '王医生', dept: '心内科', title: '副主任医师', id: 'D20230088' },
    leaveDate: '2025-11-26', // Tomorrow relative to current date context
    shift: 'morning',
    originalSchedule: ['上午：门诊 08:00-12:00'],
    reason: '突发疾病需就医',
    attachments: [],
    applyTime: '2025-11-25 09:00:00', // Today
    status: 'pending'
  },
  {
    id: '3',
    doctor: { name: '张医生', dept: '心内科', title: '住院医师', id: 'D20230222' },
    leaveDate: '2025-01-15',
    shift: 'afternoon',
    originalSchedule: ['下午：门诊 14:00-17:00'],
    reason: '家中急事',
    attachments: [],
    applyTime: '2025-01-14 10:00:00',
    status: 'approved',
    approver: '您',
    approveTime: '2025-01-14 14:30:00'
  },
  {
    id: '4',
    doctor: { name: '刘医生', dept: '心内科', title: '主治医师', id: 'D20230111' },
    leaveDate: '2025-01-10',
    shift: 'full',
    originalSchedule: ['全天：值班'],
    reason: '个人原因',
    attachments: [],
    applyTime: '2025-01-08 09:00:00',
    status: 'rejected',
    rejectReason: '排班紧张，无法调剂',
    approver: '您',
    approveTime: '2025-01-08 11:00:00'
  }
]

export const getApprovalList = async (status: 'all' | ApprovalStatus = 'all'): Promise<LeaveApplicationDetail[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (status === 'all') {
        resolve([...mockList])
      } else {
        resolve(mockList.filter(item => item.status === status))
      }
    }, 500)
  })
}

export const getApprovalStats = async (): Promise<ApprovalStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pending: mockList.filter(i => i.status === 'pending').length,
        approvedMonth: 15, // Mock
        rejectedMonth: 2   // Mock
      })
    }, 300)
  })
}

export const approveApplication = async (id: string, remark?: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = mockList.find(i => i.id === id)
      if (item) {
        item.status = 'approved'
        item.remark = remark
        item.approver = '您'
        item.approveTime = new Date().toLocaleString()
      }
      resolve(true)
    }, 800)
  })
}

export const rejectApplication = async (id: string, reason: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = mockList.find(i => i.id === id)
      if (item) {
        item.status = 'rejected'
        item.rejectReason = reason
        item.approver = '您'
        item.approveTime = new Date().toLocaleString()
      }
      resolve(true)
    }, 800)
  })
}
