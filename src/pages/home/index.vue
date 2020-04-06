<template>
  <view class="home_tab">
    <view class="home_tab_title">
      <view class="title_inner">
        <uni-segmented-control
          :current="current"
          :values="items"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#f57777"
        ></uni-segmented-control>
      </view>
      <view class="title_icon">🔎</view>
    </view>

    <view class="home_tab_content">
      <view class="content">
        <view v-show="current === 0">
          <home-recommend />
        </view>
        <view v-show="current === 1">
          <home-category />
        </view>
        <view v-show="current === 2">
          <home-new />
        </view>
        <view v-show="current === 3">
          <home-album />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import homeRecommend from "./home-recommend";
import homeCategory from "./home-category";
import homeNew from "./home-new";
import homeAlbum from "./home-album";

import { uniSegmentedControl } from "@dcloudio/uni-ui";

export default {
  data() {
    return {
      items: ["推荐", "分类", "最新", "专辑"],
      current: 0
    };
  },
  components: {
    homeRecommend,
    homeAlbum,
    homeCategory,
    homeNew,
    uniSegmentedControl
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  },

};
</script>

<style lang="scss" scoped>
.home_tab{
  .home_tab_title{
    position: relative;
    .title_inner{
      width: 60%;
      margin: 0 auto;
    }
    .title_icon{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
}
</style>