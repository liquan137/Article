import Vue from "vue";
import Router from "vue-router";

// 引入图文首页组件
import Home from "@/views/Home";

// 引入图文首页组件
import Index from "@/views/Index";

// // 引入图文预览组件
// import Preview from '@/components/preview/Preview';

// 引入刷新的组件
import Refresh from "@/views/Refresh";

// 引入编辑插件
import Editor from "@/views/home/word";

// 引入预览页面

import Preview from "@/views/home/preview";

// 文章预览页面
import ArticleView  from "@/views/home/articleView";

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
            path: '/home',
            name: 'Home',
            component: Home
        },
        // {
        //     path: "/home",
        //     name: "Index",
        //     component: Index
        // },
        {
            path: "/preview",
            name: "Preview",
            component: Preview
        },
        {
            path: "/refresh",
            name: "Refresh",
            component: Refresh
        },
        {
            path: "/editor/:index/:status",
            name: "word",
            component: Editor
        },
        {
            path: "/preview/:index/:status",
            name: "preview",
            component: Preview
        },
        {
            path: "/articleView",
            name: "articleView",
            component: ArticleView
        }
    ]
});
