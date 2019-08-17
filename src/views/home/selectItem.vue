<template>
    <div class="triangle" :style="selectStyle">
        <ul  ref="selectStyle" class="select-ul">
            <li class="selectItem">
                <van-button type="default">
                    <div class="item-icon">
                        <van-icon name="photo-o" size="1.4rem"></van-icon>
                    </div>
                    <div class="btn_text">图片</div>
                </van-button>
            </li>
            <li class="selectItem">
                <van-button type="default">
                    <div class="item-icon">
                        <van-icon name="description" size="1.4rem"></van-icon>
                    </div>
                    <div class="btn_text">文字</div>
                </van-button>
            </li>
            <li class="selectItem">
                <van-button type="default">
                    <div class="item-icon">
                        <van-icon name="video-o" size="1.4rem"></van-icon>
                    </div>
                    <div class="btn_text">视频</div>
                </van-button>
            </li>
        </ul>
    </div>

</template>

<script>
    import Vue from 'vue';
    import {Button, Icon} from 'vant';

    Vue.use(Button);
    Vue.use(Icon);
    export default {
        name: "selectItem",
        props: {
            selectStyle: {
                type: String,
                default: function () {
                    return 'display: inline-block;';
                }
            }
        },
        data() {
            return {
                refStyle: ''
            };
        },
        mounted() {
            this.refStyle = Number(this.$refs.selectStyle.clientWidth) / 2;
            this.setStyle('.select-ul{left:calc(50% - ' + this.refStyle + 'px)}');
        },
        methods: {
            setStyle(newStyle) {
                var styleElement = document.getElementById('styles_for_js');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.type = 'text/css';
                    styleElement.id = 'styles_js';
                    document.getElementsByTagName('head')[0].appendChild(styleElement);
                }
                styleElement.appendChild(document.createTextNode(newStyle));
            }

        }
    };
</script>

<style scoped>
    /*

        功能选择框css

    */

    .item-select-box ul {
        display: inline-block;
        transition: 0.2s;
        position: absolute;
        margin-top: 5px;
        z-index: 100;
        border-radius: 15px;
        overflow-x: hidden;
        overflow-y: visible;
        box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
    }
    .triangle{
        position: absolute;
        width: 100%;
        transition: 0.3s;
    }
    .triangle::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 6px;
        width: 0;
        height: 0;
        border-right: 0.64rem solid transparent;
        border-left: 0.64rem solid transparent;
        border-bottom: 0.64rem solid #fff;
        text-indent: -999999em;
        margin: -0.64rem 0 0 -0.64rem;
        z-index: 101;
    }


    .item-select-box ul::after {
        clear: both;
        display: table;
        content: '';
    }

    .selectItem {
        float: left;
    }

    .selectItem .van-button {
        height: auto;
        padding: 18px 15px;
        border: none;
    }

    .selectItem .item-icon {
        height: 28px;
    }

    .btn_text {
        line-height: 20px;
        height: 20px;
    }

    /*

    功能选择框css

     */
</style>
