<template>
    <div id="selectFile">
        <!-- 选择文件类型的框组件 start -->
        <transition
            name="custom-classes-transition"
            enter-active-class="animated zoomInRight"
            leave-active-class="animated zoomOutLeft"
        >
            <ul class="myRealCont clearFix">
                <li
                    @click='selectPicHandle( { "isShowPopUp": false } )'
                >
                    <!-- 图片上传 start -->
                    <!-- accept="image/jpg, image/jpeg, image/png, image/bmp, image/gif" -->
                    <!-- v-on:oversize="oversize" -->
                    <van-uploader
                        :after-read="afterRead"
                        accept="image/*"
                        multiple
                    >
                    </van-uploader>
                    <!-- 图片上传 end -->
                    <a href="javascript:;">
                        图片
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        文字
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        视频
                    </a>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    // 引入animate.css库
    import 'animate.css';

    // 引入upload的样式
    // import 'vant/lib/uploader/style';

    // 引入Toast的样式
    // import 'vant/lib/toast/style';

    // 引入vuex组件库
    import { mapGetters, mapMutations } from 'vuex';

    // Uploader、Toast组件
    import { Uploader, Toast } from 'vant';

    // 引入文件列表组件
    import FileList from '../FileList';

    export default {
        name: "SelectFile",
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
                // 选择的文件列表
                fileList: []
            };
        },
        // 方法中心
        methods: {
            ...mapMutations ({
                "selectPicHandle": "updateIsShowPopUp"
            }),
            // 上传之后拿到用户选择的文件
            afterRead ( file ) {
				// 注意，这里选择单个文件的时候file是一个object ---> json
                // console.log ( typeof file );

				// 注意，我们这里没有使用form表单提交文件，所以需要用new FormData来进行提交
                let fd = new FormData ();

                // 判断是否是多图上传 多图则循环添加进去
                if ( file && file.length ) {
                    file.forEach ( item => {
                        // 第一个参数字符串跟后端商量确定好的，第二个根据对象属性来找到file
                        fd.append ( "images[]", item.file );
                    });
                // 单图上传
                } else {
                    fd.append ( "images[]", file.file );
                }

                // 设置发送的请求头类型
                let config = {
                    "onUploadProgress": ev => {
                        let completeProgress = Math.round ( 100 * ev.loaded / ev.total );
                        // 提交到vuex里面
                        this.$store.commit ( 'updateUploadProgress', {
                            "uploadProgress": completeProgress
                        });
                    },
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                };

                // 请求上传图片接口
                this.$api.multiplexUpload.getBannerPic ( fd, config )
                    .then ( response => {
                        let res = response.data;
                        if ( res.code == 0 ) {
                            // 打印看看结果对不对
                            // console.log ( res.data );

                            let resData = res.data.map ( ( item ) => {
                                item.introduce = '';
                                return item;
                            });

                            // 这里上传到指定的图片服务器，成功后会返回图片的url
                            this.fileList = [...this.fileList, ...resData];

                            // 这里应该把url赋值给当前一个data里的数组变量，存入vuex，共享给预览组件
                            /** for ( let i = 0, len = this.fileList.length; i < len; i++ ) {
                                // 获取实际图片的宽高
                                this.checkPicUrl ( this.fileList[i].url );
                            } */

                            // 成功读取文件(图片、文本、视频)之后，commit一个mutations，从而来触发改变state的状态
                            this.$store.commit ( "updateFileList", {
                                "fileList": this.fileList
                            });
                        }
                    })
                    .catch ( err => {
                        console.log ( `服务器请求失败${err}` );
                        Toast ( '网络异常，图片上传失败！' );
                    });
            }
            // 前端提示用户上传的图片过大
            /** oversize () {
                Toast ( '亲，您上传的图片太大了，请重新上传！' );
            }, */
            // 获取图片真实的宽高
            /** checkPicUrl ( url ) {
                let oImg = new Image ();
                oImg.src = url;
                oImg.onerror = function () {
                    Toast ( '图片加载失败，请检查url是否正确！' );
                    return false;
                };

                // 如果图片完成
                if ( oImg.complete ) {
                    console.log ( `宽：${oImg.width}，高：${oImg.height}` );
                } else {
                    oImg.onload = function () {
                        console.log ( `宽：${oImg.width}，高：${oImg.height}` );
                        // 避免重复加载
                        oImg.onload = null;
                    };
                }
            } */
        },
        // 计算属性
        computed: {
            // 还是比较推荐用mapGetters的写法
            ...mapGetters ({
                "isShowPopUp": "countIsShowPopUp"
            })
        },
        // 组件注册
        components: {
            // 按需加载，不用全局加载
            [Uploader.name]: Uploader,
            [Toast.name]: Toast,
            FileList
        }
    };
</script>

<style lang="css" rel="stylesheet/css">

</style>
