<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { LOGIN_PAGE } from '@/router/config'
import { navigateToInterceptor } from '@/router/interceptor'
import { useTokenStore } from '@/store/token'

onLaunch((options) => {
  console.log('App.vue onLaunch', options)

  // 检查登录状态，未登录则跳转到登录页
  const tokenStore = useTokenStore()
  if (!tokenStore.hasLogin) {
    console.log('用户未登录，跳转到登录页')
    uni.reLaunch({ url: LOGIN_PAGE })
  }
})
onShow((options) => {
  console.log('App.vue onShow', options)
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
  // https://github.com/unibest-tech/unibest/issues/192
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}`, query: options.query })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">

</style>
