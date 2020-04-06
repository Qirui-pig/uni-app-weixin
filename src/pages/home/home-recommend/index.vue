<template>
  <scroll-view scroll-y class="recommend_view" @scrolltolower="handleToLower" v-if="recommends.length>0">
    <!-- 推荐 -->
    <view class="recommend_wrap">
      <navigator    :url='`/pages/album/index?id=${item.target}`'
                  class="recommend_item" v-for="item in recommends" :key="item.id">
        <image :src="item.thumb" mode="widthFix" />
      </navigator>
    </view>
    <!-- 月份 -->
    <view class="month_wrap">

      <view class="month_title">
        <view class="title_left" v-if="Object.keys(month).length>0">
          <view class="info">
            <text>20{{month.YY}}年/</text>{{month.MM}}月{{month.DD}}日
          </view>
          <view class="text">{{month.title}}</view>
        </view>
        <view class="title_right">更多></view>
      </view>


      <swiper class="month_content" indicator-dots
              indicator-active-color="#fff"
              autoplay  circular
      >
        <swiper-item class="month_item"
        v-for="(item, index) in month.items" :key="item.id">
        <detail :list="month.items" :index="index">
          <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>','360')"/>
        </detail>
        </swiper-item>
      </swiper>
    </view>

    <view class="hot_wrap">
      <view class="hot_title">
        <text>热门</text>
      </view>
      <view class="hot_content">
        <view class="hot_item" v-for="(item,index) in hots" :key="item.id">
          <detail :list="hots" :index="index">
          <image mode="widthFix" 
          :src="item.thumb"></image>
          </detail>
        </view>
      </view>
    </view>

  </scroll-view>
</template>

<script>
import moment from 'moment'

import Detail from '../../../components/Detail'

export default {
  data() {
    return {
      recommends: [],
      month:{},
      hots:[],
      // 请求参数
      params:{
        limit: 30,
        order: "hot",
        skip: 0
      },
      isMore:true
    };
  },
  methods: {
    // 请求数据
    getRecommend(){
      this.request({
      url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
      data: this.params
    }).then(res => {
      const result = res.data

      // 判断是否第一次请求
      if(this.recommends.length == 0){
        // 推荐数据
        this.recommends = result.res.homepage[1].items;
        // console.log(this.recommends);
        // 月份数据
        this.month = result.res.homepage[2]
        // console.log(this.month);
        // 时间戳格式化
        this.month.MM = moment(this.month.stime).format("MM")
        this.month.YY = moment(this.month.stime).format("YY")
        this.month.DD = moment(this.month.stime).format("DD")
        // console.log(this.month);
      }
      
      // 判断还有没有数据
      if(result.res.vertical.length == 0){
        this.isMore = false
        return
      }

      // 热门数据 热门数据加载更多
      this.hots = [...this.hots,...result.res.vertical] 
      // console.log(this.hots );
    });
    }
    ,

    handleToLower(){
      if(this.isMore){
        this.params.skip += this.params.limit
        this.getRecommend()
      }else{
        uni.showToast({
          title:'没有更多数据了',
          icon:"none"
        })
      }
      
    }
  },
  mounted() {
    this.getRecommend()
  },
  components:{
    Detail
  }
};
</script>

<style lang="scss" scoped>
.recommend_view{
  height: calc(100vh - 36px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .recommend_item {
    width: 50%;
    box-sizing: border-box;
    border: 5rpx solid white;
    image {
      width: 370rpx;
      height: 500rpx;
    }
  }
}
.month_wrap {
  .month_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .title_left {
      color: $color;
      font-size: 30rpx;
      display: flex;
      .info {
        text {
          font-size: 36rpx;
          font-weight: 600;
        }
      }

      .text {
        font-size: 34rpx;
        font-weight: 600;
        color: #666666;
        margin-left: 30rpx;
      }
    }

    .title_right {
      font-size: 30rpx;
      color: $color;
    }
  }
  .month_content {
  .month_item {
    image{
      width: 100%;
      height: 360rpx;
    }
  }
}
}

.hot_wrap {
  .hot_title {
    padding: 10px;
    text {
      border-left: 12rpx solid $color;
      font-size: 34rpx;
      font-weight: 600;
    }
  }

  .hot_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx silid #fff;
      image {
        display: block;
        width: 100%;
      }
    }
  }
}
swiper{
  height: 326.1rpx;
}
</style>