<template>
  <ul class="balls">
    <li class="ball red active" v-for="red in balls.red">{{red}}</li>
    <li class="ball blue active" v-for="blue in balls.blue">{{blue}}</li>
  </ul>
</template>
<script>
export default {
  name: 'BetsBalls',
  data () {
    return {
    }
  },
  props:["balls"],
  computed:{
    decodeBalls:function(){
      // console.log(this.balls)
      return JSON.parse(this.balls);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.scroller-cont {
  position: absolute;
  width: 9.537037rem;
  top: 2.805556rem;
  left: 0.231481rem;
  right: 0.231481rem;
  bottom: 0;
  dl{
    dd{
      position: relative;
      margin: 0 0.277778rem;
      border-bottom: 1px solid #898989;
      ul{
        width: 6.944444rem;
        padding: 0.185185rem 0;
        li.ball{
          width: 0.648148rem;
          height: 0.648148rem;
          line-height: 0.462963rem;
          font-size: 0.333333rem;
          margin:0.111111rem;
        }
      }
    }
  }
}

.no-flex{
  .scroller-cont{
    dl{
      dd{
        ul.balls{
          li.ball{
            float: left;
            line-height: 0.55rem;
          }
        }
      }
    }
  }
}

</style>
