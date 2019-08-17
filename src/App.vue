<template>
    <div id="app">
        <!-- <div v-if="!network">
            <h3>我没网了</h3>
            <div @click="onRefresh">刷新</div>
        </div> -->
        <!-- 缓存界面 start -->
        <keep-alive>
            <router-view />
        </keep-alive>
        <!-- 缓存界面 end -->
    </div>
</template>

<script type="text/ecmascript-6">
    // 引入vuex
    // import { mapState, mapGetters } from 'vuex';

    export default {
        name: 'App',
        // 初始化一些数据
        created () {
            // this.getList ();
        },
        // 方法中心
        methods: {
            // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
            /** onRefresh () {
                // 点击路由跳转到/refresh路由，然后再调回/index路由
                this.$router.replace ( '/refresh' );
            } */
            getList () {
                // 接口请求参数
                let params = {};
                this.$api.userList.getList ({
                    params
                })
                    .then ( ( res ) => {
                        console.log ( res.data );
                    })
                    .catch ( ( err ) => {
                        console.log ( `服务器请求失败${err}` );
                    });
            }
        },
        // 计算属性
        computed: {
            // ...mapState (["network"])
            /** ...mapGetters ({
                "network": "countNetwork"
            }) */
        }
    };
</script>

<style lang="css" rel="stylesheet/css">

</style>
