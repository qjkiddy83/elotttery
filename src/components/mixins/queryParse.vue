<script>
import qs from 'qs';

export default {
  name: 'queryParse',
  data () {
    return {
      querys:{}
    }
  },
  methods:{
    getQs : function(){
      let oqs = qs.parse(location.search.substr(1));
      return oqs;
    }
  },
  mounted:function(){
    
  }
}
</script>
