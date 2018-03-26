<template>
  <div class="container">
    <header>
      <back></back>
      <h1>Transactions</h1>
    </header>
    <section class="scroller-cont">
      <section class="scroller">
        <ol>
          <li v-for="(item, index) in items" class="record">
            <p><span>{{transactionType(item.type)}}</span><span>{{timestamp(item.updated_at)}}</span></p>
            <p><span>balance:{{item.balance}}</span><span><b>{{item.amount}}</b></span></p>
          </li>
        </ol>
        <infinite-loading @infinite="infiniteHandler" spinner="circles">
          <span slot="no-more">
            {{$t('nomore')}}
          </span>
          <span slot="no-results">
            {{$t('nomore')}}
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
      items: [],
      page:1,
      pageCount:10
    }
  },
  mounted() {
    // user/transactions?page=2&pageCount=1
    // this.$.ajax({
    //   url:`http://manage.yubaxi.com/api/user/transactions?page=${this.page}&pageCount=${this.pageCount}`,
    //   type:'get',
    //   xhrFields:{
    //     withCredentials:true
    //   },
    //   crossDomain:true
    // }).then(response =>{
    //   if(response.status == 1){
    //     this.items = this.items.concat(response.data)
    //   }
    // })
  },
  methods: {
    //1 deposit 存款； 2 bet 下注；3 wining 中奖； 4  Withdrawal 取款
    transactionType:function(code){
      let typename = ['','deposit','bet','wining','withdrawal'][code];
      return this.$t(`transctions_type.${typename}`)
    },
    timestamp:function(time){
      let dt = new Date(time);
      return `${this.$t('calendar.month')[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`; 
    },
    infiniteHandler($state) {
      this.$.ajax({
        url:`http://manage.yubaxi.com/api/user/transactions?page=${this.page}&pageCount=${this.pageCount}`,
        type:'get',
        xhrFields:{
          withCredentials:true
        },
        crossDomain:true
      }).then(response =>{
        this.page++;
        if(response.status == 1){
          this.items = this.items.concat(response.data)
        }
        if(response.data.length<this.pageCount){
          $state.complete()
        }else{
          $state.loaded();
        }
      })
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
