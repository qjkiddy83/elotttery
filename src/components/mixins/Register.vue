<template>
  <section class="layer" v-if="layerShow">
    <section class="content">
      <a href="javascript:;" class="close" @click="closeLayer"></a>
      <h3>{{$t('register.title')}}</h3>
      <form>
        <section v-if="step == 1">
          <dl>
            <dt>{{$t('user.nickname')}} <span>*</span></dt>
            <dd><input type="text" name="" v-model="user.nickname"></dd>
          </dl>
          <dl>
            <dt>{{$t('user.gender')}} <span>*</span></dt>
            <dd><label class="radio"><input type="radio" name="gender" v-model="user.gender" value="1"><span><em></em>{{$t('user.gender_male')}}</span></label><label class="radio"><input type="radio" name="gender" v-model="user.gender" value="2"><span><em></em>{{$t('user.gender_female')}}</span></label></dd>
          </dl>
          <dl>
            <dt>{{$t('user.date_of_birth')}} <span>*</span></dt>
            <calendar @birthchange="birthchange" :initdate="user.birthday"></calendar>
          </dl>
          <section class="ftbar">
            <a href="javascript:;" class="next" @click="stepChange" data-step="2">{{$t('register.next')}}</a>
          </section>
        </section>
        <section v-if="step == 2">
          <dl>
            <dt>{{$t('user.email')}} <span>*</span></dt>
            <dd><input type="text" name="" v-model="user.email"></dd>
          </dl>
          <dl>
            <dt>{{$t('user.mobile_phone')}} <span>*</span></dt>
            <dd><input type="text" name="" v-model="user.phone"></dd>
          </dl>
          <section class="ftbar">
            <a href="javascript:;" class="prev" @click="stepChange" data-step="1">{{$t('register.prev')}}</a>
            <a href="javascript:;" class="next" @click="stepChange" data-step="3">{{$t('register.next')}}</a>
          </section>
        </section>
        <section v-if="step == 3">
          <dl>
            <dt>{{$t('user.full_name')}} <span>*</span></dt>
            <dd><input type="text" name="" v-model="user.fullname"></dd>
          </dl>
          <dl>
            <dt>{{$t('user.id_number')}} <span>*</span></dt>
            <dd><input type="text" name="" v-model="user.idnumber"></dd>
          </dl>
          <p class="tip">{{$t('register.tip')}}</p>
          <section class="ftbar">
            <a href="javascript:;" class="prev" @click="stepChange" data-step="2">{{$t('register.prev')}}</a>
            <a href="javascript:;" class="next" @click="stepChange" data-step="submit">{{$t('register.submit')}}</a>
          </section>
        </section>
      </form>
      <section class="agreetip" v-if="step == 3">
        {{$t('register.agreetip[0]')}}<a href="javascript:;" class="w-link">{{$t('register.terms_of_service')}}</a>{{$t('register.agreetip[1]')}}<a href="javascript:;" class="w-link">{{$t('register.privacy_policy')}}</a>
      </section>
    </section>
  </section>
</template>
<script>
import queryParse from './queryParse';
import Calendar from './Calendar';

export default {
  name: 'Register',
  mixins:[queryParse],
  components:{
    calendar:Calendar,
  },
  data () {
    return {
      layerShow:false,
      step : 1,
    }
  },
  props:["user"],
  methods:{
    closeLayer:function(){
      this.layerShow = false;
    },
    showLayer:function(){
      this.layerShow = true;
    },
    stepChange:function(e){
      let toStep = e.target.dataset.step;
      let qs = this.getQs();
      if(toStep === "submit"){
        if(!this.user.fullname){
          alert('fullname is required')
          return false;
        }else if(!this.user.idnumber){
          alert('ID Number is required')
          return false;
        }
        let _user = Object.assign({
          email: this.user.email,
          phone: this.user.phone,
          gender: this.user.gender,
          birthday: this.user.birthday,
          fullname: this.user.fullname,
          idnumber: this.user.idnumber,
          nickname: this.user.nickname
        });
        if(qs.auth){
          _user.auth = qs.auth
        }
        this.$.ajax({
          url : 'http://manage.yubaxi.com/api/updateUserInfo',
          data : _user,
          type: 'post',
          xhrFields:{
            withCredentials:true
          },
          crossDomain:true
        }).then(response =>{
          if(response.status === 1){
            location.href = "/"
          }
        })

      }else{
        if(toStep == 2){
          if(!this.user.nickname){
            alert('nickname is required')
            return false;
          }
          if(!this.user.gender){
            alert('gender is required')
            return false;
          }
        }else if(toStep == 3){
          if(!this.user.phone){
            alert('mobile phone is required')
            return false;
          }
        }
        this.step = toStep;
      }
    },
    birthchange:function(year,month,date){
      // console.log(year,month,date)
      this.user.birthday = new Date([year,month+1,date].join('-')).getTime()/1000
    }
  },
  mounted:function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .w-link{
    text-decoration: underline;
    color: #fff;
  }
</style>
<style lang="scss" scoped>
  .content{
    height: 1174px;
    text-align: center;
    .agreetip{
      position:absolute;
      bottom:-150px;
      color:#fff;
      font-size:36px;
      line-height:48px;
      a{
        text-decoration: underline;
        color:#fff;
      }
    }
  }
</style>
