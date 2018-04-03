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
  width: 1030px;
  top: 303px;
  left: 25px;
  right: 25px;
  bottom: 0;
  dl{
    dd{
      position: relative;
      margin: 0 30px;
      border-bottom: 1px solid #898989;
      ul{
        width: 750px;
        padding: 20px 0;
        li.ball{
          width: 70px;
          height: 70px;
          line-height: 50px;
          font-size: 36px;
          margin:12px;
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
          }
        }
      }
    }
  }
}

</style>
