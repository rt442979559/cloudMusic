<template>
  <!-- 推荐歌单 => 更多 -->
  <div class="topPlayList wrapper">
    <TopPlayNav></TopPlayNav>
    <Scroll :probeType="3" class="content" ref="scroll" :pullUpLoad="true" @pullingUp="loadMore">
      <TopPlayInfo
        v-if="Object.keys(toplist).length !==0"
        :img="toplist[Math.ceil(Math.random()*20)].coverImgUrl"
      ></TopPlayInfo>
      <div id="playcard" v-if="toplist.length">
        <PlayCard v-for="item in this.toplist"
          :desc="item.copywriter"
          :id="item.id"
          :img="item.coverImgUrl"
          :key="item.id"
          :name="item.name"
          :playcount="item.playCount"
        ></PlayCard>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { getTopPlaylists } from "network/api";
import PlayCard from "components/common/PlayCard";
import TopPlayNav from "./TopPlayNav";
import TopPlayInfo from "./TopPlayInfo";
import Scroll from "components/common/Scroll";
export default {
  name: "topPlayList",
  components: {
    PlayCard,
    TopPlayNav,
    TopPlayInfo,
    Scroll
  },
  created() {
    this.getTopPlay();
  },
  data() {
    return {
      toplist: []
    };
  },
  methods: {
    async getTopPlay() {
      const {data: { playlists: topPlay }} = await getTopPlaylists({ limit: 20 });
      this.toplist = topPlay;
      // console.log(this.toplist);
    },
    async loadMore() {
      console.log('上拉加载更多');
      const {data: { playlists: topPlay }} = await getTopPlaylists({ limit: 40 });
      this.toplist = topPlay;
      this.$refs.scroll.scroll.refresh();
      // console.log(this.$refs.scroll.scroll.refresh);
      this.$refs.scroll.finishPullUp();
      const {data: { playlists: topPlay1 }} = await getTopPlaylists({ limit: 60 });
      this.toplist = topPlay1;
      this.$refs.scroll.scroll.refresh();
    }
  }
};
</script>

<style scoped>
.topPlayList {
  position: relative;
  width: 100%;
}
#playcard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.content {
  height: calc(100vh - 45px);
  overflow: hidden;
  position: absolute;
  top: 45px;
  bottom: 0px;
  left: 0;
  right: 0;
}
</style>