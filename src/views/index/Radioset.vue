<template>
  <div>
      <h2>
          radioset
      </h2>
  </div>
</template>

<script>
import {getRadioStation} from 'network/api'
import {getTopList} from 'network/api'
export default {
    name:"Radioset",
    created() {
        this.getRankList()
    },
    methods: {
        async getRankList(){
            const {data:{list:toplist}} = await getTopList()
            console.log(toplist);
        }
    },
}
</script>

<style scoped>

</style>