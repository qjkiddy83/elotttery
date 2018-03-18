<template>
  <div class="container">
    <header>
      <back></back>
      <h1>Review your bet</h1>
    </header>
    <section class="content">
      <h2>Bet summary</h2>
      <section class="result-wrapper">
        <img src="../assets/images/tmp.jpg" width="100%" />
        <p>Your bet has been submitted. Thanks for your contribution to Egyptian philanthropy.</p>
        <i>Good luck for you!</i>
      </section>
      <section class="btn-cont">
        <div>
          <a class="btn">Continue betting</a>
        </div>
        <div>
          <a class="btn">View my bets</a>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import back from './mixins/back';
export default {
  name: 'CheckBets',
  // mixins: [back],
  components: {
    back: back
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/checkbets.scss"
</style>