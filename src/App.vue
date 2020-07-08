<template>
  <div id="app">
    <NavbarTop id="navbartop"  v-if="$route.meta.showNav"></NavbarTop>
    <MiniPlayer id="miniplayer"></MiniPlayer>
    <router-view ></router-view>
  </div>
</template>

<script>
import Home from './views/index/Home'
import NavbarTop from 'components/NavbarTop'
import MiniPlayer from 'components/MiniPlayer'
export default {
  name:"app",
  components:{
    Home,
    NavbarTop,
    MiniPlayer
  }
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
</style>
