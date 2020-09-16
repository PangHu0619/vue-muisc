<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- 在组件切换过程中将状态保留在内存中，防止重复渲染DOM，减少加载时间及性能消耗，提高用户体验性 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'


export default {
  name: 'App',
  components:{
    MHeader,
    Tab
  }
}
</script>

<style lang="stylus">
  @import "~common/stylus/variable"

  #app 
    color:$color-theme
</style>
