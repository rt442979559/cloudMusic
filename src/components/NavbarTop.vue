<template>
  <!-- nav上层 -->
  <div class="navbar">
    <div class="navbarTop">
      <div class="navmeuns"  @click="showPopup" >
        <img src="~assets/img/navbar/menus.png" alt="">
      </div>
    <van-popup v-model="show" position="left" class="menusPopup">
      <div class="avatar"></div>
      <div class="mygit" @click="gitClick">
        <img src="~assets/img/github.png" alt="">
        <span>github</span>
      </div>
    </van-popup>

      <div class="navicon">
        <div class="navicon-warpper">
          <div class="nav-mine" @click="navmineClick(0)" :class="currentIndex==0?'':'inactive'">
            <img src="~assets/img/navbar/navmusicAct.svg" alt />
          </div>
          <div class="nav-home" @click="navhomeClick(1)" :class="currentIndex==1?'':'inactive'">
            <img src="~assets/img/navbar/3.svg" alt />
          </div>
          <div class="nav-videomv" @click="navvideomvClick(2)" :class="currentIndex==2?'':'inactive'">
            <img src="~assets/img/navbar/navplay.svg" alt />
          </div>
        </div>
      </div>
      <div class="navsearch" @click="searchClick">
        <img src="~assets/img/navbar/search.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { Popup } from "vant";
export default {
  name: "NavbarTop",
  components: {
    [Popup.name]: Popup,
  },
  methods: {
    navmineClick(index) {
      this.$router.push('/mine');
      this.currentIndex = index
    },
    navhomeClick(index) {
      this.$router.push('/index');
      this.$store.commit('changeNavIndex',0)
      this.currentIndex = index
    },
    navvideomvClick(index) {
      this.$router.push('/videomv');
      this.currentIndex = index
    },
    searchClick(){
      this.$router.push('/search')
    },
    //侧边栏
    menusClick(){
      this.$store.commit('openMenus')
    },
    showPopup() {
      this.show = true;
    },
    //github
    gitClick(){
      window.open("https://github.com/rt442979559/cloudMusic")
    }

  },
  data() {
    return {
      currentIndex:1,
      show: false
    }
  },
};
</script>

<style scoped>
.menusPopup{
  z-index: 1001;
  background-color: white;
}
/* navbar上层 */
.navbarTop {
  height: 45px;
  display: flex;
  text-align: center;
  line-height: 45px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #e5473b;
  width: 100%;
  z-index: 888;
}
.navmeuns {
  flex: 1;
  background-color: #e5473b;
}
.navicon {
  flex: 6;
  background-color: #e5473b;
}
.navsearch {
  flex: 1;
  background-color: #e5473b;
}

/* 中间icon区 */
.navicon-warpper {
  width: 50%;
  background-color: #e5473b;
  transform: translate(50%);
  display: flex;
  justify-content: space-between;
}
img {
  width: 7.222vw;
  vertical-align: middle;
}
.nav-mine {
  background-color: #e5473b;
}
.nav-home {
  background-color: #e5473b;
}
.nav-videomv {
  background-color: #e5473b;
}
.inactive{
  opacity: .4;
}


/* 弹出层 */
.menusPopup{
  height: 100vh;
  width: 80vw;
}
.avatar{
  width: 100%;
  height: 30vh;
  background: url(~assets/img/cat2.jpg)  no-repeat;
  background-size: 100% ;
  background-position: 50%;
}
.avatar img{
  height: 100% ;
  width: 100%;
}
.mygit{
  height: 10vh;
  line-height: 10vh;
  opacity: .8;
}
.mygit img{
  margin:0 5vw 0 -2.5vh;
}


</style>