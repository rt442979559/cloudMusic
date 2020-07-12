<template>
  <div>
    <div class="title">
      <span>热门搜索</span>
    </div>
    <div class="searchhot">
      <span v-for="item in tagList" class="hotitem" :key="item.first">
        <van-tag plain round size="large" class="tag" color="#e5473b" @click="tagClick(item)">{{item.first}}</van-tag>
      </span>
    </div>
  </div>
</template>

<script>
import { Tag } from "vant";
export default {
  name: "SearchHot",
  components: { [Tag.name]: Tag },
  props: ["tagList"],
  methods: {
    tagClick(item){
      this.$emit('tagSearch',item.first)
    }
  },
};
</script>

<style scoped>
.title {
  margin: 14px 0 0 6px;
  font-size: 15px;
  color: rgb(105, 105, 105);
}
.searchhot {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  justify-items: auto;
  height: 20vh;
  margin-top: 10px;
}
.hotitem {
  padding: 10px 5px 0 0;
}
</style>