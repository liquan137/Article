<template>
    <div>
        <header class="myHeader">
            <div class="center clearFix">
                <em class="fl">我是返回按钮</em>
                <h1 class="fl">编辑</h1>
                <a
                    class="fr"
                    href="javascript:;"
                    @click="previewHandle"
                >
                    预览
                </a>
            </div>
        </header>
        <van-popup
            v-model="show"
            title="相关设置"
            :round="true"
        >
            <div class="description cell-g">
                <p>请输入文章摘要（*必填）</p>
                <van-field
                    v-model="description"
                    type="textarea"
                    placeholder="请输入文章摘要"
                    rows="4"
                    autosize
                />
            </div>
            <div class="cell-g">
                <p>请上传封面（*必填）</p>
                <div class="cell-uploader">
                    <van-uploader :after-read="afterRead" v-model="fileImg" :max-count="1" multiple/>
                </div>
            </div>
            <div class="cell-g">
                <van-button block type="danger" @click="handleSubmit()">点击预览</van-button>
            </div>
        </van-popup>
    </div>

</template>

<script type="text/ecmascript-6">
    // 引入vuex库
    import {mapGetters} from 'vuex';

    import Vue from 'vue';
    // 引入vant相关控件
    import {Button, Icon, Field, Uploader, Toast, Popup} from 'vant';

    Vue.use(Popup);
    Vue.use(Field);
    Vue.use(Button);
    Vue.use(Icon);
    Vue.use(Uploader);
    export default {
        name: "myHeader",
        // 初始化一些数据
        created() {

        },
        // 更新完成
        updated() {

        },
        // 实例挂载完成
        mounted() {

        },
        // 数据中心
        data() {
            return {
                // 文章摘要
                description: '',
                // 模拟编辑好的文章数据
                fileImg: [],
                show: false
            };
        },
        // 方法中心
        methods: {
            // 点击预览按钮要做的事
            previewHandle() {
                this.show = true;
                return false;
            },
            afterRead(file) {

            },
            handleSubmit() {
                if (!this.$store.state.home.articleModule.title) {
                    Toast('文章的大标题不允许为空！');
                    return false;
                } else if (!this.$store.state.home.articleModule.description) {
                    Toast('请添加文章摘要！');
                    return false;
                } else if (!this.$store.state.home.articleModule.content.length) {
                    Toast('请至少添加一篇文章才能预览！');
                    return false;
                } else {
                    // Toast ( '恭喜，您输入了标题哈！' );
                    // 通过push跳转到预览组件
                    this.$router.push({
                        name: "articleView"
                    });
                }
            }

        },
        // 计算属性
        computed: {
            // 还是比较推荐用mapGetters的写法
            ...mapGetters({
                "fileList": "countFileList",
                "articleTitle": "countArticleTitle"
            })
        },
        // 组件注册
        components: {
            // 按需加载组件
            [Toast.name]: Toast
        },
        watch: {
            description(n) {
                this.$store.state.home.articleModule.description = n;
            }
        }
    };
</script>

<style lang="css" rel="stylesheet/css">

</style>
<style scoped>

</style>
<style lang="scss">
    .van-popup {
        width: 80%;
        background: #f7f7f7;

        .cell-g {
            padding: 15px;

            p {
                font-size: 0.85rem;
                line-height: 1.4rem;
                margin: 0.4rem 0;
            }

            .cell-uploader {
                text-align: center;
            }
        }
    }
</style>
