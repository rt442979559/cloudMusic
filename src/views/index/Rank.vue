<template>
  <div id="Rank" ref="wrapper">
    <Scroll ref="scroll" class="content">
      <div class="rankwrap">
        <div
          class="rankitem"
          v-for="item in toplistdetail"
          @click="rankItemClick(item)"
          :key="item.id"
        >
          <div class="left">
            <img :src="item.coverImgUrl" alt v-lazy="item.coverImgUrl"/>
          </div>
          <ul class="right">
            <li
              v-for="(items,index) in item.tracks"
              class="rightitem"
              :key="index"
            >{{index+1}}. {{items.first}} - {{items.second}}</li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { getTopList, getTopListDetail } from "network/api";
import Scroll from "components/common/Scroll";
export default {
  name: "Rank",
  components: { Scroll },
  data() {
    return {
      toplist: [],
      toplistdetail: []
    };
  },
  created() {
    this.getRankList();
  },
  activated() {
    this.initScroll();
  },
  methods: {
    async getRankList() {
      const {
        data: { list: listdetail }
      } = await getTopListDetail();
      this.toplistdetail = listdetail.slice(0, 12);
      // console.log(this.toplistdetail);
    },
    rankItemClick(item) {
      this.$router.push("/playlistdetail/" + item.id);
    },
    initScroll() {
      this.$nextTick(() => {
        this.$refs.scroll.scroll.refresh();
      });
    }
  }
};
</script>

<style scoped>
#Rank {
  position: relative;
}
.content {
  height: calc(100vh - 90px);
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 50px;
}
.rankitem {
  height: 16vh;
  display: flex;
  padding-top: 8px;
  margin-left: 5px;
}
.rankitem .left {
  flex: 1;
}
.rankitem .right {
  flex: 2;
}
.rankitem .left img {
  height: 100%;
  width: 100%;
  border-radius: 6px;
}
.rankitem .right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 13px;
  opacity: 0.7;
  margin-left: 6px;
}
</style>