<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navbar -->
    <wd-navbar title="排班管理" placeholder safe-area-inset-top left-arrow fixed @click-left="handleBack" />

    <!-- 1. Clinic Tabs -->
    <div class="sticky top-[var(--window-top)] z-[2] bg-white px-3 py-2 space-y-1">
      <div class="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <wd-tabs v-model="currentClinicId" @change="handleClinicChange">
          <wd-tab
            v-for="clinic in clinics"
            :key="clinic.id"
            :name="clinic.id"
            :title="clinic.name"
          />
        </wd-tabs>
      </div>

      <!-- 当前诊室全称，支持换行显示，解决名称过长被截断的问题 -->
      <div
        v-if="currentClinic"
        class="break-all px-1 text-[11px] text-gray-500 leading-snug"
      >
        当前诊室：{{ currentClinic.name }}
      </div>
    </div>

    <!-- 2. Week Selector & Actions -->
    <div class="flex flex-col gap-3 bg-white px-3 pb-3 shadow-sm">
      <div class="flex items-center justify-between rounded-lg bg-gray-50 p-2">
        <div class="p-2 text-gray-500 active:text-blue-600" @click="changeWeek(-1)">
          <div class="i-carbon-chevron-left text-xl" />
        </div>
        <div class="text-sm text-gray-800 font-bold">
          {{ currentWeekLabel }}
        </div>
        <div class="p-2 text-gray-500 active:text-blue-600" @click="changeWeek(1)">
          <div class="i-carbon-chevron-right text-xl" />
        </div>
      </div>
    </div>

    <!-- 3. Schedule Table -->
    <div class="relative mt-2 flex-1 overflow-hidden bg-white">
      <div class="absolute inset-0 overflow-auto">
        <!-- Grid Layout: 48px for time column, rest distributed equally with min-width -->
        <div class="grid grid-cols-[3rem_repeat(7,minmax(5.5rem,1fr))] grid-rows-[auto_repeat(3,minmax(100px,1fr))] h-full min-w-[600px]">
          <!-- 1. Header Row -->
          <!-- Corner (Top-Left) -->
          <div class="sticky left-0 top-0 z-[5] min-h-[3.5rem] flex items-center justify-center border-b border-r border-gray-100 bg-gray-50 text-xs text-gray-400 font-bold">
            时段
          </div>
          <!-- Days (Top) -->
          <div
            v-for="day in weekDays"
            :key="`header-${day.date}`"
            class="sticky top-0 z-[4] min-h-[3.5rem] flex flex-col items-center justify-center border-b border-r border-gray-100 bg-gray-50 p-2 text-center last:border-r-0"
          >
            <div class="mb-1 text-xs text-gray-500">
              {{ day.weekName }}
            </div>
            <div class="text-xs text-gray-800 font-bold">
              {{ day.dateStr }}
            </div>
          </div>

          <!-- 2. Body Rows -->
          <template v-for="shift in shifts" :key="shift.key">
            <!-- Time Label (Left) -->
            <div class="sticky left-0 z-[3] flex flex-col items-center justify-center border-b border-r border-gray-100 bg-gray-50">
              <div class="text-xs text-gray-600 font-bold">
                {{ shift.label }}
              </div>
              <div class="scale-90 text-[10px] text-gray-400">
                {{ shift.time }}
              </div>
            </div>

            <!-- Cells -->
            <div
              v-for="day in weekDays"
              :key="`${day.date}-${shift.key}`"
              class="border-b border-r border-gray-100 bg-white p-1 last:border-r-0"
            >
              <div
                class="relative h-full w-full flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all"
                :class="getCellClass(getSlot(day.date, shift.key))"
                @click="handleSlotClick(getSlot(day.date, shift.key))"
              >
                <template v-if="getSlot(day.date, shift.key)?.status === 'filled'">
                  <div class="mb-1 w-full truncate px-1 text-center text-xs text-gray-800 font-bold leading-tight">
                    {{ getSlot(day.date, shift.key)?.doctorName }}
                  </div>
                  <div class="w-full scale-90 truncate text-center text-[10px] text-gray-500">
                    {{ getSlot(day.date, shift.key)?.doctorTitle }}
                  </div>
                  <!-- Edit Icon -->
                  <div class="absolute right-0 top-0 rounded-bl bg-blue-500 p-0.5 text-white opacity-0 group-hover:opacity-100">
                    <div class="i-carbon-edit text-[8px]" />
                  </div>
                </template>

                <template v-else-if="getSlot(day.date, shift.key)?.status === 'empty'">
                  <div class="i-carbon-add mb-1 text-2xl text-gray-300" />
                  <div class="scale-90 text-[10px] text-gray-400">
                    添加
                  </div>
                </template>

                <template v-else>
                  <div class="text-[10px] text-gray-400">
                    不可用
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 4. Footer Actions -->
    <div class="z-20 flex gap-4 border-t border-gray-100 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <button class="flex-1 border border-gray-200 rounded-full py-3 text-sm text-gray-600 font-bold" @click="handleCancel">
        取消修改
      </button>
      <button class="flex-1 rounded-full bg-blue-500 py-3 text-sm text-white font-bold shadow-blue-200 shadow-lg transition-transform active:scale-95" @click="handleSaveClick">
        提交调整申请
      </button>
    </div>

    <!-- Drawers & Dialogs -->
    <DoctorSelectDrawer
      v-model="showDoctorDrawer"
      :target-slot="selectedSlot"
      :clinic-id="currentClinicId"
      @select="handleDoctorSelect"
    />

    <SaveConfirmDialog
      v-model="showSaveDialog"
      :changes="modifiedSlots"
      :loading="saving"
      @confirm="handleSaveConfirm"
    />

    <wd-toast />
  </div>
</template>

<script setup lang="ts">
import type { ClinicType, Doctor, ScheduleSlot, ShiftType } from '@/types/schedule'
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'wot-design-uni'
import { getClinicList, getScheduleList, submitScheduleChange } from '@/service/schedule'
import DoctorSelectDrawer from './components/DoctorSelectDrawer.vue'
import SaveConfirmDialog from './components/SaveConfirmDialog.vue'

definePage({
  style: {
    navigationBarTitleText: '排班管理',
    navigationStyle: 'custom',
  },
})

const toast = useToast()
const currentClinicId = ref('')
const clinics = ref<ClinicType[]>([])
const scheduleSlots = ref<ScheduleSlot[]>([])
const currentWeekStart = ref(new Date())

const showDoctorDrawer = ref(false)
const showSaveDialog = ref(false)
const selectedSlot = ref<ScheduleSlot>()
const saving = ref(false)

// Constants
const shifts: { key: ShiftType, label: string, time: string }[] = [
  { key: 'morning', label: '上午', time: '08-12' },
  { key: 'afternoon', label: '下午', time: '14-18' },
  { key: 'night', label: '晚间', time: '18-21' },
]

// Computed
const currentClinic = computed(() => clinics.value.find(c => c.id === currentClinicId.value) || null)

const weekDays = computed(() => {
  const days = []
  const start = new Date(currentWeekStart.value)
  // Adjust to Monday
  const day = start.getDay()
  const diff = start.getDate() - day + (day === 0 ? -6 : 1)
  start.setDate(diff)

  const weekNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push({
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      dateStr: `${d.getMonth() + 1}/${d.getDate()}`,
      weekName: weekNames[i],
    })
  }
  return days
})

const currentWeekLabel = computed(() => {
  const start = weekDays.value[0]
  const end = weekDays.value[6]
  return `${start.dateStr} - ${end.dateStr}`
})

const modifiedSlots = computed(() => {
  // In a real app, track diffs. Here we just return all filled slots for demo
  return scheduleSlots.value.filter(s => s.status === 'filled' || s.isModified)
})

// Methods
async function fetchData() {
  uni.showLoading({ title: '加载中' })
  clinics.value = await getClinicList()
  if (!currentClinicId.value && clinics.value.length > 0) {
    currentClinicId.value = clinics.value[0].id
  }
  await fetchSchedule()
  uni.hideLoading()
}

async function fetchSchedule() {
  if (!currentClinicId.value)
    return
  scheduleSlots.value = await getScheduleList(currentClinicId.value, weekDays.value[0].date)
}

function handleClinicChange({ name }: { name: string }) {
  currentClinicId.value = name
  fetchSchedule()
}

function changeWeek(offset: number) {
  const d = new Date(currentWeekStart.value)
  d.setDate(d.getDate() + offset * 7)
  currentWeekStart.value = d
  fetchSchedule()
}

function getSlot(date: string, shift: ShiftType) {
  return scheduleSlots.value.find(s => s.date === date && s.shift === shift)
}

function getCellClass(slot?: ScheduleSlot) {
  if (!slot)
    return 'bg-gray-50'
  if (slot.status === 'filled')
    return 'bg-blue-50 border border-blue-200 shadow-sm'
  if (slot.status === 'empty')
    return 'bg-white border border-dashed border-gray-300 hover:border-blue-300'
  return 'bg-gray-100 text-gray-400'
}

function handleSlotClick(slot?: ScheduleSlot) {
  if (!slot || slot.status === 'unavailable')
    return

  // Check if the slot date is in the past
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  if (slot.date <= todayStr) {
    toast.warning('无法修改过去或今天的排班')
    return
  }

  selectedSlot.value = slot
  showDoctorDrawer.value = true
}

function handleDoctorSelect(doctor: Doctor | null) {
  if (!selectedSlot.value)
    return

  // Update local state
  const idx = scheduleSlots.value.findIndex(s =>
    s.date === selectedSlot.value!.date && s.shift === selectedSlot.value!.shift,
  )

  if (idx !== -1) {
    if (doctor) {
      scheduleSlots.value[idx] = {
        ...scheduleSlots.value[idx],
        status: 'filled',
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorTitle: doctor.title,
        isModified: true,
      }
    }
    else {
      scheduleSlots.value[idx] = {
        ...scheduleSlots.value[idx],
        status: 'empty',
        doctorId: undefined,
        doctorName: undefined,
        doctorTitle: undefined,
        isModified: true,
      }
    }
  }
}

function handleSaveClick() {
  showSaveDialog.value = true
}

async function handleSaveConfirm() {
  saving.value = true
  const success = await submitScheduleChange(currentClinicId.value, modifiedSlots.value)
  saving.value = false

  if (success) {
    showSaveDialog.value = false
    toast.success('申请已提交，等待审核')
    // Reset modified flags if needed
  }
  else {
    toast.error('提交失败')
  }
}

function handleCancel() {
  fetchSchedule() // Revert changes
}

function handleBack() {
  uni.navigateBack()
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
