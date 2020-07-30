<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Scroll",
    props:{
        probeType:{
            type:Number,
            default:3
        },
        //上拉加载更多
        pullUpLoad:{
            type:Boolean,
            default:false
        },
        //下拉加载更多
        pullDownLoad:{
            type:Boolean,
            default:false
        },
        scrollX:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        //1.创建BScroll 对象
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad,
                pullDownLoad: this.pullDownLoad,
                pullDownRefresh: {
                    threshold: 30, // 下拉距离超过30px触发pullingDown事件
                    stop: 0 // 回弹停留在距离顶部0px的位置
                },
            })
            //2.监听滚动的位置
            this.scroll.on('scroll',(position) => {
                // console.log(position);
                this.$emit('scroll',position)
            })
            //3.监听scroll滚动到底部
            if(this.pullUpLoad){
                this.scroll.on('pullingUp',() =>{
                    //上拉加载更多
                    // console.log('shangla');
                    this.$emit('pullingUp')
                })
            }
            if(this.pullDownLoad){
                this.scroll.on('pullingDown',() =>{
                    //上拉加载更多
                    console.log('xiala');
                    this.$store.dispatch('isLoad')
                })
            }
        });
        
    },
    methods: {
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        },
        // refresh() {
        //     this.scroll && this.scroll.refresh()
        //     console.log('hi');
        // },
         scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
        
    },
}
</script>

<style scoped>
    
</style>