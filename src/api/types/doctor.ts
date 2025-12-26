export interface Schedule {
  schedule_id: number | string
  doctor_id: number | string
  doctor_name: string
  department_id: number | string
  department_name: string
  clinic_type: string
  date: string
  time_slot: string
  total_slots: number
  remaining_slots: number
  available_slot_types: string[]
}

export interface ScheduleItem {
  schedule_id: number
  doctor_id: number
  doctor_name: string
  clinic_id: number
  clinic_name: string
  clinic_type: number
  date: string
  week_day: number
  time_section: string
  slot_type: string
  total_slots: number
  remaining_slots: number
  status: string
  price: number
}

export interface ScheduleListResponse {
  schedules: ScheduleItem[]
}

export interface SchedulesResponse {
  schedules: Schedule[]
}

export interface Patient {
  orderId: string | number
  patientId: string | number
  patientName: string
  gender?: string
  age?: number | null
  queueNumber: string
  status: 'confirmed' | 'completed' | 'passed' | 'waiting' | 'no_show'
  isCall?: boolean
  callTime?: string | null
  visitTime?: string | null
  completedTime?: string | null
  passCount: number
  priority?: number
  isNoShow?: boolean
}

export interface QueueStats {
  totalSlots: number
  confirmedCount: number
  waitlistCount: number
  completedCount: number
  waitingCount: number
  passedCount: number
}

export interface ScheduleInfo {
  scheduleId: number | string
  doctorId: number | string
  date: string
  timeSection: string
}

export interface QueueData {
  stats: QueueStats
  scheduleInfo: ScheduleInfo
  currentPatient: Patient | null
  nextPatient: Patient | null
  queue: Patient[]
  waitlist: Patient[]
  completedQueue: Patient[]
}

export interface CallNextResponse {
  detail: string
  nextPatient: Patient
  scheduleId: number | string
}

export interface PassPatientResponse {
  detail: string
  passedPatient: Patient
  nextPatient: Patient
  scheduleId: number | string
}

export interface CompletePatientResponse {
  detail: string
  completedPatient: Patient
  scheduleId: number | string
}

export interface AddPatientParams {
  schedule_id: string | number
  patient_id: string | number
  slot_type: string
  reason: string
}

export interface AddSlotResponse {
  detail: string
  audit_id?: number
  order_id?: number
}

export interface AddSlotAudit {
  audit_id: number
  schedule_id: number
  doctor_id: number
  patient_id: number
  slot_type: string
  reason: string
  applicant_id: number
  submit_time: string
  status: 'pending' | 'approved' | 'rejected'
  auditor_user_id: number | null
  audit_time: string | null
  audit_remark: string | null
  patient_name?: string // Optional, in case backend adds it later or we mock it
}

export interface AddSlotAuditsResponse {
  audits: AddSlotAudit[]
}

export interface SearchPatientResult {
  patients: {
    patient_id: string
    name: string
    gender: string
    age: number
    phone: string
    identifier?: string
    idCard?: string
  }[]
}
