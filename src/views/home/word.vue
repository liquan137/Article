<template>
    <div id="index">
        <header class="myHeader">
            <div class="center clearFix">
                <em class="fl" @click="backHistory()">我是返回按钮</em>
                <h1 class="fl">编辑</h1>
                <a
                    class="fr"
                    href="javascript:;"
                    @click="handleSubmit"
                >
                    完成
                </a>
            </div>
        </header>
        <vue-html5-editor :content="content" :height="500"></vue-html5-editor>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueHtml5Editor from 'vue-html5-editor';
    // 引入首页头部组件
    import MyHeader from '../index/MyHeader';
    import {Dialog, Toast} from 'vant';

    Vue.use(Toast);
    Vue.use(VueHtml5Editor, {
        // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
        // global component name
        name: "vue-html5-editor",
        // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
        // if set true,will append module name to toolbar after icon
        showModuleName: false,
        // 自定义各个图标的class，默认使用的是font-awesome提供的图标
        // custom icon class of built-in modules,default using font-awesome
        icons: {
            text: "iconfont icon-wenzixiaoguo",
            color: "iconfont icon-tiaosepan",
            font: "iconfont icon-zihao",
            align: "iconfont icon-youduiqi",
            list: "iconfont icon-icon_workmore",
            link: "iconfont icon-icon_link",
            unlink: "fa fa-chain-broken",
            tabulation: "fa fa-table",
            image: "fa fa-file-image-o",
            hr: "fa fa-minus",
            eraser: "fa fa-eraser",
            undo: "fa-undo fa",
            "full-screen": "fa fa-arrows-alt",
            info: "fa fa-info"
        },
        // 配置图片模块
        // config image module
        image: {
            // 文件最大体积，单位字节  max file size
            sizeLimit: 512 * 1024,
            // 上传参数,默认把图片转为base64而不上传
            // upload config,default null and convert image to base64
            upload: {
                url: null,
                headers: {},
                params: {},
                fieldName: {}
            },
            // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
            // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
            // set null to disable compression
            compress: {
                width: 1600,
                height: 1600,
                quality: 80
            },
            // 响应数据处理,最终返回图片链接
            // handle response data，return image url
            uploadHandler(responseText) {
                //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
                var json = JSON.parse(responseText);
                if (!json.ok) {
                    alert(json.msg);
                } else {
                    return json.data;
                }
            }
        },
        // 语言，内建的有英文（en-us）和中文（zh-cn）
        //default en-us, en-us and zh-cn are built-in
        language: "zh-cn",
        // 自定义语言
        i18n: {
            //specify your language here
            "zh-cn": {
                "align": "对齐方式",
                "image": "图片",
                "list": "列表",
                "link": "链接",
                "unlink": "去除链接",
                "table": "表格",
                "font": "文字",
                "full screen": "全屏",
                "text": "排版",
                "eraser": "格式清除",
                "info": "关于",
                "color": "颜色",
                "please enter a url": "请输入地址",
                "create link": "创建链接",
                "bold": "加粗",
                "italic": "倾斜",
                "underline": "下划线",
                "strike through": "删除线",
                "subscript": "上标",
                "superscript": "下标",
                "heading": "标题",
                "font name": "字体",
                "font size": "文字大小",
                "left justify": "左对齐",
                "center justify": "居中",
                "right justify": "右对齐",
                "ordered list": "有序列表",
                "unordered list": "无序列表",
                "fore color": "前景色",
                "background color": "背景色",
                "row count": "行数",
                "column count": "列数",
                "save": "确定",
                "upload": "上传",
                "progress": "进度",
                "unknown": "未知",
                "please wait": "请稍等",
                "error": "错误",
                "abort": "中断",
                "reset": "重置"
            }
        },
        // 隐藏不想要显示出来的模块
        // the modules you don't want
        hiddenModules: [],
        // 自定义要显示的模块，并控制顺序
        // keep only the modules you want and customize the order.
        // can be used with hiddenModules together
        visibleModules: [
            "text",
            "font",
            "align",
            "list",
            "link",
            "color"
        ],
        // 扩展模块，具体可以参考examples或查看源码
        // extended modules
        modules: {
            //omit,reference to source code of build-in modules
        }
    });
    export default {
        name: "word",
        components: {MyHeader},
        // props:{index},
        data() {
            return {
                content: '',
                toggle: false
            };
        },
        activated() {
            var param = this.$route.params;
            console.log(this.$store.state.home.articleModule.content[Number(param.index)]);
            if (param.status == 'add') {
                document.getElementsByClassName('content')[0].innerHTML = '';
            } else {
                document.getElementsByClassName('content')[0].innerHTML = this.$store.state.home.articleModule.content[Number(param.index)].html;
            }
        },
        methods: {
            handleSubmit() {
                this.content = document.getElementsByClassName('content')[0].innerHTML;
                console.log();
                if (this.content == '') {
                    Dialog.alert({
                        title: '温馨提示',
                        message: '请输入段落正文，后再提交！'
                    }).then(() => {
                        // on close
                    });
                } else {
                    var param = this.$route.params;
                    if (param.status == 'add') {
                        console.log(this.$store.state.home.articleModule.content)
                        console.log('位置：',param.index)
                        this.$store.state.home.articleModule.content.splice(Number(param.index) + 1,0,{
                            order: param.index + 1,
                            file: {
                                type: 'img',
                                detail: []
                            },
                            words: this.fitter(this.content),
                            html: this.content
                        });
                    } else {
                        let content = this.$store.state.home.articleModule.content;
                        for (var i in content) {
                            if (content[i].order == param.index) {
                                console.log(content[i].order);
                                this.$store.state.home.articleModule.content[i].html = this.content;
                                this.$store.state.home.articleModule.content[i].words = this.fitter(this.content);
                            }
                        }
                        console.log();
                    }

                    Toast.success('添加完成');
                    setTimeout(() => {
                        this.$router.push({
                            name: "Home"
                        });
                    }, 1000);
                }
            },
            backHistory() {
                Dialog.confirm({
                    title: '温馨提示',
                    message: '是否放弃编辑？'
                }).then(() => {
                    this.$router.go(-1);
                }).catch(() => {
                    // on cancel
                });
            },
            fitter(msg){
                let content = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
                content = content.replace(/[|]*\n/, ''); //去除行尾空格
                content = content.replace(/&npsp;/ig, ''); //去掉npsp
                content = content.slice(0,38);
                return content;
            }

        }
    };

</script>

<style lang="css" rel="stylesheet/css">
    @import '../../../static/css/index.css';

    #index .myHeader .center a {
        background: #2e9cfa !important;
    }

</style>
<style lang="scss">
    .vue-html5-editor {
        .content {
            position: absolute;
            width: 100%;
            min-height: calc(100% - (2.3466666667rem * 2)) !important;
        }

        .toolbar > ul > li {
            width: calc(100% / 6);
            padding: 5px 10px;
        }

        .toolbar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
        }

        .toolbar > .dashboard {
            background-color: inherit;
            border-bottom: 1px solid #ddd;
            padding: 10px;
            position: absolute;
            bottom: 50px;
            top: auto;
            right: auto;
            width: 84%;
            left: calc(50% - 42%);
            border-radius: 15px;
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
            transition: 0.2s;
        }

        .toolbar::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 28px;
            text-indent: -999999em;
            margin: -0.64rem 0 0 -0.64rem;
            z-index: 101;
            width: 0px;
            height: 0px;
            border: 0.64rem solid white;
            border-bottom-color: transparent;
            border-left-color: transparent;
            border-right-color: transparent;
            display: none;
        }
    }
</style>
