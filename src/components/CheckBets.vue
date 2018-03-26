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
          <li><label>Term No.:</label><p>{{termNo}}</p></li>
          <li><label>Drawing Time:</label><p>{{lotteryTimestamp}}</p></li>
          <li><label>Tickets:</label><p>{{all}}</p></li>
          <!-- <li><label>Amount:</label><p>￡E {{user.balance}}</p></li>
          <li><label>Balance:</label><p>{{balance}}.00</p></li> -->
          <li class="total"><label>Total:</label><p>￡E {{all*2}}.00</p></li>
        </ul>
      </section>
      <section class="btn-cont">
        <a class="btn" :class="balance>0?'':'disable'" @click="submit">Yes, I confirm this bet</a>
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