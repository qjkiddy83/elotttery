<template>
  <div class="container">
    <header>
      <back></back>
      <h1>My Profile</h1>
    </header>
    <section class="list">
      <ul>
        <li><span>Profile Photo</span><img :src="user.avatar" width="144" height="144" class="avatar"></li>
        <li><span>Nickname</span><a href="javascript:;" @click="update" data-upname="nickname">{{user.nickname}}</a></li>
        <li><span>Gender</span><a href="javascript:;" @click="update" data-upname="gender">{{gender}}</a></li>
        <li><span>Date of Birth</span><a href="javascript:;" @click="update" data-upname="birthday">{{birth}}</a></li>
        <li><span>Email</span><a href="javascript:;" @click="update" data-upname="email">{{user.email}}</a></li>
        <li><span>Mobile Phone</span><a href="javascript:;" @click="update" data-upname="phone">{{user.phone}}</a></li>
        <li><span>Full Name</span><a href="javascript:;" @click="update" data-upname="fullname">{{user.fullname}}</a></li>
        <li><span>ID Number</span><a href="javascript:;" @click="update" data-upname="idnumber">{{user.idnumber}}</a></li>
      </ul>
    </section>
    <update-user-info :user="user" ref="updateUserInfo"></update-user-info>
  </div>
</template>

<script>
import back from './mixins/back';
import UpdateUserInfo from './mixins/UpdateUserInfo';

export default {
  name: 'Profile',
  components: {
    back: back,
    UpdateUserInfo:UpdateUserInfo
  },
  data () {
    return {
      user: {
        birthday:0
      },
      upname:''
    }
  },
  computed:{
    birth:function(){
      let birthday = new Date(this.user.birthday*1000);
      return `${birthday.getDate()} ${this.$t('calendar.month')[birthday.getMonth()]},${birthday.getFullYear()}`
    },
    gender:function(){
      return this.user.gender==1?"Male":"Female";
    }
  },
  methods:{
    update:function(e){
      this.$refs.updateUserInfo.showDialog(e.target.dataset.upname)
    }
  },
  mounted:function(){
    // this.$.ajax({
    //   url:'http://manage.yubaxi.com/api/user/info',
    //   type:'get',
    //   xhrFields:{
    //     withCredentials:true
    //   },
    //   crossDomain:true
    // }).then(response =>{
    //   if(response.status == 1){
    //     this.user = response.data;
    //   }
    // })
    this.user = JSON.parse(sessionStorage.user);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/profile.scss"
</style>
