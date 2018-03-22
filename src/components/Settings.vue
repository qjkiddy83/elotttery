<template>
  <div class="container">
    <header>
      <back></back>
      <h1>{{$t("settings.title")}}</h1>
    </header>
    <section class="wrapper">
      <section class="card">
        <ul>
          <li><span>{{$t("settings.enable_notification")}}</span><a class="swither"><input type="checkbox" name="notification" v-model="notification"><i></i></a></li>
          <li><span>{{$t("settings.language")}}</span><select @change="langChange" v-model="lang"><option value="auto">Auto</option><option value="en">English</option><option value="ar">اللغة العربية</option></select></li>
        </ul>
      </section>
      <section class="card">
        <ul>
          <li><span>{{$t("settings.app_version")}}</span><em>3.14.15.926</em></li>
          <li><span>{{$t("settings.about")}}</span></li>
        </ul>
      </section>
      <section class="btn-cont">
        <a href="javascript:;" class="btn">{{$t("settings.logout")}}</a>
      </section>
    </section>
  </div>
</template>

<script>
import back from './mixins/back';
export default {
  name: 'Settings',
  components: {
    back: back
  },
  data () {
    return {
      notification:false,
      lang: 'auto'
    }
  },
  methods:{
    langChange:function(e){
      this.$i18n.locale = this.lang
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  // @import "../assets/css/wallet.scss"
  .wrapper{
    padding-top:72px;
    .card{
      width:920px;
      background-color:#fff;
      margin:0 auto 10px;
      li{
        height:144px;
        line-height:144px;
        font-size:48px;
        padding:0 35px;
        font-weight:lighter;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        &:first-child{
          border-bottom:1px solid rgb(181,181,182);
        }
        a,select,em{
          display:inline-block;
          color: #f8b62d;
          font-size: 48px;
          font-weight: lighter;
          font-style:normal;
          text-align: right;
          direction: rtl;
          border:none;
          background-color:#fff;
        }
        option{
          font-size: 48px;
        }
        .swither{
          position:relative;
          align-self: center;
          display:block;
          width:97px;
          height:97px;
          i{
            display:inline-block;
            width:97px;
            height:97px;
            background:url(../assets/images/enable_btn_downhdpi.png) no-repeat;
            background-size:cover;
          }
          input[type="checkbox"]{
            position:absolute;
            left:0;
            top:0;
            opacity:0;
            width:97px;
            height:97px;
            &:checked + i{
              background:url(../assets/images/enable_btn_norhdpi.png) no-repeat;
            }
          }
        }
      }
    }
    .btn-cont{
      margin-top:155px;
      .btn{
        color:#ea5514;
      }
    }
  }
</style>
