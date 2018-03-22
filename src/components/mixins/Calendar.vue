<template>
  <dd>
    <select v-model="date" @change="dateChange"><option v-for="(item,index) in calendar_data.date">{{index+1}}</option></select>
    <select @change="change" v-model="month"><option v-for="(month,index) in calendar_data.month" :value="index">{{month}}</option></select>
    <select @change="change" v-model="year"><option v-for="year in calendar_data.years">{{year}}</option></select>
  </dd>
</template>
<script>
let now = (new Date()).getFullYear();
let years = Array.from({length:now-1900}).map((item,i) => 1900+i);
let is_leap = function(now){
  return now%100==0?(now%400==0?1:0):(now%4==0?1:0)
};
let dateNum = [31,28,31,30,31,30,31,31,30,31,30,31];
export default {
  name: 'Calendar',
  props:{
    initdate:{
      type :String,
      default:function(){
        return '1980-01-01'
      }
    }
  },
  data () {
  	let init = this.initdate.split('-')
    return {
      month:init[1],
      year:init[0],
      date:init[2],
      calendar_data:{
        years : years,
        month : this.$t('calendar.month'),
        date: Array.from({length:31})
      }
    }
  },
  methods:{
    change:function(){
      this.calendar_data.date = this.month == 1?Array.from({length:is_leap(this.year)+dateNum[this.month]}):Array.from({length:dateNum[this.month]});
      if(this.date > this.calendar_data.date.length){
      	this.date = 1;
      }
      this.$emit('birthchange',this.year,this.month,this.date)
    },
    dateChange:function(){
    	this.$emit('birthchange',this.year,this.month,this.date)
    }
  }
}
</script>
