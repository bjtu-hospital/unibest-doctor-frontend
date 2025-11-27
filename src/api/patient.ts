import type { PatientDetailData } from '@/pages/patient-detail/types'
import { httpGet } from '@/http/http'
import { mockPatientDetail } from '@/pages/patient-detail/mock'

// Mock 开关
const USE_MOCK = false

// 请求缓存
const requestCache = new Map<string, { data: any, timestamp: number }>()
// 缓存过期时间（5分钟）
const CACHE_EXPIRE_TIME = 5 * 60 * 1000
// 正在进行的请求（防止重复请求）
const pendingRequests = new Map<string, Promise<any>>()

/**
 * 获取患者详情
 * @param patientId 患者ID
 * @returns 返回格式: {
 *   code: 0,
 *   message: {
 *     basicInfo: { ... },
 *     medicalHistory: { ... },
 *     consultationRecords: [ ... ]
 *   }
 * }
 */
export function getPatientDetail(patientId: string): Promise<PatientDetailData> {
  if (USE_MOCK) {
    // 返回 mock 数据
    console.log('使用 Mock 数据:', patientId)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPatientDetail)
      }, 300)
    })
  }

  const cacheKey = `patient_detail_${patientId}`

  // 检查缓存
  const cached = requestCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRE_TIME) {
    console.log('使用API缓存数据:', cacheKey)
    return Promise.resolve(cached.data)
  }

  // 检查是否有相同的请求正在进行
  if (pendingRequests.has(cacheKey)) {
    console.log('等待现有请求完成:', cacheKey)
    return pendingRequests.get(cacheKey)!
  }

  // 发起新请求
  console.log('发起新API请求:', cacheKey)
  const requestPromise = httpGet<PatientDetailData>(`/doctor/patient/${patientId}`)
    .then((response) => {
      // 缓存响应数据
      requestCache.set(cacheKey, {
        data: response,
        timestamp: Date.now(),
      })
      // 移除待处理请求
      pendingRequests.delete(cacheKey)
      return response
    })
    .catch((error) => {
      // 移除待处理请求
      pendingRequests.delete(cacheKey)
      throw error
    })

  // 记录待处理请求
  pendingRequests.set(cacheKey, requestPromise)

  return requestPromise
}

/**
 * 清除患者详情缓存
 * @param patientId 可选，指定患者ID则只清除该患者的缓存
 */
export function clearPatientCache(patientId?: string) {
  if (patientId) {
    // 清除指定患者的缓存
    const key = `patient_detail_${patientId}`
    requestCache.delete(key)
    console.log(`已清除患者 ${patientId} 的缓存`)
  }
  else {
    // 清除所有缓存
    const size = requestCache.size
    requestCache.clear()
    console.log(`已清除所有患者缓存，共 ${size} 条`)
  }
}
