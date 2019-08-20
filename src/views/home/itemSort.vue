<template>
    <div class="article-show" :style="touch">
        <SortableList lockAxis="y" v-model="items" :transitionDuration="250" :pressDelay="1000"
                      @sort-start="onSortStart($event)" @sort-end="onSortEnd($event)">
            <SortableItem v-for="(item, index) in data"
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
                    return [];
                }
            },
            deep: true
        },
        // 监听item 并赋值给data
        watch:{
            item(n){
                this.data = n;
            }
        },
        // 拖拽组件
        components: {
            SortableItem,
            SortableList
        },
        // 初始化数据
        data() {
            return {
                items: [],
                touch: 'touch-action: default;',
                data: []
            };
        },
        // 初始化
        created() {
            this.data = this.item;
        },
        methods: {
            // 排序开始
            onSortStart(event) {
                let dom = document.getElementsByClassName('addBtn');
                for (var i = 0; i < dom.length; i++) {
                    dom[i].style.opacity = 0;
                }
                this.touch = "touch-action: none;overflow: hidden;";
            },
            // 排序结束
            onSortEnd(event) {
                let dom = document.getElementsByClassName('addBtn');
                for (var i = 0; i < dom.length; i++) {
                    dom[i].style.opacity = 1;
                }
                var tempOption = this.$store.state.home.articleModule.content[event.oldIndex];
                this.$set(this.$store.state.home.articleModule.content, event.oldIndex, this.$store.state.home.articleModule.content[event.newIndex]);
                this.$set(this.$store.state.home.articleModule.content, event.newIndex, tempOption);
                this.touch = "touch-action: pan-y;overflow-y: auto;position: absolute;";
                this.$router.push({
                    name: "Home"
                });
                this.reload();

            },
            // 重载
            reload() {
                let that = this;
                let content = that.$store.state.home.articleModule.content;
                setTimeout(() => {
                    that.$store.state.home.articleModule.content = [];
                    for (var i in content) {
                        that.$store.state.home.articleModule.content.push(content[i]);
                    }
                    for (var x in content) {
                        that.$store.state.home.articleModule.content[x].order = x;
                    }
                }, 200);
                console.log(that.$store.state.home.articleModule.content);

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
    }
</style>
