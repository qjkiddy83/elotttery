<template>
  <div class="container">
    <header>
      <back></back>
      <h1>{{$t('bets.title')}}</h1>
    </header>
    <section class="tabs">
      <ul>
        <li :class="betstatus==1?'active':''" data-type="1" @click="changeTab">{{$t('bets.upcoming')}}</li>
        <li :class="betstatus==2?'active':''" data-type="2" @click="changeTab">{{$t('bets.winning')}}</li>
        <li :class="betstatus==0?'active':''" data-type="0" @click="changeTab">{{$t('bets.history')}}</li>
      </ul>
    </section>
    <section class="scroller-cont">
      <section class="scroller" v-if="betstatus == 1">
        <dl v-for="record in upcoming.items">
          <dt><span>{{$t('bets.lottery_double_color_balls')}}</span></dt>
          <dd v-for="pbets in parseBets(record.bets)">
            <bets-balls :balls="pbets"></bets-balls>
            <section class="bet-info">
              <p><span>￡E {{pbets.count*2}}.00</span><span>x{{pbets.count}}</span></p>
            </section>
          </dd>
          <dt class="upcoming">
            <div><h4>{{$t('bets.total_tickets',{total:all(parseBets(record.bets))})}}</h4><strong>￡E {{all(parseBets(record.bets))*2}}.00</strong></div>
            <div>{{$t('bets.drawing_time')}}: {{timestamp(record.lottery_time*1000)}}</div>
          </dt>
        </dl>
      </section>
      <section class="scroller" v-if="betstatus == 2">
        <dl v-for="record in winning.items">
          <dt><div><span>{{$t('bets.lottery_double_color_balls')}}</span><em>{{timestamp(record.lottery_time*1000)}}</em></div></dt>
          <dd v-for="pbets in parseBets(record.bets)">
            <bets-balls :balls="pbets"></bets-balls>
            <section class="bet-info">
              <p><span>￡E {{pbets.count*2}}.00</span><span>x{{pbets.count}}</span></p>
            </section>
          </dd>
          <dt class="win"><div><h4>You won</h4><strong>￡E {{record.win_amount}}</strong></div></dt>
        </dl>
      </section>
      <section class="scroller" v-if="betstatus == 0">
        <dl v-for="record in history.items">
          <dt><div><span>{{$t('bets.lottery_double_color_balls')}}</span><em v-if="record.betstatus != 1">{{timestamp(record.lottery_time*1000)}}</em></div></dt>
          <dd v-for="pbets in parseBets(record.bets)">
            <bets-balls :balls="pbets"></bets-balls>
            <section class="bet-info">
              <p><span>￡E {{pbets.count*2}}.00</span><span>x{{pbets.count}}</span></p>
            </section>
          </dd>
          <dt v-if="record.betstatus == 2" class="win"><div><h4>You won</h4><strong>￡E {{record.win_amount}}</strong></div></dt>

          <dt class="upcoming" v-if="record.betstatus == 1">
            <div><h4>{{$t('bets.total_tickets',{total:all(parseBets(record.bets))})}}</h4><strong>￡E {{all(parseBets(record.bets))*2}}.00</strong></div>
            <div>{{$t('bets.drawing_time')}}: {{timestamp(record.lottery_time*1000)}}</div>
          </dt>

          <dt class="failure" v-if="record.betstatus == 3">
            <div><h4>{{$t('bets.total_tickets',{total:all(parseBets(record.bets))})}}</h4><strong>￡E {{all(parseBets(record.bets))*2}}.00</strong></div>
          </dt>
        </dl>
      </section>
      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" spinner="circles">
          <span slot="no-more">
            {{$t('nomore')}}
          </span>
          <span slot="no-results">
            {{$t('nomore')}}
          </span>
        </infinite-loading>
    </section>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import BetsBalls from './mixins/BetsBalls';
import back from './mixins/back';

function factorial(n){
    return n > 1 ? n * factorial(n-1) : 1;
}

export default {
  name: 'Bets',
  components: {
    back: back,
    InfiniteLoading,
    BetsBalls
  },
  data () {
    return {
      betstatus:"1",
      pageCount:50,
      upcoming:{
        page:1,
        items: []
      },
      winning:{
        page:1,
        items: []
      },
      history:{
        page:1,
        items: []
      }
    }
  },
  computed:{
    curBets : function(){
      return this.$data[({"1":"upcoming","2":"winning","0":"history"})[this.betstatus]];
    },
  },
  mounted() {
    
  },
  methods: {
    parseBets:function(bets){
      return JSON.parse(bets);
    },
    changeTab:function(e){
      this.betstatus = e.target.dataset.type;
      this.changeFilter();
    },
    timestamp:function(time){
      let dt = new Date(time);
      return `${this.$t('calendar.month')[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`; 
    },
    all:function(bets){
      let all = 0;
      bets.forEach(item =>{
        all += this.total(item)
      })
      return all;
    },
    total : function(curbet){
      let total =  parseInt((factorial(curbet.red.length)*curbet.blue.length)/(factorial(6)*factorial(curbet.red.length-6)))*curbet.count;
      return total;
    },
    infiniteHandler($state) {
      let curBets = this.$data[({"1":"upcoming","2":"winning","0":"history"})[this.betstatus]]
      this.$.ajax({
        url:`http://manage.yubaxi.com/api/user/betinfo?page=${curBets.page}&pageCount=${this.pageCount}&betstatus=${this.betstatus}`,
        type:'get',
        xhrFields:{
          withCredentials:true
        },
        crossDomain:true
      }).then(response =>{
        curBets.page++;
        if(response.status == 1){
          curBets.items = curBets.items.concat(response.data)
        }
        if(response.data.length<this.pageCount){
          $state.complete()
        }else{
          $state.loaded();
        }
      })
    },
    changeFilter() {
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/bets.scss"
</style>
<style lang="scss">

  // .infinite-status-prompt{
  //   font-size:36px !important;
  // }
  // .infinite-loading-container [class^=loading-]{
  //   margin-top:20px !important;
  //   transform:scale(1.5);
  // }
</style>
