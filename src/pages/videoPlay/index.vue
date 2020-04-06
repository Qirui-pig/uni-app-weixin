<template>
  <view class="video_play">
    <image :src="videoObj.img"></image>
    <!-- 工具栏 -->
    <view class="video_tool">
      <view class="icon">🎶</view>
      <view class="icon video_share">
        <button open-type="share"></button>
        🤳
      </view>
    </view>
    <!-- 视频 -->
    <view class="video_wrap">
      <video :src="videoObj.video" objectFit="fill"></video>
    </view>
    <!-- 下载 -->
    <view class="video_download">
      <view class="download_btn" @click="handelDownLoad">
        下载视频
      </view>
    </view>
  </view>  
</template>

<script>
export default {
  data() {
    return {
      videoObj:{},
      muted:false
    }
  },
  onLoad(){
    // console.log(getApp().globalData.video)
    this.videoObj = getApp().globalData.video
  },
  methods: {
    async handelDownLoad(){
      await uni.showLoading({
        title:'下载中'
      })
      // 远程视频下载到小程序内存中
      const {tempFilePath} = (await uni.downloadFile({url:this.videoObj.video}))[1]
      // 下载到本地上
      await uni.saveVideoToPhotosAlbum({
        filePath:tempFilePath
      })
      uni.hideLoading()

      await uni.showToast({
        title:'下载成功',
        icon:'none'
      })
    }
  },
}
</script>

<style scoped lang="scss">
.video_play {
  position: relative;
  image {
    display: block;
    width: 100vh;
    height: 100vh;
    position: absolute;
    z-index: -1;
    filter: blur(20px);
  }

  .video_tool {
    height: 80rpx;
    display: flex;
    justify-content: flex-end;
     .icon{
       width: 80rpx;
       color: #fff;
       font-size: 50rpx;
       border-radius: 50%;
       background-color: rgba(0,0,0,.2);
       display: flex;
       align-items: center;
       justify-content: center;
       margin-right: 20rpx;
       
     }
     .video_share{
       position: relative;
        button{
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
       }
     }
  }

  .video_wrap {
    display: flex;
    justify-content: center;
    video {
      width: 360rpx;
      height: 600rpx;
    }
  }

  .video_download {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
    .download_btn {
      width: 360rpx;
      height: 80rpx;
      border-radius: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      border: 1rpx solid #fff;
      background-color: rgba(0,0,0,.2);
    }
  }
}
</style>