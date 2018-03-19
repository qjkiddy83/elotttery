<template>
  <div class="container">
    <header>
      <back></back>
      <h1>My Wallet</h1>
    </header>
    <section class="card">
      <ul>
        <li><span>Enable Notification</span><a href="javascript:;" class="swither"></a></li>
        <li><span>Language</span><select><option>Auto</option></select></li>
      </ul>
    </section>
    <section class="card">
      <ul>
        <li><span>App Version</span><span>3.14.15.926</span></li>
        <li><span>About</span></li>
      </ul>
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
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/wallet.scss"
</style>
