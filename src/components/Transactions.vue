<template>
  <div class="container">
    <header>
      <back></back>
      <h1>Deposit</h1>
    </header>
    <section class="scroller-cont">
      <section class="scroller">
        <ol>
          <li v-for="(item, index) in items" class="record">
            <p><span>{{item.ret}}</span><span>{{item.date}}</span></p>
            <p><span>balance:{{item.balance}}</span><span><b>{{item.change}}</b></span></p>
          </li>
        </ol>
        <infinite-loading @infinite="infiniteHandler" spinner="circles">
          <span slot="no-more">
            There is no more Hacker News :(
          </span>
        </infinite-loading>
      </section>
    </section>
  </div>
</template>

<script>
import back from './mixins/back';
import InfiniteLoading from 'vue-infinite-loading';

let n = 0;
export default {
  name: 'Transactions',
  components: {
    back: back,
    InfiniteLoading
  },
  data () {
    return {
      items: [{
        ret:'Withdrawal failure',
        date:'Mar 4, 2018 10:21:53',
        balance:'51.00',
        change:'+50.00'
      }]
    }
  },
  mounted() {
    for (var i = 1; i <= 5; i++) {
      this.items.push({
        ret:'Withdrawal failure',
        date:'Mar 4, 2018 10:21:53',
        balance:'51.00',
        change:'+50.00'
      })
    }
  },
  methods: {
    infiniteHandler($state) {
      setTimeout(() =>{
        for (var i = 1; i <= 5; i++) {
          this.items.push({
            ret:'Withdrawal failure',
            date:'Mar 4, 2018 10:21:53',
            balance:'51.00',
            change:'+50.00'
          })
        }
        n>2?$state.complete():$state.loaded();
        n++;
      },1500)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container{
    position:relative;
    height:100%;
  }
  .scroller-cont{
    overflow:scroll;
  }
  @import "../assets/css/transactions.scss"
</style>
<style lang="scss">
  .infinite-status-prompt{
    font-size:36px !important;
  }
  .infinite-loading-container [class^=loading-]{
    margin-top:20px !important;
    transform:scale(1.5);
  }
</style>
