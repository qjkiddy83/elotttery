<template>
  <div class="container">
    <header>
      <!-- <a class="back" @click="back"></a> -->
      <back></back>
      <h1>Review your bet</h1>
    </header>
    <section class="content">
      <h2>Bet summary</h2>
      <section class="cont-wrapper">
        <ul>
          <li><label>Game:</label><p>Lottery-Double Color Balls</p></li>
          <li><label>Term No.:</label><p>2018031</p></li>
          <li><label>Drawing Time:</label><p>Mar 11, 2018 19:30</p></li>
          <li><label>Tickets:</label><p>3</p></li>
          <li><label>Amount:</label><p>￡E 6.00</p></li>
          <li><label>Balance:</label><p>-￡E 6.00</p></li>
          <li class="total"><label>Total:</label><p>￡E 0.00</p></li>
        </ul>
      </section>
      <section class="btn-cont">
        <a class="btn" @click="submit">Yes, I confirm this bet</a>
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
    }
  },
  methods:{
    submit:function(){
      this.$router.push('betsresult')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/checkbets.scss"
</style>