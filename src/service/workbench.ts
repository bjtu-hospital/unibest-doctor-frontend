import { http } from '@/http/http'

// ============================================
// Mock开关配置
// ============================================
// true:  使用 Mock 数据（开发测试）
// false: 使用真实接口（生产环境）
// 目前恢复为调用真实接口
// ============================================
const USE_MOCK = false
// ============================================

// ========== 类型定义 ==========

/** 医生信息 */
export interface DoctorInfo {
  id: number
  name: string
  title: string
  department: string
  photo_path: string
}

/** 班次信息 */
export interface ShiftInfo {
  id: number
  name: string
  startTime: string // HH:mm
  endTime: string // HH:mm
  location: string
  countdown?: string
}

/** 签到签退状态 */
export type ShiftStatusType = 'not_checkin' | 'checked_in' | 'checkout_pending' | 'checked_out'

/** 班次状态 */
export interface ShiftStatus {
  status: ShiftStatusType
  currentShift: ShiftInfo | null
  checkinTime: string | null
  checkoutTime: string | null
  workDuration: string | null
  timeToCheckout: string | null
}

/** 今日数据统计 */
export interface TodayData {
  pendingConsultation: number
  ongoingConsultation: number
  completedConsultation: number
  totalConsultation: number
}

/** 提醒事项 */
export interface Reminder {
  id: number
  type: string
  title: string
  icon: string
  time: string
}

/** 最近接诊记录 */
export interface RecentRecord {
  id: number
  patientName: string
  consultationTime: string
  diagnosis: string | null
}

/** 工作台数据 */
export interface WorkbenchData {
  doctor: DoctorInfo
  shiftStatus: ShiftStatus
  todayData: TodayData
  reminders: Reminder[]
  recentRecords: RecentRecord[]
}

/** 签到请求参数 */
export interface CheckinRequest {
  shiftId: number
  latitude: number
  longitude: number
}

/** 签到响应 */
export interface CheckinResponse {
  checkinTime: string
  status: string
  message: string
  workDuration: string
}

/** 签退响应 */
export interface CheckoutResponse {
  checkoutTime: string
  workDuration: string
  status: string
  message: string
}

/** 班次列表项 */
export interface ShiftItem {
  id: number
  name: string
  startTime: string
  endTime: string
  location: string
  status: string
}

/** 接诊统计 */
export interface ConsultationStats {
  pending: number
  ongoing: number
  completed: number
  total: number
}

// 接诊队列统计
export interface ConsultationQueueStats {
  totalSlots: number
  confirmedCount: number
  waitlistCount: number
  completedCount: number
  waitingCount: number
  passedCount: number
}

// 接诊队列接口返回的关键结构（这里只保留当前需要的字段）
export interface ConsultationQueueResponse {
  stats: ConsultationQueueStats
}

// ========== Mock 数据 ==========

const mockWorkbenchData: WorkbenchData = {
  doctor: {
    id: 14,
    name: '刘书旺',
    title: '主任医师',
    department: '心血管内科',
    photo_path: '/static/images/doctor/doctor_14.jpg',
  },
  shiftStatus: {
    status: 'not_checkin',
    currentShift: {
      id: 1,
      name: '上午门诊',
      startTime: '08:00',
      endTime: '12:00',
      location: '门诊楼3楼',
      countdown: '距离签到还有30分钟',
    },
    checkinTime: null,
    checkoutTime: null,
    workDuration: null,
    timeToCheckout: null,
  },
  todayData: {
    pendingConsultation: 10,
    ongoingConsultation: 16,
    completedConsultation: 10,
    totalConsultation: 36,
  },
  reminders: [
    {
      id: 1,
      type: 'system',
      title: '请按时签到',
      icon: 'bell',
      time: '08:00',
    },
  ],
  recentRecords: [
    {
      id: 152,
      patientName: '张三',
      consultationTime: '10:03',
      diagnosis: '高血压',
    },
    {
      id: 151,
      patientName: '李四',
      consultationTime: '09:45',
      diagnosis: '感冒',
    },
  ],
}

// ========== API 函数 ==========



/**
 * 签到
 */
export async function checkin(params: CheckinRequest): Promise<CheckinResponse> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          checkinTime: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          status: 'checked_in',
          message: '签到成功',
          workDuration: '0小时0分钟',
        })
      }, 800)
    })
  }

  try {
    // http 层会自动提取 responseData.data 或 responseData.message
    const res = await http.post<CheckinResponse>('/doctor/workbench/checkin', params)
    return res
  }
  catch (error) {
    console.error('Failed to check in:', error)
    throw error
  }
}

/**
 * 签退
 */
export async function checkout(params: CheckinRequest): Promise<CheckoutResponse> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          checkoutTime: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          workDuration: '3小时47分钟',
          status: 'checked_out',
          message: '签退成功',
        })
      }, 800)
    })
  }

  try {
    // http 层会自动提取 responseData.data 或 responseData.message
    const res = await http.post<CheckoutResponse>('/doctor/workbench/checkout', params)
    return res
  }
  catch (error) {
    console.error('Failed to check out:', error)
    throw error
  }
}

/**
 * 获取班次信息
 */
export async function getShifts(doctorId: number, date?: string): Promise<ShiftItem[]> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock getShifts called with:', { doctorId, date })
        resolve([
          {
            id: 1,
            name: '中医科内科',
            startTime: '08:00',
            endTime: '12:00',
            location: '中医科门诊',
            status: 'not_started',
          },
          {
            id: 2,
            name: '心血管内科',
            startTime: '14:00',
            endTime: '18:00', 
            location: '内科门诊',
            status: 'not_started',
          },
          {
            id: 3,
            name: '急诊科',
            startTime: '18:00',
            endTime: '22:00',
            location: '急诊科',
            status: 'not_started',
          }
        ])
      }, 300)
    })
  }

  try {
    // http 层会自动提取 responseData.data 或 responseData.message
    const res = await http.get<{ shifts: ShiftItem[] }>('/doctor/workbench/shifts', {
      doctorId,
      date,
    })
    return res.shifts || []
  }
  catch (error) {
    console.error('Failed to fetch shifts:', error)
    return []
  }
}

/**
 * 获取接诊统计
 */
export async function getConsultationStats(doctorId: number): Promise<ConsultationStats> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          pending: 10,
          ongoing: 16,
          completed: 10,
          total: 36,
        })
      }, 300)
    })
  }

  try {
    // http 层会自动提取 responseData.data 或 responseData.message
    const res = await http.get<ConsultationStats>('/doctor/workbench/consultation-stats', {
      doctorId,
    })
    return res || { pending: 0, ongoing: 0, completed: 0, total: 0 }
  }
  catch (error) {
    console.error('Failed to fetch consultation stats:', error)
    return { pending: 0, ongoing: 0, completed: 0, total: 0 }
  }
}

/**
 * 获取当前排班的接诊队列信息
 * 对应接口：GET /doctor/consultation/queue
 */
export async function getConsultationQueue(scheduleId: number): Promise<ConsultationQueueResponse | null> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          stats: {
            totalSlots: 2,
            confirmedCount: 2,
            waitlistCount: 0,
            completedCount: 0,
            waitingCount: 2,
            passedCount: 0,
          },
        })
      }, 300)
    })
  }

  try {
    // schedule_id 为排班ID（唯一标识某次出诊）
    const res = await http.get<ConsultationQueueResponse>('/doctor/consultation/queue', {
      schedule_id: scheduleId,
    })
    return res || null
  }
  catch (error) {
    console.error('Failed to fetch consultation queue:', error)
    return null
  }
}

/**
 * 获取最近接诊记录
 */
export async function getRecentConsultations(doctorId: number, limit: number = 3): Promise<RecentRecord[]> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 252,
            patientName: '张三',
            consultationTime: '11:16',
            diagnosis: '高血压',
          },
          {
            id: 251,
            patientName: '李四',
            consultationTime: '10:45',
            diagnosis: '感冒',
          },
        ])
      }, 300)
    })
  }

  try {
    // http 层会自动提取 responseData.data 或 responseData.message
    const res = await http.get<{ records: RecentRecord[] }>('/doctor/workbench/recent-consultations', {
      doctorId,
      limit,
    })
    return res.records || []
  }
  catch (error) {
    console.error('Failed to fetch recent consultations:', error)
    return []
  }
}
