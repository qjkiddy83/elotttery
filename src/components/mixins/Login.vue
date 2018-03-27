<template>
  <section class="layer" v-if="layerShow">
    <section class="content">
      <a href="javascript:;" class="close" @click="closeLayer"></a>
      <h3>Log In</h3>
      <section class="profile"><img src="../../assets/images/nopic_iconhdpi.png"></section>
      <section class="btns">
        <a href="javascript:;" @click="FBLogin"><img src="../../assets/images/facebook_btnhdpi.png"></a>
        <a href="javascript:;"><img src="../../assets/images/gmail_btnhdpi.png"></a>
      </section>
      <p>New account will be created on your first login</p>
    </section>
  </section>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      layerShow:false,
      username : ''
    }
  },
  methods:{
    closeLayer:function(){
      this.layerShow = false;
    },
    showLayer:function(){
      this.layerShow = true;
    },
    FBLogin:function(){
      location.href = "http://manage.yubaxi.com/redirect";
    }
  },
  mounted:function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .content{
    height: 1174px;
    text-align: center;
    .btns{
      padding: 20px 0;
      a{
        margin-top: 50px;
        display:inline-block;
      }
    }
    p{
      position:absolute;
      width:100%;
      text-align:center;
      bottom:50px;
      font-size:36px;
      color:#727171;
    }
  }
</style>
