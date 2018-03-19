<template>
  <div class="container">
    <header>
      <back></back>
      <h1>My Wallet</h1>
    </header>
    <section class="card">
      <h3>Balance</h3>
      <strong><i>￡E </i>5.00</strong>
    </section>
    <section class="list">
      <ul>
        <li><router-link class="mn-deposit" to="deposit">Deposit</router-link></li>
        <li><router-link class="mn-withdraw" to="deposit">Withdraw</router-link></li>
        <li><router-link class="mn-transactions" to="transactions">Transactions</router-link></li>
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
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/wallet.scss"
</style>
