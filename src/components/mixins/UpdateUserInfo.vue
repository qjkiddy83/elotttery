<template>
  <section class="layer" v-if="layerShow">
    <section class="content">
      <a href="javascript:;" class="close" @click="closeLayer"></a>
      <form>
        <section>
          <dl v-if='updatename=="nickname"'>
            <dt>Nickname</dt>
            <dd><input type="text" name="" v-model="user.nickname"></dd>
          </dl>
          <dl v-if='updatename=="gender"'>
            <dt>Gender</dt>
            <dd><label class="radio"><input type="radio" name="gender" v-model="user.gender" value="1"><span><em></em>Male</span></label><label class="radio"><input type="radio" name="gender" v-model="user.gender" value="2"><span><em></em>Female</span></label></dd>
          </dl>
          <dl v-if='updatename=="birthday"'>
            <dt>Date of Birth</dt>
            <calendar @birthchange="birthchange" :initdate="user.birthday"></calendar>
          </dl>
          <dl v-if='updatename=="email"'>
            <dt>Email</dt>
            <dd><input type="text" name="" v-model="user.email"></dd>
          </dl>
          <dl v-if='updatename=="phone"'>
            <dt>Mobile Phone</dt>
            <dd><input type="text" name="" v-model="user.phone"></dd>
          </dl>
          <dl v-if='updatename=="fullname"'>
            <dt>Full Name</dt>
            <dd><input type="text" name="" v-model="user.fullname"></dd>
          </dl>
          <dl v-if='updatename=="idnumber"'>
            <dt>ID Number</dt>
            <dd><input type="text" name="" v-model="user.idnumber"></dd>
          </dl>
          <section class="ftbar">
            <a href="javascript:;" class="next" @click="submit">OK</a>
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
    height: 500px;
    text-align: center;
  }
</style>
