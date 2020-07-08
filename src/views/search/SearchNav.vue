<template>
  <div class="searchnav">
    <div class="searchback" @click="searchback">
      <span>back</span>
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { Search } from "vant";
export default {
  name: "SearchNav",
  components: { [Search.name]: Search },
  methods: {
    searchback() {
      this.$router.go(-1);
    }
  },
  data() {
    return {
      value: ""
    };
  }
};
</script>

<style scoped>
</style>