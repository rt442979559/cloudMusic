<template>
  <div class="topPlayNav">
      <div class="back" @click="backClick">back</div>
  </div>
</template>

<script>
export default {
    name:"TopPlayNav",
    methods: {
        backClick(){
            this.$router.go(-1)
        }
    },
}
</script>

<style scoped>
    .topPlayNav{
        height: 45px;
        width: 100%;
        background-color: skyblue;
        display: flex;
        align-items: center;
    }

</style>