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
            },
            index:{
                type:[Number,String],
                default:function () {
                    return 0;
                }
            }
        },
        data() {
            return {
                refStyle: '',
                typeList: ['jpg', 'png', 'jpeg', 'bmp'],
                list: [],
                // 生成默认缩略图的高度
                cutH: 300,
                cutW: 'auto',
                formData: {}
            };
        },
        mounted() {
            this.refStyle = Number(this.$refs.selectStyle.clientWidth) / 2;
            this.setStyle('.select-ul{left:calc(50% - ' + this.refStyle + 'px)}','width');
        },
        methods: {
            // 设置弹窗居中
            setStyle(newStyle,dom) {
                var styleElement = document.getElementById(dom);
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.type = 'text/css';
                    styleElement.id = dom;
                    document.getElementsByTagName('head')[0].appendChild(styleElement);
                    styleElement.appendChild(document.createTextNode(newStyle));
                }

            },
            // 触发上传
            imgFileUpload() {
                this.$refs.img.click();
            },
            // 添加到store
            readerFile(e) {
                let that = this;
                var arr = e.target.result.split(',');
                var mime = arr[0].match(/:(.*?);/)[1];
                var imgType = mime.split('/')[1];
                console.log(e);
                if (that.typeList.indexOf(imgType) >= 0) {
                    that.cutImg({
                        base64: e.target.result,
                        cutW: that.cutW,
                        cutH: that.cutH,
                        callback: function (result,original) {
                            that.list.push({base64: result});
                            that.$store.state.home.articleModule.content.splice(Number(index) + 1, 0, {
                                order: 0,
                                file: {
                                    type: 'img',
                                    original: original,
                                    detail: [
                                        result
                                    ]
                                },
                                words: '这里是段落描述文字！',
                                html: ''
                            });
                            let content = that.$store.state.home.articleModule.content;
                            for (var x in content) {
                                that.$store.state.home.articleModule.content[x].order = x;
                            }
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
            },
            // 读取file
            changesUpload() {
                let that = this;
                var data = this.$refs.img.files;
                console.log(data);
                let fd = new FormData();
                for (var i = 0; i < data.length; i++) {
                    fd.append ( "images[]", data[i] );
                    if (i == data.length - 1){
                        this.formData = fd;
                    }
                    if ((data[i].size / 1024) < 5024) {
                        let reader = new FileReader();
                        reader.readAsDataURL(data[i]);
                        reader.onload = function (e) {
                            that.readerFile(e);
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
            // 缩略图生成
            cutImg(obj) {
                if (obj.base64 === '') return obj.callback(result);
                let that = this;
                var img = new Image();
                img.src = obj.base64;
                let original = obj.base64;
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
                    console.log(obj.cutW,obj.cutH);
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
                    obj.callback(result,original);
                };
            },
            // 跳转至增加段落
            pushWord(){
                this.$router.push({
                    path: '/editor/'+ this.index.toString()+'/'+'add'
                });
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
