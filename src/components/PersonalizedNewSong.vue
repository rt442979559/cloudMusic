<template>
  <!-- 最新音乐 -->
  <div class="newsong">
    <span class="personalizednewsong">最新音乐 ></span>
    <NewSong></NewSong>
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
  margin-top: 10px;
}
.personalizednewsong {
  margin: 12px 0 0 0px;
  font-size: 14px;
  border-left: 1.5px solid red;
  padding: 0 0 0 6px;
}
</style>