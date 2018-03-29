<template>
  <div class="container">
    <header>
      <back></back>
      <h1>{{$t('wallet.title')}}</h1>
    </header>
    <section class="card">
      <h3>{{$t('wallet.balance')}}</h3>
      <strong><i>￡E </i>{{user.balance}}</strong>
    </section>
    <section class="list">
      <ul>
        <li><router-link class="mn-deposit" to='deposit'>{{$t('wallet.deposit')}}</router-link></li>
        <li><router-link class="mn-withdraw" to='deposit'>{{$t('wallet.withdraw')}}</router-link></li>
        <li><router-link class="mn-transactions" to="transactions">{{$t('wallet.transactions')}}</router-link></li>
      </ul>
    </section>
  </div>
</template>

<script>
import back from './mixins/back';
export default {
  name: 'Wallet',
  components: {
    back: back
  },
  data () {
    return {
      user:{}
    }
  },
  mounted:function(){
    this.user = JSON.parse(sessionStorage.user);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/wallet.scss"
</style>
