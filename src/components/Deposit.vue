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
    padding:75px 50px 0;
    p{
      font-size:36px;
      line-height:72px;
      color:#fff;
      font-weight:lighter;
      margin-bottom:70px;
    }
    dl{
      margin:0 10px;
      padding:0 30px;
      background-color:rgb(247,183,44);
      dt{
        font-size:36px;
        border-bottom:1px solid rgb(141,104,33);
        line-height:100px;
      }
      dd{
        font-size:72px;
        line-height:130px;
      }
    }
  }
</style>
