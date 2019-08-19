<template>
    <div class="article-show" :style="touch">
        <SortableList  lockAxis="y" v-model="items" :transitionDuration="250" :pressDelay="1000"
                      @sort-start="onSortStart($event)" @sort-end="onSortEnd($event)" >
            <SortableItem v-for="(item, index) in items"
                          :index="index" :key="index" :item="item"/>
        </SortableList>
    </div>
</template>

<script>
    import {ContainerMixin, ElementMixin} from 'vue-slicksort';
    import SortableList from './slicksort/SortableList';
    import SortableItem from './slicksort/SortableItem';


    export default {
        name: "itemSort",
        props: {
            item: {
                type: Array,
                default: function () {
                    return {};
                }
            }
        },
        components: {
            SortableItem,
            SortableList
        },

        data() {
            return {
                items: [],
                touch: 'touch-action: default;'
            };
        },
        // 初始化
        created() {
            this.items = this.item;
        },
        methods: {
            onSortStart(event) {
                console.log('开始滑动');
                console.log(event);
                let dom = document.getElementsByClassName('addBtn');
                for (var i = 0;i<dom.length;i++){
                    dom[i].style.opacity = 0;
                }
                this.touch = "touch-action: none;overflow: hidden;";
            },
            onSortEnd(event) {
                console.log('滑动结束');
                console.log(event);
                let dom = document.getElementsByClassName('addBtn');
                for (var i = 0;i<dom.length;i++){
                    dom[i].style.opacity = 1;
                }
                console.log(event.newIndex,event.oldIndex);
                var tempOption = this.$store.state.home.articleModule.content[event.oldIndex];
                this.$set(this.$store.state.home.articleModule.content, event.oldIndex, this.$store.state.home.articleModule.content[event.newIndex]);
                this.$set(this.$store.state.home.articleModule.content, event.newIndex, tempOption);
                this.touch = "touch-action: pan-y;overflow-y: auto;position: absolute;";
                console.log(this.$store.state.home.articleModule);
            }

        }
    };
</script>

<style scoped>
    .article-show {
        height: calc(100% - (2.3466666667rem + 58px + 0.96rem));
        position: absolute;
        width: 100%;
        z-index: 101;
        overflow-y: auto;
        /*background: #f4f5f6;*/
    }
</style>
