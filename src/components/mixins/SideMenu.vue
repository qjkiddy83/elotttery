<template>
  <section class="layer" v-if="sideshow" @click="hideMenu">
    <section class="side-cont" @click.stop>
      <section class="profile">
        <img :src="user.avatar?user.avatar:require('../../assets/images/nopic_iconhdpi.png')" width="39.4%">
        <h3>{{user.id_number?user.nickname:'Unregistered User'}}</h3>
        <section v-if="!user.id_number">
          <a href="javascript:;" class="btn" @click="login">{{$t('sidemenu.login')}}</a>
        </section>
      </section>
      <ul>
        <li class="logined" v-if="user.id_number">
          <dl>
            <dt>{{$t('sidemenu.balance')}} <br><b>￡E {{user.balance}}</b></dt>
            <dd><router-link class="btn" to="deposit">{{$t('sidemenu.deposit')}}</router-link></dd>
          </dl>
        </li>
        <li><router-link class="mn-bets" to="bets" v-if="user.id_number">{{$t('sidemenu.my_bets')}}</router-link><a class="mn-bets" @click="checklogin" v-else>{{$t('sidemenu.my_bets')}}</a></li>
        <li><router-link class="mn-wallet" to="wallet" v-if="user.id_number">{{$t('sidemenu.my_wallet')}}</router-link><a class="mn-wallet" @click="checklogin" v-else>{{$t('sidemenu.my_wallet')}}</a></li>
        <li><router-link class="mn-profile" to="profile" v-if="user.id_number">{{$t('sidemenu.my_profile')}}</router-link><a class="mn-profile" @click="checklogin" v-else>{{$t('sidemenu.my_profile')}}</a></li>
        <li><router-link class="mn-settings" to="settings" v-if="user.id_number">{{$t('sidemenu.settings')}}</router-link><a class="mn-settings" @click="checklogin" v-else>{{$t('sidemenu.settings')}}</a></li>
      </ul>
    </section>
  </section>
</template>
<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      sideshow:false
    }
  },
  props:["user"],
  methods:{
    hideMenu:function(){
      this.sideshow = false;
    },
    showMenu:function(){
      this.sideshow = true;
    },
    login:function(){
      this.sideshow = false;
      this.$emit('login');
    },
    checklogin:function(){
      if(!this.user.id_number){
        this.sideshow = false;
        this.$emit('login');
      }
    }
  },
  mounted:function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/css/side.scss"
</style>
