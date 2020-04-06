<template>
  <scroll-view scroll-y class="scroll" @scrolltolower="handleToLower">

    <view class="album_swiper">
      <swiper circular indicator-dots autoplay>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>

    <view class="album_list">
      <navigator class="album_item" 
                 :url='`/pages/album/index?id=${item.id}`'
                 v-for="(item,index) in album" :key="item.id">
          <view class="album_img">    
            <image :src="item.cover" mode="widthFix"/>
          </view>
        <view class="album_info">
          <view class="album_name">{{item.name}}</view>
          <view class="album_desc">{{item.desc}}</view>
          <view class="album_btn">
            <view class="album_attention">+关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>  
</template>

<script>
export default {
  data() {
    return {
      params:{
        limit:30,
        order:'album',
        skip:0
      },
      banner:[],
      album:[],
      flag:true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(){
      this.request({
        url:'http://157.122.54.189:9088/image/v1/wallpaper/album',
        data:this.params
      }).then(res=>{
        const result = res.data.res
        if(this.banner.length == 0){
        this.banner = result.banner
        }

        if(result.album.length == 0){
          this.flag = false
          return
        }
        this.album = [...this.album,...result.album]

        
      })
    },
    handleToLower(){
      if(this.flag){
        this.params.skip += this.params.limit
        this.getList()
      }else{
        uni.showToast({
          title:'没有数据',
          icon:'none'
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.album_swiper{
  swiper{
  height: 326.1rpx;
    image{
      width: 100%;
      display: block;
      height: 326.1rpx;
    }
  }
}

.album_list {
  padding: 10rpx;
  .album_item {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1rpx solid #cccccc;
    .album_img {
      flex:1;
      padding: 10rpx;
      image {
        display: block;
        width: 100%;
      }
    }

    .album_info {
      flex:2;
      padding: 0 10rpx;
      overflow: hidden;
      .album_name {
        font-size: 34rpx;
        font-weight: 600;
        color: #000;
        padding: 10rpx 0;
      }

      .album_desc {
        padding: 10rpx 0;
        font-size: 27rpx;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .album_btn {
        padding: 10rpx;
        display: flex;
        justify-content: flex-end;
        .album_attention {
          color:$color;
          font-size: 10px;
          border: 1rpx solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
.scroll{
  height: calc(100vh - 36px);
}
</style>