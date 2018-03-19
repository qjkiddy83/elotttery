<template>
  <div class="container">
    <header>
      <back></back>
      <h1>My Profile</h1>
    </header>
    <section class="list">
      <ul>
        <li><span>Profile Photo</span><img src="../assets/images/nopic_iconhdpi.png" width="144" height="144" class="avatar"></li>
        <li><span>Nickname</span><a href="javascript:;">Frank</a></li>
        <li><span>Gender</span><i>Male</i></li>
        <li><span>Date of Birth</span><i>Mar 13, 1997</i></li>
        <li><span>Email</span><i>abcde@gmail.com</i></li>
        <li><span>Mobile Phone</span><i>---</i></li>
        <li><span>Full Name</span><a href="javascript:;">حمحممحمدحم</a></li>
        <li><span>ID Number</span><i>NB1234567890</i></li>
      </ul>
    </section>
  </div>
</template>

<script>
import back from './mixins/back';
export default {
  name: 'Profile',
  components: {
    back: back
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/profile.scss"
</style>
