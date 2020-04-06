<template>
  <view class="video_cate">
    <view class="category_tab_title">
      <view class="title_inner">
        <uni-segmented-control
          :current="current"
          :values="items.map(item=>item.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#f57777"
        ></uni-segmented-control>
      </view>
      <view class="title_icon">🔎</view>
    </view>

    <scroll-view @scrolltolower="handleScrollLower" scroll-y enable-flex class="category_tab_content">
        <view class="cate_item" v-for="item in videowp" :key="item.id" @click="handleVideo(item)">
            <image :src="item.img" mode="widthFix"/>
        </view>
    </scroll-view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

export default {
  data() {
    return {
      id: "",
      items: [
        { title: "最新", order: "new" },
        { title: "热门", order: "hot" }
      ],
      current: 0,
      params: {
        limit: 30,
        skip: 0,
        order: "new",
      },
      videowp:[],
      flag:true
    };
  },
  components: { uniSegmentedControl },
  onLoad(option) {
    this.id = option.id;
    this.getList();
  },
  methods: {
    onClickItem(e) {
      this.params.order = this.items[e.currentIndex].order;
      
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
      this.getList();

      // bug
      this.params.skip = 0
      this.videowp = []
    },
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/videoimg/v1/videowp/category/${this.id}`,
        data: this.params
      }).then(res => {
        if(res.data.res.videowp.length == 0){
          this.flag = false
          uni.showToast({
            title:'NO More',
            icon:'none'
          })
          return
        }

        this.videowp = [...this.videowp,...res.data.res.videowp]
      });
    },
    handleScrollLower(){
      if(this.flag){
        this.params.skip += this.params.limit
        this.getList()
      }else{
        uni.showToast({
          title:'NO More',
          icon:'none'
        })
      }
    },
    handleVideo(item){
      getApp().globalData.video = item

      uni.navigateTo({
        url:'/pages/videoPlay/index'
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.video_cate {
  .category_tab_title {
    position: relative;
    .title_inner {
      width: 60%;
      margin: 0 auto;
    }
    .title_icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
}

.category_tab_content {
  height: calc(100vh - 36px);
  display: flex;
  flex-wrap: wrap;
  .cate_item {
    width: 33.33%;
    box-sizing: border-box;
    border: 5rpx solid #fff;
    image {
      display: block;
      width:100%;
    }
  }
}
</style>