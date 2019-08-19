<template>
    <div>
        <div class="list-item">
            <div class="list-item-img">
                <div v-if="item.file.type == 'video'">
                    <van-icon name="video"/>
                </div>
                <div v-if="item.file.type == 'img'" class="list-item-img-box" @click="setImg(item.order)">
                    <div style="width: 100%;height: 100%" @click="setImg(item.order)">
                        <img v-if="item.file.detail[0] != ''" :src="item.file.detail[0]" alt="">
                    </div>
                </div>
                <div v-if="item.file.type == ''" class="list-item-img-box" @click="setImg(item.order)">

                    <p style="font-size: 0.75rem">上传图片</p>
                </div>
            </div>
            <div class="list-content" @click="$router.push({path: '/editor/'+ item.order.toString()+'/'+'update'})">
                {{ item.words}}
            </div>
            <div class="list-option">
                <van-icon name="cross" color="#c6c6c6" @click="handleDelete(item.order)"/>
                <van-icon name="exchange" color="#c6c6c6" class="change-order"/>
            </div>
        </div>
        <div>
            <SelectFile :index="item.order"></SelectFile>
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
            },
            index: {
                type: [Number, String],
                default: function () {
                    return 0;
                }
            }
        },
        components: {SelectFile},
        name: "SortableItem",
        created() {
            console.log(this.$store.state.home.articleModule);
        },
        data() {
            return {};
        },
        methods: {
            handleDelete(index) {
                let that = this;
                Dialog.confirm({
                    title: '温馨提示',
                    message: '确定删除此段？'
                }).then(() => {
                    let content = that.$store.state.home.articleModule.content;
                    for (var i in content) {
                        if (content[i].order == index) {
                            that.$store.state.home.articleModule.content.splice(i, 1);
                        }
                    }
                    // 重置排序
                    for (var x in content) {
                        that.$store.state.home.articleModule.content[x].order = x;
                    }
                }).catch(() => {
                    // on cancel
                });
            },
            setImg(d) {
                this.$router.push({path: '/preview/' + d.toString() + '/' + 'update'});
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

    .list-item-img-box {
        text-align: center;
        height: 4.5rem;
        overflow: hidden;
    }

    .list-item-img-box img {
        height: 100%;
        width: auto;
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
        transition: 0.2s;
    }

    .article-list-box .list-item {
        padding: 0.4rem 0.5rem;
        display: block;
        background: white;
        margin: 0.5rem 0;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0);
    }

    .list-item:active {
        box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);
    }
</style>
