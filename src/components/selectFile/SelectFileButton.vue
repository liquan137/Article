<template>
    <!-- 添加各种类型文件 start -->
    <button
        @click='addHandle( { "isShowPopUp": !isShowPopUp } )'
    >
        添加文字 / 文字 / 视频
    </button>
    <!-- 添加各种类型文件 end -->
</template>

<script type="text/ecmascript-6">
    // 引入vuex组件库
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: "SelectFileButton",
        // 接收父组件传递过来的数据
        /** props: {
            "isShowPopUp": {
                type: Boolean
            }
        }, */
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

            };
        },
        // 方法中心
        methods: {
            // 父组件里用.sync同步的更新isShowPopUp值的变化
            /** addHandle () {
                this.$emit ( 'update:isShowPopUp', !this.switchPopUpStatus );
            } */
            ...mapMutations ({
                "addHandle": "updateIsShowPopUp"
            })
        },
        // 计算属性
        computed: {
            // 初始化从父组件传递过来的isShowPopUp的值，要在本组件methods当中去使用
            /** "switchPopUpStatus": {
                get () {
                    return this.isShowPopUp;
                },
                set ( val ) {
                    // console.log ( val );
                }
            } */
            // 还是比较推荐用mapGetters的写法
            ...mapGetters ({
                "isShowPopUp": "countIsShowPopUp"
            })
        },
        // 组件注册
        components: {

        }
    };
</script>

<style lang="css" rel="stylesheet/css">

</style>
