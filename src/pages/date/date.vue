<template>
  <view class="container">
    <!-- 顶部周导航区域 -->
    <view class="header-fixed">
      <!-- 第一层：周切换控制栏 -->
      <view class="week-control">
        <view class="left-placeholder" />
        <view class="center-control">
          <view class="arrow-btn" @click="prevWeek">
            <wd-icon name="arrow-left" size="20px" />
          </view>
          <text class="week-range">第{{ currentWeekNumber }}周 {{ weekRangeText }}</text>
          <view class="arrow-btn" @click="nextWeek">
            <wd-icon name="arrow-right" size="20px" />
          </view>
        </view>
        <view class="right-action">
          <view class="today-btn" @click="goToToday">
            今天
          </view>
        </view>
      </view>

      <!-- 第二层：星期日期栏 -->
      <view class="week-days">
        <view class="time-axis-header" /> <!-- 左侧时间轴占位 -->
        <view
          v-for="(day, index) in weekDays"
          :key="index"
          class="day-column"
          :class="{ 'is-today': day.isToday }"
        >
          <text class="day-name">{{ day.dayName }}</text>
          <text class="day-date">{{ day.dateStr }}</text>
        </view>
      </view>
    </view>

    <!-- 排班表格区域 -->
    <scroll-view scroll-y class="schedule-content" refresher-enabled :refresher-triggered="isRefreshing" @refresherrefresh="onRefresh">
      <view class="schedule-grid">
        <!-- 上午 -->
        <view class="grid-row">
          <view class="time-axis">
            <text class="time-index">1</text>
            <text class="time-range">08:00</text>
            <text class="time-range">12:00</text>
          </view>
          <view
            v-for="(day, colIndex) in weekDays"
            :key="`am-${colIndex}`"
            class="grid-cell"
            :class="{ 'is-today-col': day.isToday }"
            @click="handleCellClick(day.fullDate, '上午')"
          >
            <view v-if="getSchedule(day.fullDate, '上午')" class="schedule-card">
              <text class="clinic-name">{{ getSchedule(day.fullDate, '上午')?.clinic_name }}</text>
              <text class="time-text">上午</text>
              <view class="tags-row">
                <view class="slot-tag">
                  {{ getSchedule(day.fullDate, '上午')?.slot_type }}
                </view>
              </view>
              <view class="status-badge" :class="getStatusClass(getSchedule(day.fullDate, '上午')?.status)">
                {{ getSchedule(day.fullDate, '上午')?.status }}
              </view>
            </view>
          </view>
        </view>

        <!-- 下午 -->
        <view class="grid-row">
          <view class="time-axis">
            <text class="time-index">2</text>
            <text class="time-range">14:00</text>
            <text class="time-range">18:00</text>
          </view>
          <view
            v-for="(day, colIndex) in weekDays"
            :key="`pm-${colIndex}`"
            class="grid-cell"
            :class="{ 'is-today-col': day.isToday }"
            @click="handleCellClick(day.fullDate, '下午')"
          >
            <view v-if="getSchedule(day.fullDate, '下午')" class="schedule-card">
              <text class="clinic-name">{{ getSchedule(day.fullDate, '下午')?.clinic_name }}</text>
              <text class="time-text">下午</text>
              <view class="tags-row">
                <view class="slot-tag">
                  {{ getSchedule(day.fullDate, '下午')?.slot_type }}
                </view>
              </view>
              <view class="status-badge" :class="getStatusClass(getSchedule(day.fullDate, '下午')?.status)">
                {{ getSchedule(day.fullDate, '下午')?.status }}
              </view>
            </view>
          </view>
        </view>

        <!-- 晚上 -->
        <view class="grid-row">
          <view class="time-axis">
            <text class="time-index">3</text>
            <text class="time-range">19:00</text>
            <text class="time-range">22:00</text>
          </view>
          <view
            v-for="(day, colIndex) in weekDays"
            :key="`night-${colIndex}`"
            class="grid-cell"
            :class="{ 'is-today-col': day.isToday }"
            @click="handleCellClick(day.fullDate, '晚上')"
          >
            <view v-if="getSchedule(day.fullDate, '晚上')" class="schedule-card">
              <text class="clinic-name">{{ getSchedule(day.fullDate, '晚上')?.clinic_name }}</text>
              <text class="time-text">晚上</text>
              <view class="tags-row">
                <view class="slot-tag">
                  {{ getSchedule(day.fullDate, '晚上')?.slot_type }}
                </view>
              </view>
              <view class="status-badge" :class="getStatusClass(getSchedule(day.fullDate, '晚上')?.status)">
                {{ getSchedule(day.fullDate, '晚上')?.status }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 详情弹窗 -->
    <wd-popup v-model="showDetail" position="bottom" custom-style="width: 100%; max-height: 80vh; border-radius: 16px 16px 0 0; overflow: hidden;">
      <view class="detail-popup">
        <view class="popup-header">
          <text class="popup-title">班次详情</text>
          <view class="close-btn" @click="showDetail = false">
            <wd-icon name="close" size="24px" />
          </view>
        </view>

        <scroll-view v-if="selectedSchedule" scroll-y class="popup-content">
          <!-- 基本信息 -->
          <view class="detail-section">
            <view class="section-title">
              基本信息
            </view>
            <view class="info-item">
              <text class="label">诊室名称</text>
              <text class="value">{{ selectedSchedule.clinic_name }}</text>
            </view>
            <view class="info-item">
              <text class="label">日期星期</text>
              <text class="value">{{ selectedSchedule.date }} ({{ getWeekDayName(selectedSchedule.week_day) }})</text>
            </view>
            <view class="info-item">
              <text class="label">时段</text>
              <text class="value">{{ selectedSchedule.time_section }}</text>
            </view>
            <view class="info-item">
              <text class="label">号源类型</text>
              <text class="value">{{ selectedSchedule.slot_type }}</text>
            </view>
            <view class="info-item">
              <text class="label">诊室类型</text>
              <text class="value">{{ selectedSchedule.clinic_type === 0 ? '普通' : '专家' }}</text>
            </view>
            <view class="info-item">
              <text class="label">挂号费用</text>
              <text class="value price">¥{{ selectedSchedule.price }}</text>
            </view>
            <view class="info-item">
              <text class="label">排班状态</text>
              <text class="value" :class="getStatusClass(selectedSchedule.status)">{{ selectedSchedule.status }}</text>
            </view>
          </view>

          <view class="divider" />

          <!-- 就诊统计 -->
          <view class="detail-section">
            <view class="section-title">
              就诊统计
            </view>
            <view class="stats-grid">
              <view class="stat-card">
                <text class="stat-num">{{ selectedSchedule.total_slots }}</text>
                <text class="stat-label">总号源数</text>
              </view>
              <view class="stat-card">
                <text class="stat-num">{{ selectedSchedule.total_slots - selectedSchedule.remaining_slots }}</text>
                <text class="stat-label">已挂号数</text>
              </view>
              <view class="stat-card">
                <text class="stat-num highlight">{{ selectedSchedule.remaining_slots }}</text>
                <text class="stat-label">剩余号源</text>
              </view>
              <view class="stat-card">
                <text class="stat-num">{{ calculateRate(selectedSchedule) }}%</text>
                <text class="stat-label">挂号率</text>
              </view>
            </view>
          </view>

          <view class="divider" />

          <!-- 医生信息 -->
          <view class="detail-section">
            <view class="section-title">
              医生信息
            </view>
            <view class="info-item">
              <text class="label">医生姓名</text>
              <text class="value">{{ selectedSchedule.doctor_name }}</text>
            </view>
            <view class="info-item">
              <text class="label">医生ID</text>
              <text class="value">{{ selectedSchedule.doctor_id }}</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import type { ScheduleItem } from '@/api/types/doctor'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { computed, onMounted, ref } from 'vue'
import { getDoctorScheduleList } from '@/api/doctor'
import { useUserStore } from '@/store/user'
import 'dayjs/locale/zh-cn'

dayjs.extend(isoWeek)
dayjs.locale('zh-cn')

const userStore = useUserStore()
const currentDate = ref(dayjs())
const schedules = ref<ScheduleItem[]>([])
const isRefreshing = ref(false)
const showDetail = ref(false)
const selectedSchedule = ref<ScheduleItem | null>(null)

// 计算当前周的日期列表
const weekDays = computed(() => {
  const startOfWeek = currentDate.value.startOf('isoWeek') // 周一
  const days = []
  for (let i = 0; i < 7; i++) {
    const d = startOfWeek.add(i, 'day')
    days.push({
      dayName: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][i],
      dateStr: d.format('MM/DD'),
      fullDate: d.format('YYYY-MM-DD'),
      isToday: d.isSame(dayjs(), 'day'),
    })
  }
  return days
})

const currentWeekNumber = computed(() => {
  return currentDate.value.isoWeek()
})

const weekRangeText = computed(() => {
  const start = currentDate.value.startOf('isoWeek')
  const end = currentDate.value.endOf('isoWeek')
  return `${start.format('YYYY-MM-DD')} ~ ${end.format('YYYY-MM-DD')}`
})

// 获取排班数据
async function fetchSchedules() {
  try {
    const start = currentDate.value.startOf('isoWeek').format('YYYY-MM-DD')
    const end = currentDate.value.endOf('isoWeek').format('YYYY-MM-DD')
    const doctorId = userStore.userInfo.doctor?.id // 使用 doctor.id

    if (!doctorId) {
      console.warn('Doctor ID not found')
      return
    }

    const res = await getDoctorScheduleList({
      doctor_id: doctorId,
      start_date: start,
      end_date: end,
    })

    schedules.value = res.schedules
  }
  catch (error) {
    console.error('Fetch schedules error:', error)
  }
  finally {
    isRefreshing.value = false
  }
}

// 切换周
function prevWeek() {
  currentDate.value = currentDate.value.subtract(1, 'week')
  fetchSchedules()
}

function nextWeek() {
  currentDate.value = currentDate.value.add(1, 'week')
  fetchSchedules()
}

function goToToday() {
  currentDate.value = dayjs()
  fetchSchedules()
}

function onRefresh() {
  isRefreshing.value = true
  fetchSchedules()
}

// 获取特定日期和时段的排班
function getSchedule(date: string, timeSection: string) {
  return schedules.value.find(s => s.date === date && s.time_section === timeSection)
}

function handleCellClick(date: string, timeSection: string) {
  const schedule = getSchedule(date, timeSection)
  if (schedule) {
    selectedSchedule.value = schedule
    showDetail.value = true
  }
}

function getWeekDayName(day: number) {
  const map: Record<number, string> = {
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周日',
  }
  return map[day] || ''
}

function getStatusClass(status?: string) {
  if (!status)
    return ''
  if (status === '正常')
    return 'status-normal'
  if (status === '停诊')
    return 'status-stop'
  if (status === '满号')
    return 'status-full'
  return ''
}

function calculateRate(schedule: ScheduleItem) {
  if (schedule.total_slots === 0)
    return 0
  const used = schedule.total_slots - schedule.remaining_slots
  return Math.round((used / schedule.total_slots) * 100)
}

onMounted(() => {
  fetchSchedules()
})
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.header-fixed {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.week-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;

  .left-placeholder {
    width: 60px;
  }

  .center-control {
    display: flex;
    align-items: center;
    gap: 12px;

    .week-range {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    .arrow-btn {
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:active {
        opacity: 0.6;
      }
    }
  }

  .right-action {
    width: 60px;
    display: flex;
    justify-content: flex-end;

    .today-btn {
      font-size: 12px;
      color: #007aff;
      background: rgba(0, 122, 255, 0.1);
      padding: 4px 12px;
      border-radius: 12px;
      &:active {
        opacity: 0.6;
      }
    }
  }
}

.week-days {
  display: flex;
  padding-bottom: 8px;

  .time-axis-header {
    width: 40px;
    flex-shrink: 0;
  }

  .day-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    .day-name {
      font-size: 12px;
      color: #666;
    }

    .day-date {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    &.is-today {
      .day-name {
        color: #007aff;
        font-weight: bold;
      }
      .day-date {
        background-color: #007aff;
        color: #fff;
      }
    }
  }
}

.schedule-content {
  flex: 1;
  overflow: hidden;
}

.schedule-grid {
  padding-bottom: 20px;
}

.grid-row {
  display: flex;
  min-height: 120px;
  border-bottom: 1px dashed #e0e0e0;

  .time-axis {
    width: 40px;
    flex-shrink: 0;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #eee;
    padding: 8px 0;

    .time-index {
      font-size: 18px;
      font-weight: bold;
      color: #999;
      margin-bottom: 4px;
    }

    .time-range {
      font-size: 10px;
      color: #999;
    }
  }

  .grid-cell {
    flex: 1;
    border-right: 1px dashed #e0e0e0;
    padding: 2px;
    position: relative;
    overflow: hidden;

    &.is-today-col {
      background-color: rgba(0, 122, 255, 0.02);
    }

    &:active {
      background-color: #f0f0f0;
    }
  }
}

.schedule-card {
  background-color: #e6f2ff;
  border-radius: 6px;
  padding: 4px 2px 4px 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-left: 3px solid #007aff;
  box-shadow: 0 1px 3px rgba(0, 122, 255, 0.1);
  box-sizing: border-box;
  width: 100%;

  .clinic-name {
    font-size: 10px;
    font-weight: bold;
    color: #333;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .time-text {
    font-size: 9px;
    color: #666;
    display: none; /* 空间太小，隐藏时间文本，因为行头已经有了 */
  }

  .tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }

  .slot-tag {
    font-size: 9px;
    background-color: rgba(255, 255, 255, 0.6);
    color: #007aff;
    padding: 1px 2px;
    border-radius: 2px;
    white-space: nowrap;
    transform: scale(0.9);
    transform-origin: left center;
  }

  .status-badge {
    font-size: 9px;
    align-self: flex-start;
    padding: 1px 3px;
    border-radius: 2px;
    margin-top: auto;
    transform: scale(0.9);
    transform-origin: left bottom;

    &.status-normal {
      color: #28a745;
      background-color: rgba(40, 167, 69, 0.15);
    }
    &.status-stop {
      color: #dc3545;
      background-color: rgba(220, 53, 69, 0.15);
    }
    &.status-full {
      color: #ffc107;
      background-color: rgba(255, 193, 7, 0.15);
    }
  }
}

.detail-popup {
  background-color: #fff;
  padding-bottom: env(safe-area-inset-bottom);

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;

    .popup-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }

    .close-btn {
      padding: 4px;
    }
  }

  .popup-content {
    max-height: 60vh;
    padding: 16px;
  }

  .detail-section {
    margin-bottom: 16px;

    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      margin-bottom: 12px;
      padding-left: 8px;
      border-left: 4px solid #007aff;
    }
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .label {
      font-size: 14px;
      color: #666;
    }

    .value {
      font-size: 15px;
      color: #333;
      font-weight: 500;
      margin-right: 24px;

      &.price {
        color: #ff9800;
        font-weight: bold;
      }

      &.status-normal {
        color: #28a745;
      }
      &.status-stop {
        color: #dc3545;
      }
      &.status-full {
        color: #ffc107;
      }
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    .stat-card {
      background-color: #f9f9f9;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .stat-num {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        margin-bottom: 4px;

        &.highlight {
          color: #007aff;
        }
      }

      .stat-label {
        font-size: 12px;
        color: #666;
      }
    }
  }

  .divider {
    height: 1px;
    background-color: #eee;
    margin: 16px 0;
  }
}
</style>
