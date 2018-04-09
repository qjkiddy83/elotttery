<template>
  <div class="container">
    <header>
      <back></back>
      <h1>{{$t('deposit.title')}}</h1>
    </header>
    <section class="article">
      <p>{{$t('deposit.msg')}}</p>
      <dl>
        <dt>{{$t('deposit.user_number')}}</dt>
        <dd><a href="tel://1234567890"></a>1234567890</dd>
      </dl>
    </section>
  </div>
</template>

<script>
import back from './mixins/back';
export default {
  name: 'Deposit',
  components: {
    back: back
  },
  data () {
    return {
    }
  },
  mounted:function(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .article{
    padding:0.694444rem 0.462963rem 0;
    p{
      font-size:0.333333rem;
      line-height:0.666667rem;
      color:#fff;
      font-weight:lighter;
      margin-bottom:0.648148rem;
    }
    dl{
      margin:0 0.092593rem;
      padding:0 0.277778rem;
      background-color:rgb(247,183,44);
      dt{
        font-size:0.333333rem;
        border-bottom:2px solid rgb(141,104,33);
        line-height:0.925926rem;
      }
      dd{
        font-size:0.666667rem;
        line-height:1.203704rem;
      }
    }
  }
</style>
