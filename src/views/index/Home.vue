<template>
  <div id="Home" class="wrapper" ref="wrapper">
    <Scroll :probeType="3" class="content" ref="scroll" 
    :pullUpLoad="true"
    :pullDownLoad="true" >
      <Banners></Banners>
      <Recommend></Recommend>
      <Personalized></Personalized>
      <!-- <NewSong></NewSong> -->
      <PersonalizedNewSong></PersonalizedNewSong>
      <ul>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Banners from "components/Banners";
import NavbarBtm from "components/NavbarBtm";
import Recommend from "components/Recommend";
import Personalized from "components/Personalized";
import PersonalizedNewSong from "components/PersonalizedNewSong";
import Scroll from "components/common/Scroll";
import NewSong from 'components/common/NewSong'
export default {
  name: "Home",
  components: {
    Banners,
    NavbarBtm,
    Recommend,
    Personalized,
    PersonalizedNewSong,
    NewSong,
    Scroll
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scroll.scroll.refresh();
    });
  },
  activated() {
    this.$nextTick(() => {
      this.$refs.scroll.scroll.refresh();
    });
  },
};
</script>

<style scoped>
#home {
  position: relative;
  overflow: hidden;
}
.content {
  height: calc(100vh - 90px - 45px);
  overflow: hidden;
  position: absolute;
  top: 90px;
  bottom: 0px;
  left: 0;
  right: 0;
}
</style>