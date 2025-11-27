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
      outpatientNo: '061651734',
      visitDate: '2025-07-05 09:04',
      department: '全科医学科(综合内科)门诊',
      doctorName: '姜岚',
      chiefComplaint: '胆红素代谢紊乱史',
      presentIllness: '胆红素代谢紊乱史，来诊复查化验',
      auxiliaryExam: '2025-04-25 13:07，常规生化，肝功4白蛋白/球蛋白 2.56；*直接胆红素 8.7*umol/L；',
      diagnosis: '胆红素代谢紊乱',
      prescription: '1.全血细胞计数+5分类\n2.凝血分析\n3.生化23\n4.乙肝2\n5.艾滋病联合试验(HIVcombin)\n6.甲苯胺红不加热血清试验(TRUST)\n7.胸部正位\n8.十二通道常规心电图检查\n9.静脉采血 1次',
      status: 'completed',
    },
    {
      id: '2',
      outpatientNo: '061651735',
      visitDate: '2025-01-20 14:30',
      department: '内科',
      doctorName: '李医生',
      chiefComplaint: '头痛、发热2天',
      presentIllness: '患者2天前无明显诱因出现头痛、发热，体温最高38.5℃，伴有轻微咳嗽、流涕',
      auxiliaryExam: '血常规：WBC 11.2×10^9/L，中性粒细胞比例 75%',
      diagnosis: '上呼吸道感染',
      prescription: '阿莫西林胶囊 0.5g tid，布洛芬片 0.2g tid',
      status: 'completed',
    },
    {
      id: '3',
      outpatientNo: '061651736',
      visitDate: '2025-01-15 10:00',
      department: '皮肤科',
      doctorName: '王医生',
      chiefComplaint: '皮肤瘙痒3天',
      presentIllness: '患者3天前进食海鲜后出现全身皮肤瘙痒，伴红色皮疹',
      auxiliaryExam: '过敏原检测：海鲜类阳性',
      diagnosis: '过敏性皮炎',
      prescription: '氯雷他定片 10mg qd，外用炉甘石洗剂',
      status: 'completed',
    },
    {
      id: '4',
      outpatientNo: '061651737',
      visitDate: '2025-01-10 16:20',
      department: '骨科',
      doctorName: '赵医生',
      chiefComplaint: '右膝关节疼痛1周',
      presentIllness: '患者1周前运动后出现右膝关节疼痛，活动时加重，休息后缓解',
      auxiliaryExam: 'MRI检查：右膝前交叉韧带部分损伤',
      diagnosis: '膝关节韧带损伤',
      prescription: '双氯芬酸钠缓释片 75mg bid，注意休息',
      status: 'completed',
    },
  ],
}
