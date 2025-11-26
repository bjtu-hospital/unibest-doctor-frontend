import type { PatientDetailData } from './types'

/**
 * 患者详情Mock数据
 */
export const mockPatientDetail: PatientDetailData = {
  basicInfo: {
    name: '张三',
    gender: '男',
    age: 35,
    height: 175,
    phone: '138****5678',
    idCard: '110101199001011234',
    address: '北京市海淀区学院路37号北京交通大学',
  },
  medicalHistory: {
    pastHistory: [
      '2020年患急性阑尾炎，已手术治疗',
      '2018年患轻度高血压，正在药物控制中',
      '儿童时期患有哮喘，目前已康复',
    ],
    allergyHistory: [
      '青霉素过敏',
      '海鲜过敏（虾、蟹）',
      '花粉过敏',
    ],
    familyHistory: [
      '父亲患有高血压',
      '母亲患有糖尿病',
    ],
  },
  consultationRecords: [
    {
      id: '1',
      visitDate: '2025-01-20 14:30',
      department: '内科',
      doctorName: '李医生',
      chiefComplaint: '头痛、发热2天',
      diagnosis: '上呼吸道感染',
      prescription: '阿莫西林胶囊 0.5g tid，布洛芬片 0.2g tid',
      status: '已完成',
    },
    {
      id: '2',
      visitDate: '2025-01-15 10:00',
      department: '皮肤科',
      doctorName: '王医生',
      chiefComplaint: '皮肤瘙痒3天',
      diagnosis: '过敏性皮炎',
      prescription: '氯雷他定片 10mg qd，外用炉甘石洗剂',
      status: '已完成',
    },
    {
      id: '3',
      visitDate: '2025-01-10 16:20',
      department: '骨科',
      doctorName: '赵医生',
      chiefComplaint: '右膝关节疼痛1周',
      diagnosis: '膝关节韧带损伤',
      prescription: '双氯芬酸钠缓释片 75mg bid，注意休息',
      status: '已完成',
    },
    {
      id: '4',
      visitDate: '2024-12-25 09:00',
      department: '眼科',
      doctorName: '孙医生',
      chiefComplaint: '视力模糊，眼睛干涩',
      diagnosis: '干眼症',
      prescription: '玻璃酸钠滴眼液，每日4次',
      status: '已完成',
    },
  ],
}
