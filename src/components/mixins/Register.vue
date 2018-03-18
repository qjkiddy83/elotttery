<template>
  <section class="layer" v-if="layerShow">
    <section class="content">
      <a href="javascript:;" class="close" @click="closeLayer"></a>
      <h3>New Account</h3>
      <form>
        <section v-if="step == 1">
          <dl>
            <dt>Nickname <span>*</span></dt>
            <dd><input type="text" name=""></dd>
          </dl>
          <dl>
            <dt>Gender <span>*</span></dt>
            <dd><label class="radio"><input type="radio" name=""><span><em></em>Male</span></label><label class="radio"><input type="radio" name=""><span><em></em>Female</span></label></dd>
          </dl>
          <dl>
            <dt>Date of Birth <span>*</span></dt>
            <dd>
              <select><option>Mar</option></select>
              <select><option>10</option></select>
              <select><option>1997</option></select>
            </dd>
          </dl>
        </section>
      </form>
    </section>
  </section>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      layerShow:false,
      step : 1
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
      let that = this;
      FB.getLoginStatus(function(response) {
          console.log(response);
          if (response.status === 'connected') {
            // Logged into your app and Facebook.
            FB.api('/me', function(response) {
              console.log(response);
              that.username = response.name;
            });
            
          } else {
            FB.login()
          }
      });
      
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
