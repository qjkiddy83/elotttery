<script>

export default {
  name: 'UserInfo',
  data () {
    return {
    }
  },
  methods:{
    getUserInfo : function(){
      return this.$.ajax({
        url:'http://manage.yubaxi.com/api/user/info',
        type:'get',
        xhrFields:{
          withCredentials:true
        },
        crossDomain:true
      })
    }
  },
  mounted:function(){
    
  }
}
</script>
