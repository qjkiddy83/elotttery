<template>
  <div class="container">
    <header>
      <back></back>
      <h1>{{$t("settings.title")}}</h1>
    </header>
    <section class="wrapper">
      <section class="card">
        <ul>
          <li><span>{{$t("settings.enable_notification")}}</span><em class="swither"><input type="checkbox" name="notification" v-model="notification"><i></i></em></li>
          <li><span>{{$t("settings.language")}}</span><select v-model="language" dir="rtl"><option v-for="lang in langlist" :value="lang.value">{{lang.name}}</option></select></li>
        </ul>
      </section>
      <section class="card">
        <ul>
          <li><a class="download" href="http://www.jsers.cn/demo/app-20180410.apk" download="app-20180410.apk"><span>{{$t("settings.app_version")}}</span><em>{{versionName}}</em></a></li>
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
import lang from '../langs/index';

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
      language:0,
      langlist : lang.langlist,
      versionName: '1.0.0'
    }
  },
  mounted:function(){
    let user = JSON.parse(sessionStorage.user);
    this.user = user;
    this.notification = user.notification%2;
    this.language = user.language

    let arrVersionName = navigator.userAgent.match(/lotteryVersionName:(.*?)(?:;|$)/);
    let arrVersionCode = navigator.userAgent.match(/lotteryVersion:(.*?)(?:;|$)/);
    if(arrVersionName){
      this.versionName = arrVersionName[1];
    }
    if(arrVersionCode){
      this.versionCode = arrVersionCode[1];
    }
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
  @import "../assets/css/setting.scss"
</style>
