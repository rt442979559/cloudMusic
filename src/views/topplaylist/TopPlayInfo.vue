<template>
  <div class="topPlayInfo">
      <div class="wrapper">
           <img :src="img"   alt="">
      <!-- <van-image width="100" height="100" fit="cover"
      :src="img" v-lazy="img" round /> -->
      </div>
  </div>
</template>

<script>
import { Image as VanImage } from 'vant';
export default {
    name:"TopPlayInfo",
    props:["img"],
    components:{[VanImage.name]:VanImage}
}
</script>

<style scoped>
    .topPlayInfo{
        height: 20vh;
        width: 100%;
        overflow: hidden;
    }
    img{
        width: 50%;
    }
</style>