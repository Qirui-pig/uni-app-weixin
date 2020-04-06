<template>
  <view class="home_category">
    <navigator :url="`/pages/imgCategory/index?id=${item.id}`" class="cate_item" v-for="item in category" :key="item.id">
      <image :src="item.cover" mode="aspectFill" />
      <view class="cate_name">{{item.name}}</view>
    </navigator>
  </view>  
</template>

<script>
export default {
  data() {
    return {
      category:[]
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    getCategory(){
      this.request({
        url:`http://157.122.54.189:9088/image/v1/vertical/category`
      }).then(ret=>{
        this.category = ret.data.res.category
        // console.log(this.category);
        
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.home_category {
  display: flex;
  flex-wrap: wrap;

  .cate_item {
    position: relative;
    border: 5rpx solid #fff;
    width: 33.33%;
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