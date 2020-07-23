<template>
  <div class="banners" v-if="Object.keys(banners).length !== 0">
    <div class="bannerbase">
      <div class="bass"></div>
    <van-swipe :autoplay="4000" indicator-color="white" class="bannerSwiper">
      <van-swipe-item v-for="item in banners" :key="item.scm" class="swiperItem">
        <img :src="item.imageUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    </div>
  </div>
</template>

<script>
import { getBanner } from "network/api";
import { Swipe, SwipeItem } from "vant";
export default {
  name: "Banners",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  created() {
    this.getBanners()
  },
  methods: {
    async getBanners(){
      const { data: res } = await getBanner();
      // console.log(res);
      this.banners = res.banners;
    }
  },
  data() {
    return {
      banners: []
    };
  },
};
</script>

<style scoped>
  .banners{
    /* height: 140px; */
    width: 100%;
    height: 100%;
  }
  .bannerbase{
    /* background-color: #e5473b; */
    background-image: url('~assets/img/bgc/bgc.png') ;
    background-repeat: no-repeat;
    /* height: 100%; */
  }
  .bannerSwiper{
    /* height: 140px; */
    text-align: center;
    border-radius: 1.667vw;
  }
  .swiperItem img{
    width: 96%;
    height: 100%;
    border-radius: 1.667vw;
  }
</style>