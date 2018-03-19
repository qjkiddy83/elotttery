<template>
  <div class="container">
    <header>
      <back></back>
      <h1>Deposit</h1>
    </header>
    <section class="scroller-cont">
      <scroller ref="my_scroller" class="scroller"
        :on-refresh="refresh"
        :on-infinite="infinite">
        <ol>
          <li v-for="(item, index) in items" class="record">
            <p><span>{{item.ret}}</span><span>{{item.date}}</span></p>
            <p><span>balance:{{item.balance}}</span><span><b>{{item.change}}</b></span></p>
          </li>
        </ol>
      </scroller>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import back from './mixins/back';
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

let n = 0;

export default {
  name: 'Transactions',
  components: {
    back: back
  },
  data () {
    return {
      items: []
    }
  },
  mounted() {
    for (var i = 1; i <= 10; i++) {
      this.items.push({
        ret:'Withdrawal failure',
        date:'Mar 4, 2018 10:21:53',
        balance:'51.00',
        change:'+50.00'
      })
    }
  },
  methods: {
    refresh (done) {
      setTimeout(() => {
        for (var i = 0; i < 10; i++) {
          this.items.unshift({
            ret:'Withdrawal failure--'+i,
            date:'Mar 4, 2018 10:21:53',
            balance:'51.00',
            change:'+50.00'
          })
        }
        done()
      }, 1500)
    },
    infinite (done) {
      setTimeout(() => {
        if(n < 3){
          for (var i = 0; i < 10; i++) {
            this.items.push({
              ret:'Withdrawal failure--'+(i+n*10),
              date:'Mar 4, 2018 10:21:53',
              balance:'51.00',
              change:'+50.00'
            })
          }
          n++;
          done()
        }else{
          this.$refs.my_scroller.finishInfinite(true);
        }
      }, 1500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../assets/css/transactions.scss"
</style>
