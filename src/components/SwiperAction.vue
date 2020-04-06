<template>
  <view   @touchstart="handleTouchstart"
          @touchend="handleTouchend">
    <slot ></slot>
  </view> 
</template>

<script>
export default {
  data() {
    return {
      startTime:0,
      endTime:0,
      startX:0
    }
  },
  methods: {
    handleTouchstart(e){
      this.startTime = Date.now()
      this.startX = e.changedTouches[0].clientX
    },
    handleTouchend(e){
      const endTime = Date.now()

      const endX = e.changedTouches[0].clientX

      if(endTime - this.startTime > 2000){
        return
      }

      let direction = ""

      if(Math.abs(endX - this.startX)>70){
        direction = endX - this.startX > 0 ? "right":"left"
      }else{
        return
      }

      // console.log(direction);
      this.$emit('swiperAction',{direction})
    }
  },
}
</script>

<style>

</style>