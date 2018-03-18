<template>
  <a class="back" @click="back"></a>
</template>
<script>
export default {
  name: 'back',
  data () {
    return {
    }
  },
  methods:{
    back:function(){
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
