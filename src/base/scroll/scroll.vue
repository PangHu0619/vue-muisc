<template>
  <div ref='wrapper'>
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props:{
      // 有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
      probeType:{
        type:Number,
        default:1
      },
      // 作用：better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。但是自定义的 click 事件会阻止一些原生组件的行为，如 checkbox 的选中等，所以一旦滚动列表中有一些原生表单组件，推荐的做法是监听 tap 事件，如下。
      click:{
        type:Boolean,
        default:true
      },
      // 数据
      data:{
        type:Array,
        default:null
      },
    },
    mounted(){
      setTimeout(() => {
        this._initScroll();
      },20)

    },
    methods:{
      _initScroll(){
        if(!this.$refs.wrapper){
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType:this.probeType,
          click:this.click
        })
      },
      enabled(){
        this.scroll && this.scroll.enabled()
      },
      disabled(){
        this.scroll && this.scroll.disabled()
      },
      // 重置
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      //滚动到
      scrollTo(){
        this.scroll && this.scroll.scrollTo()
      },
      // 滚动到元素
      scrollToElement(){
        this.scroll && this.scroll.scrollToElement()
      }
    },
    watch:{
      data(){
        setTimeout(() => {
          this.refresh()
        },20)
      }
    }
  }
</script>

<style>

</style>