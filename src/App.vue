<template>
  <div id="app">
    <NavbarTop id="navbartop"  v-if="$route.meta.showNav"></NavbarTop>
    <MiniPlayer id="miniplayer"></MiniPlayer>
      <router-view ></router-view>
    <van-loading  vertical v-show="this.$store.state.isLoad" id="loading">
      <span class="loadtitle">努力加载中...</span>
    </van-loading>
  </div>
</template>

<script>
import Home from './views/index/Home'
import NavbarTop from 'components/NavbarTop'
import MiniPlayer from 'components/MiniPlayer'
import { Loading } from 'vant';
export default {
  name:"app",
  components:{
    Home,
    NavbarTop,
    MiniPlayer,
    [Loading.name]:Loading
  },
};
</script>

<style scoped>
#app{
  height: 100%;
}
#navbartop{
  position: relative;
  top:0;
}
#loading{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  color: #e5473b;
}
.loadtitle{
  color: #e5473b;
}
</style>
