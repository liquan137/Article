<template>
    <div id="index">
        <header class="myHeader">
            <div class="center clearFix">
                <em class="fl" @click="$router.push({name: 'Home' })">我是返回按钮</em>
                <h1 class="fl">预览</h1>
                <a
                    class="fr"
                    @click="handleSubmit"
                >
                    完成
                </a>
            </div>
        </header>
        <div class="content">
            <h2 class="title-preview">{{ articleItem.title}}</h2>
            <section>
                <p>
                    <img :src="articleItem.coverImg" alt="">
                </p>
            </section>
            <p class="description-preview">
                {{articleItem.description}}
            </p>
            <div ref="content">
                <section v-for="(item,index) in articleItem.content" :key="index">
                    <section v-if="item.file.type  == 'img' || item.file.type  == ''">
                        <p v-if="item.file.original!=''" class="img-preview">
                            <img :src="item.file.original" alt="">
                        </p>
                        <p v-html="item.html" class="content-chapter" v-if="item.html != ''">

                        </p>
                    </section>
                    <section v-if="item.file.type == 'video'">
                        <p v-if="item.file.original!=''">
                            <video :src="item.file.original" controls="controls">

                            </video>
                        </p>
                        <p v-html="item.html" class="content-chapter" v-if="item.html != ''">

                        </p>
                    </section>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Toast} from 'vant';

    Vue.use(Toast);
    export default {
        name: "articleView",
        data() {
            return {
                articleItem: {
                    title: '王大锤冒险记',
                    description: '这是文章的描述！！！！！！',
                    content: [
                        {
                            order: '1',
                            file: {
                                type: 'img',
                                detail: [
                                    'file:///C:/Users/Administrator/Desktop/1CG7L5GN7YED9TD%7DIX)C3)U.png'
                                ]
                            },
                            words: '这是本段落的文字描述..............这是本段落的文字描述..............'
                        },
                        {
                            order: '2',
                            file: {
                                type: 'video',
                                detail: [
                                    'file:///C:/Users/Administrator/Desktop/1CG7L5GN7YED9TD%7DIX)C3)U.png'
                                ]
                            },
                            words: '这是本段落的文字描述..............这是本段落的文字描述..............'
                        }
                    ]
                }
            };
        },
        created() {

        },
        mounted() {
            this.articleItem = this.$store.state.home.articleModule;
        },
        methods: {
            handleSubmit() {
                this.uploader();
            },
            uploader() {
                let loading = Toast.loading({
                    mask: true,
                    duration: 0,
                    message: '保存中...'
                });
                let params = {
                    title: this.$store.state.home.articleModule.title,
                    cover: this.$store.state.home.articleModule.coverImg,
                    abstract: this.$store.state.home.articleModule.description,
                    content: this.$refs.content.innerHTML
                };
                console.log(params);
                // 请求上传图片接口
                this.$api.publishGoodThing.saveNewArticle(params)
                    .then(response => {
                        console.log(response);
                        let res = response.data;
                        if (res.code == 0) {
                            setTimeout(() => {
                                loading.clear();
                                Toast.success('保存成功');
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                loading.clear();
                                Toast.fail('保存失败');
                            }, 1000);
                        }

                    })
                    .catch(err => {
                        Toast.fail('保存失败');
                    });
            }
        }
    };
</script>

<style scoped>
    .content {
        padding: 10px;
    }

    .title-preview {
        font-size: 1.3rem;
        margin: 10px 0px;
    }

    .description-preview {
        background: #eee;
        padding: 10px;
        font-size: 0.7rem;
    }

    .img-preview {
        margin: 0px 0;
    }

    .content-chapter {
        font-size: 0.85rem;
        margin: 10px 0;
    }

    video {
        max-width: 100%;
    }
</style>
<style lang="css" rel="stylesheet/css">
    @import '../../../static/css/index.css';
</style>
