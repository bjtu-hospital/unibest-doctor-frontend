import type { WorkbenchData } from '@/service/workbench'

/**
 * 工作台 Mock 数据
 */

export const mockWorkbenchData: WorkbenchData = {
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
    {
      id: 2,
      type: 'leave',
      title: '明日有请假审批待处理',
      icon: 'document',
      time: '明天',
    },
  ],
  recentRecords: [
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
      diagnosis: '感冒发烧',
    },
    {
      id: 249,
      patientName: '王五',
      consultationTime: '09:21',
      diagnosis: '糖尿病复查',
    },
  ],
}
