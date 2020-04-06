<template>
  <scroll-view scroll-y @scrolltolower="hadleScrollToLower" enable-flex class="video_scroll">
    <view class="video_item" v-for="item in videowp" :key="item.id"
          @click="handleVideo(item)"
    >
      <image mode="widthFix" :src="item.img" />
    </view>  
  </scroll-view>  
</template>

<script>
export default {
  data() {
    return {
      videowp:[],
      flag:true
    }
  },
  props:{
    urlobj:Object
  },
  mounted() {
    // console.log(this.urlobj);
    this.getList()
  },
  watch: {
    urlobj(){
      // console.log(this.urlobj);
      this.videowp = []
      this.getList()
    }
  },
  methods: {
    getList(){
      this.request(this.urlobj).then(ret=>{
        // console.log(ret.data);
        if(ret.data.res.videowp.length == 0){
          this.flag = false
          uni.showToast({
          title:'No more',
          icon:'none'
          })
          return
        }
        this.videowp = [...this.videowp,...ret.data.res.videowp]
      })
    },
    hadleScrollToLower(){
      console.log(1);
      
      if(this.flag){
        this.urlobj.params.skip += this.urlobj.params.limit
        this.getList()
      }else{
        uni.showToast({
          title:'No more',
          icon:'none'
        })
      }
    },
    handleVideo(item){
      // 把数据存储到全局
      getApp().globalData.video = item
      
      // 跳转页面
      uni.navigateTo({
        url:'/pages/videoPlay/index'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.video_scroll{
  height: calc(100vh - 36px);
  display: flex;
  flex-wrap: wrap;
  .video_item{
    width: 33.33%;
    box-sizing: border-box;
    border: 5rpx solid #fff;
  }
  image{
    display: block;
    width: 100%;
  }
}
</style>