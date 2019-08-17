<template>
    <div>
        <div class="list-item">
            <div class="list-item-img">
                <div v-if="item.file.type == 'video'">
                    <van-icon name="video"/>
                </div>
                <div v-if="item.file.type == 'img'">img</div>
            </div>
            <div class="list-content">
                富强、民主、和谐、爱国、这是一段文字！
            </div>
            <div class="list-option">
                <van-icon name="cross" color="#c6c6c6" @click="handleDelete()"/>
                <van-icon name="exchange" color="#c6c6c6" class="change-order"/>
            </div>
        </div>
                <div>
                    <SelectFile></SelectFile>
                </div>
    </div>
</template>

<script>
    import {ElementMixin} from 'vue-slicksort';
    import {Dialog} from 'vant';
    import SelectFile from '../selectFile';

    export default {
        mixins: [ElementMixin],
        props: {
            item: {
                type: Object,
                default: function () {
                    return [];
                }
            }
        },
        components: {SelectFile},
        name: "SortableItem",
        created() {

        },
        data() {
            return {};
        },
        methods: {
            handleDelete() {
                Dialog.confirm({
                    title: '温馨提示',
                    message: '确定删除此段？'
                }).then(() => {
                    // on confirm
                }).catch(() => {
                    // on cancel
                });
            }
        }
    };
</script>

<style scoped>
    .list-item .list-item-img {
        width: 4.5rem;
        height: 4.5rem;
        text-align: center;
        line-height: 4.5rem;
        background: #eee;
        font-size: 0.8rem;
        display: inline-block;
        float: left;
    }

    .list-item .list-content {
        display: inline-block;
        float: left;
        font-size: 0.75rem;
        color: #c4c4c4;
        width: calc(100% - (4.5rem + 1rem));
        padding: 0 0.4rem;
    }

    .list-item .list-option {
        display: inline-block;
        float: left;
        width: 1rem;
        height: 4.5rem;
        position: relative;
    }

    .list-item .list-option i:hover {
        text-shadow: 1px 1px 4px #777;
    }

    .list-option .change-order {
        transform: rotate(90deg);
        position: absolute;
        bottom: 0;
    }

    .list-item::after {
        clear: both;
        display: table;
        content: '';
    }

    .list-item {
        padding: 0.4rem 0.5rem;
        display: block;
        background: white;
        margin: 0.5rem 0;
        box-shadow: 1px 1px 8px rgba(19, 133, 242, 0.2);
    }

    .article-list-box .list-item {
        padding: 0.4rem 0.5rem;
        display: block;
        background: white;
        margin: 0.5rem 0;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0);
    }
</style>
