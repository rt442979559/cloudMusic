<template>
<!-- 推荐歌单 -->
  <div class="personalized">
      <div class="recommendmore" @click="recommendClick">推荐歌单 ＞</div>
      <div class="playcard" v-if="list.length">
        <PlayCard v-for="item in list" 
            :desc="item.copywriter"
            :id="item.id"
            :img="item.picUrl"
            :key="item.id"
            :name="item.name"
            :playcount="item.playCount"
        ></PlayCard>
      </div>
  </div>
</template>

<script>
import { getPersonalized } from "network/api"
import PlayCard from './common/PlayCard'
export default {
    name:"Personalized",
    components:{ PlayCard },
    async created() {
        this.getPersonalized(0,6)
    },
    data() {
        return {
           list:[],
        }
    },
    methods: {
        async getPersonalized(a,b){
            //只获取6组数据进行 渲染展示
            const { data:res } = await getPersonalized({ limit : 60 })
            this.list = res.result.slice(a,b);
            // console.log(res);
        },
        recommendClick(){
            this.$router.push('/topplaylist')
        },
    },
}
</script>

<style scoped>
    .playcard{
        display: flex;
        flex-wrap: wrap;
        justify-content:space-around;
    }
    .recommendmore{
        margin: 3.333vw 0 0 0px;
        font-size: 3.889vw;
        border-left: 0.417vw solid red;
        padding: 0 0 0 6px;
    }
    
</style>