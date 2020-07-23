<template>
    <!-- nav下层 -->
    <div class="navbarBtm">
      <div class="navbarBtm-wrapper" >
        <div @click="homeClick(0)" >
          <span :class="navCurrentIndex==0?'active':'inactive'">推荐</span>
        </div>
        <div @click="rankClick(1)">
          <span  :class="navCurrentIndex==1?'active':'inactive'">歌单</span>
        </div>
        <div @click="raiosetClick(2)">
          <span  :class="navCurrentIndex==2?'active':'inactive'">排行</span>
        </div>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "NavbarBtm",
  methods: {
    homeClick(index){
      this.$router.push('/home')
      this.$store.commit('changeNavIndex',index)
    },
    rankClick(index){
      this.$router.push('/songcate')
      this.$store.commit('changeNavIndex',index)
    },
    raiosetClick(index){
      this.$router.push('/rank')
      this.$store.commit('changeNavIndex',index)
    }
  },
  data() {
    return {
      currentIndex:0
    }
  },
  computed: {
    ...mapState(['navCurrentIndex'])
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
  font-size: 3.611vw;
  color: white;
  letter-spacing: 0.8px;
  color: white;
}
.inactive {
  padding: 0 1px 5px 1px;
  font-size: 3.472vw;
  color: white;
  letter-spacing: 0.8px;
  opacity: 0.7;
}
</style>