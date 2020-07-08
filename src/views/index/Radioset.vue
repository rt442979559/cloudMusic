<template>
  <div>
      <h2>
          radioset
      </h2>
  </div>
</template>

<script>
import {getRadioStation} from 'network/api'
export default {
    name:"Radioset",
    async created() {
        const {data:radio} = await getRadioStation();
        console.log(radio); 
    },
}
</script>

<style>

</style>