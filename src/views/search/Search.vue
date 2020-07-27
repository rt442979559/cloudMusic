<template>
  <div id="search" ref="wrapper">
    <div class="searchnav">
      <span @click="searchback" class="searchback">back</span>
      <div class="searchbox">
        <van-search
          v-model="value"
          @keydown.enter="searchHandler"
          :placeholder="placeHolder"
          autofocus
        />
      </div>
    </div>
    <Scroll :probeType="3" class="content" ref="scroll">
      <SearchHot v-if="isShow" :tagList="tagList" @tagSearch="tagSearch"></SearchHot>
      <ul v-for="item in searchResList" :key="item.id" class="searchlist">
        <li class="searchListItem" @click="ListItemClick(item)">
          <div class="searchinfo">
            <div class="songtitle">{{item.name}}</div>
            <div class="songdetail">{{item.artists[0].name}} - {{item.album.name}}</div>
          </div>
          <span class="more">more</span>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import { getSearchSong, getSearchHot, getSearchDefault, getSearchSuggest } from "network/search";
import { getSongDetail, getSongUrl } from "network/api";
import { Search } from "vant";
import SearchHot from "./SearchHot";
import Scroll from "components/common/Scroll";
export default {
  name: "Search",
  components: { [Search.name]: Search, SearchHot, Scroll },
  data() {
    return {
      isShow: true,
      value: "",
      searchResList: [],
      tagList: [],
      placeHolder: ""
    };
  },
  async created() {
    this.searchDefault();
    this.initSearchHot();
    
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scroll.scroll.refresh();
    });
  },
  methods: {
    searchback() {
      this.$router.back();
    },
    //关键词提示
    async searchSuggest(){
      const {data:res} = await getSearchSuggest(this.value.trim())
      console.log(res);
    },
    //搜索默认
    async searchDefault() {
      const { data: res } = await getSearchDefault();
      // console.log(res.data.realkeyword);
      this.placeHolder = res.data.realkeyword;
    },

    //监听搜索输入
    async searchHandler() {
      if (this.value) {
        const {data: { result: list }} = await getSearchSong(this.value.trim()).catch(err => err);
        this.searchResList = list.songs;
        // console.log(this.searchResList);
        this.isShow = false;
      } else {
        const {data: { result: list }} = await getSearchSong(this.placeHolder.trim()).catch(err => err);
        this.searchResList = list.songs;
        // console.log(this.searchResList);
        this.isShow = false;
      }
    },
    // 点击列表
    async ListItemClick(item) {
      this.$store.commit("play");
      // console.log(item.id);
      const { data : { songs: res }} = await getSongDetail(item.id);
      const { data : url } = await getSongUrl(item.id);
      console.log(url);
      // console.log(res);
      let currentPlay = {};
      currentPlay.url = url.data[0].url
      currentPlay.id = item.id;
      currentPlay.singer = item.artists[0].name;
      currentPlay.albumPic = res[0].al.picUrl;
      currentPlay.name = item.name;
      this.$store.commit("addToCurrentPlay", currentPlay);
      this.$store.dispatch("AddToPlayList", currentPlay);
    },

    //热门搜索
    async initSearchHot() {
      const { data: result } = await getSearchHot();
      this.tagList = result.result.hots;
      // console.log(this.tagList);
    },
    tagSearch(item) {
      // console.log(item);
      this.value = item;
      this.searchHandler(this.value);
    }
  },
  watch: {
    value(newVal, oldVal) {
      // console.log(newVal);
      if (newVal === "") {
        this.isShow = false;
      }
      else{
        this.searchSuggest();
      }
    }
  }
};
</script>

<style scoped>
.searchnav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 2.222vw 0 2.778vw 0;
  border-bottom: 2px solid rgb(230, 230, 230);
}
.searchback {
  flex: 1;
}
.searchbox {
  flex: 7;
}
.searchlist {
  width: 100%;
}
.searchListItem {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 0 0;
  padding-bottom: 5px;
  border-bottom: 1px solid rgb(230, 230, 230);
}
.searchinfo {
  margin-left: 5px;
}
.songtitle {
  font-size: 4.167vw;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 280px;
}
.songdetail {
  display: inline-block;
  font-size: 3.333vw;
  opacity: 0.7;
  color: #707070;
}
.more{
  margin-right: 2vw;
}
.content {
  height: calc(100vh - 90px );
  overflow: hidden;
  position: absolute;
  top: 85px;
  bottom: 45px;
  left: 0;
  right: 0;
}
</style>