import type {
  AddPatientParams,
  AddSlotAuditsResponse,
  AddSlotResponse,
  CallNextResponse,
  CompletePatientResponse,
  PassPatientResponse,
  QueueData,
  ScheduleListResponse,
  SchedulesResponse,
  SearchPatientResult,
} from './types/doctor'
import { httpGet, httpPost } from '@/http/http'
import {
  mockExactPatients,
  mockPatients,
  mockQueueData,
  mockSchedules,
} from '@/pages/doctor/mock'

const USE_MOCK = false

export function getDoctorSchedules(doctorId: string): Promise<SchedulesResponse> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSchedules.message)
      }, 500)
    })
  }
  return httpGet('/doctor/schedules/today', { doctor_id: doctorId })
}

export function getDoctorScheduleList(params: { doctor_id: string | number, start_date: string, end_date: string }): Promise<ScheduleListResponse> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          schedules: [], // Mock empty for now or add mock data if needed
        })
      }, 500)
    })
  }
  return httpGet('/doctor/schedules', params)
}

export function getConsultationQueue(scheduleId: string | number): Promise<QueueData> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockQueueData as unknown as QueueData)
      }, 500)
    })
  }
  return httpGet('/doctor/consultation/queue', { schedule_id: scheduleId })
}

export function callNextPatient(scheduleId: string | number): Promise<CallNextResponse> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          detail: '已呼叫下一位',
          nextPatient: mockQueueData.queue[0] as any,
          scheduleId,
        })
      }, 500)
    })
  }
  return httpPost('/doctor/consultation/next', { schedule_id: scheduleId })
}

export function completeConsultation(params: { order_id: string | number }): Promise<CompletePatientResponse> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          detail: '就诊完成',
          completedPatient: mockQueueData.currentPatient as any,
          scheduleId: 5669,
        })
      }, 500)
    })
  }
  return httpPost('/doctor/consultation/complete', params)
}

export function passPatient(params: { order_id: string | number, max_pass_count?: number }): Promise<PassPatientResponse> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          detail: '过号成功',
          passedPatient: { ...mockQueueData.currentPatient, status: 'passed' } as any,
          nextPatient: mockQueueData.queue[0] as any,
          scheduleId: 5669,
        })
      }, 500)
    })
  }
  return httpPost('/doctor/consultation/pass', params)
}

export function addPatient(params: AddPatientParams): Promise<AddSlotResponse> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          detail: '加号申请已提交',
          audit_id: 2001,
        })
      }, 500)
    })
  }
  return httpPost('/doctor/schedules/add-slot', params)
}

export function getAddSlotAudits(): Promise<AddSlotAuditsResponse> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          audits: [
            {
              audit_id: 2001,
              schedule_id: 12345,
              doctor_id: 10,
              patient_id: 67890,
              slot_type: '普通',
              reason: '病人有特殊情况',
              applicant_id: 10,
              submit_time: '2025-11-13T10:00:00',
              status: 'pending',
              auditor_user_id: null,
              audit_time: null,
              audit_remark: null,
            },
          ],
        })
      }, 500)
    })
  }
  return httpGet('/doctor/schedules/add-slot')
}

export function cancelAddSlotAudit(auditId: string | number): Promise<void> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }
  return httpPost(`/doctor/schedules/add-slot/${auditId}/cancel`)
}

export function searchPatients(name: string): Promise<SearchPatientResult> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPatients as unknown as SearchPatientResult)
      }, 500)
    })
  }
  return httpGet('/patients', { name })
}

export function searchPatientsExact(keyword: string): Promise<SearchPatientResult> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 简单的 Mock 逻辑：如果是数字则匹配手机号，否则匹配姓名
        const isPhone = /^\d+$/.test(keyword)
        const results = mockExactPatients.patients.filter((p) => {
          if (isPhone) {
            return p.phone === keyword
          }
          return p.name === keyword
        })
        resolve({ patients: results })
      }, 500)
    })
  }
  return httpGet('/doctor/patients/exact-search', { keyword })
}
