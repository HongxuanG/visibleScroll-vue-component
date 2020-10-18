<template>
    <div>
        <div class="list" :style="{'height':contentHeight+'px'}" ref="contentRef" @scroll="scrollList">
            <div class="scroll-bar" ref="scrollBar">
                <!-- 整个长列表的总长度 -->
            </div>
            <div class="scroll-list" :style="{'transform':`translate3d(0,${offset}px,0)`}">
                <!-- 可视区的列表 -->
                <div class="item" v-for="(item,index) in showList" :key="index">
                    <slot :items='item'></slot>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

    export default {
        data(){
            return{
                startIndex:0,
                endIndex:10,
                offset: 0
            }
        },
        props:{
            originList:{
                type:Array,
                default:()=>[]
            },
            listItemHeight:{
                type:Number,
                default:0
            },
            contentHeight:{
                type:Number,
                default:0
            }
        },
        computed:{
            showList(){
                console.log('startIndex',this.startIndex)
                console.log('endIndex',this.endIndex)
                return this.originList.slice(this.startIndex,this.endIndex)
            }
        },
        methods:{
            scrollList(e){
                let currentScrollTop = e.target.scrollTop
                this.startIndex = Math.floor(currentScrollTop / this.listItemHeight)
                this.endIndex = this.startIndex + this.pageLimit
                this.offset = this.startIndex * this.listItemHeight
            }
        },
        created(){
            
            
        },
        mounted(){
            console.log(this.contentHeight)
            console.log(this.listItemHeight)
            this.pageLimit = Math.ceil(this.contentHeight / this.listItemHeight)
            console.log(this.pageLimit)
            this.$refs.scrollBar.style.height = this.listItemHeight * this.originList.length + 'px'
            this.endIndex = this.pageLimit
        }
    }
</script>

<style lang="scss" scoped>
.list{
    overflow: auto;
    position: relative;
}
.scroll-list{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transform: translate3d(0,0,0);
    padding: 0;
    margin: 0;
    list-style: none;
}
</style>