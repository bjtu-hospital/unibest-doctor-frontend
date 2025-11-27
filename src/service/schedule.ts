import type { ClinicType, Doctor, ScheduleSlot, WeekInfo } from '@/types/schedule'

// Mock Data
const mockClinics: ClinicType[] = [
  { id: '1', name: '心内科门诊', totalSlots: 21, filledSlots: 15 },
  { id: '2', name: '专家门诊', totalSlots: 21, filledSlots: 12 },
  { id: '3', name: '急诊门诊', totalSlots: 21, filledSlots: 21 },
]

const mockDoctors: Doctor[] = [
  { id: 'D001', name: '李医生', title: '主治医师', dept: '心内科', status: 'available', assignedCount: 3 },
  { id: 'D002', name: '王医生', title: '副主任医师', dept: '心内科', status: 'conflict', conflictReason: '周一下午已有排班', assignedCount: 4 },
  { id: 'D003', name: '张医生', title: '主治医师', dept: '心内科', status: 'leave', leaveReason: '周一全天请假', assignedCount: 0 },
  { id: 'D004', name: '刘医生', title: '住院医师', dept: '心内科', status: 'available', assignedCount: 5 },
]

// Service Functions

export const getClinicList = async (): Promise<ClinicType[]> => {
  // 模拟后端请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockClinics])
    }, 300)
  })
}

export const getScheduleList = async (clinicId: string, startDate: string): Promise<ScheduleSlot[]> => {
  // 模拟后端请求：根据门诊ID和开始日期获取排班表
  return new Promise((resolve) => {
    setTimeout(() => {
      const slots: ScheduleSlot[] = []
      const start = new Date(startDate)
      
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(start)
        currentDate.setDate(start.getDate() + i)
        const dateStr = currentDate.toISOString().split('T')[0]
        
        // Mock: 随机生成一些排班
        const shifts: ('morning' | 'afternoon' | 'night')[] = ['morning', 'afternoon', 'night']
        shifts.forEach(shift => {
          const isFilled = Math.random() > 0.5
          const doctor = isFilled ? mockDoctors[Math.floor(Math.random() * mockDoctors.length)] : undefined
          
          slots.push({
            date: dateStr,
            dayOfWeek: i + 1,
            shift,
            status: isFilled ? 'filled' : 'empty',
            doctorId: doctor?.id,
            doctorName: doctor?.name,
            doctorTitle: doctor?.title
          })
        })
      }
      resolve(slots)
    }, 500)
  })
}

export const getAvailableDoctors = async (date: string, shift: string): Promise<Doctor[]> => {
  // 模拟后端请求：获取某天某班次可用的医生列表（包含冲突和请假状态）
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockDoctors])
    }, 300)
  })
}

export const saveSchedule = async (clinicId: string, changes: ScheduleSlot[]): Promise<boolean> => {
  // 模拟后端请求：保存排班修改
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Saving schedule for clinic:', clinicId, 'Changes:', changes)
      resolve(true)
    }, 800)
  })
}
