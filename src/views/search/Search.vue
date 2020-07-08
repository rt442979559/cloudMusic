<template>
  <div id="search">
    <SearchNav></SearchNav>
      search
  </div>
</template>

<script>
import {getSearch} from 'network/api'
import SearchNav from './SearchNav'
export default {
  name:"Search",
  components:{
    SearchNav
  },
  async created() {
    const search = await getSearch();
    console.log(search);
  },
}
</script>

<style scoped>

</style>