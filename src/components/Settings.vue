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
          <li><span>{{$t("settings.language")}}</span><select v-model="language"><option value="1">Auto</option><option value="2">English</option><option value="3">اللغة العربية</option></select></li>
        </ul>
      </section>
      <section class="card">
        <ul>
          <li><span>{{$t("settings.app_version")}}</span><em>3.14.15.926</em></li>
          <li><span>{{$t("settings.about")}}</span></li>
        </ul>
      </section>
      <section class="btn-cont">
        <a href="javascript:;" class="btn" @click="logout">{{$t("settings.logout")}}</a>
      </section>
    </section>
  </div>
</template>

<script>
import back from './mixins/back';
import UserInfo from './mixins/UserInfo';
export default {
  name: 'Settings',
  components: {
    back: back
  },
  mixins:[UserInfo],
  data () {
    return {
      user:{},
      notification:0,
      language:0
    }
  },
  mounted:function(){
    let user = JSON.parse(sessionStorage.user);
    this.user = user;
    this.notification = user.notification%2;
    this.language = user.language
  },
  // computed:{
  //   lang:{
  //     get(){
  //       return ['auto','en','ar'][this.user.language]
  //     },
  //     set(val){
  //       this.user.language = ['auto','en','ar'].indexOf(this.lang)
  //       this.$i18n.locale = this.lang
  //     }
  //   }
  // },
  methods:{
    logout:function(){
      this.$.ajax({
        url : 'http://manage.yubaxi.com/api/logout',
        type: 'get',
        xhrFields:{
          withCredentials:true
        },
        crossDomain:true
      }).then(response =>{
        if(response.status === 1){
          location.href = "/"
        }
      })
    }
  },
  watch:{
    notification(curVal,oldVal){
      if(curVal == this.user.notification%2){
        return;
      }
      let _notifi = curVal?1:2;
      this.$.ajax({
        url : 'http://manage.yubaxi.com/api/updateUserInfo',
        data : {
          notification:_notifi
        },
        type: 'post',
        xhrFields:{
          withCredentials:true
        },
        crossDomain:true
      }).then(response =>{
        this.user.notification = _notifi;
        sessionStorage.user = JSON.stringify(this.user);
      })
    },
    language(curVal,oldVal){
      if(oldVal == 0){
        return;
      }
      this.$i18n.locale = ['auto','en','ar'][curVal-1];
      this.$.ajax({
        url : 'http://manage.yubaxi.com/api/updateUserInfo',
        data : {
          language:curVal
        },
        type: 'post',
        xhrFields:{
          withCredentials:true
        },
        crossDomain:true
      }).then(response =>{
        this.user.language = curVal;
        sessionStorage.user = JSON.stringify(this.user);
      })
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
