<template>
  <div id="playlistdetail" class="wrapper">
    <van-popup v-model="show" round position="bottom" :style="{ height: '40%' }" >内容</van-popup>


    <DetailNavbar :description="playlist.description" :changeContext="changeContext" :name="playlist.name"></DetailNavbar>
    <Scroll :probeType="3" class="content" ref="scroll" :pull-up-load="true" @scroll="contentScroll">
      <AuthorMsg
        :coverimg="playlist.coverImgUrl"
        :name="playlist.name"
        :creator="playlist.creator"
        :shareCount="playlist.shareCount"
        :playcount="playlist.playCount"
        :description="playlist.description"
        :commentCount="playlist.commentCount"
      ></AuthorMsg>
      <div class="playall" ref="playlist">
        <span class="songlength">播放全部 (共{{songs.length}}首)</span>
        <span class="collect">+ 收藏({{playlist.subscribedCount}})</span>
      </div>
      <!-- 歌曲列表 -->
      
      <div
        class="songslist"
        v-for="(item,index) in songs"
        :key="index"
        :class="{active:currentIndex===index}"
      >
        <div class="songswrapper" @click.stop="playAudio(item,index)">
          <!-- <div class="songsindex">
          <span :class="{active:currentIndex===index}">
            <img src="~assets/img/player/pause2.png" v-show="currentIndex===index">
            </span>
          </div>-->
          <div class="songsinfo">
            <div class="songtitle">{{item.name}} {{item.alia[0]}}</div>
            <div
              class="singer"
              :class="{active:currentIndex===index}"
            >{{item.ar[0].name}} - {{item.al.name}}</div>
          </div>
          <span class="mv"></span>
          <div class="more" @click.stop="showPopup">
            <img src="~assets/img/author/more.png" alt="">
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import DetailNavbar from "./DetailNavbar";
import AuthorMsg from "./AuthorMsg";

import { getListDetail } from "network/api";
import { getSongUrl } from "network/api";
import { getSongDetail } from "network/api";

import Scroll from "components/common/Scroll";
import { Popup } from 'vant';

export default {
  name: "PlaylistDetail",
  async created() {
    this.getSongData();
  },
  mounted() {
    this.$nextTick(()=>{
      this.listOffsetTop = this.$refs.playlist.offsetTop;
      // console.log(this.listOffsetTop);
    });
    this.$nextTick(() => {
      this.$refs.scroll.scroll.refresh();
    });
  },
  data() {
    return {
      //歌单列表
      playlist: {},
      //trackidid
      trackid: [],
      //歌曲id
      songid: [],
      //歌曲url
      songUrl: [],
      //歌曲信息
      songs: [],
      currentIndex: null,
      show: false,
      listOffsetTop:0,
      changeContext:false,
    };
  },
  components: { DetailNavbar, AuthorMsg, Scroll,[Popup.name]:Popup},
  methods: {
    async getSongData() {
      //传进来的歌单id
      this.id = this.$route.params.id;
      //根据歌单id找到所在歌单的歌曲列表
      const { data: res } = await getListDetail({ id: this.id });
      this.playlist = res.playlist;
      // console.log(this.playlist);
      this.songid = res.playlist.trackIds;
      // console.log(this.songid);
      // 查找所有的id 获取所有的歌曲id
      const trackIds = this.playlist.trackIds.map(({ id }) => id);
      // 再保存到trackid中
      this.trackid = trackIds;
      // console.log(trackIds);
      //根据歌曲id 发送网络请求获取所有歌曲
      // const songUrl = await getSongUrl(trackIds);
      // 把所有获取到的songUrl保存到songurl
      // this.songUrl = songUrl.data.data.map(({ url }) => url);
      // console.log(this.songUrl);
      //获取歌曲详细信息
      const songDetails = await getSongDetail(trackIds);
      //将歌曲的详细信息保存到songs中
      this.songs = songDetails.data.songs;
      // console.log(this.songs);
    },
    async playAudio(song, index) {
      const songurl = await getSongUrl(song.id);
      // console.log(song);
      const currentPlay = {};
      currentPlay.url = songurl.data.data[0].url
      currentPlay.id = song.id;
      currentPlay.singer = song.ar[0].name;
      currentPlay.albumPic = song.al.picUrl;
      currentPlay.name = song.name;
      this.$store.commit("addToCurrentPlay", currentPlay);
      this.$store.dispatch("AddToPlayList", currentPlay);
      
      // if (!currentPlay.id) {
      //   return
      // }else{
      //   await this.$store.commit("play");
      // }
      this.currentIndex = index;
      // console.log(this.$storage.set(index,currentPlay));
      // console.log(this.$storage.get(index,currentPlay));
    },
    showPopup(){
      this.show = true;
    },
    // 页面滚动触发navbar事件
    contentScroll(position){
      // console.log(position);
      if(position.y < (-this.listOffsetTop)){
        this.changeContext = true;
        // console.log(this.changeContext);
      }else{
        this.changeContext = false;
        // console.log(this.changeContext);
      }
    }
  }
};
</script>

<style lang="less" scoped>
#playlistdetail {
  position: relative;
}
.content {
  height: calc(100vh - 50px);
  overflow: hidden;
  position: absolute;
  top: 50px;
  bottom: 45px;
  left: 0;
  right: 0;
}

/* 播放全部 */
.playall {
  width: 100%;
  height: 9.722vw;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
}
.collect {
  background-color: #ee4d41;
  background-image: linear-gradient(
    to right,
    rgba(226, 125, 125, 0),
    rgb(226, 77, 77)
  );
  color: rgb(240, 239, 239);
  font-size: 3.889vw;
  padding: 0 2.778vw;
}

/* 歌曲列表  ↓*/
.songswrapper {
  width: 100%;
  display: flex;
  height: 45px;
  line-height: 45px;
  padding: 3px 0;
  border-top: 1px solid rgb(247, 245, 245);
}
/* .songsindex{
  flex: 0.7;
  text-align: center;
  opacity: .7;
  color: #707070;
  border-top:1px solid wh ;
}
.songsindex img{
  width: 20px;
} */
.songsinfo {
  flex: 4;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
.songtitle {
  font-size: 15px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer {
  font-size: 12px;
  opacity: 0.7;
  color: #707070;
}
.mv {
  flex: 1;
  opacity: 0.9;
  text-align: right;
}
.more {
  flex: 0.5;
  opacity: 0.5;
  text-align: center;
}
.more img{
  width:75%;
  vertical-align: middle;
}

.active {
  color: rgb(209, 5, 49);
}

</style>