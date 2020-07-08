<template>
  <!-- 推荐歌单 => 更多 -->
  <div class="topPlayList wrapper" >
    <TopPlayNav></TopPlayNav>
    <Scroll :probeType="3" class="content" ref="scroll" :pull-up-load="true">
    <TopPlayInfo v-if="Object.keys(toplist).length !== 0 " 
    :img="toplist[Math.ceil(Math.random()*20)].coverImgUrl"></TopPlayInfo>
    <div id="playcard">
      <PlayCard
        v-for="item in this.toplist"
        v-if="toplist.length"
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
import TopPlayNav from './TopPlayNav'
import TopPlayInfo from './TopPlayInfo'
import Scroll from 'components/common/Scroll'
export default {
  name: "BestSongList",
  components: {
    PlayCard,
    TopPlayNav,
    TopPlayInfo,
    Scroll
  },
  async created() {
    const {data: { playlists: topPlay }} = await getTopPlaylists({ limit: 20 });
    this.toplist = topPlay;
    console.log(this.toplist);
  },
  data() {
    return {
      toplist: []
    };
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
  justify-content: space-evenly;
}
.content {
  height: calc(100vh - 95px);
  overflow: hidden;
  position: absolute;
  top: 45px;
  bottom:0px;
  left: 0;
  right: 0;
}
</style>