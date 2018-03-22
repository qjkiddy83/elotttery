<template>
  <section class="layer" v-if="sideshow" @click="hideMenu">
    <section class="side-cont" @click.stop>
      <section class="profile">
        <img src="../../assets/images/nopic_iconhdpi.png">
        <h3>Unregistered User</h3>
        <a href="javascript:;" class="btn" @click="login">Log In / Sign Up</a>
      </section>
      <ul>
        <li><router-link class="mn-bets" to="bets">My Bets</router-link></li>
        <li><router-link class="mn-wallet" to="wallet">My Wallet</router-link></li>
        <li><router-link class="mn-profile" to="profile">My Profile</router-link></li>
        <li><router-link class="mn-settings" to="settings">Settings</router-link></li>
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
