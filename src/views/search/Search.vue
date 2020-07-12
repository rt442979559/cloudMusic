<template>
  <div id="search">
    <div class="searchnav">
      <span @click="searchback" class="searchback">back</span>
      <div class="searchbox">
        <van-search v-model="value" @keydown.enter="searchHandler" placeholder="搜索歌曲、歌手、专辑" />
      </div>
    </div>
    <SearchHot v-if="isShow" :tagList="tagList" @tagSearch="tagSearch"></SearchHot>

    <ul v-for="item in searchResList" :key="item.id" class="searchlist">
      <li class="searchListItem" @click="ListItemClick(item)">
        <div class="searchinfo">
          <div class="songtitle">{{item.name}}</div>
          <div class="songdetail">
            {{item.artists[0].name}} - {{item.album.name}}
          </div>
        </div>
        <span class="more">more</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSearchSong , getSearchHot } from "network/search";
import { getSongDetail } from "network/api";
import { Search } from "vant";
import SearchHot from './SearchHot'
export default {
  name: "SearchNav",
  components: { [Search.name]: Search , SearchHot},
  data() {
    return {
      isShow:true,
      value: "",
      searchResList: [],
      tagList:[]
    };
  },
  async created() {
    this.initSearchHot()
  },
  methods: {
    searchback() {
      this.$router.go(-1);
    },
    async searchHandler(value) {
      const {data: { result: list }} = await getSearchSong(this.value.trim()).catch(err => err);
      this.searchResList = list.songs;
      console.log(this.searchResList);
      this.isShow = false;
    },
    async ListItemClick(item){
      this.$store.commit("play");
      // console.log(item.id);
      const {data:{songs:res}} = await getSongDetail(item.id)
      // console.log(res);
      let currentPlay = {}
      currentPlay.id = item.id;
      currentPlay.singer = item.artists[0].name;
      currentPlay.albumPic = res[0].al.picUrl;
      currentPlay.name = item.name;
      this.$store.commit("addToCurrentPlay", currentPlay);
      this.$store.dispatch("AddToPlayList", currentPlay);
    },
    async initSearchHot(){
      const {data:result} = await getSearchHot()
      this.tagList = result.result.hots
      // console.log(this.tagList);
    },
    tagSearch(item){
      // console.log(item);
      this.value = item 
      this.searchHandler(this.value)
    }
  },
  watch: {
    value(newVal,oldVal){
      // console.log(newVal);
      if(newVal === ''){
        this.isShow = false
      }
    }
  },
};
</script>

<style scoped>
.searchnav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding-bottom: 5px;
  border-bottom: 2px solid rgb(230, 230, 230);
}
.searchback {
  flex: 1;
}
.searchbox {
  flex: 7;
}
.searchlist{
  width: 100%;
}
.searchListItem{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 0 0;
  padding-bottom: 5px;
  border-bottom: 1px solid rgb(230, 230, 230);
}
.searchinfo{
  margin-left: 5px;
}
.songtitle{
  font-size: 15px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 280px;
}
.songdetail{
  display: inline-block;
  font-size: 12px;
  opacity: 0.7;
  color: #707070;
}

</style>