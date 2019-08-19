<template>
    <div id="index">
        <header class="myHeader">
            <div class="center clearFix">
                <em class="fl" @click="$router.push({name: 'Home' })">我是返回按钮</em>
                <h1 class="fl">编辑</h1>
                <a
                    class="fr"
                    @click="handleSubmit"
                >
                    完成
                </a>
            </div>
        </header>
        <div class="img-content">
            <img :src="img" alt="">
        </div>
        <div class="footer myHeader">
            <div class=" clearFix">
                <div class="f-left">
                    <van-button type="default" @click="imgFileUpload()">更换</van-button>
                    <input class="upload-item-input" type="file" value="" ref="img" @input="changesUpload" multiple
                       style="display: none">
                </div>
                <div class="f-right">
                    <van-button type="default" @click="handleDelete()">删除</van-button>
                </div>
            </div>
        </div>
        <canvas ref="myCanvas" style="display: none"></canvas>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Dialog, Toast, Button} from 'vant';

    Vue.use(Toast);
    Vue.use(Button);
    export default {
        name: "preview",
        data(){
            return {
                typeList: ['jpg', 'png', 'jpeg', 'bmp'],
                list: [],
                // 生成默认缩略图的高度
                cutH: 300,
                cutW: 'auto',
                img: ''
            };
        },
        activated (){
            this.img = this.$store.state.home.articleModule.content[Number(this.$route.params.index)].file.original;
        },
        methods:{
            handleSubmit(){
                this.$router.go(-1);
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
                var index = this.$route.params.index;
                if (that.typeList.indexOf(imgType) >= 0) {
                    that.cutImg({
                        base64: e.target.result,
                        cutW: that.cutW,
                        cutH: that.cutH,
                        callback: function (result,original) {
                            that.$store.state.home.articleModule.content[Number(index)].file.original = original;
                            that.$store.state.home.articleModule.content[Number(index)].file.detail[0] = result;
                            that.$store.state.home.articleModule.content[Number(index)].file.type = 'img';
                            that.img = original;
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
            handleDelete(){
                var index = this.$route.params.index;
                let that = this;
                Dialog.confirm({
                    title: '温馨提示',
                    message: '确认删除此图片？'
                }).then(() => {
                    that.$store.state.home.articleModule.content[Number(index)].file.original = '';
                    that.$store.state.home.articleModule.content[Number(index)].file.detail[0] = '';
                    that.$store.state.home.articleModule.content[Number(index)].file.type = '';
                    that.img = '';
                }).catch(() => {
                    // on cancel
                });

            }
        },
        mounted() {
        }
    };
</script>

<style scoped>
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .f-left{
        float: left;
    }
    .f-left button,.f-right button{
        border: none;
    }
    .f-right{
        float: right;
    }
    .img-content{
        overflow: auto;
        position: fixed;
        top: 2.3466666667rem;
        height: calc(100% - (2.3466666667rem * 2));
        width: 100%;
        background: rgba(0,0,0,0.6);
    }
    .img-content img{
        max-width: 724px;
        min-width: 100%;
        display: inherit;
    }
</style>
