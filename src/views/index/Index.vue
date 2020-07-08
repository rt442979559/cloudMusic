<template>
  <div id="index">
      <NavbarBtm></NavbarBtm>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
import NavbarBtm from "components/NavbarBtm";
export default {
    components:{NavbarBtm}
}
</script>

<style scoped>

</style>