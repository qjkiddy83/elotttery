<template>
  <section class="layer" v-if="layerShow">
    <section class="content">
      <a href="javascript:;" class="close" @click="closeLayer"></a>
      <h3>{{$t('login.title')}}</h3>
      <section class="profile"><img src="../../assets/images/nopic_iconhdpi.png" width="100%"></section>
      <section class="btns">
        <a href="javascript:;" @click="FBLogin"><img src="../../assets/images/facebook_btnhdpi.png"></a>
        <a href="javascript:;"><img src="../../assets/images/gmail_btnhdpi.png"></a>
      </section>
      <p>{{$t('login.tip')}}</p>
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
      this.layerShow = false;
      this.$emit("loginCallback");
    }
  },
  mounted:function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .content{
    height: 10.87037rem;
    text-align: center;
    .profile{
      width:3rem;
      margin: 0 auto;
    }
    .btns{
      padding: 0.185185rem 0;
      a{
        margin-top: 0.462963rem;
        display:inline-block;
        img{
          display:block;
          width:6rem;
        }
      }
    }
    p{
      position:absolute;
      width:100%;
      text-align:center;
      bottom:0.462963rem;
      font-size:0.333333rem;
      color:#727171;
    }
  }
</style>
