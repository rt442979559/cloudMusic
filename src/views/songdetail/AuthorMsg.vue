<template>
  <div class="author" :style="bgStyle">
    <div class="centerwrapper" :style="bgStyle">
      <div class="imgwrapper">
        <div class="count">
          <img src="~assets/img/author/headphones.png" alt="" id="headphones">
          <span>{{playCount}}</span>
        </div>
        <img :src="coverimg" alt />
      </div>
      <div class="titlewrapper">
        <div class="title">
          <span>{{name}}</span>
        </div>
        <div class="nickname" v-if="creator">
          <img :src="creator.avatarUrl" alt />
          <span>{{creator.nickname}}></span>
        </div>
      </div>
    </div>
    <div class="share">
      <!-- 评论 -->
      <!-- <div>{{$store.getters.songUrl}}</div> -->
      <div class="comment">
        <img src="~assets/img/author/comment.png" alt />
        <div>{{commentCount}}</div>
      </div>
      <!-- 分享 -->
      <div class="sharelink">
        <img src="~assets/img/author/share.png" alt />
        <div>{{shareCount}}</div>
      </div>
      <div class="download">
        <img src="~assets/img/author/download.png" alt />
        <div>下载</div>
      </div>
      <div class="checkbox">
        <img src="~assets/img/author/check.png" alt />
        <div>多选</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthorMsg",
  props:["coverimg","name","creator","commentCount","shareCount","playcount"],
  computed: {
    playCount(){
      return (this.playcount / 10000).toFixed(2) + '万'
    },
    bgStyle() {
      return {
        backgroundImage: `url(${this.coverimg})`,
        backgroundSize: '400%',
      };
    }
  },
  
};
</script>

<style scoped>
/* 上层 */

.author {
  width: 100%;
  height: 28vh;
  /* background-color: rgb(90, 90, 90); */
  background-color: rgb(63, 63, 63);
  opacity: 0.8;
  /* background-image: linear-gradient(to right, rgba(63, 63, 63, 0), rgb(145, 145, 145)); */
  
  
}
.centerwrapper {
  display: flex;
  height: 20vh;
  background-color: rgb(63, 63, 63);
  /* background-image: linear-gradient(to right, rgba(63, 63, 63, 0), rgb(145, 145, 145)); */
  width: 100%;
  margin-top: 10px;
  color: white;
  position: relative;
}
.imgwrapper {
  margin: 10px;
  position: relative;
}
.count{
  position: absolute;
  right: 2px;
  font-size: 12px;
  top: 2px;
}
#headphones{
  width: 12px;
}
.titlewrapper {
  margin: 20px 10px 20px 10px;
  font-size: 15px;
  letter-spacing: 0.8px;
  opacity: 0.9;
}
.nickname {
  margin-top: 20px;
  font-size: 13px;
}
.nickname img {
  width: 8vw;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}
.imgwrapper img {
  width: 32vw;
  border-radius: 5px;
}

/* 下层 */
.share {
  margin-top: 6px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  justify-items: center;
  text-align: center;
  font-size: 13px;
  color: white;
}
.share img {
  width: 6vw;
  padding-bottom: 5px;
}
</style>