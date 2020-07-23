<template>
  <div class="topPlayInfo">
      <div class="wrapper">
           <img :src="img" alt="" v-lazy="img">
      </div>
  </div>
</template>

<script>
export default {
    name:"TopPlayInfo",
    props:["img"],
}
</script>

<style scoped>
    .topPlayInfo{
        height: 20vh;
        width: 100%;
        overflow: hidden;
    }
    img{
        width: 50%;
    }
</style>