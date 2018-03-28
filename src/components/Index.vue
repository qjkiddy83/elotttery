<template>
  <div class="container">
    <header>
      <img :src="initUserInfo.avatar?initUserInfo.avatar:require('../assets/images/profile_btnhdpi.png')" @click="showMenu" width="96" height="96">
      <h1>{{$t("index.title")}} <em>{{$t("index.subhead")}}</em></h1>
    </header>
    <!-- 等待开奖 -->
    <section v-if="lotteryStatus==2">
      <section class="notice">
        <section class="status2">Upcoming lottery time: {{lotteryTimestamp}}</section>
      </section>
      <section class="balls-wrapper">
          <h2>Result</h2>
          <ul class="balls">
            <li class="ball active red">?</li>
            <li class="ball active red">?</li>
            <li class="ball active red">?</li>
            <li class="ball active red">?</li>
            <li class="ball active red">?</li>
            <li class="ball active red">?</li>
            <li class="ball active blue">?</li>
          </ul>
      </section>
      <section class="prize-wrapper">
        <h2>Winings</h2>
        <section class="box">
          <dl><dt>1st Prize</dt><dd>￡E ?????({{toThousands(lotteryResult.prizeInfo.maximum)}} maximum)</dd></dl>
          <dl><dt>2st Prize</dt><dd>￡E ?????</dd></dl>
          <dl><dt>3st Prize</dt><dd>￡E {{toThousands(lotteryResult.prizeInfo.prize3)}}</dd></dl>
          <dl><dt>4st Prize</dt><dd>￡E {{toThousands(lotteryResult.prizeInfo.prize4)}}</dd></dl>
          <dl><dt>5st Prize</dt><dd>￡E {{toThousands(lotteryResult.prizeInfo.prize5)}}</dd></dl>
          <dl><dt>6st Prize</dt><dd>￡E {{toThousands(lotteryResult.prizeInfo.prize6)}}</dd></dl>
        </section>
        <section class="tip">Term {{lotteryResult.nextTermNo}} is waiting for the draw. <br>Who is the next millionaire?</section>
      </section>
    </section>
    <!-- 显示开奖结果 -->
    <section v-else-if="lotteryStatus==3">
      <section class="notice">
        <section class="status2">Lottery time: {{lotteryTimestamp}}</section>
      </section>
      <section class="balls-wrapper">
          <h2>Result</h2>
          <ul class="balls">
            <li v-for="ball in lotteryResult.redBall" class="ball active red">{{ball}}</li>
            <li class="ball active blue">{{lotteryResult.blueBall}}</li>
          </ul>
      </section>
      <section class="prize-wrapper">
        <h2>Winings</h2>
        <section class="box">
          <dl><dt>1st Prize</dt><dd>￡E {{toThousands(lotteryResult.prizeInfo.prize1)}}</dd></dl>
          <dl><dt>2st Prize</dt><dd>￡E {{toThousands(lotteryResult.prizeInfo.prize2)}}</dd></dl>
          <dl><dt>3st Prize</dt><dd>￡E {{toThousands(lotteryResult.prizeInfo.prize3)}}</dd></dl>
          <dl><dt>4st Prize</dt><dd>￡E {{toThousands(lotteryResult.prizeInfo.prize4)}}</dd></dl>
          <dl><dt>5st Prize</dt><dd>￡E {{toThousands(lotteryResult.prizeInfo.prize5)}}</dd></dl>
          <dl><dt>6st Prize</dt><dd>￡E {{toThousands(lotteryResult.prizeInfo.prize6)}}</dd></dl>
        </section>
        <section class="tip">Next term will be opened on {{nextLottery}}.</section>
      </section>
    </section>
    <!-- 下注阶段 -->
    <section v-else-if="lotteryStatus==1" class="mb166">
      <section class="notice">
        <p><span>Upcoming lottery time</span><span>{{lotteryTimestamp}}</span></p>
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
          <h2><span class="blue">{{$t("index.blueballs")}}</span><span>{{$t('index.selected',{num:bet.select_blue+"/1"})}}</span></h2>
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
        <a href="javascript:;" class="btn" :class="all?'':'disable'" @click="submit">
          <span>Place Bet</span>
          <span>￡E {{all*2}}.00</span>
        </a>
      </section>
    </section>

    <login ref="login" @logincallback="registerFunc"></login>
    <register ref="register" :user="initUserInfo"></register>
    <sidemenu ref="sidemenu" @login="loginFunc" :user="initUserInfo"></sidemenu>
  </div>
</template>

<script>

import Login from './mixins/Login';
import Register from './mixins/Register';
import SideMenu from './mixins/SideMenu';
import queryParse from './mixins/queryParse';
import UserInfo from './mixins/UserInfo';

function factorial(n){
    return n > 1 ? n * factorial(n-1) : 1;
}
// (factorial(M)*N)/(6!*factorial(M-6))
function createBalls(n){
  return Array.from({length:n}).map((item,i) =>{return {name:i+1,value:0}});
}

function toThousands(num){
  let _num = String(num).split('.');
  let res = (_num[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  if(_num[1]){
    res += '.'+_num[1];
  }
  return res;
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
  mixins:[queryParse,UserInfo],
  data () {
    return {
      initUserInfo:{},
      bets:[betFactory()],
      curBet:0,
      termNo:0,
      lotteryTime:Date.now()/1000,
      lotteryStatus:0,
      lotteryResult:{}
    }
  },
  components: {
    login: Login,
    register: Register,
    sidemenu: SideMenu
  },
  methods:{
    toThousands:toThousands,
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
      this.$nextTick(() =>{
        localStorage.bets = JSON.stringify(this.bets);
      })
      
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
      this.$nextTick(() =>{
        localStorage.bets = JSON.stringify(this.bets);
      })
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
      if(!this.all){
        return;
      }
      if(!this.initUserInfo.id_number){
        this.loginFunc();
        return;
      }
      this.$router.push({name:'checkbets',params:{checked_bets:this.bets,termNo:this.termNo,lotteryTime:this.lotteryTime}})
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
    },
    lotteryTimestamp:function(){
      let dt = new Date(this.lotteryTime*1000);
      return `${this.$t('calendar.month')[dt.getMonth()]} ${this.nf(dt.getDate())}, ${dt.getFullYear()} ${this.nf(dt.getHours())}:${this.nf(dt.getMinutes())}`;
    },
    nextLottery:function(){
      let dt = new Date(this.lotteryResult.nextStartTime*1000);
      return `${this.$t('calendar.month')[dt.getMonth()]} ${this.nf(dt.getDate())}, ${dt.getFullYear()} ${this.nf(dt.getHours())}:${this.nf(dt.getMinutes())}`;
    }
  },
  mounted:function(){
    let now = parseInt(Date.now()/1000);
    let oqs = this.getQs();
    this.curBet = this.bets.length-1;
    // this.$refs.login.showLayer();
    // this.$refs.register.showLayer();
    if(oqs.auth){
      this.initUserInfo = Object.assign({
        gender:1,
        birthday:now,
        phone:'',
        fullname:'',
        idnumber:''
      },oqs);
      this.$refs.register.showLayer();
    }else{
      this.getUserInfo().then(response =>{
        // console.log(response)
        if(response.status == 1){
          this.initUserInfo = response.data;
          sessionStorage.user = JSON.stringify(this.initUserInfo);

        }else{
          this.$refs.login.showLayer();
        }
        // console.log(response)
      })

      
    }

    //获取用户信息
    this.$.ajax({
      url:'http://manage.yubaxi.com/api/bets/info',
      type:'get',
      xhrFields:{
        withCredentials:true
      },
      crossDomain:true
    }).then(response =>{
      if(response.status == 1){
        let data = response.data;
        this.lotteryTime = data.lotteryTime;
        this.termNo = data.termNo;
        this.lotteryStatus = data.type;
        this.lotteryResult = {
          prizeInfo : data.prizeInfo,
          redBall : data.redBall,
          blueBall : data.blueBall,
          nextStartTime :data.nextStartTime,
          nextTermNo :data.nextTermNo
        }
      }else{
        alert("获取信息失败")
      }

    })
    
    this.bets = localStorage.bets?JSON.parse(localStorage.bets):[betFactory()];
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/index.scss"
</style>
