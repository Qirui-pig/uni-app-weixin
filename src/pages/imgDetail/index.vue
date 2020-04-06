<template>
  <view v-if="Object.keys(imgDetail).length > 0">
    <!-- 用户信息  -->
    <view class="user_info">
      <view class="user_avt">
        <image :src="imgDetail.user.avatar" mode="widthFix"/>
      </view>
      <view class="user_desc">
        <view class="user_name">{{imgDetail.user.name}}</view>
        <view class="user_time">{{fromNow}}</view>
      </view>
    </view>
    <!-- 图片 -->
    <view class="high_img">
      <swiper-action @swiperAction="handleSwiperAction">
        <image :src="imgDetail.thumb" mode="widthFix"/>
      </swiper-action>
    </view>
    <!-- 点赞 收藏 -->
    <view class="user_rank">
      <view class="rank">👍{{imgDetail.rank}}</view>
      <view class="collect">❤收藏</view> 
    </view>
    <!-- 专辑 -->
    <view class="album_wrap"v-if="comment.album.length>0">
      <view class="album_title">相关</view>
      <view class="album_list">
        <view class="album_item"
              v-for="item in comment.album" :key="item.id">
          <view class="album_left">
            <image :src="item.cover" mode="widthFix"></image>
          </view>
          <view class="album_right">
            <view class="album_text">专辑</view>
            <view class="album_name">{{item.name}}</view>
            <text class="next">></text>
          </view>
        </view>
      </view>
    </view>
    <!-- 最热评论 -->
    <view class="comment hot" v-if="comment.hot.length>0">
      <view class="title">
        <view class="icon">💋</view>   
        <view class="text">最热评论</view>
        </view>

      <view class="comment_list"v-for="item in comment.hot" :key="item.id">
        
          <!-- 用户信息 -->
          <view class="comment_user">
            <view class="user_item">

              <view class="user_icon">
                <image :src="item.user.avatar" mode="widthFix"/>
              </view>

              <view class="user_name">
                <view class="user_nickname">{{item.user.name}}</view>
                <view class="time">{{item.atime}}</view>
              </view>
            </view>

            <!-- <view class="user_badge">
              <image v-for="item2 in item.user.title" :key="item2.icon" :src="item2.icon"/>
            </view> -->
          </view>

          <view class="comment_desc">
            <view class="comment_content">
              {{item.content}}
            </view>
            <view class="comment_like">👍{{item.size}}</view>
          </view>
        
      </view>
    </view>

    <!-- 下载 -->
    <view class="download">
      <view class="download_btn" @click="handleDownLoad">下载图片</view>
    </view>
  </view>  
</template>

<script>
import moment from 'moment'
// 设置为中文
moment.locale('zh-cn')

import SwiperAction from '../../components/SwiperAction'

export default {
  data() {
    return {
      // 图片星系对象
      imgDetail:{},
      // newThumb:'',
      fromNow:'',
      CfromNow:'',
      comment:{},
      index:0
    }
  },
  onLoad(){
    // console.log(getApp().globalData);
    
    const {index} = getApp().globalData
    this.index = index

    this.getData()
  },
  methods: {
    getComment(){
      this.request({
        url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${this.imgDetail.id}/comment`
      }).then(ret=>{
        const result = ret.data.res
        this.comment = result
        // console.log(this.comment);
      })
    },
    getData(){
      const {imgList} = getApp().globalData
      this.imgDetail = imgList[this.index]

      // this.newThumb = this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>',360)
    
      this.fromNow = moment(this.imgDetail.atime*1000).fromNow() 


      this.getComment()
    },
    handleSwiperAction(e){
      const {imgList} = getApp().globalData
      if(e.direction=="left" && this.index < imgList.length - 1){
        this.index ++
        this.getData()
      }else if(e.direction == "right" && this.index > 0){
        this.index --
        this.getData()
      }else{
        uni.showToast({
          title:'NO MORE',
          icon: "none"
        })
      }
      
    },
    async handleDownLoad(){
      // loading
      await uni.showLoading({
        title:'下载中'
      })

      // 下载到小程序内存中
      const ret = await uni.downloadFile({url:this.imgDetail.img})
      const tempFilePath = ret[1].tempFilePath
      // console.log(tempFilePath);

      // 小程序内存的临时文件下载到本地上
      const result = await uni.saveImageToPhotosAlbum({
        filePath:tempFilePath
      })
      // console.log(result);
      uni.hideLoading()

      uni.showToast({
        title:'下载完成',
        icon:'none'
      })
    }
  },
  components:{
    SwiperAction
  }
}
</script>

<style lang="scss" scoped>
image{
  display: block;
  width: 100%;
}

.user_info {
  display: flex;
  padding: 20rpx;
  .user_avt {
    padding: 0 20rpx;
    image {
      display: block;
      width: 90rpx;
      border-radius: 50%;
    }
  }

  .user_desc {
    .user_name {
      color: #000;
      font-weight: 600;
    }

    .user_time {
      color: #ccc;
      font-size: 24rpx;
      padding: 10rpx 0;
    }
  }
}

.user_rank {
  display: flex;
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 10rpx;
  text-align: center;
  border-bottom: 3rpx solid #eee;
  font-size: 32rpx;
  .rank {
    
    flex: 1;
  }

  .collect {
    flex: 1;
  }
}

.album_wrap {
  padding: 20rpx;
  border-bottom: 3rpx solid #eee;
  .album_title {
    padding: 10rpx 0;
  }

  .album_list {
    .album_item {
      display: flex;
      padding: 10rpx 0;
      .album_left {
        flex:1;
        image {
          width: 180rpx;
        }
      }

      .album_right {
        flex:3;
        padding-left: 20rpx;
        position: relative;
        .album_text {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .album_name {
          padding: 10rpx 0;
          color: #888;
        }

        .next{
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10%;
        }
      }
    }
  }
}
.comment {
  .title {
    padding: 15rpx;
    .icon{
      color: red;
      font-size: 40rpx;
      display: inline-block;
    }
    .text{
      font-weight: 600;
      font-style: 30rpx;
      color: #666;
      margin-left: 10rpx;
      display: inline-block;
    }
  }

  .comment_list {
    border-bottom: 4rpx solid #eee;
  .comment_user {
    
    .user_item {
      display: flex;

      .user_icon {
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 90%;
        }
      }

      .user_name {
        flex:1;
        .user_nickname {
          color: #777;
        }

        .time {
          color: #ccc;
          font-size: 24rpx;
          padding: 5rpx 0;
        }
      }
    }

    .user_badge {
      image {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }

  .comment_desc {
    display: flex;
    padding: 20rpx 0;
    .comment_content {
      flex: 1;
      padding-left: 15%;
      color: #000;
      font-size: 24rpx;
    }

    .comment_like {
      text-align: right;
    }
  }
  }
}
.download {
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .download_btn {
    width: 90%;
    height: 85%;
    background-color: $color;
    color: #fff;
    font-size: 50rpx;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>