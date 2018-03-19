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
          <section class="ftbar">
            <a href="javascript:;" class="next" @click="stepChange" data-step="2">Next</a>
          </section>
        </section>
        <section v-if="step == 2">
          <dl>
            <dt>Email <span>*</span></dt>
            <dd><input type="text" name=""></dd>
          </dl>
          <dl>
            <dt>Mobile Phone <span>*</span></dt>
            <dd><input type="text" name=""></dd>
          </dl>
          <section class="ftbar">
            <a href="javascript:;" class="prev" @click="stepChange" data-step="1">Prev</a>
            <a href="javascript:;" class="next" @click="stepChange" data-step="3">Next</a>
          </section>
        </section>
        <section v-if="step == 3">
          <dl>
            <dt>Full Name <span>*</span></dt>
            <dd><input type="text" name=""></dd>
          </dl>
          <dl>
            <dt>ID Number <span>*</span></dt>
            <dd><input type="text" name=""></dd>
          </dl>
          <p class="tip">Your full name and ID number will be used in withdrawals, make sure your input conforms your ID card please.</p>
          <section class="ftbar">
            <a href="javascript:;" class="prev" @click="stepChange" data-step="2">Prev</a>
            <a href="javascript:;" class="next" @click="stepChange" data-step="submit">Submit</a>
          </section>
        </section>
      </form>
      <section class="agreetip" v-if="step == 3">
        By submitting this form, you are agreeing with ELOL's <a href="javascript:;">Terms of Service</a> and <a href="javascript:;">Privacy Policy</a>
      </section>
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
    stepChange:function(e){
      let toStep = e.target.dataset.step;
      if(toStep === "submit"){

      }else{
        this.step = toStep;
      }
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
    .agreetip{
      position:absolute;
      bottom:-150px;
      color:#fff;
      font-size:36px;
      line-height:48px;
      a{
        text-decoration: underline;
        color:#fff;
      }
    }
  }
</style>
