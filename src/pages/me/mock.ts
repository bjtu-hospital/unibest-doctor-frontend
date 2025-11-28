import type { ProfileStats } from '@/service/profile'

/**
 * 个人中心 Mock 数据
 */

// 个人统计数据 Mock
export const mockProfileStats: ProfileStats = {
  attendance: 22, // 本月出勤22天
  monthlyConsult: 156, // 本月接诊156人
  totalConsult: 3240, // 累计接诊3240人
}
