<template>
    <div class="article-show">
        <SortableList lockAxis="y" v-model="items" :transitionDuration="250" :pressDelay="300">
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
                items: []
            };
        },
        // 初始化
        created() {
            this.items = this.item;
        }
    };
</script>

<style scoped>

</style>
