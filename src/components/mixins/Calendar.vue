<template>
  <dd>
    <select v-model="date"><option v-for="(item,index) in calendar_data.date">{{index+1}}</option></select>
    <select v-model="month"><option v-for="(month,index) in calendar_data.month" :value="index">{{month}}</option></select>
    <select v-model="year"><option v-for="year in calendar_data.years">{{year}}</option></select>
  </dd>
</template>
<script>
let now = (new Date()).getFullYear();
let years = Array.from({length:now-1900}).map((item,i) => 1900+i);
let is_leap = function(now){
  return now%100==0?(now%400==0?1:0):(now%4==0?1:0)
};
let dateNum = [31,28,31,30,31,30,31,31,30,31,30,31];

function formatDate(date){
  return [date.getFullYear(),date.getMonth(),date.getDate()];
}
export default {
  name: 'Calendar',
  props:['initdate'],
  data () {
    return {
      calendar_data:{
        years : years,
        month : this.$t('calendar.month'),
        date: Array.from({length:31})
      }
    }
  },
  computed:{
      month:{
        get(){
          let init = formatDate(new Date(this.initdate*1000));
          return init[1]
        },
        set(v){
          // console.log(this.year,v,this.date)
          this.change(this.year,v);
          this.$emit('birthchange',this.year,v,this.date)
        }
      },
      year:{
        get(){
          let init = formatDate(new Date(this.initdate*1000));
          return init[0]
        },
        set(v){
          // console.log(v,this.month,this.date)
          this.change(v,this.month)
          this.$emit('birthchange',v,this.month,this.date)
        }
      },
      date:{
        get(){
          let init = formatDate(new Date(this.initdate*1000));
          return init[2]
        },set(v){
          // console.log(this.year,this.month,v)
          this.$emit('birthchange',this.year,this.month,v)
        }
      },
  },
  methods:{
    change:function(year,month){//调用父组件方法，修改initdate
        this.calendar_data.date = month == 1?Array.from({length:is_leap(year)+dateNum[month]}):Array.from({length:dateNum[month]});
        if(this.date > this.calendar_data.date.length){
        	this.date = 1;
        }
    }
  }
}
</script>
