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
                show: false,
                coverImg: ''
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
                // 先把封面图片预览先放入数据中，如果上传成功就替换为url
                this.coverImg = file.content;
                // 注意，我们这里没有使用form表单提交文件，所以需要用new FormData来进行提交
                let fd = new FormData();

                // 判断是否是多图上传 多图则循环添加进去
                if (file && file.length) {
                    file.forEach(item => {
                        // 第一个参数字符串跟后端商量确定好的，第二个根据对象属性来找到file
                        fd.append("images[]", item.file);
                    });
                    // 单图上传
                } else {
                    fd.append("images[]", file.file);
                }

                // 设置发送的请求头类型
                let config = {
                    "onUploadProgress": ev => {
                        let completeProgress = Math.round(100 * ev.loaded / ev.total);
                        // 提交到vuex里面
                        // this.$store.commit('updateUploadProgress', {
                        //     "uploadProgress": completeProgress
                        // });
                    },
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                };

                // 请求上传图片接口
                this.$api.multiplexUpload.getBannerPic(fd, config)
                    .then(response => {
                        let res = response.data;
                        if (res.code == 0) {
                            let resData = res.data.map((item) => {
                                item.introduce = '';
                                return item;
                            });
                            // 这里应该把url赋值给当前一个data里的数组变量，存入vuex，共享给预览组件
                            for ( let i = 0, len = resData.length; i < len; i++ ) {
                                // 获取实际图片的宽高
                                this.coverImg = resData[i].url;
                            }
                        }
                    })
                    .catch(err => {
                        Toast('网络异常，图片上传失败！');
                    });
            },
            handleSubmit() {
                if (!this.$store.state.home.articleModule.title) {
                    Toast('文章的大标题不允许为空！');
                    return false;
                } else if (!this.$store.state.home.articleModule.description) {
                    Toast('请添加文章摘要！');
                    return false;
                } else if (!this.$store.state.home.articleModule.coverImg) {
                    Toast('请添加文章封面图片！');
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
            },
            coverImg(n) {
                this.$store.state.home.articleModule.coverImg = n;
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
