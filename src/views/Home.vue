<template>
    <div class="home">
        <div class="title">
            超长数据列表展示：
        </div>
        <div class="decoration">
            其实原因很简单，因为子组件内的虚拟dom是通过父组件通信过来的数据产生的，大概意思就是父组件给子组件一个data列表数据，子组件通过v-for将data数据遍历出来，然后你在created/mounted中通过this.$refs.xxx来获取这个列表dom，很难获取到，因为这个created/mounted执行的时候，子组件内还没有数据，所以this.$refs.xxx无法获取dom，应该应该用watch来监听data，当data接受到父组件传来的数据，再在this.$nextTick内获取this.$refs.xxx
        </div>
        <div class="mylist">
            <visibleScroll :originList='list' :listItemHeight='listItemOffsetHeight' :contentHeight='300'>
                <template v-slot='slotProp'>
                    <div class="item" ref="itemRef">{{slotProp.items}}</div>
                </template>
            </visibleScroll>
        </div>
    </div>
</template>

<script>
import visibleScroll from '@/components/visibleScroll.vue'
    export default {
        data(){
            return{
                list:[],
                listItemOffsetHeight:0
            }
        },
        components:{
            visibleScroll
        },
        created(){
            for(let i=1,length=2000;i<=length;i++){
                this.list.push('item'+i)
            }
            let item = document.getElementsByClassName('item')[0]
            this.listItemOffsetHeight = item.offsetHeight
        },
        mounted(){
            console.log(this.$refs.itemRef.offsetHeight)
        }
    }
</script>

<style lang="scss" scoped>
.home{
    background-color: #f0f0f0;
    .title{
        font-size: 30px;
        color: red;
    }
    .decoration{
        width: 100%;
        text-decoration: underline;
        background-color: #ccc;
    }
    .mylist{
        overflow: hidden;
        .item{
            width: 100vw;
            height: 30px;
            border-top: 1px solid skyblue;
            background-color: pink;
        }
    }
}
</style>