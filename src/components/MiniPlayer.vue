<template>
  <div id="miniplay" >
    <div id="player">
      <van-popup v-model="playerShow"  id="playerpopup" >
        <div class="playernavbar">
          <span class="playerback" @click.stop="playerback">back</span>
          <span class="playersongtitle">
            <span>{{currentPlay.name}}</span>
            <span>{{currentPlay.singer}}</span>
          </span>
          <span class="playershare" @click="showShare = true">share</span>
        </div>
        <van-share-sheet class="sharetanchu"
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
          />
        <div class="middle"  @click="showLyric">
          <div v-show="!lyricIsShow">
            <div>{{this.currentLyric}}</div>
          </div>
        <div class="playerrecord" v-show="lyricIsShow">
          <div class="playbar">
            <img src="~assets/img/player/playbar0.png" alt="">
            <!-- <img src="~assets/img/player/playbar.png" alt=""> -->
          </div>
          <div class="playerdemo" :class="{start:isPlaying,pause:isPaused}">
            <img :src="currentPlay.albumPic" alt="">
          </div>
        </div>
        </div>
        <div class="playerconsole">
          <div class="playermode">
            <img src="~assets/img/player/loop.png" >
          </div>
          <div class="lastsong" @click="lastSongClick">
            <img src="~assets/img/player/playerprev.png" >
          </div>
          <div class="playerplay" @click="toggleStatus">
            <img src="~assets/img/player/playing.png" v-if="!playing">
            <img src="~assets/img/player/pause1.png" v-else>
          </div>
          <div class="nextsong" @click="nextSongClick">
            <img src="~assets/img/player/playernext.png" >
          </div>
          <div class="playerlist" @click="showPopup">
            <img src="~assets/img/player/list2.png" >
          </div>
        </div>
      </van-popup>
    </div>


    <div class="songimg"><img :src="currentPlay.albumPic" alt=""></div>
                                  <!-- 打开全屏 -->
    <div class="songname" @click="playerFullScreen" >
      <span>
        {{currentPlay.name}}
      </span>
    </div>
    <div class="play" @click="toggleStatus">
      <img src="~assets/img/player/toplay.png" v-show="!playing">
      <img src="~assets/img/player/pause2.png" >
    </div>
    <div class="songlist" @click="showPopup">
      <img src="~assets/img/player/list.png" >
    </div>
    <!-- 底部弹出的播放列表 -->
    <div class="popup">
      <van-popup v-model="show" position="bottom" 
        :style="{ height: '52%' }" closeable close-icon="close">
          list
        <div v-for="(item,index) in songList" :key="index" class="popupList" @click="listItemClick(index)"
        :class="{active:currentPlay.id === item.id}">
          <div >
            <span v-show="currentPlay.id === item.id"><img src="~assets/img/player/horn.png" ></span>
            <span class="popupName">{{item.name}}</span>-
            <span class="popupSinger">{{item.singer}}</span>
            <!-- 阻止冒泡 -->
            <span class="itemRemove" @click.stop="itemRemove(item.id)">X</span>
          </div>
        </div>
      </van-popup>
    </div>

    <audio ref="audio" :src="currentPlay.url" @play="start"
     @pause="pauses" @ended="end"
     autoplay loop></audio>
  </div>
</template>

<script>
import { Popup , ShareSheet } from 'vant';
import { mapState, mapMutations, mapActions,mapGetters } from "vuex";
import { getSongLyric } from 'network/api'
export default {
  name: "MiniPlay",
  components:{[Popup.name]:Popup,[ShareSheet.name]:ShareSheet},
  computed: {
    ...mapState(["currentPlay","playing","songList","currentIndex"]),
    ...mapGetters(["songUrl"]),
    getShow(){
      console.log(this.popupIsShow);
    },
    
  },
  
  methods: {
    //播放器全屏  并且获取当前的歌词
    async playerFullScreen(){
      if(this.songList.length < 1){
        return
      }
      else{
        this.playerShow = true;
        const {data:{lrc:lyric}} = await getSongLyric(this.currentPlay.id)
        this.currentLyric = lyric.lyric
      }
    },
    //弹出层
    showPopup(){
      this.show = true;
    },
    //上一首
    async lastSongClick(){
      this.$store.commit('playLastSong')
      const {data:{lrc:lyric}} = await getSongLyric(this.currentPlay.id)
      this.currentLyric = lyric.lyric
    },
    //下一首
    async nextSongClick(){
      this.$store.commit('playNextSong')
      const {data:{lrc:lyric}} = await getSongLyric(this.currentPlay.id)
      this.currentLyric = lyric.lyric
    },
    playerback(){
      this.playerShow = false;
    },
    showLyric(){
      this.lyricIsShow = !this.lyricIsShow
    },
    
    //控制播放
    toggleStatus(){
      if (this.playing){
        this.$refs.audio.pause()
        this.$store.commit('pause')
        this.isPlaying = true;
      }
      else{
        this.$refs.audio.play()
        this.$store.commit('play')
        this.isPaused = true
      }
    },
    //控制图片旋转
    start(){
      this.isPlaying = true;
      this.isPaused = false
    },
    pauses(){
      this.isPaused = true
    },
    //点击列表 播放
    listItemClick(index){
      this.$store.commit('listToPlay',index);
      // const datas = await getSongLyric(this.currentPlay.id);
      // console.log(datas);
      this.play()
    },
    // 点击移除列表的item项
    itemRemove(id){
      this.$store.dispatch('RemoveSongListItem',id)
    },
    // 结束后 选择模式
    end(){
      console.log('end ');
    },

    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },

    ...mapMutations(["play","pause","playNextSong","playLastSong"])
  },

  data() {
    return {
      show:false,
      playerShow:false,
      showShare: false,
      currentLyric:'',
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      lyricIsShow:true,
      isPlaying:false,
      isPaused:false,
    }
  },
};
</script>

<style scoped>
/* 播放器 */
#playerpopup{
  /* 关于ihpone6机型：宽度不设置100vw以上，左边有条线*/
  /* 高度不管设置多少，上边都有条线，至今未解决 ~o(╥﹏╥)o */
  width: 100.3vw;
  height:100vh;
  background-image: radial-gradient(43% 116% at top center, #535353 5% , #464646 18%, rgb(27, 26, 26)70%);
}
.playernavbar{
  display: flex;
  align-items: center;
  color: white;
  background-image: radial-gradient(43% 116% at bottom center, #535353 5% , #464646 18%, rgb(27, 26, 26)70%);
  
}
.playerback{
  flex: 1.5;
}
.playersongtitle{
  flex: 5;
  text-align: start;
  display: flex;
  flex-direction: column;
  font-size: 4.444vw;
  line-height: 6.944vw;
  align-items: baseline;
  border-bottom: 0.8px solid rgba(49, 47, 47, 0.8);
  letter-spacing: 1.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.playersongtitle span:nth-child(1){
  margin-top: 1.389vw;
}
.playersongtitle span:nth-child(2){
  font-size: 3.333vw;
  opacity: .7;
}
.playershare{
  flex: 1.5;
}

.middle{
  height: 73vh;
  color: white;
  font-size: 3.889vw;
  overflow: hidden;
}
.playerrecord{
  height: 68vh;
  overflow: hidden;
  /* background-color: skyblue; */
}
.playbar img{
  width: 8%;
}
.playerrecord .playerdemo{
  position: relative;
  margin: 11.111vw auto 0;
  width: 80%;
  padding-top: 80%;
  height: 0;
  border-radius: 100%;
  box-sizing: border-box;
  background-image: url('~assets/img/player/recordnew.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  /* animation:turn 60s infinite; */
  border: 3px solid rgba(66, 66, 66);
}
.playerrecord .playerdemo img{
  width:70%;
  border-radius: 50%;
  transform: translateY(-122%);
}

.playerconsole{
  position: fixed;
  bottom: 0;
  width: 100%;
  height:11%;
  color: white;
  /* background-color: skyblue; */
  display: flex;
  justify-content: space-evenly;
}
.playerconsole img{
  width: 40%;
  vertical-align: middle;
}
.playerplay img{
  width: 60%;
}

/* 小播放器 */
#miniplayer {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  height: 45px;
  width: 100%;
  background-color: white;
  display: flex;
  line-height: 45px;
  text-align: center;
  /* opacity:0.9; */
}
.songimg {
  flex: 1;
}
.songname {
  flex: 5;
  font-size: 12px;
  text-align: left;
}
.play {
  flex: 1;
}
.songlist {
  flex: 1;
}
.songimg img{
  width: 35px;
  height: 35px;
  border-radius: 8px;
  vertical-align: middle;
}
.play img{
  width: 30px;
  vertical-align: middle;
  height: 30px;
}
.songlist img{
  width: 35px;
  vertical-align: middle;
  height: 35px;
}

.active{
  color: red;
}

.popupList{
  text-align: left;
  border-bottom: 1px solid rgb(236, 235, 235);
  opacity: .9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
}
.popupList img{
  height:14px;
  vertical-align: middle;
  margin: 0 5px 0 3px;
}
.popupName{
  font-size: 14px;
  margin-left: 5px;
}
.popupSinger{
  font-size: 12px;
  opacity: .6;
}
.itemRemove{
  position: absolute;
  right: 10px;
  font-size: 13px;
}
/* @keyframes turn{
  0%{-webkit-transform:rotate(0deg);}
  100%{-webkit-transform:rotate(360deg);}
} */
@-webkit-keyframes rotation{
  from{transform:rotate(0deg);}
  to{transform:rotate(360deg);}
}
.start{
  animation:rotation 45s infinite linear;
}
.pause{
  animation-play-state:paused;
}
</style>