<template>
  <view class="">

    <!-- 专辑背景 -->
    <view class="album_bg">
      <image :src="album.cover" mode="widthFix" />
      <view class="album_info">
        <view class="album_name">{{album.name}}</view>
        <view class="album_btn">关注专辑</view>  
      </view>
    </view>
    <!-- 专辑作者 -->
    <view class="album_auth">
      <view class="auth_info">
         <image :src="album.user.avatar" mode="widthFix"></image>
         <view class="auth_name">{{album.user.name}}</view>
      </view>
      <view class="auth_desc">
        <text>{{album.desc}}</text>
      </view>
    </view>
    <!-- 列表 -->
    <view class="album_list">
      <view class="album_item" v-for="(item,index) in wallpaper" :key="item.id">
        <detail :list="wallpaper" :index="index">
          <image mode="widthFix" :src="item.thumb+item.rule.replace('$<Height>','360')"/>
        </detail>
      </view>
    </view>

  </view>  
</template>

<script>
import Detail from '../../components/Detail'
export default {
  data() {
    return {
      id:'',
      params:{
        limit:30,
        order:'new',
        skip:0,
        // 1返回album和wallpaper  0返回wallpaper
        first:1
      },
      album:{},
      wallpaper:[],
      flag:true
    }
  },
  components:{
    Detail
  },
  onLoad(options){
    // console.log(options);
    
    this.id = options.id 
    // this.id = '5d5f8e45e7bce75ae7fb8278'
    this.getList()
  },
  methods: {
    getList(){
      this.request({
        url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data:this.params
      }).then(ret=>{
        
        const result = ret.data.res
        if(Object.keys(this.album).length == 0){
          this.album = result.album
        }
        if(result.wallpaper.length == 0){
          this.flag = false
          uni.showToast({
            title:'无更多数据',
            icon:'none'
          })
          return
        }
        this.wallpaper = [...this.wallpaper,...result.wallpaper]

        
      })
    }
  },
  onReachBottom(){
    if(this.flag){
      this.params.skip += this.params.limit
      this.params.first = 0
      this.getList()
    }else{
      uni.showToast({
        title:'无更多数据',
        icon:'none'
      })
    }
    
  }
}
</script>

<style lang="scss" scoped>
.album_bg {
  position: relative;
  image {
    display: block;
    width: 100%;
  }

  .album_info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    color: #fff;
    padding: 0 15rpx;
    .album_name {
      font-size: 40rpx;
    }

    .album_btn {
      background-color: $color;
      width: 152rpx;
      height: 50rpx;
      font-size: 30rpx;
      text-align: center;
      border-radius: 20px;
      margin-right: 35rpx;
    }
  }
}

.album_auth {
  padding: 10rpx;
  .auth_info {
    padding: 10rpx 0;
    display: flex;
    align-items: center;
    image {
      display: block;
      width: 80rpx;
      border-radius: 50%;
    }

    .auth_name {
      margin-left: 15rpx;
      color: #000000;
    }
  }

  .auth_desc {
    font-size: 30rpx;
  }
}

.album_list {
  padding: 20rpx;
  display: flex;
  flex-wrap: wrap;  
  .album_item {
    width:33.33%;
    box-sizing: border-box;
    border: 1px solid #fff;
    image {
      display: block;
      width: 100%;
    }
  }
}
</style>