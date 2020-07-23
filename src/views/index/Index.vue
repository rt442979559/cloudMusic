<template>
  <div id="index">
    <NavbarBtm></NavbarBtm>
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import NavbarBtm from "components/NavbarBtm";
export default {
  components: { NavbarBtm }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-avtive {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>