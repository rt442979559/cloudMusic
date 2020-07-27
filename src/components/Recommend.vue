<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" class="recommend-item" @click="toTopPlayList(index)" :key="index">
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
          image: require("assets/img/recommend/music-radio.png")
        },
        {
          title: "每日推荐",
          image: require("assets/img/recommend/music-radio.png")
        },
        {
          title: "歌单",
          image: require("assets/img/recommend/music-menu.png")
        },
        {
          title: "排行",
          image: require("assets/img/recommend/rank.png")
        }
      ]
    };
  },
        // this.$router.push('/songcate')
  methods: {
    toTopPlayList(index){
      switch (index) {
        case 0: 
          this.$message('未开发~');
          break;
        case 1: 
          this.$message('未开发~');
          break;
        case 2:
          this.$router.push('/songcate')
          this.$store.commit('changeNavIndex',1)
          break;
        case 3:
          this.$router.push('/rank')
          this.$store.commit('changeNavIndex',2)
          break;
      }
    }
  },
};
</script>

<style scoped>
.recommend {
  position: relative;
  width: 100%;
  display: flex;
  height: 22.222vw;
  justify-content: space-around;
  text-align: center;
  justify-items: center;
  padding: 0px 0 4.167vw 0;
  border-bottom: 1px solid rgb(240, 240, 240);
}
.recommend-item{
  width: 13.889vw;
  height: 13.889vw;
  background-color: #ec493d;
  margin-top: 2.778vw;
  border-radius: 50%;
  opacity: .95;
}
.recommendtitle{
  font-size: 3.333vw;
}
.cricle{
  padding:2.222vw;
  margin-bottom: 1.389vw;
}
img{
  width: 90%;
}
a {
  text-decoration: none;
  color: black;
  font-size: 13px;
  -webkit-tap-highlight-color: transparent;
}
</style>