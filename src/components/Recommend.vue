<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item" @click="topTopPlayList" :key="item.title">
      <div class="cricle" ><img :src="item.image" alt=""> </div>
      <div class="recommendtitle">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  data() {
    return {
      recommends: [
        {
          title: "私人FM",
          image: require("assets/img/recommend/radio.svg")
        },
        {
          title: "每日推荐",
          image: require("assets/img/recommend/radio.svg")
        },
        {
          title: "歌单",
          image: require("assets/img/recommend/radio.svg")
        },
        {
          title: "排行",
          image: require("assets/img/recommend/radio.svg")
        }
      ]
    };
  },
  methods: {
    topTopPlayList(){
      this.$router.push('/songcate')
    }
  },
};
</script>

<style scoped>
.recommend {
  position: relative;
  width: 100%;
  display: flex;
  height: 80px;
  justify-content: space-around;
  text-align: center;
  justify-items: center;
  padding: 0px 0 15px 0;
  border-bottom: 1px solid rgb(240, 240, 240);
}
.recommend-item{
  width: 50px;
  height: 50px;
  background-color: #ec493d;
  margin-top: 10px;
  border-radius: 50%;
  opacity: .95;
}
.recommendtitle{
  font-size: 12px;
}
.cricle{
  padding:8px;
}
img{
  width: 100%;
}
a {
  text-decoration: none;
  color: black;
  font-size: 13px;
  -webkit-tap-highlight-color: transparent;
}
</style>