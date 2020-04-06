<template>
  <view>
    <view class="category_tab">
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
          <view class="cate_item" v-for="(item,index) in vertical" :key="item.id">
            <detail :list="vertical" :index="index">
              <image :src="item.thumb" mode="widthFix"/>
            </detail>
          </view>
        </scroll-view>

    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

import Detail from '../../components/Detail'

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
        order: "new"
      },
      vertical:[],
      flag:true
    };
  },
  onLoad(option) {
    this.id = option.id;

    this.getData();
  },
  components: { uniSegmentedControl,Detail },
  methods: {
    onClickItem(e) {
      this.params.order = this.items[e.currentIndex].order;
      
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
      this.getData();

      // bug
      this.params.skip = 0
      this.vertical = []
    },
    getData() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
        data: this.params
      }).then(ret => {

        if(ret.data.res.vertical.length == 0){
          this.flag = false
          uni.showToast({
            title:'NO More',
            icon:'none'
          })
          return
        }

        this.vertical = [...this.vertical,...ret.data.res.vertical];
        // console.log(this.vertical);
        
      });
    },
    handleScrollLower(){
      if(this.flag){
        this.params.skip += this.params.limit
        this.getData()
      }else{
        uni.showToast({
          title:'NO More',
          icon:'none'
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.category_tab {
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