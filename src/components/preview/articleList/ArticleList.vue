<template>
    <div class="articleC">
        <div
            v-for="(item, index) in fileList"
            :key="index"
            class="articleCont"
        >
            <p>
                {{ item.introduce }}
            </p>
            <img
                :src="item.url"
                alt="用户发表图片"
                title="用户发表图片"
            />
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    // 引入vuex库
    import { mapGetters } from 'vuex';

    export default {
        // 组件名称
        name: "ArticleList",
        // 数据中心
        data () {
            return {

            };
        },
        // 方法中心
        methods: {

        },
        // 计算属性
        computed: {
            // 还是比较推荐用mapGetters的写法
            ...mapGetters ({
                "fileList": "countFileList"
            })
        },
        // 组件注册
        components: {

        }
    };
</script>

<style lang="css" rel="stylesheet/css">

</style>
