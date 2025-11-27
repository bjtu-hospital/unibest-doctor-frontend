import { http } from '@/http/http'
import type { ClinicType, Doctor, ScheduleSlot } from '@/types/schedule'

const USE_MOCK = false

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

export async function getClinicList(): Promise<ClinicType[]> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockClinics])
      }, 300)
    })
  }

  try {
    const res = await http.get<any>('/doctor/schedule/clinics')
    const list = Array.isArray(res) ? res : (res?.clinics || [])
    return list.map((item: any) => ({
      id: String(item.id),
      name: item.name,
      totalSlots: item.totalSlots || item.total_slots || 0,
      filledSlots: item.filledSlots || item.filled_slots || 0,
    }))
  }
  catch (error) {
    console.error('Failed to fetch clinic list:', error)
    return []
  }
}

export async function getScheduleList(clinicId: string, startDate: string): Promise<ScheduleSlot[]> {
  if (USE_MOCK) {
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
          shifts.forEach((shift) => {
            const isFilled = Math.random() > 0.5
            const doctor = isFilled ? mockDoctors[Math.floor(Math.random() * mockDoctors.length)] : undefined

            slots.push({
              date: dateStr,
              dayOfWeek: i + 1,
              shift,
              status: isFilled ? 'filled' : 'empty',
              doctorId: doctor?.id,
              doctorName: doctor?.name,
              doctorTitle: doctor?.title,
            })
          })
        }
        resolve(slots)
      }, 500)
    })
  }

  try {
    const res = await http.get<any>('/doctor/schedule/list', {
      clinicId,
      startDate,
    })

    const list = Array.isArray(res) ? res : (res?.schedule || [])
    return list.map((item: any) => ({
      date: item.date,
      dayOfWeek: new Date(item.date).getDay() || 7,
      shift: item.shift,
      status: item.status, // 'empty' | 'filled' | 'unavailable'
      doctorId: item.doctorId ? String(item.doctorId) : (item.doctor_id ? String(item.doctor_id) : undefined),
      doctorName: item.doctorName || item.doctor_name,
      doctorTitle: item.doctorTitle || item.doctor_title,
    }))
  }
  catch (error) {
    console.error('Failed to fetch schedule list:', error)
    return []
  }
}

export async function getAvailableDoctors(clinicId: string, date: string, shift: string): Promise<Doctor[]> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockDoctors])
      }, 300)
    })
  }

  try {
    const res = await http.get<any>('/doctor/schedule/available-doctors', {
      clinicId,
      date,
      shift,
    })

    const list = Array.isArray(res) ? res : (res?.doctors || [])
    return list.map((item: any) => ({
      id: String(item.id),
      name: item.name,
      title: item.title,
      dept: item.department,
      status: item.status, // 'available' | 'conflict' | 'leave'
      conflictReason: item.conflictReason || item.conflict_reason,
      leaveReason: item.leaveReason || item.leave_reason,
      assignedCount: item.assignedCount || item.assigned_count || 0,
    }))
  }
  catch (error) {
    console.error('Failed to fetch available doctors:', error)
    return []
  }
}

export async function submitScheduleChange(clinicId: string, changes: ScheduleSlot[]): Promise<boolean> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitting schedule change request for clinic:', clinicId, 'Changes:', changes)
        resolve(true)
      }, 800)
    })
  }

  try {
    const payload = {
      clinicId,
      changes: changes.map(c => ({
        date: c.date,
        shift: c.shift,
        doctorId: c.doctorId,
        status: c.status,
      })),
    }

    await http.post('/doctor/schedule/submit-change', payload)
    return true
  }
  catch (error) {
    console.error('Failed to submit schedule change:', error)
    return false
  }
}
