<template>
  <div id="SongCate" class="wrapper">
      <van-tabs @click="tabClick"  animated sticky >
        <van-tab title="全部"></van-tab>
        <van-tab title="华语"></van-tab>
        <van-tab title="欧美"></van-tab>
        <van-tab title="民谣"></van-tab>
        <van-tab title="电子"></van-tab>
        <van-tab title="怀旧"></van-tab>
      </van-tabs>
    <Scroll class="content" ref="scroll">
      <div class="playcard" v-if="playlists[currentType].list.length">
        <PlayCard
          v-for="(item,index) in playlists[currentType].list"
          :key="index"
          :id="item.id"
          :name="item.name"
          :img="item.coverImgUrl"
          :playcount="item.playCount"
        ></PlayCard>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { getTopPlaylists } from "network/api";
import { getTopPlaylistshigh } from "network/api";
import PlayCard from "components/common/PlayCard";
import Scroll from "components/common/Scroll";
import { Tab, Tabs } from "vant";
export default {
  name: "SongCate",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    PlayCard,
    Scroll
  },
  data() {
    return {
      activeTabIndex:0,
      playlists: {
        全部: { page: 0, list: [] },
        华语: { page: 0, list: [] },
        欧美: { page: 0, list: [] },
        民谣: { page: 0, list: [] },
        电子: { page: 0, list: [] },
        怀旧: { page: 0, list: [] }
      },
      currentType: "全部"
    }
  },
  async created() {
    this.initData();
    this.TopPlaylistH();
  },
  activated() {
    this.initScroll();
  },
  methods: {
    async initData() {
      this.TopPlaylists("全部");
    },
    async TopPlaylists(type) {
      const { data: res } = await getTopPlaylists({ limit: 30, cat: type });
      // console.log(res);
      this.playlists[type].list.push(...res.playlists);
      // console.log(this.playlists);
    },
    async TopPlaylistH(type) {
      const data = await getTopPlaylistshigh({ limit: 1, cat: type });
      // console.log(data);
    },
    initScroll() {
      this.$nextTick(() => {
        this.$refs.scroll.scroll.refresh();
      });
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "全部";
          // console.log(this.currentType);
          this.TopPlaylists("全部");
          break;
        case 1:
          this.currentType = "华语";
          this.TopPlaylists("华语");
          break;
        case 2:
          this.currentType = "欧美";
          this.TopPlaylists("欧美");
          break;
        case 3:
          this.currentType = "民谣";
          this.TopPlaylists("民谣");
          break;
        case 4:
          this.currentType = "电子";
          this.TopPlaylists("电子");
          break;
        case 5:
          this.currentType = "怀旧";
          this.TopPlaylists("怀旧");
          break;
      }
    }
  }
};
</script>

<style scoped>
#SongCate{
  position: relative;
}
.playcard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.content {
  height: calc(100vh - 135px);
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom:45px;
  left: 0;
  right: 0;
}
</style>