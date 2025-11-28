# 首页工作台功能说明

## 📱 功能模块

### 1. 个人信息卡片
- 显示医生姓名、职称、科室
- 科室长显示特殊徽章
- 显示当前日期和问候语

### 2. 签到签退模块
- **签到功能**:
  - 显示今日排班信息
  - 点击签到获取定位并提交
  - 签到成功后显示签到时间
- **签退功能**:
  - 签到后才能签退
  - 显示工作时长
  - 签退成功后重置状态

### 3. 工作概览
- **今日排班**: 显示当前班次名称
- **待接诊**: 显示待接诊人数，点击跳转接诊页面
- **待审批**: 科室长专属，显示待审批请假数量

### 4. 常用功能
- 请假申请
- 开始接诊
- 审核请假（科室长）
- 调整排班（科室长）

### 5. 提醒事项
- 显示系统提醒
- 显示审批提醒
- 无提醒时自动隐藏

### 6. 最近接诊记录
- 显示最近3条接诊记录
- 显示患者姓名、时间、诊断
- 点击可查看患者详情
- 无记录时自动隐藏

---

## 🔧 使用说明

### Mock 数据切换

在 `src/service/workbench.ts` 中修改:

```typescript
// 使用 Mock 数据
const USE_MOCK = true

// 使用真实接口
const USE_MOCK = false
```

### 定位权限配置

#### H5 平台
需要使用 HTTPS 或 localhost，否则无法获取定位

#### 微信小程序
在 `manifest.json` 中配置定位权限:

```json
{
  "mp-weixin": {
    "permission": {
      "scope.userLocation": {
        "desc": "用于签到签退时获取您的位置信息"
      }
    }
  }
}
```

#### App 平台
需要在 `manifest.json` 的 App 权限中添加定位权限

---

## 📊 数据流程

### 页面加载流程
```
1. 用户打开首页
2. onMounted 触发
3. 并行调用:
   - getWorkbenchData() 获取工作台数据
   - getApprovalStats() 获取审批统计（科室长）
4. 更新页面数据
5. 渲染所有模块
```

### 签到流程
```
1. 用户点击签到按钮
2. 检查是否有今日排班
3. 获取用户当前位置
4. 调用 checkin() 接口
5. 签到成功后刷新工作台数据
6. 显示签到时间和签退按钮
```

### 签退流程
```
1. 用户点击签退按钮
2. 检查是否有今日排班
3. 获取用户当前位置
4. 调用 checkout() 接口
5. 显示工作时长
6. 刷新工作台数据
```

---

## 🎯 接口调用示例

### 获取工作台数据
```typescript
const data = await getWorkbenchData()

// 访问数据
console.log(data.doctor)           // 医生信息
console.log(data.shiftStatus)      // 班次状态
console.log(data.todayData)        // 今日统计
console.log(data.reminders)        // 提醒事项
console.log(data.recentRecords)    // 最近记录
```

### 签到
```typescript
const result = await checkin({
  shiftId: 1,
  latitude: 39.9042,
  longitude: 116.4074
})

console.log(result.checkinTime)    // 签到时间
console.log(result.message)        // 提示信息
```

### 签退
```typescript
const result = await checkout({
  shiftId: 1,
  latitude: 39.9042,
  longitude: 116.4074
})

console.log(result.checkoutTime)   // 签退时间
console.log(result.workDuration)   // 工作时长
```

---

## ⚠️ 常见问题

### Q1: 定位失败怎么办？
A: 系统会弹窗询问是否使用默认位置，用户可选择：
- 确认：使用默认位置（北京坐标）
- 取消：放弃签到/签退

### Q2: 签到按钮点击无反应？
A: 可能原因：
1. 今日无排班
2. 定位权限未授权
3. 网络请求失败

检查控制台错误日志

### Q3: 数据不显示？
A: 检查：
1. Mock 开关是否正确
2. 后端服务是否运行
3. Token 是否有效
4. 网络请求是否成功

### Q4: 提醒事项和最近记录不显示？
A: 这两个模块会根据数据动态显示：
- 无提醒时，提醒模块隐藏
- 无记录时，记录模块隐藏

---

## 🔍 调试技巧

### 查看网络请求
```javascript
// 打开浏览器开发者工具
// Network → XHR → 查找 workbench 相关请求
```

### 查看状态数据
```javascript
// 在 Vue DevTools 中查看
// Components → Home → workbenchData
```

### 强制使用 Mock
```typescript
// src/service/workbench.ts
const USE_MOCK = true
```

---

## 📝 注意事项

1. **签到时间限制**: 提前30分钟可签到
2. **签退时间限制**: 班次结束后2小时内可签退
3. **定位精度**: 建议使用 GPS 定位，精度更高
4. **网络环境**: 确保网络连接稳定
5. **Token 有效期**: 定期检查 Token 是否过期

---

## 🚀 后续优化

- [ ] 添加下拉刷新功能
- [ ] 添加班次倒计时显示
- [ ] 优化定位失败提示
- [ ] 添加签到签退历史记录
- [ ] 支持多班次签到签退
- [ ] 添加工作时长统计图表

---

## 📞 技术支持

如有问题，请查看：
- [接口连接报告](./接口连接报告.md)
- [Mock 数据](./mock.ts)
- [Service 层](../../service/workbench.ts)
