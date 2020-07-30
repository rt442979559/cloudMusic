<template>
  <div class="detailNavbar" >
    <div class="back" @click="backClick">back</div>
    <div class="title">
      <div class="box1" v-if="!changeContext">歌单</div>
      <div class="box3" v-else="changeContext">{{name}}</div>
      <div class="box2">{{description}}</div>
    </div>
    
    <div class="search">search</div>
    <div class="sort">sort</div>
  </div>
</template>

<script>
export default {
  name: "DetailNavbar",
  props:["description","changeContext","name"],
  methods: {
      backClick(){
          this.$router.back();
      },

  },
};
</script>

<style scoped>
.detailNavbar {
  position: relative;
  top: 0;
  z-index: 900;
  background-color: white;
  height: 50px;
  line-height: 50px;
  width: 100%;
  display: flex;
  text-align: center;
  opacity: 0.9;
}
.back {
  flex: 1;
}
.title {
  height: 50px;
  line-height: 25px;
  flex: 4;
  display: flex;
  text-align: left;
  flex-direction: column;
  justify-content: space-around;
  min-width: 0;
}
.title .box1 {
  flex: 1;
  font-size: 18px;
  margin: 5px 0 -7px 0;
}
.title .box2 {
  flex: 1;
  font-size: 12px;
  letter-spacing: 0.4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5px;
  opacity: 0.5;
}
.title .box3{
  flex: 1;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.8;
  padding-top: 5px;
}

.search {
  flex: 1;
}
.sort {
  flex: 1;
}
</style>