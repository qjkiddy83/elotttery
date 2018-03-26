<template>
  <div id="app" :style="'height:'+wh+'px;'">
    <!-- <keep-alive> -->
    <router-view/>
  <!-- </keep-alive> -->
    <!-- <div class="logger">{{width}}----{{height}}----{{wh}}</div> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      width:0,
      height:0,
      wh:0
    }
  },
  created:function(){
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.wh = 1080*this.height/this.width
  }
}
</script>

<style lang="scss">
  .logger{
    position:fixed;
    top:0;
    left:0;
    font-size:50px;
    color:#fff;
  }
  #app{
    width:1080px;
    // transform:scale(0.5925);
    // transform-origin: 0 0;
  }
  @import "./assets/css/global.scss";
</style>
