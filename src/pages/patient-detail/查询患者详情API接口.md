# 患者详情模块 API 接口文档

## 1. 获取患者详情

获取指定患者的详细信息，包括基本信息、病史信息和就诊记录。

- **接口地址**: `/patient/{patientId}`
- **请求方式**: `GET`
- **请求参数**:
  - `patientId`: 路径参数，患者ID

- **响应数据**:
```json
{
  "code": 0,
  "message": {
    "patientId": "123456",
    "basicInfo": {
      "name": "张三",
      "gender": "男",
      "age": 35,
      "height": 175,
      "phone": "138****5678",
      "idCard": "110101********1234",
      "address": "北京市海淀区学院路37号北京交通大学"
    },
    "medicalHistory": {
      "pastHistory": [
        "2020年患急性阑尾炎，已手术治疗",
        "2018年患轻度高血压，正在药物控制中"
      ],
      "allergyHistory": [
        "青霉素过敏",
        "海鲜过敏（虾、蟹）"
      ],
      "familyHistory": [
        "父亲患有高血压",
        "母亲患有糖尿病"
      ]
    },
    "consultationRecords": [
      {
        "id": "1",
        "outpatientNo": "061651734",
        "visitDate": "2025-07-05 09:04",
        "department": "全科医学科(综合内科)门诊",
        "doctorName": "姜岚",
        "chiefComplaint": "胆红素代谢紊乱史",
        "presentIllness": "胆红素代谢紊乱史，来诊复查化验",
        "auxiliaryExam": "2025-04-25 13:07，常规生化，肝功4白蛋白/球蛋白 2.56；*直接胆红素 8.7*umol/L；",
        "diagnosis": "胆红素代谢紊乱",
        "prescription": "1.全血细胞计数+5分类\n2.凝血分析\n3.生化23",
        "status": "completed",
        "pdfUrl": "https://example.com/medical-records/12345.pdf"
      }
    ]
  }
}
```

### 响应字段说明

#### basicInfo 对象

| 字段名 | 类型 | 说明 |
|--------|------|------|
| name | string | 患者姓名 |
| gender | string | 性别（男/女） |
| age | number | 年龄（岁） |
| height | number | 身高（cm） |
| phone | string | 联系电话（已脱敏） |
| idCard | string | 身份证号（已脱敏） |
| address | string | 居住地址 |

#### medicalHistory 对象

| 字段名 | 类型 | 说明 |
|--------|------|------|
| pastHistory | array | 既往病史列表 |
| allergyHistory | array | 过敏史列表 |
| familyHistory | array | 家族病史列表 |

#### consultationRecords 数组元素

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | string | 就诊记录ID |
| outpatientNo | string | 门诊号 |
| visitDate | string | 就诊日期时间（格式：YYYY-MM-DD HH:mm） |
| department | string | 就诊科室 |
| doctorName | string | 接诊医生姓名 |
| chiefComplaint | string | 主诉 |
| presentIllness | string | 现病史 |
| auxiliaryExam | string | 辅助检查（可选） |
| diagnosis | string | 初步诊断 |
| prescription | string | 处置/处方（可选） |
| status | string | 就诊状态（completed/ongoing/cancelled） |
| pdfUrl | string | 病历单PDF文件URL（可选，用于在线预览和下载） |

### 错误响应

```json
{
  "code": 404,
  "message": "患者不存在"
}
```

#### 常见错误码

| 错误码 | 说明 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 无权限访问 |
| 404 | 患者不存在 |
| 500 | 服务器错误 |

---

## 2. 生成病历单 PDF

根据就诊记录ID生成病历单PDF文件，返回PDF下载链接。

- **接口地址**: `/medical-record/{recordId}/pdf`
- **请求方式**: `GET`
- **请求参数**:
  - `recordId`: 路径参数，就诊记录ID

- **响应数据**:
```json
{
  "code": 0,
  "message": {
    "url": "https://example.com/medical-records/pdf/12345.pdf",
    "fileName": "病历单_张三_2025-07-05.pdf",
    "expireTime": "2025-07-06T09:04:00Z"
  }
}
```

### 响应字段说明

| 字段名 | 类型 | 说明 |
|--------|------|------|
| url | string | PDF文件下载地址 |
| fileName | string | 建议的文件名 |
| expireTime | string | 链接过期时间（ISO 8601格式） |

### 错误响应

```json
{
  "code": 404,
  "message": "就诊记录不存在"
}
```

### 实现建议

1. **PDF内容**: 参考前端病历单页面的样式，包含：
   - 医院Logo和名称
   - 患者基本信息（姓名、性别、年龄、门诊号、就诊日期、科室、医生）
   - 主诉、现病史、辅助检查、诊断、处置/处方
   - 医师签名、日期、医院印章

2. **PDF生成方案**:
   - Java: 使用 iText、Apache PDFBox 或 Flying Saucer (HTML转PDF)
   - Node.js: 使用 Puppeteer、PDFKit 或 html-pdf

3. **文件存储**: 建议使用OSS等对象存储，设置合理的过期时间

---

## 数据类型定义（TypeScript）

```typescript
/**
 * 患者基本信息
 */
export interface BasicInfo {
  name: string          // 患者姓名
  gender: string        // 性别（男/女）
  age: number          // 年龄（岁）
  height: number       // 身高（cm）
  phone: string        // 联系电话
  idCard: string       // 身份证号
  address: string      // 居住地址
}

/**
 * 患者病史信息
 */
export interface MedicalHistory {
  pastHistory: string[]     // 既往病史
  allergyHistory: string[]  // 过敏史
  familyHistory: string[]   // 家族病史
}

/**
 * 就诊记录（病历单）
 */
export interface ConsultationRecord {
  id: string              // 记录ID
  outpatientNo: string    // 门诊号
  visitDate: string       // 就诊日期时间
  department: string      // 科室
  doctorName: string      // 医生姓名
  chiefComplaint: string  // 主诉
  presentIllness: string  // 现病史
  auxiliaryExam?: string  // 辅助检查（可选）
  diagnosis: string       // 初步诊断
  prescription?: string   // 处置/处方（可选）
  status: string          // 状态：completed/ongoing/cancelled
}

/**
 * 患者详情完整数据
 */
export interface PatientDetailData {
  basicInfo: BasicInfo
  medicalHistory: MedicalHistory
  consultationRecords: ConsultationRecord[]
}
```

---

## 注意事项

### 1. 数据安全

- **敏感信息脱敏**: 
  - 手机号：保留前3位和后4位，中间用 `****` 替代（如：138****5678）
  - 身份证号：保留前6位和后4位，中间用 `********` 替代

### 2. 状态码说明

| 状态值 | 中文说明 |
|--------|---------|
| completed | 已完成 |
| ongoing | 进行中 |
| cancelled | 已取消 |

### 3. 数据格式

- **日期时间**: 统一使用 `YYYY-MM-DD HH:mm` 格式
- **空值处理**: 数组类型无数据时返回空数组 `[]`，可选字段可省略

---

## 更新记录

| 版本 | 日期 | 修改内容 | 修改人 |
|------|------|----------|--------|
| v1.0 | 2025-11-26 | 初始版本 | - |
| v1.1 | 2025-11-26 | 新增门诊号、现病史、辅助检查字段 | - |
| v1.2 | 2025-11-27 | 新增生成病历单PDF接口文档 | - |
