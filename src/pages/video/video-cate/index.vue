<template>
  <view class="video_category">
    <navigator :url="`/pages/videoCate/index?id=${item.id}`" class="cate_item" v-for="item in category" :key="item.id">
      <image :src="item.img" mode="aspectFill" />
      <view class="cate_name">{{item.name}}</view>
    </navigator>
  </view>
</template>

<script>
export default {
  data(){
    return {
      category:[]
    }
  },
  props:{
    urlobj:Object
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(){
      this.request(this.urlobj).then(res=>{
        // console.log(res.data.res);
        this.category = res.data.res.category
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.video_category {
  display: flex;
  flex-wrap: wrap;

  .cate_item {
    position: relative;
    border: 5rpx solid #fff;
    width: 50%;
    box-sizing: border-box;
    image {
      display: block;
      width: 100%;
      height: 240rpx;
    }

    .cate_name {
      position: absolute;
      color: #fff;
      width: 100%;
      height: 40rpx;
      left: 0;
      bottom: 20rpx;
      // 渐变
      background-image: inner-gradient(to right top,rgba(0,0,0,0));
      font-size: 40rpx;
      display: flex;
      align-items: center;
      padding-left: 20rpx;
    }
  }
}
</style>