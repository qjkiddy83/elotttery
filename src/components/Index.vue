<template>
  <div class="container">
    <header>
      <img src="../assets/images/profile_btnhdpi.png" @click="showMenu">
      <h1>{{$t("index.title")}} <em>{{$t("index.subhead")}}</em></h1>
    </header>
    <section class="notice">
      <p><span>Upcoming lottery time</span><span>Mar 11, 2018 19:30</span></p>
      <strong>Choose 6 red balls + 1 blue balls to hit 5,000,000</strong>
    </section>
    <section class="bets-selected" v-for="(bet,betindex) in bets" >
      <section class="bet-group" v-if="curBet != betindex">
        <ul class="balls">
          <li v-for="ball in bet.redballs" v-if="ball.value" class="ball red active">{{ball.name}}</li>
          <li v-for="ball in bet.blueballs" v-if="ball.value" class="ball blue active">{{ball.name}}</li>
        </ul>
        <section class="bet-info">
          <p><span>￡E {{bet.total*2}}.00</span><span>x{{bet.total}}</span></p>
          <img src="../assets/images/godown_btnhdpi.png" @click="changeBet" :data-betindex="betindex">
        </section>
      </section>
      <section class="balls-wrapper" v-if="curBet == betindex">
        <h2><span>{{$t("index.redballs")}}</span><span>{{$t('index.selected',{num:bet.select_red+"/6"})}}</span></h2>
        <ul class="balls">
          <li :key="'red'+index" v-for="(ball,index) in bet.redballs" @click="selectball" :data-index="index" :data-balltype="'redballs'" class="ball red" :class="ball.value?'active':''">
            {{ ball.name }}
          </li>
        </ul>
        <h2><span class="blue">{{$t("index.blueballs")}}</span><span>{{$t('index.selected',{num:bet.select_red+"/1"})}}</span></h2>
        <ul class="balls">
          <li :key="'blue'+index" v-for="(ball,index) in bet.blueballs" @click="selectball" :data-index="index" :data-balltype="'blueballs'" class="ball blue" :class="ball.value?'active':''">
            {{ ball.name }}
          </li>
        </ul>
        <section class="mult">
          <a v-if="!bet.mult_show" class="tomult" @click="showMultCtrl"><img src="../assets/images/godown_btnhdpi.png"><span>Multiple Bets</span></a>
          <section class="multctrls"  v-if="bet.mult_show">
            <span>Multiple Bets</span>
            <section class="multbtns">
              <a href="javascript:;" @click="timesHandler" data-sum="-">-</a>
              <b>{{bet.times}}</b>
              <a href="javascript:;" @click="timesHandler" data-sum="+">+</a>
              <span>Times</span>
            </section>
          </section>
        </section>
      </section>
    </section>
    <section class="btn-cont">
      <a class="btn" @click="addAnother" v-if="total">Add another ticket</a>
    </section>
    <section class="bbar">
      <section class="msg">Total:{{all}} Ticket</section>
      <a href="javascript:;" class="btn" @click="submit">
        <span>Place Bet</span>
        <span>￡E {{all*2}}.00</span>
      </a>
    </section>
    <login ref="login" @logincallback="registerFunc"></login>
    <register ref="register" :user="initUserInfo"></register>
    <sidemenu ref="sidemenu" @login="loginFunc"></sidemenu>
  </div>
</template>

<script>

import Login from './mixins/Login';
import Register from './mixins/Register';
import SideMenu from './mixins/SideMenu';
import queryParse from './mixins/queryParse';

function factorial(n){
    return n > 1 ? n * factorial(n-1) : 1;
}
// (factorial(M)*N)/(6!*factorial(M-6))
function createBalls(n){
  return Array.from({length:n}).map((item,i) =>{return {name:i+1,value:0}});
}

function betFactory(){
  return {
    redballs : createBalls(33),
    blueballs : createBalls(16),
    select_red : 0,
    select_blue: 0, 
    times: 1,
    mult_show:false,
    total:0
  }
}

export default {
  name: 'Index',
  mixins:[queryParse],
  data () {
    return {
      initUserInfo:{},
      bets:[betFactory()],
      curBet:0,
      anthor_show : false
    }
  },
  components: {
    login: Login,
    register: Register,
    sidemenu: SideMenu
  },
  methods:{
    selectball:function(e){
      let dataset = e.target.dataset;
      let curbet = this.bets[this.curBet];
      let t_ball = curbet[dataset.balltype][dataset.index];
      let cur_s_red = curbet.select_red;
      let cur_s_blue = curbet.select_blue;
      t_ball.value = t_ball.value?0:1;
      switch(dataset.balltype){
        case "redballs":
          curbet.select_red = t_ball.value?cur_s_red+1:cur_s_red-1;
        break;
        case "blueballs":
          curbet.select_blue = t_ball.value?cur_s_blue+1:cur_s_blue-1;
        break;
      }
    },
    showMultCtrl:function(){
      this.bets[this.curBet].mult_show = true;
    },
    timesHandler:function(e){
      let dataset = e.target.dataset;
      let curbet = this.bets[this.curBet];
      if(dataset.sum == "-"){
        if(curbet.times <= 1) return;
        curbet.times--;
      }else{
        if(curbet.times >= 100) return;
        curbet.times++;
      }
    },
    addAnother:function(){
      let matched = 0;
      if(!this.bets[this.curBet].total){
        return;
      }
      for(let i=0;i<this.bets.length;i++){
        let bet = this.bets[i];
        if(!bet.total){
          this.curBet = i;
          matched = 1;
          break;
        }
      }
      if(matched){
        return;
      }
      this.bets.push(betFactory());
      this.curBet = this.bets.length-1;
    },
    changeBet:function(e){
      this.curBet = e.target.dataset.betindex;
      this.bets.forEach((bet,i) =>{
        if(!bet.select_red && !bet.select_blue){
          this.bets.splice(i,1);
          if(i < this.curBet){
            this.curBet--;
          }
        }
      })
    },
    submit:function(){
      this.$router.push('checkbets')
    },
    showMenu:function(){
      this.$refs.sidemenu.showMenu();
    },
    loginFunc:function(){
      this.$refs.login.showLayer();
    },
    registerFunc:function(){
      this.$refs.register.showLayer();
    }
  },
  computed:{
    all:function(){
      let all = 0;
      this.bets.forEach(item =>{
        all += item.total
      })
      return all;
    },
    total : function(){
      let curbet = this.bets[this.curBet];
      let total =  parseInt((factorial(curbet.select_red)*curbet.select_blue)/(factorial(6)*factorial(curbet.select_red-6)))*curbet.times;
      this.bets[this.curBet].total = total;
      return total;
    }
  },
  mounted:function(){
    let oqs = this.getQs();
    this.curBet = this.bets.length-1;
    // this.$refs.login.showLayer();
    // this.$refs.register.showLayer();
    if(oqs.auth){
      this.initUserInfo = oqs;
      this.$refs.register.showLayer();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/index.scss"
</style>
