<template>
  <div class="container">
    <header>
      <back></back>
      <h1>My Bets</h1>
    </header>
    <section class="tabs">
      <ul>
        <li>Upcoming</li>
        <li class="active">Winning</li>
        <li>History</li>
      </ul>
    </section>
    <section class="scroller-cont">
      <section class="scroller">
        <dl>
          <dt><div><span>Lottery Double Color Balls</span><em>Mar 11, 2018 19:30</em></div></dt>
          <dd>
            <ul class="balls">
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball blue active">1</li>
            </ul>
            <section class="bet-info">
              <p><span>￡E 2.00</span><span>x10</span></p>
            </section>
          </dd>
          <dd>
            <ul class="balls">
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball blue active">1</li>
              <li class="ball blue active">1</li>
              <li class="ball blue active">1</li>
              <li class="ball blue active">1</li>
            </ul>
            <section class="bet-info">
              <p><span>￡E 2.00</span><span>x10</span></p>
            </section>
          </dd>
          <dt class="win"><div><h4>You won</h4><strong>￡E 55.00</strong></div></dt>
        </dl>
        <dl>
          <dt><span>Lottery Double Color Balls</span></dt>
          <dd>
            <ul class="balls">
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball blue active">1</li>
            </ul>
            <section class="bet-info">
              <p><span>￡E 2.00</span><span>x10</span></p>
            </section>
          </dd>
          <dd>
            <ul class="balls">
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball red active">1</li>
              <li class="ball blue active">1</li>
              <li class="ball blue active">1</li>
              <li class="ball blue active">1</li>
              <li class="ball blue active">1</li>
            </ul>
            <section class="bet-info">
              <p><span>￡E 2.00</span><span>x10</span></p>
            </section>
          </dd>
          <dt class="upcoming">
            <div><h4>Total:13 tickets</h4><strong>￡E 55.00</strong></div>
            <div>Drawing Time: Mar 11, 2018 19:30</div>
          </dt>
        </dl>
      </section>
    </section>
  </div>
</template>

<script>
import back from './mixins/back';

export default {
  name: 'Bets',
  components: {
    back: back
  },
  data () {
    return {
      upcoming:{
        items: []
      },
      winning:{
        items: []
      },
      history:{
        items: []
      }
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/bets.scss"
</style>
