<template>
    <div id="index">
        <MyHeader></MyHeader>
        <section class="myContent">
            <div>
                <div class="item_box title-box">
                    <div class="title">
                        <input v-model="title" type="text" placeholder="点击输入文章标题">
                    </div>
                </div>
            </div>
            <SortItem :item="articleItem.content" v-show="articleItem.content.length != 0"></SortItem>
            <div v-show="articleItem.content.length == 0">
                <SelectFile :index="0"></SelectFile>
            </div>
        </section>

    </div>
</template>

<script>
    // 引入vuex
    import {mapGetters} from 'vuex';

    // 引入首页头部组件
    import MyHeader from './index/MyHeader';
    // 引入排序可拖拽列表控件
    import SortItem from './home/itemSort';
    // 引入图片、视频、文字上传按钮整个控件
    import SelectFile from './home/selectFile';

    import Vue from 'vue';
    // 引入vant相关控件
    import {Button, Icon, Field, Uploader} from 'vant';

    Vue.use(Field);
    Vue.use(Button);
    Vue.use(Icon);
    Vue.use(Uploader);
    export default {
        scrollToTop: true,
        name: "home",

        // 引入上述自定义组件
        components: {MyHeader, SortItem, SelectFile},

        // 计算属性
        computed: {
            ...mapGetters({
                "currentProgress": "countUploadProgress"
            })
        },

        mounted () {
            console.log(this.$store.state.home.articleModule.content);
            this.articleItem = this.$store.state.home.articleModule;
        },

        watch: {
            title(n) {
                this.$store.state.home.articleModule.title = n;
            },
            description(n) {
                this.$store.state.home.articleModule.description = n;
            }
        },

        data() {
            return {
                // 绑定的文章按钮标题
                title: '',
                // 绑定的图片、文字、视频按钮显示状态
                selectStatus: true,
                // 绑定的图片、文字、视频按钮默认的css样式
                selectShow: 'display: inline-block;',
                articleItem: this.$store.state.home.articleModule
            };
        },

        methods: {

        },
        // 开启了路由缓存，所以使用此刷新
        activated (){
            this.articleItem = this.$store.state.home.articleModule;
        }
    };
</script>

<style scoped>
    .item-select-box {
        text-align: center;
    }
</style>
<style lang="css" rel="stylesheet/css">
    @import '../../static/css/index.css';
</style>
<style lang="scss">
    .van-uploader {
        .van-uploader__wrapper {
            .van-uploader__preview {
                .van-uploader__preview-image {
                    width: 7.5rem;
                    height: 7.5rem;
                }
            }

            .van-uploader__upload {
                width: 7.5rem;
                height: 7.5rem;
            }
        }
    }
</style>
