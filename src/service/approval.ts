import { http } from '@/http/http'
import { getEnvBaseUrl } from '@/utils'
import type { ApprovalStats, ApprovalStatus, LeaveApplicationDetail } from '@/types/approval'

const USE_MOCK = false

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
    status: 'pending',
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
    status: 'pending',
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
    approveTime: '2025-01-14 14:30:00',
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
    approveTime: '2025-01-08 11:00:00',
  },
]

export async function getApprovalList(status: 'all' | ApprovalStatus = 'all'): Promise<LeaveApplicationDetail[]> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (status === 'all') {
          resolve([...mockList])
        }
        else {
          resolve(mockList.filter(item => item.status === status))
        }
      }, 500)
    })
  }

  try {
    const res = await http.get<{ audits: any[] }>('/doctor/leave/audit', {
      status: status === 'all' ? undefined : status,
      page: 1,
      page_size: 100,
    })

    if (res && res.audits) {
      return res.audits.map((item: any) => ({
        id: String(item.id),
        doctor: {
          name: item.doctor_name,
          dept: item.department_name,
          title: item.doctor_title,
          id: String(item.doctor_id),
          avatar: '', // Backend doesn't provide avatar
        },
        leaveDate: item.leave_start_date,
        shift: item.shift || 'full', // Use shift from backend
        originalSchedule: [], // Defaulting
        reason: item.reason,
        attachments: (item.attachments || []).map((url: string) => {
          if (url.startsWith('http'))
            return url
          return `${getEnvBaseUrl()}/${url.replace(/^\//, '')}`
        }),
        applyTime: item.submit_time,
        status: item.status,
        approver: item.auditor_id ? String(item.auditor_id) : undefined,
        approveTime: item.audit_time,
        remark: item.audit_remark,
        rejectReason: item.status === 'rejected' ? item.audit_remark : undefined,
      }))
    }
    return []
  }
  catch (error) {
    console.error('Failed to fetch approval list:', error)
    return []
  }
}

export async function getApprovalStats(): Promise<ApprovalStats> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          pending: mockList.filter(i => i.status === 'pending').length,
          approvedMonth: 15, // Mock
          rejectedMonth: 2, // Mock
        })
      }, 300)
    })
  }

  try {
    const res = await http.get<{ pending: number, approvedMonth: number, rejectedMonth: number }>('/doctor/approval/stats')
    
    return {
      pending: res.pending || 0,
      approvedMonth: res.approvedMonth || 0,
      rejectedMonth: res.rejectedMonth || 0,
    }
  }
  catch (error) {
    console.error('Failed to fetch stats:', error)
    return { pending: 0, approvedMonth: 0, rejectedMonth: 0 }
  }
}

export async function approveApplication(id: string, remark?: string): Promise<boolean> {
  if (USE_MOCK) {
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

  try {
    await http.post(`/doctor/leave/audit/${id}/approve`, { comment: remark || '' })
    return true
  }
  catch (error) {
    console.error('Failed to approve:', error)
    return false
  }
}

export async function rejectApplication(id: string, reason: string): Promise<boolean> {
  if (USE_MOCK) {
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

  try {
    await http.post(`/doctor/leave/audit/${id}/reject`, { comment: reason })
    return true
  }
  catch (error) {
    console.error('Failed to reject:', error)
    return false
  }
}

