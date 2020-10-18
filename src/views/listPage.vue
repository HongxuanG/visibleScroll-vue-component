<template>
    <div>
        <div class="list" ref="contentRef" @scroll="scrollList">
            <div class="scroll-bar" ref="scrollBar">
                <!-- 整个长列表的总长度 -->
            </div>
            <ul class="item" :style="{'transform':`translate3d(0,${offset}px,0)`}">
                <!-- 可视区的列表 -->
                <li v-for="(item,index) in showList" :key="index" :style="{'height': listItemHeight+'px','line-height': listItemHeight+'px'}">
                    {{item}}
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
let originList = []

    export default {
        data(){
            return{
                startIndex:0,
                listItemHeight: 30,
                endIndex:10,
                pageLimit:10,
                offset: 0
            }
        },
        computed:{
            showList(){
                console.log(111);
                return originList.slice(this.startIndex,this.endIndex)
            }
        },
        methods:{
            scrollList(e){
                let currentScrollTop = e.target.scrollTop
                this.startIndex = Math.floor(currentScrollTop / this.listItemOffsetHeight)
                this.endIndex = this.startIndex + this.pageLimit
                this.offset = this.startIndex * this.listItemOffsetHeight
            }
        },
        created(){
            for(let i = 1,length = 2000;i<=length;i++){
                originList.push('item'+i)
            }
            
        },
        mounted(){
            let listDom = document.getElementsByTagName('li')[0]
            this.listItemOffsetHeight = listDom.offsetHeight
            this.pageLimit = Math.ceil(document.body.offsetHeight / this.listItemOffsetHeight)
            console.log('document.offsetHeight: ',document.body.offsetHeight);
            console.log('this.pageLimit: ', this.pageLimit);
            
            this.$refs.scrollBar.style.height = this.listItemOffsetHeight * originList.length + 'px'
            this.$refs.contentRef.style.height = this.listItemOffsetHeight * this.pageLimit + 'px'
            this.endIndex = this.pageLimit
        }
    }
</script>

<style lang="scss" scoped>
.list{
    overflow: auto;
    position: relative;
}
ul.item{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transform: translate3d(0,0,0);
    padding: 0;
    margin: 0;
    list-style: none;
    li{
        border-top: 1px solid red;
    }
}
</style>