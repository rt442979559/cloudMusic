<template>
  <!-- 最新音乐 -->
  <div class="newsong">
    <span class="personalizednewsong">最新音乐 ＞</span>
    <NewSong id="NewSong"></NewSong>
  </div>
</template>

<script>
import NewSong from "components/common/NewSong";
export default {
  components: { NewSong }
};
</script>

<style scoped>
.newsong {
  margin-top: 2.778vw;
}
.personalizednewsong {
  /* margin: 2.333vw 0 0 0px; */
  font-size: 3.889vw;
  border-left: 0.417vw solid red;
  padding: 0 0 0 1.667vw;
}
#NewSong{
  margin-top: -1.667vw;
}
</style>