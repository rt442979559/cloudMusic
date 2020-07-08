<template>
  <div class="newsong" ref="newsong">
    <div class="listcontent" ref="content">
      <div class="listitem" v-for="item in newSongList" ref="listitem" :key="item.id">
        <img :src="item.picUrl" alt />
        <span class="listitemspan">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getPersonalizedNewSong } from "network/api";
export default {
  name: "app",
  data() {
    return {
      newSongList: []
    };
  },
  async created() {
    const {data: { result: res }} = await getPersonalizedNewSong();
    this.newSongList = res;
    // console.log(this.newSongList);

    this.$nextTick(() => {
      this.initTabScroll();
    });
  },
  methods: {
    initTabScroll() {
      let width = 0;
      for (let i = 0; i < this.newSongList.length; i++) {
                                                                //8是margin
        width += this.$refs.listitem[0].getBoundingClientRect().width + 8; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
      }
      this.$refs.content.style.width = width + "px";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.newsong, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  }
};
</script>

<style scoped>
.newsong {
  width: 100vw;
  overflow: hidden;
  /* touch-action: none */
}
.listcontent {
  display: flex;
  align-items: center;
  height: 150px;
}
.listitem {
  margin: 0 4px;
}
.listitem img {
  width: 33vw;
  border-radius: 8px;
}
.listitemspan {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  width: 105px;
  display: block;
}
</style>
