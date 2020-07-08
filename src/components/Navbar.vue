<template>
<!-- 这个组件废弃了 -->
  <div class="navbar">
    <div class="navbarTop">
      <div class="navmeun">s</div>
      <div class="navicon">
        <div class="navicon-warpper">
          <div class="navmusic"><img src="~assets/img/navbar/2.svg" alt=""></div>
          <div class="navindex"><img src="~assets/img/navbar/2.svg" alt=""></div>
          <div class="navplay"><img src="~assets/img/navbar/2.svg" alt=""></div>
        </div>
      </div>
      <div class="navsearch">s</div>
    </div>
    <!-- nav下层 -->
    <div class="navbarBtm">
      <div class="navbarBtm-wrapper">
        <div><span @click="commendClick">推荐</span></div>
        <div><span @click="friendsClick">朋友</span></div>
        <div><span @click="raiosetClick">电台</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    commendClick(){
      this.$router.push('/home')
    },
    friendsClick(){
      this.$router.push('/friends')
    },
    raiosetClick(){
      this.$router.push('/radioset')
    }
  },
};
</script>

<style scoped>
/* navbar上层 */
.navbarTop {
  height: 45px;
  background-color: skyblue;
  display: flex;
  text-align: center;
  line-height: 45px;
}
.navbaritem img {
  width: 30px;
  vertical-align: middle;
}
.navmeun{
  flex: 1;
  background-color: red;
}
.navicon{
  flex: 6;
  background-color: pink;
}
.navsearch{
  flex: 1;
  background-color: purple;
}


/* 中间icon区 */
.navicon-warpper{
  width: 50%;
  background-color: rgb(124, 192, 154);
  transform: translate(50%);
  display: flex;
  justify-content: space-between;
}
.navicon-warpper img{
  width: 30px;
  vertical-align: middle;
}
.navmusic{
  background-color: steelblue;
}
.navindex{
  background-color:red
}
.navplay{
  background-color: rgb(233, 52, 158);
}

/* navbar下层 */
.navbarBtm {
  height: 45px;
  background-color: #e5473b;
}
.navbarBtm-wrapper{
  width: 75%;
  background-color: #e5473b;
  height: 100%;
  transform: translate(17.5%);
  display: flex;
  vertical-align: middle;
  line-height: 45px;
  text-align: center;
  justify-content: space-between;
  
}
.navbarBtm-wrapper div span{
  padding: 0 1px 4px 1px ;
  border-bottom: 1.5px solid white;
  font-size: 11.5px;
  color: white;
  letter-spacing: 0.8px;
  opacity: .7;
}
</style>