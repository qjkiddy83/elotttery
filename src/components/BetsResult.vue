<template>
  <div class="container">
    <header>
      <back></back>
      <h1>{{$t('betsresult.title')}}</h1>
    </header>
    <section class="content">
      <h2>{{$t('betsresult.bet_summary')}}</h2>
      <section class="result-wrapper">
        <img src="../assets/images/tmp.jpg" width="100%" />
        <p>{{$t('betsresult.succ_msg')}}</p>
        <i>{{$t('betsresult.goodluck')}}</i>
      </section>
      <section class="btn-cont">
        <div>
          <router-link class="btn" to="index">{{$t('betsresult.continue_betting')}}</router-link>
        </div>
        <div>
          <router-link class="btn" to="bets">{{$t('betsresult.view_bets')}}</router-link>
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