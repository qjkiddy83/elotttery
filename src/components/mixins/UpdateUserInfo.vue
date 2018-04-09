<template>
  <section class="layer" v-if="layerShow">
    <section class="content">
      <a href="javascript:;" class="close" @click="closeLayer"></a>
      <form>
        <section>
          <dl v-if='updatename=="nickname"'>
            <dt>{{$t('user.nickname')}}</dt>
            <dd><input type="text" name="" v-model="user.nickname"></dd>
          </dl>
          <dl v-if='updatename=="gender"'>
            <dt>{{$t('user.gender')}}</dt>
            <dd><label class="radio"><input type="radio" name="gender" v-model="user.gender" value="1"><span><em></em>{{$t('user.gender_male')}}</span></label><label class="radio"><input type="radio" name="gender" v-model="user.gender" value="2"><span><em></em>{{$t('user.gender_female')}}</span></label></dd>
          </dl>
          <dl v-if='updatename=="birthday"'>
            <dt>{{$t('user.date_of_birth')}}</dt>
            <calendar @birthchange="birthchange" :initdate="user.birthday"></calendar>
          </dl>
          <dl v-if='updatename=="email"'>
            <dt>{{$t('user.email')}}</dt>
            <dd><input type="text" name="" v-model="user.email"></dd>
          </dl>
          <dl v-if='updatename=="phone"'>
            <dt>{{$t('user.mobile_phone')}}</dt>
            <dd><input type="text" name="" v-model="user.phone"></dd>
          </dl>
          <dl v-if='updatename=="fullname"'>
            <dt>{{$t('user.full_name')}}</dt>
            <dd><input type="text" name="" v-model="user.fullname"></dd>
          </dl>
          <dl v-if='updatename=="idnumber"'>
            <dt>{{$t('user.id_number')}}</dt>
            <dd><input type="text" name="" v-model="user.idnumber"></dd>
          </dl>
          <section class="ftbar">
            <a href="javascript:;" class="next" @click="submit">{{$t('register.ok')}}</a>
          </section>
        </section>
      </form>
    </section>
  </section>
</template>
<script>
import Calendar from './Calendar';

export default {
  name: 'UpdateUserInfo',
  components:{
    calendar:Calendar
  },
  data () {
    return {
      layerShow:false,
      step : 1,
      updatename:''
    }
  },
  props:["user"],
  methods:{
    closeLayer:function(){
      this.layerShow = false;
    },
    showDialog:function(name){
      this.updatename = name;
      this.layerShow = true;
    },
    submit:function(e){
      let _user = Object.assign({
        email: this.user.email,
        phone: this.user.phone,
        gender: this.user.gender,
        birthday: this.user.birthday,
        fullname: this.user.fullname,
        idnumber: this.user.idnumber,
        nickname: this.user.nickname
      });
      this.$.ajax({
        url : 'http://manage.yubaxi.com/api/updateUserInfo',
        data : _user,
        type: 'post',
        xhrFields:{
          withCredentials:true
        },
        crossDomain:true
      }).then(response =>{
        if(response.status === 1){
          this.layerShow = false;
          sessionStorage.user = JSON.stringify(this.user);
        }
      })
    },
    birthchange:function(year,month,date){
      this.user.birthday = new Date([year,month+1,date].join('-')).getTime()/1000
    }
  },
  mounted:function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .content{
    height: 4.62963rem;
    text-align: center;
  }
</style>
