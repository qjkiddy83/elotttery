<template>
  <!-- <div id="app" :style="'height:'+wh+'px;'" :class="android_version>4.3?'':'no-flex'"> -->
  <div id="app" :style="'height:'+wh+'rem;'" :class="android_version>4.3?'':'no-flex'">
    <!-- <keep-alive> -->
    <router-view/>
  <!-- </keep-alive> -->
    <!-- <div class="logger">{{width}}----{{height}}----{{wh}}</div> -->
  </div>
</template>

<script>
import './lib/flexible.js';

export default {
  name: 'App',
  data () {
    return {
      width:0,
      height:0,
      wh:0,
      android_version:5
    }
  },
  created:function(){
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.wh = 10*this.height/this.width

    var ua = navigator.userAgent.toLowerCase();
    var _android_version = null;
    if (ua.indexOf("android") > 0) {
        var reg = /android [\d._]+/gi;
        var v_info = ua.match(reg);
        _android_version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, "."); //得到版本号4.2.2
        _android_version = parseFloat(_android_version);// 得到版本号第一位
    }
    if(_android_version){
      this.android_version = _android_version;
    }
  }
}
// alert(navigator.userAgent);


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
    width:10rem;
    // overflow-x:hidden;
    // transform:scale(0.5925);
    // transform-origin: 0 0;
  }
  @import "./assets/css/global.scss";
</style>
