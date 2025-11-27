import type {
  AddPatientParams,
  QueueData,
  SchedulesResponse,
  SearchPatientResult,
} from './types/doctor'
import { httpGet, httpPost } from '@/http/http'
import {
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

export function callNextPatient(scheduleId: string | number): Promise<void> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }
  return httpPost('/doctor/consultation/next', { schedule_id: scheduleId })
}

export function passPatient(patientOrderId: string): Promise<void> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }
  return httpPost('/doctor/consultation/pass', { patient_order_id: patientOrderId })
}

export function addPatient(params: AddPatientParams): Promise<void> {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }
  return httpPost('/doctor/consultation/add', params)
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
