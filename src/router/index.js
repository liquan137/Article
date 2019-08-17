import Vue from "vue";
import Router from "vue-router";

// 引入图文首页组件
import Home from "@/views/Home";

// 引入图文首页组件
import Index from "@/views/Index";

// 引入图文预览组件
import Preview from '@/components/preview/Preview';

// 引入刷新的组件
import Refresh from "@/views/Refresh";

// 使用路由
Vue.use ( Router );

// 导出路由
export default new Router ({
    mode: "hash",
    routes: [
        /** {
            path: "*",
            redirect: { path: "/home" }
        },
        {
            path: "/",
            redirect: "/home"
        }, */
        {
            path: '/',
            redirect: "/home"
        },
        {
            path: '/article',
            name: 'Home',
            component: Home
        },
        {
            path: "/home",
            name: "Index",
            component: Index
        },
        {
            path: "/preview",
            name: "Preview",
            component: Preview
        },
        {
            path: "/refresh",
            name: "Refresh",
            component: Refresh
        }
    ]
});
