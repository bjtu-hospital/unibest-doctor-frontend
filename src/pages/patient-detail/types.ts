/**
 * 患者基本信息
 */
export interface BasicInfo {
  name: string
  gender: string
  age: number
  height: number
  phone: string
  idCard: string
  address: string
}

/**
 * 患者病史信息
 */
export interface MedicalHistory {
  pastHistory: string[] // 既往病史
  allergyHistory: string[] // 过敏史
  familyHistory: string[] // 家族史
}

/**
 * 就诊记录
 */
export interface ConsultationRecord {
  id: string
  visitDate: string // 就诊日期
  department: string // 科室
  doctorName: string // 医生姓名
  chiefComplaint: string // 主诉
  diagnosis: string // 诊断
  prescription?: string // 处方
  status: string // 状态：已完成、进行中、已取消
}

/**
 * 患者详情完整数据
 */
export interface PatientDetailData {
  basicInfo: BasicInfo
  medicalHistory: MedicalHistory
  consultationRecords: ConsultationRecord[]
}
