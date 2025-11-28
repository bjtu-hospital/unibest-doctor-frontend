下面请按照业务流程和UI的界面提示完成一个医生排班页面:
使用wot-ui的组件, 一定要兼容微信小程序. 


## 业务流程描述

这是一个**医生排班管理系统**，类似课程表的展示方式：

### 核心业务流程

1. **周视图导航**
   - 用户进入页面默认显示本周排班
   - 可以通过左右箭头切换上周/下周
   - 点击"今天"按钮快速回到本周
   - 顶部显示"第X周"和日期范围（如：2024-01-01 ~ 2024-01-07）

2. **排班表格展示**
   - 横向：周一到周日（7列）
   - 纵向：3个时段（3行）
     - 时段1：08:00-12:00（上午）
     - 时段2：14:00-18:00（下午）
     - 时段3：19:00-22:00（晚上）
   - 每个单元格显示该时段的排班信息

3. **排班单元格信息**
   - 诊室名称
   - 时间段
   - 号源类型
   - 状态标识（可能有空班、满号等状态）

4. **查看详情**
   - 点击任意排班单元格，弹出详情面板
   - 详情包含三大模块：
     - **基本信息**：诊室名称、日期星期、时段、号源类型、诊室类型、挂号费用、排班状态
     - **就诊统计**：总号源数、已挂号数、剩余号源、挂号率
     - **医生信息**：医生姓名、医生ID

5. **下拉刷新**
   - 支持下拉刷新获取最新排班数据

---

## 优化后的UI设计方案

### 整体布局

采用**顶部固定+主体滚动**的结构，确保周导航始终可见。

### 一、周导航区（固定在顶部）

**第一层：周切换控制栏**
- 左侧：留白或放置筛选按钮
- 中间：左箭头 + "第X周 日期范围" + 右箭头（水平居中）
- 右侧："今天"按钮

**第二层：星期日期栏**
- 最左侧：空白占位（对应时间轴）
- 右侧7列：周一到周日
- 每列显示：星期名（如"周一"）+ 日期（如"01/15"）
- 当天日期高亮显示（圆形背景或下划线）

### 二、排班表格区（可滚动）

**行结构（共3行）**

每行包含：
- **时间轴列**（固定在左侧）
  - 时段序号（大号数字："1"、"2"、"3"）
  - 开始时间（小号文字）
  - 结束时间（小号文字）
  
- **7个排班单元格**
  - 有排班时显示卡片样式：
    - 诊室名称（加粗）
    - 时间段文字
    - 号源类型标签（小标签样式）
    - 状态角标（如满号、空闲等）
  - 无排班时显示空白或浅色占位

**单元格交互**
- 有排班的单元格可点击，显示轻微阴影和按压效果
- 今天的列整列添加浅色背景区分

### 三、详情弹窗（底部弹起或居中弹窗）

**头部**
- 左侧："班次详情"标题
- 右侧：关闭按钮（X图标）

**内容区（可滚动）**

分三个区块，每个区块用分割线或间距区分：

**区块1：基本信息**
- 标题："基本信息"
- 7个信息项，每项采用左右布局：
  - 左侧：标签名称（较小字号）
  - 右侧：具体值（较大字号，排班状态可添加状态颜色）

**区块2：就诊统计**
- 标题："就诊统计"
- 4个统计卡片横向排列（2x2网格）
- 每个卡片显示：
  - 上方：数字（大号加粗）
  - 下方：说明文字（小号）

**区块3：医生信息**
- 标题："医生信息"
- 2个信息项，同样左右布局

并且记得提供一个可以返回到上一级的按钮
下面是用到的接口
如果有需要,你也可以阅读api文件夹下其他文件内的接口

GET
/doctor/schedules
Get Doctor Schedules


获取医生排班 - 医生只能查自己的,管理员可以查所有人

Parameters
Cancel
Name	Description
doctor_id
integer | (integer | null)
(query)
014
start_date
string
(query)
2025-11-01
end_date
string
(query)
2025-12-01
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'http://localhost:8000/doctor/schedules?doctor_id=014&start_date=2025-11-01&end_date=2025-12-01' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTgiLCJsb2dpbl90aW1lIjoxNzY0MzA1Njg5LCJsb2dpbl9pcCI6IjEyNy4wLjAuMSIsInVzZXJfdHlwZSI6ImRvY3RvciIsImV4cCI6MTc2NDM5MjA4OX0.k50YljE9gefbF2ODZyZtXuv0B123JrJvXZQ0fKHMsO8'
Request URL
http://localhost:8000/doctor/schedules?doctor_id=014&start_date=2025-11-01&end_date=2025-12-01
Server response
Code	Details
200	
Response body
Download
{
  "code": 0,
  "message": {
    "schedules": [
      {
        "schedule_id": 3128,
        "doctor_id": 14,
        "doctor_name": "刘书旺",
        "clinic_id": 56,
        "clinic_name": "心血管科门诊",
        "clinic_type": 0,
        "date": "2025-11-14",
        "week_day": 5,
        "time_section": "上午",
        "slot_type": "专家",
        "total_slots": 25,
        "remaining_slots": 25,
        "status": "正常",
        "price": 100
      },
      {
        "schedule_id": 3129,
        "doctor_id": 14,
        "doctor_name": "刘书旺",
        "clinic_id": 56,
        "clinic_name": "心血管科门诊",
        "clinic_type": 0,
        "date": "2025-11-15",
        "week_day": 6,
        "time_section": "上午",
        "slot_type": "专家",
        "total_slots": 25,
        "remaining_slots": 25,
        "status": "正常",
        "price": 100
      },
      {
        "schedule_id": 3130,
        "doctor_id": 14,
        "doctor_name": "刘书旺",
        "clinic_id": 56,
        "clinic_name": "心血管科门诊",
        "clinic_type": 0,
        "date": "2025-11-18",
        "week_day": 2,
        "time_section": "上午",
        "slot_type": "专家",
        "total_slots": 25,
        "remaining_slots": 25,
        "status": "正常",
        "price": 100
      },
      {
        "schedule_id": 3131,
        "doctor_id": 14,
        "doctor_name": "刘书旺",
        "clinic_id": 56,
        "clinic_name": "心血管科门诊",
        "clinic_type": 0,
        "date": "2025-11-18",
        "week_day": 2,
        "time_section": "下午",
        "slot_type": "专家",
        "total_slots": 25,
        "remaining_slots": 25,
        "status": "正常",
        "price": 100
      },
      {
        "schedule_id": 3132,
        "doctor_id": 14,
        "doctor_name": "刘书旺",
        "clinic_id": 56,
        "clinic_name": "心血管科门诊",
        "clinic_type": 0,
        "date": "2025-11-21",
        "week_day": 5,
        "time_section": "上午",
        "slot_type": "专家",
        "total_slots": 25,
        "remaining_slots": 25,
        "status": "正常",
        "price": 100
      },
      {
        "schedule_id": 6616,
        "doctor_id": 14,
        "doctor_name": "刘书旺",
        "clinic_id": 56,
        "clinic_name": "心血管科门诊",
        "clinic_type": 0,
        "date": "2025-11-25",
        "week_day": 2,
        "time_section": "上午",
        "slot_type": "专家",
        "total_slots": 25,
        "remaining_slots": 25,
        "status": "正常",
        "price": 100
      },
      {
        "schedule_id": 6617,
        "doctor_id": 14,
        "doctor_name": "刘书旺",
        "clinic_id": 56,
        "clinic_name": "心血管科门诊",
        "clinic_type": 0,
        "date": "2025-11-25",
        "week_day": 2,
        "time_section": "下午",
        "slot_type": "专家",
        "total_slots": 25,
        "remaining_slots": 25,
        "status": "正常",
        "price": 100
      },
      {
        "schedule_id": 6618,
        "doctor_id": 14,
        "doctor_name": "刘书旺",
        "clinic_id": 56,
        "clinic_name": "心血管科门诊",
        "clinic_type": 0,
        "date": "2025-11-28",
        "week_day": 5,
        "time_section": "上午",
        "slot_type": "专家",
        "total_slots": 25,
        "remaining_slots": 0,
        "status": "正常",
        "price": 100
      },
      {
        "schedule_id": 6619,
        "doctor_id": 14,
        "doctor_name": "刘书旺",
        "clinic_id": 56,
        "clinic_name": "心血管科门诊",
        "clinic_type": 0,
        "date": "2025-11-29",
        "week_day": 6,
        "time_section": "上午",
        "slot_type": "专家",
        "total_slots": 25,
        "remaining_slots": 25,
        "status": "正常",
        "price": 100
      }
    ]
  }
}
Response headers
 content-length: 2519 
 content-type: application/json 
 date: Fri,28 Nov 2025 04:55:26 GMT 
 server: uvicorn 
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "code": 0,
  "message": "string"
}