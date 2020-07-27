<template>
  <div id="miniplay" v-if="songList.length > 0">
    <div id="player">
      <van-popup v-model="playerShow"  id="playerpopup" >
        <div class="playernavbar" >
          <span class="playerback" @click.stop="playerback">back</span>
          <span class="playersongtitle">
            <span>{{currentPlay.name}}</span>
            <span>{{currentPlay.singer}}</span>
          </span>
          <span class="playershare" @click="showShare = true">
            <i class="iconfont icon-share"></i>
          </span>
        </div>
        <van-share-sheet class="sharetanchu"
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
          />
          <!-- 中间的图片区 -->
        <div class="middle"  @click="showLyric">
          <div v-show="!lyricIsShow" class="lyric">
            <div>{{this.currentLyric}}</div>
          </div>
        <div class="playerrecord" v-show="lyricIsShow">
          <div class="playbar">
            <img src="~assets/img/player/playbar0.png" alt="">
            <!-- <img src="~assets/img/player/playbar.png" alt=""> -->
          </div>
          <div class="playerdemo" :class="{start:isPlaying,pause:isPaused}">
            <img :src="currentPlay.albumPic" v-lazy="currentPlay.albumPic" alt="">
          </div>
        </div>
        </div>
        <!-- 进度条 -->
        <div id="progress">
          <div class="currenttime">{{formattime}}</div>
          <div class="progresswrapper"  >
            <!-- <div class="progressbar"  v-if="playcurrenttime"
            :style="{width: playcurrenttime * 0.7 + '%'}">-</div> -->
            <van-slider v-model="playcurrenttime"
             @change="changProgress"
             active-color="#e5473b"
             inactive-color="grey"
             button-size="14px">
              <template #button>
                <div class="custom-button" />
              </template>
            </van-slider>
          </div>
          <div class="duration">{{formatDuration}}</div>
        </div>
        
        <!-- player控制台 -->
        <div class="playerconsole">
          <div class="playermode">
            <i class="iconfont icon-loop"></i>
          </div>
          <div class="lastsong" @click="lastSongClick">
            <i class="iconfont icon-prev"></i>
          </div>
          <div class="playerplay" @click="toggleStatus">
            <i class="iconfont icon-player-play" v-if="!playing"></i>
            <i class="iconfont icon-player-pause" v-else></i>
          </div>
          <div class="nextsong" @click="nextSongClick">
            <i class="iconfont icon-next"></i>
          </div>
          <div class="playerlist" @click="showPopup">
            <i class="iconfont icon-list1"></i>
          </div>
        </div>
      </van-popup>
    </div>


    <div class="songimg" @click="playerFullScreen"><img :src="currentPlay.albumPic" v-lazy="currentPlay.albumPic" alt=""></div>
                                  <!-- 打开全屏 -->
    <div @click="playerFullScreen"  class="songname">
      <span>
        {{currentPlay.name}}
      </span>
    </div>
    <div class="play" @click="toggleStatus">
      <!-- 圆形进度条 -->
      <van-circle size="32px" class="playCircle" 
      :layer-color="playing? '#ebedf0': '#a2a3a3'" 
      v-model="playcurrenttime" 
      :rate="0"  
      :color="gradientColor">
        <i class="iconfont icon-mini_play"  v-if="!playing"></i>
        <i class="iconfont icon-mini_pause" v-else></i>
      </van-circle>
    </div>
    <div class="songlist" @click="showPopup">
      <i class="iconfont icon-list"></i>
    </div>
    <!-- 底部弹出的播放列表 -->
    <div class="popup">
      <van-popup v-model="show" position="bottom" 
        :style="{ height: '50%' }" close-on-popstate safe-area-inset-bottom>
          <div class="popuptitle">list</div>
        <div v-for="(item,index) in songList" :key="index" class="popupList" @click="listItemClick(index)"
        :class="{active:currentPlay.id === item.id}">
          <div >
            <span v-show="currentPlay.id === item.id"><img src="~assets/img/player/horn.png" ></span>
            <span class="popupName">{{item.name}}</span> -
            <span class="popupSinger">{{item.singer}}</span>
            <!-- 阻止冒泡 -->
            <span class="itemRemove" @click.stop="itemRemove(item.id)">╳</span>
          </div>
        </div>
      </van-popup>
    </div>

    <audio ref="audio" :src="currentPlay.url" @play="start"
     @pause="pauses" @ended="end" 
     @timeupdate="timeupdate"
     autoplay loop ></audio>
  </div>
</template>

<script>
import { Popup , ShareSheet , Circle , Slider } from 'vant';
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { getSongLyric } from 'network/api'
import { formatTime } from '../utils/format'
export default {
  name: "MiniPlay",
  components:{[Popup.name]:Popup,
              [ShareSheet.name]:ShareSheet,
              [Circle.name]:Circle,
              [Slider.name]:Slider},
  computed: {
    ...mapState(["currentPlay","playing","songList","currentIndex","currentTime"]),
    ...mapGetters(["songUrl"]),
    //把当前时间转化为百分比
    playcurrenttime:{
      get(){
        return parseInt(((this.currentTime / this.duration) *100).toFixed(0));
      },
      set(){}
    },
    formattime(){
      return formatTime(this.currentTime);
    },
    formatDuration(){
      return formatTime(this.duration);
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
      else if(!this.playing){
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
    //audio自带的播放事件 用来监听播放时长
    timeupdate(e) {
      this.duration = e.target.duration;
      // console.log(this.duration);
      // 这个playCurrentTime是vuex中的
      this.setCurrentTime(e.target.currentTime.toFixed(2));
    },
    //改变播放进度条
    changProgress(e){
      // console.log(e);
      const time = Math.floor((e * this.duration) / 100);
      // console.log(time);
      this.$refs.audio.currentTime = time;

      // 写完才发现有现成的轮子 o(╥﹏╥)o
      // console.log(e.offsetX);
      // const percent = Math.floor(e.offsetX / window.innerWidth * 100) / 70;
      // // console.log(percent);
      // const newTime = this.duration * percent;
      // this.$refs.audio.currentTime = newTime;
    },
    ...mapMutations(["play","pause","playNextSong","playLastSong","setCurrentTime"])
  },

  data() {
    return {
      show:false,
      //大播放器显示
      playerShow:false,
      //分享显示
      showShare: false,
      currentLyric:'',
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      //歌词显示
      lyricIsShow:true,
      isPlaying:false,
      isPaused:false,
      //当前播放音乐的总时长
      duration:0,
      gradientColor:{
        '0%': '#e5473b',
        '100%': 'skyblue',
      }
    }
  },
};
</script>

<style scoped>
/* 播放器 */
#playerpopup{
  /* 关于ihpone6机型：宽度不设置100vw以上，左边有条线*/
  /* 高度不管设置多少，上边都有条线，至今未解决 ~o(╥﹏╥)o */

  width: 100vw;
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
  height: 60vh;
  color: white;
  font-size: 3.889vw;
  overflow: hidden;
}
.playerrecord{
  height: 60vh;
  overflow: hidden;
  /* background-color: skyblue; */
}
.playbar img{
  width: 8%;
}
.playerrecord .playerdemo{
  position: relative;
  margin: 10vw auto 0;
  width: 70%;
  padding-top: 70%;
  height: 0;
  border-radius: 100%;
  box-sizing: border-box;
  background-image: url('~assets/img/player/recordnew.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  /* animation:turn 60s infinite; */
  border: 3px solid rgba(66, 66, 66) ;
}
.playerrecord .playerdemo img{
  width:65%;
  border-radius: 50%;
  transform: translateY(-128%);
}
/* 进度条 */
#progress{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 35vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 3.333vw;
  text-align: center;
}
.progresswrapper{
  background-color: rgb(168, 168, 168);
  height: 0.556vw;
  display: flex;
  justify-content: space-between;
  color: rgb(179, 177, 177);
  width: 70%;
}
/* .progressbar{
  background-color: rgb(216, 25, 57);
  font-size: 3.333vw;
  position: absolute;
  text-align: right;
  line-height: 0.556vw;
  color: rgba(216, 25, 57,.0);
}
.progressbar::after{
  content: '';
  width: 1.111vw;
  height: 1.111vw;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: -8px;
  border: 1.667vw solid white;
} */
.custom-button{
  width: 1.111vw;
  height: 1.111vw;
  background-color: #e5473b;
  border: 1.667vw solid white;
  border-radius: 50%;
}
.currenttime{
  margin-left: 3%;
  transform: scale(0.9);
}
.duration{
  margin-right: 3%;
  transform: scale(0.9);
}


.playerconsole{
  position: fixed;
  bottom: 0;
  width: 100%;
  height:15vh;
  color: white;
  /* background-color: skyblue; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.playerconsole div{
  flex:1;
}

/* 小播放器 */
#miniplayer {
  position: absolute;
  bottom: 0px;
  z-index: 1000;
  height: 45px;
  width: 100%;
  background-color: white;
  display: flex;
  text-align: center;
  align-items: center;
  border-top: 1px solid rgba(240, 239, 239,.8);
  overflow: hidden;
}
.songimg {
  flex: 1;
}
.songname {
  flex: 5;
  font-size: 12px;
  text-align: left;
  line-height: 45px;
}
.play {
  flex: 1;
}
.songlist {
  flex: 1;
  margin-right: 5px;
}
.songimg img{
  width: 35px;
  height: 35px;
  border-radius: 8px;
  vertical-align: middle;
}
/* .play img{
  width: 100%;
} */
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
  border-top: 1px solid rgb(236, 235, 235);
  opacity: .9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  line-height: 45px;
}
.popuptitle{
  line-height: 40px;
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
.playCircle {
  margin-top: 4px;
}


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