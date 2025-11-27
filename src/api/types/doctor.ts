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

export interface SchedulesResponse {
  schedules: Schedule[]
}

export interface Patient {
  orderId: string
  patientId: string
  patientName: string
  queueNumber: string
  gender: string
  age: number
  visitTime: string
  passCount: number
}

export interface NextPatientPreview {
  patientName: string
  queueNumber: string
}

export interface QueueStats {
  totalSlots: number
  waitingCount: number
  completedCount: number
  passedCount: number
}

export interface QueueData {
  stats: QueueStats
  currentPatient: Patient | null
  nextPatient: NextPatientPreview | null
  queue: Patient[]
  waitlist: Patient[]
  completedList: Patient[]
  invalidList: Patient[]
}

export interface AddPatientParams {
  schedule_id: string | number
  patient_id: string
  priority: number // 1: 队尾(普通), 0: 下一位(优先)
  reason: string
}

export interface SearchPatientResult {
  patients: {
    patient_id: string
    name: string
    gender: string
    age: number
    phone: string
  }[]
}
