<template>
    <div class="triangle" :style="selectStyle">
        <ul ref="selectStyle" class="select-ul">
            <li class="selectItem">
                <van-button type="default" @click="imgFileUpload()">
                    <div class="item-icon">
                        <van-icon name="photo-o" size="1.4rem"></van-icon>
                    </div>
                    <div class="btn_text">图片</div>
                </van-button>
                <input class="upload-item-input" type="file" value="" ref="img" @input="changesUpload" multiple
                       style="display: none">
            </li>
            <li class="selectItem">
                <van-button type="default"  @click="pushWord()">
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
        <canvas ref="myCanvas" style="display: none"></canvas>
    </div>

</template>

<script>
    import Vue from 'vue';
    import {Button, Icon, Dialog} from 'vant';
    // 引入编辑页文章模块


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
                refStyle: '',
                typeList: ['jpg', 'png', 'jpeg', 'bmp'],
                list: [],
                cutH: 300,
                cutW: 'auto'
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
            },
            imgFileUpload() {
                var dom = this.$refs.img.click();
                // dom.initEvent("click", true, true);

            },
            changesUpload() {
                let that = this;
                var data = this.$refs.img.files;
                for (var i = 0; i < data.length; i++) {
                    if ((data[i].size / 1024) < 5024) {
                        var reader = new FileReader();
                        reader.readAsDataURL(data[i]);
                        reader.onload = function (e) {
                            var arr = e.target.result.split(',');
                            var mime = arr[0].match(/:(.*?);/)[1];
                            var imgType = mime.split('/')[1];
                            if (that.typeList.indexOf(imgType) >= 0) {
                                that.cutImg({
                                    base64: e.target.result,
                                    cutW: that.cutW,
                                    cutH: that.cutH,
                                    callback: function (result) {
                                        that.list.push({base64: result});
                                        that.$store.state.home.articleModule.content.push({
                                            order: '1',
                                            file: {
                                                type: 'img',
                                                detail: [
                                                    result
                                                ]
                                            },
                                            words: '这里是段落描述文字！'
                                        });
                                    }
                                });
                            } else {
                                Dialog.alert({
                                    title: '温馨提示',
                                    message: '图片格式错误'
                                }).then(() => {
                                    // on close
                                });
                            }
                        };
                    } else {
                        Dialog.alert({
                            title: '温馨提示',
                            message: '图片规格超过限制'
                        }).then(() => {
                            // on close
                        });
                    }
                }
            },
            cutImg(obj) {
                if (obj.base64 === '') return obj.callback(result);
                let that = this;
                var img = new Image();
                img.src = obj.base64;
                img.onload = function () {
                    var load = this;
                    var w = load.width, h;
                    if (obj.cutW !== 'auto') {
                        w = obj.cutW;
                        h = load.height / (load.width / obj.cutW);
                    }
                    if (obj.cutH !== 'auto') {
                        h = obj.cutH;
                        w = load.width / (load.height / obj.cutH);
                    }
                    console.log(obj.cutW,obj.cutH)
                    var quality = 0.7;
                    var canvas = that.$refs.myCanvas;
                    var ctx = canvas.getContext('2d');
                    var anw = document.createAttribute('width');
                    anw.nodeValue = w;
                    var anh = document.createAttribute('height');
                    anh.nodeValue = h;
                    canvas.setAttributeNode((anw));
                    canvas.setAttributeNode(anh);
                    ctx.drawImage(load, 0, 0, w, h);
                    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                        quality = obj.quality;
                    }
                    var result = canvas.toDataURL('image/jpeg', quality);
                    obj.callback(result);
                };
            },
            pushWord(){

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

    .triangle {
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
