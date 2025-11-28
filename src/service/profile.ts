import { http } from '@/http/http'

// ============================================
// Mock开关配置
// ============================================
// true:  使用 Mock 数据（开发测试）
// false: 使用真实接口（生产环境）
// ============================================
const USE_MOCK = false
// ============================================

// 个人统计数据类型
export interface ProfileStats {
  attendance: number // 本月出勤天数
  monthlyConsult: number // 本月接诊人数
  totalConsult: number // 累计接诊人数
}

// Mock数据
const mockStats: ProfileStats = {
  attendance: 22,
  monthlyConsult: 156,
  totalConsult: 3240,
}

/**
 * 获取个人统计数据
 * @returns 统计数据
 */
export async function getProfileStats(): Promise<ProfileStats> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockStats })
      }, 300)
    })
  }

  try {
    const res = await http.get<{
      attendance?: number
      monthly_consult?: number
      total_consult?: number
      // 兼容驼峰命名
      monthlyConsult?: number
      totalConsult?: number
    }>('/doctor/profile/stats')

    return {
      attendance: res.attendance || 0,
      monthlyConsult: res.monthly_consult || res.monthlyConsult || 0,
      totalConsult: res.total_consult || res.totalConsult || 0,
    }
  }
  catch (error) {
    console.error('Failed to fetch profile stats:', error)
    // 失败时返回默认值
    return {
      attendance: 0,
      monthlyConsult: 0,
      totalConsult: 0,
    }
  }
}

/**
 * 修改密码
 * @param oldPassword 旧密码
 * @param newPassword 新密码
 * @returns 是否成功
 */
export async function changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock: 模拟成功
        resolve(true)
      }, 800)
    })
  }

  try {
    await http.post('/doctor/password/change', {
      old_password: oldPassword,
      new_password: newPassword,
    })
    return true
  }
  catch (error) {
    console.error('Failed to change password:', error)
    throw error
  }
}

/**
 * 获取消息通知设置
 * @returns 通知设置
 */
export interface NotificationSettings {
  scheduleChange: boolean // 排班变更通知
  leaveApproval: boolean // 请假审批通知
  systemAnnouncement: boolean // 系统公告
  patientAppointment: boolean // 患者预约通知
}

export async function getNotificationSettings(): Promise<NotificationSettings> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          scheduleChange: true,
          leaveApproval: true,
          systemAnnouncement: true,
          patientAppointment: true,
        })
      }, 300)
    })
  }

  try {
    const res = await http.get<{
      schedule_change?: boolean
      leave_approval?: boolean
      system_announcement?: boolean
      patient_appointment?: boolean
    }>('/doctor/notification/settings')

    return {
      scheduleChange: res.schedule_change ?? true,
      leaveApproval: res.leave_approval ?? true,
      systemAnnouncement: res.system_announcement ?? true,
      patientAppointment: res.patient_appointment ?? true,
    }
  }
  catch (error) {
    console.error('Failed to fetch notification settings:', error)
    return {
      scheduleChange: true,
      leaveApproval: true,
      systemAnnouncement: true,
      patientAppointment: true,
    }
  }
}

/**
 * 更新消息通知设置
 * @param settings 通知设置
 * @returns 是否成功
 */
export async function updateNotificationSettings(settings: NotificationSettings): Promise<boolean> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 500)
    })
  }

  try {
    await http.post('/doctor/notification/settings', {
      schedule_change: settings.scheduleChange,
      leave_approval: settings.leaveApproval,
      system_announcement: settings.systemAnnouncement,
      patient_appointment: settings.patientAppointment,
    })
    return true
  }
  catch (error) {
    console.error('Failed to update notification settings:', error)
    throw error
  }
}
