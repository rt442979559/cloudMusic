<template>
  <div id="videomv">
      <h2 @touchmove="touchstart">videomv</h2>
  </div>
</template>

<script>
export default {
  methods: {
    touchstart(e){
      console.log(e);
    }
  },
}
</script>

<style scoped>
  #videomv{
    position: relative;
    top: 45px;
  }
</style>