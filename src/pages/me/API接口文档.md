# 个人中心 API 接口文档

## 📡 接口列表

### 1. 获取个人统计数据

#### 基本信息
- **接口名称**: 获取个人统计数据
- **接口路径**: `/doctor/profile/stats`
- **请求方法**: `GET`
- **前端方法**: `getProfileStats()`

#### 请求参数
无

#### 响应数据
```typescript
interface Response {
  attendance: number          // 本月出勤天数
  monthly_consult: number     // 本月接诊人数 (支持驼峰: monthlyConsult)
  total_consult: number       // 累计接诊人数 (支持驼峰: totalConsult)
}
```

#### 响应示例
```json
{
  "attendance": 22,
  "monthly_consult": 156,
  "total_consult": 3240
}
```

#### 错误处理
```typescript
// 接口失败时返回默认值
{
  attendance: 0,
  monthlyConsult: 0,
  totalConsult: 0
}
```

---

### 2. 修改密码

#### 基本信息
- **接口名称**: 修改密码
- **接口路径**: `/doctor/password/change`
- **请求方法**: `POST`
- **前端方法**: `changePassword(oldPassword, newPassword)`

#### 请求参数
```typescript
interface Request {
  old_password: string    // 旧密码
  new_password: string    // 新密码
}
```

#### 请求示例
```json
{
  "old_password": "123456",
  "new_password": "newpassword123"
}
```

#### 响应数据
```typescript
// 成功: 返回 true
// 失败: 抛出异常
```

#### 业务流程
```
1. 用户输入旧密码和新密码
2. 调用接口验证并修改
3. 修改成功后提示用户
4. 自动退出登录
5. 跳转到登录页
```

---

### 3. 获取消息通知设置

#### 基本信息
- **接口名称**: 获取消息通知设置
- **接口路径**: `/doctor/notification/settings`
- **请求方法**: `GET`
- **前端方法**: `getNotificationSettings()`

#### 请求参数
无

#### 响应数据
```typescript
interface NotificationSettings {
  schedule_change: boolean      // 排班变更通知
  leave_approval: boolean       // 请假审批通知
  system_announcement: boolean  // 系统公告
  patient_appointment: boolean  // 患者预约通知
}
```

#### 响应示例
```json
{
  "schedule_change": true,
  "leave_approval": true,
  "system_announcement": true,
  "patient_appointment": true
}
```

---

### 4. 更新消息通知设置

#### 基本信息
- **接口名称**: 更新消息通知设置
- **接口路径**: `/doctor/notification/settings`
- **请求方法**: `POST`
- **前端方法**: `updateNotificationSettings(settings)`

#### 请求参数
```typescript
interface NotificationSettings {
  schedule_change: boolean
  leave_approval: boolean
  system_announcement: boolean
  patient_appointment: boolean
}
```

#### 请求示例
```json
{
  "schedule_change": true,
  "leave_approval": false,
  "system_announcement": true,
  "patient_appointment": true
}
```

#### 响应数据
```typescript
// 成功: 返回 true
// 失败: 抛出异常
```

---

## 🔐 认证说明

### Token 机制
所有接口都需要在 Header 中携带 Token：

```typescript
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Token 获取
```typescript
import { useTokenStore } from '@/store/token'

const tokenStore = useTokenStore()
const token = tokenStore.validToken
```

### Token 过期处理
- Token 过期时，http 拦截器会自动刷新
- 刷新失败时，跳转到登录页

---

## 🎯 前后端字段映射

### 统计数据字段
| 后端字段 | 前端字段 | 类型 | 说明 |
|---------|---------|------|------|
| attendance | attendance | number | 本月出勤天数 |
| monthly_consult / monthlyConsult | monthlyConsult | number | 本月接诊人数 |
| total_consult / totalConsult | totalConsult | number | 累计接诊人数 |

> 注: 前端已做兼容处理，同时支持蛇形和驼峰命名

### 消息设置字段
| 后端字段 | 前端字段 | 类型 | 说明 |
|---------|---------|------|------|
| schedule_change | scheduleChange | boolean | 排班变更通知 |
| leave_approval | leaveApproval | boolean | 请假审批通知 |
| system_announcement | systemAnnouncement | boolean | 系统公告 |
| patient_appointment | patientAppointment | boolean | 患者预约通知 |

---

## 🔄 数据转换

### Service 层数据转换
```typescript
// 后端 → 前端
{
  attendance: res.attendance || 0,
  monthlyConsult: res.monthly_consult || res.monthlyConsult || 0,
  totalConsult: res.total_consult || res.totalConsult || 0,
}

// 前端 → 后端
{
  schedule_change: settings.scheduleChange,
  leave_approval: settings.leaveApproval,
  system_announcement: settings.systemAnnouncement,
  patient_appointment: settings.patientAppointment,
}
```

---

## 📝 调用示例

### 获取统计数据
```typescript
import { getProfileStats } from '@/service/profile'

// 调用
const stats = await getProfileStats()

// 结果
console.log(stats)
// {
//   attendance: 22,
//   monthlyConsult: 156,
//   totalConsult: 3240
// }
```

### 修改密码
```typescript
import { changePassword } from '@/service/profile'

try {
  const success = await changePassword('oldpass', 'newpass')
  if (success) {
    uni.showToast({ title: '修改成功', icon: 'success' })
    // 退出登录
    await tokenStore.logout()
    uni.reLaunch({ url: LOGIN_PAGE })
  }
} catch (error) {
  uni.showToast({ title: '修改失败', icon: 'none' })
}
```

### 获取消息设置
```typescript
import { getNotificationSettings } from '@/service/profile'

const settings = await getNotificationSettings()
console.log(settings)
// {
//   scheduleChange: true,
//   leaveApproval: true,
//   systemAnnouncement: true,
//   patientAppointment: true
// }
```

### 更新消息设置
```typescript
import { updateNotificationSettings } from '@/service/profile'

const newSettings = {
  scheduleChange: true,
  leaveApproval: false,
  systemAnnouncement: true,
  patientAppointment: true,
}

try {
  await updateNotificationSettings(newSettings)
  uni.showToast({ title: '保存成功', icon: 'success' })
} catch (error) {
  uni.showToast({ title: '保存失败', icon: 'none' })
}
```

---

## ⚠️ 注意事项

### 1. 命名兼容性
后端接口同时支持蛇形命名和驼峰命名，前端优先使用蛇形命名进行请求。

### 2. 错误处理
所有接口调用都应该包含 try-catch，避免未处理的异常导致页面崩溃。

### 3. 加载状态
在调用接口时，应显示加载状态（loading），提升用户体验。

### 4. 防抖节流
对于频繁调用的接口（如搜索），应添加防抖或节流。

### 5. 缓存策略
统计数据可以考虑缓存，避免频繁请求。

---

## 🔗 相关文档

- [个人中心 README](./README.md)
- [测试指南](./测试指南.md)
- [接口连接报告](./接口连接报告.md)
- [验收清单](./验收清单.md)

---

## 📞 联系方式

如有接口问题，请联系：
- 前端开发: [前端团队]
- 后端开发: [后端团队]
- 接口文档: [API 文档地址]
