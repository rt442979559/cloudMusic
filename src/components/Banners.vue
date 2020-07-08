<template>
  <div class="banners" v-if="Object.keys(banners).length !== 0">
    <div class="bannerbase">
    <!-- <mt-swipe :auto="4000" class="bannerSwiper" >
      <mt-swipe-item v-for="item in banners" class="swiperItem" :key="item.scm">
        <a href="#"><img :src="item.imageUrl" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe> -->
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
  async created() {
    const { data: res } = await getBanner();
    // console.log(res);
    this.banners = res.banners;
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
    height: 140px;
    width: 100%;
  }
  .bannerbase{
    background-color: #e5473b;
    height: 65%;
  }
  .bannerSwiper{
    height: 140px;
    text-align: center;
    border-radius: 6px;
  }
  .swiperItem img{
    width: 96%;
    height: 100%;
    border-radius: 6px;
  }
</style>