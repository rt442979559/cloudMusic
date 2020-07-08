<template>
  <div class="playcard" @click="cardClick" :style="{width: calcWidth + 'vw' }">
    <img :src="img" class="playcardimg" :style="{width: calcWidth + 'vw'}" v-lazy="img" alt />
    <div class="counte">
      <img src="~assets/img/author/headphones.png"  alt />
      {{playCount}}
    </div>
    <div class="cardname">
      <span>{{name}}</span>
    </div>
  </div>
</template>

<script>
import { Lazyload } from 'vant';
export default {
  props: ["id", "img", "name", "playcount",],
  components:{ Lazyload },
  created() {
    this.calcWidth;
  },
  data() {
    return {
      activeColor:'red',
      widthVW: 47
    }
  },
  methods: {
    cardClick() {
      // this.$router.push(`/playlist/${this.id}`)
      this.$router.push("/playlistdetail/" + this.id);
      // console.log(this.id);
    },
  },
  computed: {
    playCount(){
      return (this.playcount / 10000).toFixed(2) + '万'
    },
    calcWidth(widthVW){
      if(this.$route.path==='/topplaylist'){
        return this.widthVW;
      }else{
        return (this.widthVW - 15);
      }
    }
  },
};
</script>

<style scoped>
.playcard {
  position: relative;
  padding-bottom: 10px;
  margin-top: 10px;
  width: 32vw;
  border-radius: 10px;
}
.playcardimg {
  width: 32vw;
  border-radius: 5px;
  position: relative;
}
.cardname {
  font-size: 11px;
  letter-spacing: 0.7px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5px;
}
.counte {
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 12px;
  color: white;
}
.counte img {
  width: 12px;
}
</style>