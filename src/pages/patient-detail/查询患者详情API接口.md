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
        "visitDate": "2025-01-20 14:30",
        "department": "内科",
        "doctorName": "李医生",
        "chiefComplaint": "头痛、发热2天",
        "diagnosis": "上呼吸道感染",
        "prescription": "阿莫西林胶囊 0.5g tid，布洛芬片 0.2g tid",
        "status": "completed"      // completed: 已完成, ongoing: 进行中, cancelled: 已取消
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
| visitDate | string | 就诊日期时间（格式：YYYY-MM-DD HH:mm） |
| department | string | 就诊科室 |
| doctorName | string | 接诊医生姓名 |
| chiefComplaint | string | 主诉 |
| diagnosis | string | 诊断结果 |
| prescription | string | 处方信息（可选） |
| status | string | 就诊状态（completed/ongoing/cancelled） |

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
| address | string | 是 | 居住地址 |

##### medicalHistory 对象

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| pastHistory | array | 是 | 既往病史列表，无记录时返回空数组 |
| allergyHistory | array | 是 | 过敏史列表，无记录时返回空数组 |
| familyHistory | array | 是 | 家族病史列表，无记录时返回空数组 |

##### consultationRecords 数组元素

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 就诊记录唯一标识 |
| visitDate | string | 是 | 就诊日期时间（格式：YYYY-MM-DD HH:mm） |
| department | string | 是 | 就诊科室 |
| doctorName | string | 是 | 接诊医生姓名 |
| chiefComplaint | string | 是 | 主诉 |
| diagnosis | string | 是 | 诊断结果 |
| prescription | string | 否 | 处方信息（可选） |
| status | string | 是 | 就诊状态（已完成/进行中/已取消） |

#### 错误响应

**HTTP状态码**: 4xx/5xx

**响应格式**:

```json
{
  "code": 404,
  "message": "患者不存在",
  "data": null
}
```

##### 常见错误码

| 错误码 | 说明 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 未授权，需要登录 |
| 403 | 无权限访问该患者信息 |
| 404 | 患者不存在 |
| 500 | 服务器内部错误 |

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
 * 就诊记录
 */
export interface ConsultationRecord {
  id: string              // 记录ID
  visitDate: string       // 就诊日期时间
  department: string      // 科室
  doctorName: string      // 医生姓名
  chiefComplaint: string  // 主诉
  diagnosis: string       // 诊断
  prescription?: string   // 处方（可选）
  status: string          // 状态
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
  - 身份证号：保留前6位和后4位，中间用 `****` 替代（如：110101********1234）

- **权限控制**: 
  - 医生只能查看自己有权限访问的患者信息
  - 需要验证请求者的身份和权限

### 2. 性能优化

- **缓存策略**: 
  - 前端会对患者详情进行5分钟的缓存
  - 建议后端也实现适当的缓存机制

- **数据量控制**: 
  - 就诊记录按时间倒序排列
  - 建议返回最近20条记录，如需更多可通过分页接口获取

### 3. 数据格式

- **日期时间**: 统一使用 `YYYY-MM-DD HH:mm` 格式
- **字符串**: 使用 UTF-8 编码
- **空值处理**: 
  - 必填字段不能为 null
  - 数组类型无数据时返回空数组 `[]`
  - 可选字段可以省略或设为 null

### 4. 状态码规范

- 成功: `code: 0`
- 业务错误: `code: 非0` （具体业务错误码可协商定义）
- HTTP状态码按照 RESTful 规范使用

---

## 测试用例

### 用例1：正常获取患者详情

**请求**:
```http
GET /patient/123456
Authorization: Bearer {token}
```

**预期响应**: 
- HTTP状态码: 200
- 返回完整的患者信息

### 用例2：患者不存在

**请求**:
```http
GET /patient/999999
Authorization: Bearer {token}
```

**预期响应**: 
- HTTP状态码: 404
- 错误信息: "患者不存在"

### 用例3：无权限访问

**请求**:
```http
GET /patient/123456
Authorization: Bearer {invalid_token}
```

**预期响应**: 
- HTTP状态码: 403
- 错误信息: "无权限访问该患者信息"

---

## 更新记录

| 版本 | 日期 | 修改内容 | 修改人 |
|------|------|----------|--------|
| v1.0 | 2025-11-26 | 初始版本 | - |

---

## 联系方式

如有接口相关问题，请联系：
- 前端负责人：[联系方式]
- 后端负责人：[联系方式]
