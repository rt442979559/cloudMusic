<template>
<!-- 推荐歌单 -->
  <div class="personalized">
      <div class="recommendmore" @click="recommendClick">推荐歌单 ></div>
      <div @click="laoziBtn"></div>
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
    created() {
        this.getPersonalized()
    },
    data() {
        return {
           list:[],
           list2:[]
        }
    },
    methods: {
        async getPersonalized(){
            //只获取6组数据进行 渲染
            const { data:res } = await getPersonalized({ limit:12 })
            this.list = res.result
            this.list2 = this.list.slice(6,12)
            let list1 = this.list.slice(0,6)
            this.list = list1
            // console.log(this.list2);
        },

        recommendClick(){
            this.$router.push('/topplaylist')
        },
        laoziBtn(){
            this.list = this.list2
        }
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
        margin: 12px 0 0 0px;
        font-size: 14px;
        border-left: 1.5px solid red;
        padding: 0 0 0 6px;
    }
</style>