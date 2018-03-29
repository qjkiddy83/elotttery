<template>
  <div class="container">
    <header>
      <!-- <a class="back" @click="back"></a> -->
      <back></back>
      <h1>{{$t('checkbets.title')}}</h1>
    </header>
    <section class="content">
      <h2>{{$t('checkbets.bet_summary')}}</h2>
      <section class="cont-wrapper">
        <ul>
          <li><label>{{$t('checkbets.game')}}:</label><p>{{$t('checkbets.lottery_double_color_balls')}}</p></li>
          <li><label>{{$t('checkbets.term_no')}}:</label><p>{{termNo}}</p></li>
          <li><label>{{$t('checkbets.drawing_time')}}:</label><p>{{lotteryTimestamp}}</p></li>
          <li><label>{{$t('checkbets.tickets')}}:</label><p>{{all}}</p></li>
          <!-- <li><label>Amount:</label><p>￡E {{user.balance}}</p></li>
          <li><label>Balance:</label><p>{{balance}}.00</p></li> -->
          <li class="total"><label>{{$t('checkbets.total')}}:</label><p>￡E {{all*2}}.00</p></li>
        </ul>
      </section>
      <section class="btn-cont">
        <a class="btn" :class="balance>0?'':'disable'" @click="submit">{{balance>0?$t('checkbets.confirm_bet'):$t('checkbets.insufficient_balance')}}</a>
      </section>
    </section>
  </div>
</template>

<script>
import back from './mixins/back';

function factorial(n){
    return n > 1 ? n * factorial(n-1) : 1;
}

export default {
  name: 'CheckBets',
  // mixins: [back],
  components: {
    back: back
  },
  data () {
    return {
      user: {},
      bets:[],
      termNo:0,
      lotteryTime:Date.now()/1000
    }
  },
  methods:{
    submit:function(){
      // console.log(JSON.stringify(this.betsData));
      this.$.ajax({
        url : 'http://manage.yubaxi.com/api/bets/save',
        data : {
          bets:JSON.stringify(this.betsData)
        },
        type: 'post',
        xhrFields:{
          withCredentials:true
        },
        crossDomain:true
      }).then(response =>{
        if(response.status === 1){
          this.$router.push('betsresult');
          localStorage.removeItem("bets");
        }else{
          alert('失败')
        }
      })
      
    }
  },
  computed:{
    betsData:function(){
      let arr = [];
      function filterChecked(balls){
        return balls.filter(ball => ball.value).map(item => item.name)
      }
      this.bets&&this.bets.forEach(item =>{
        let bet = {red:filterChecked(item.redballs),blue:filterChecked(item.blueballs),count:item.times};
        arr.push(bet)
      })
      return arr;
    },
    all:function(){
      let all = 0;
      this.bets&&this.bets.forEach(item =>{
        all += item.total
      })
      return all;
    },
    balance:function(){
      return this.user.balance - this.all*2;
    },
    lotteryTimestamp:function(){
      let dt = new Date(this.lotteryTime*1000);
      return `${this.$t('calendar.month')[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;
    }
  },
  mounted:function(){
    this.bets = this.$route.params.checked_bets;
    this.termNo = this.$route.params.termNo;
    this.lotteryTime = this.$route.params.lotteryTime;
    if(!this.bets || !this.termNo || !this.lotteryTime){
      this.$router.push("index");
      return;
    }
    this.user = JSON.parse(sessionStorage.user);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/checkbets.scss"
</style>