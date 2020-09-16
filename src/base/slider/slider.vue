<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key=index :class="{active:currentPageIndex === index}" ></span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { addClass} from "common/js/dom";

export default {
  data(){
    return {
      dots:[],//小圆点
      currentPageIndex:0
    }
  },
  props: {
    //可不可以轮播
    loop: {
      type: Boolean,
      default: true,
    },
    // 能否自动轮播
    autoplay: {
      type: Boolean,
      default: true,
    },
    // 轮播间隔
    interval: {
      type: Number,
      default: 4000,
    },
  },
  mounted() {
    // 用了mounted后是模板为html了，但是浏览器还没有刷新完，需要等待17ms，一般用20ms
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots()
      this._initSlider();
    }, 20);
      if(this.autoplay){
        this._play()
      }

    window.addEventListener('resize',() =>{
      if(!this.slider){
        return
      }
      this._setSliderWidth(true)
      
      this.slider.refresh()
      console.log('fresh')
    })
  },
  methods: {
    // 设置轮播图宽度
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");
        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 初始化小圆点
    _initDots(){
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
         this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap:{
             loop: this.loop, // 无缝循环
             threshold:0.3
          } 
        })
        // 判断小圆点的位置
        this.slider.on('scrollEnd',()=> {
          let pageIndex = this.slider.getCurrentPage().pageX
          if(this.loop){
            pageIndex -= 0
          }
          this.currentPageIndex = pageIndex

          if(this.autoplay){
            clearTimeout(this.timer)
            this._play()
          }
        })
    },
    _play(){
      let pageIndex = this.currentPageIndex 
      if(this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex,0,400)
      },this.interval)
      if(pageIndex === this.dots.length){
        pageIndex = 0
      }
    }
  },
  destroyed(){
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>