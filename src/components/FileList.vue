<template>
    <div id="fileList">
        <div
            class="listContent"
            v-for="(item, index) in fileList"
            :key="index"
        >
            <dl class="clearFix">
                <dt>
                    <a
                        href="javascript:;"
                        @click="previewBigPicHandle(item)"
                    >
                        <img
                            :src="item.url"
                            alt="我是美女"
                            title="我是美女"
                        />
                    </a>
                </dt>
                <dd>
                    <textarea
                        name="title"
                        id="title"
                        placeholder="我是美女"
                        v-model="item.introduce"
                    >
                    </textarea>
                </dd>
            </dl>
            <div class="btn">
                <a
                    href="javascript:;"
                    @click="delImgHandle(index)"
                >
                    删除
                </a>
                <a
                    href="javascript:;"
                >
                    拖拽可以调整图片或视频顺序
                </a>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    // 引入vuex组件库
    import { mapGetters, mapMutations } from 'vuex';

    // 引入ImagePreview、Dialog组件
    import { ImagePreview, Dialog } from 'vant';

    export default {
        name: "FileList",
        // 监听属性的变化
        watch: {
            // 监视title的变化
            "fileList": {
                "handler": function ( arr ) {
                    this.changeArticleContent ({
                        "articleContent": arr[0].introduce
                    });
                },
                "deep": true
            }
        },
        // 初始化一些数据
        created () {

        },
        // 更新完成
        updated () {

        },
        // 实例挂载完成
        mounted () {

        },
        // 数据中心
        data () {
            return {
                content: ''
            };
        },
        // 方法中心
        methods: {
            // 更新articleContent文章内容
            ...mapMutations ({
                "changeArticleContent": "updateArticleContent"
            }),
            // 点击小图预览大图，并且支持多指放大缩小
            previewBigPicHandle ( item ) {
                // 得到我点击要预览的图片
                let myPreviewPic = item.url;
                ImagePreview ([
                    myPreviewPic
                ]);
            },
            // 在列表页点击删除按钮，将这条数据删除掉
            delImgHandle ( index ) {
                // 请求后台接口实现真正的删除操作 - operator
                // 获取到要删除图片的索引
                // alert ( index );
                Dialog.confirm ({
                    title: '删除图片',
                    message: '您确定删除这张图片吗？'
                }).then ( () => {
                    // on confirm
                    this.fileList.splice ( index, 1 );
                }).catch ( () => {
                    // on close
                });
            }
        },
        // 计算属性
        computed: {
            // 还是比较推荐用mapGetters的写法
            ...mapGetters ({
                "fileList": "countFileList"
                // "articleContent": "countArticleContent"
            })
        },
        // 组件注册
        components: {
            [Dialog.Component.name]: Dialog.Component,
            [ImagePreview.name]: ImagePreview
        }
    };
</script>

<style lang="css" rel="stylesheet/css">
    @import '../../static/css/fileList.css';
</style>
