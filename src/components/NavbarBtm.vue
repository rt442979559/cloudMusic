<template>
    <!-- nav下层 -->
    <div class="navbarBtm">
      <div class="navbarBtm-wrapper" >
        <div @click="homeClick(0)" >
          <span :class="currentIndex==0?'active':'inactive'">推荐</span>
        </div>
        <div @click="friendsClick(1)">
          <span  :class="currentIndex==1?'active':'inactive'">朋友</span>
        </div>
        <div @click="raiosetClick(2)">
          <span  :class="currentIndex==2?'active':'inactive'">电台</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "NavbarBtm",
  methods: {
    homeClick(index){
      this.$router.push('/home')
      this.currentIndex = index;
    },
    friendsClick(index){
      this.$router.push('/friends')
      this.currentIndex = index;
    },
    raiosetClick(index){
      this.$router.push('/radioset')
      this.currentIndex = index;
    }
  },
  data() {
    return {
      currentIndex:0
    }
  },
};
</script>

<style scoped>
/* navbar下层 */
.navbarBtm {
  position: relative;
  top: 45px;
  z-index: 887;
  height: 45px;
  width: 100%;
  background-color: #e5473b;
  margin-bottom: 45px;
}
.navbarBtm-wrapper {
  width: 100%;
  background-color: #e5473b;
  height: 100%;
  display: flex;
  vertical-align: middle;
  line-height: 45px;
  text-align: center;
  justify-content: space-between;
}
.navbarBtm-wrapper div{
  flex: 1;
}
/* .navbarBtm-wrapper div span {
  padding: 0 1px 4px 1px;
  border-bottom: 1.5px solid white;
  font-size: 11.5px;
  color: white;
  letter-spacing: 0.8px;
  opacity: 0.7;
} */
.active{
  padding: 0 1px 5px 1px;
  border-bottom: 1.5px solid white;
  font-size: 12.5px;
  color: white;
  letter-spacing: 0.8px;
  color: white;
}
.inactive {
  padding: 0 1px 5px 1px;
  font-size: 12px;
  color: white;
  letter-spacing: 0.8px;
  opacity: 0.7;
}
</style>