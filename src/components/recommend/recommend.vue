<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>

        <!-- 轮播图 -->
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item, index) in recommends" :key="index" >
              <div @click="_push(item)" >
                <img @load="loadImage" :src="_getLbtImg(item.img)" class="needsclick" />
              </div>
            </div>
          </slider>
        </div>
        <!-- 热门歌单 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img v-lazy="item.cover" alt width="60" height="60" />
              </div>
              <div class="text">
                <h2 class="name">{{item.title}}</h2>
                <p class="desc">{{'播放量：' + _listen_num(item.listen_num) + '万' }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from "base/slider/slider";
import Scroll from "base/scroll/scroll";

import Loading from 'base/loading/loading'


import { getRecommend, getDisList } from "api/recommend";
import { ERR_OK } from "api/config";

export default {
  data() {
    return {
      recommends: [],
      discList: [],
      checkLoaded:false
    };
  },
  created() {
    this._getRecommend();
    setTimeout(() => {
      this._getDisList();
    },2000)
    
  },
  methods: {
    // 获取轮播图数据
    _getRecommend() {
      getRecommend().then((res) => {
        this.recommends = res.lbt.data;
        console.log(this.recommends);
      });
    },
    // 点击图片，跳转到图片中的歌曲
    _push(item) {
      // const singer = new Singer({
      //   id: item.songid,
      //   name: item.name,
      // });
      // this.$router.push({
      //   path: `/singer/${singer.id}`,
      // });
      // this.setSinger(singer);
      console.log('click')
      
    },
    // 拼接轮播图图片地址
    _getLbtImg(img) {
      return `http://www.zhouyongju.com/usr/themes/zhouyongju/resource/app/music/lbt/${img}.jpg`;
    },
    // 获取热门歌单数据
    _getDisList() {
      getDisList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.recomPlaylist.data.v_hot;
          console.log(this.discList);
        }
      });
    },
    //播放量改为万
    _listen_num(num) {
      // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
      return (num / 10000).toFixed(1);
    },
    // 监听轮播图图片加载完成，在刷新页面计算高度
    loadImage() {
      if(!this.checkLoaded){
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      console.log('fresh')
      }
      
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
