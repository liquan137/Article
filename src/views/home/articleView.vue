<template>
    <div id="index">
        <header class="myHeader">
            <div class="center clearFix">
                <em class="fl" @click="$router.go(-1)">我是返回按钮</em>
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
            <p class="description-preview">
              {{articleItem.description}}
            </p>
            <section v-for="(item,index) in articleItem.content" :key="index">
                <p v-if="item.file.type == 'img'" class="img-preview">
                    <img :src="item.file.original" alt="">
                </p>
                <p v-html="item.html" class="content-chapter" v-show="item.html != ''">

                </p>
            </section>
        </div>
    </div>
</template>

<script>
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
            console.log(this.$store.state.home.articleModule);
            // this.$store.state.home.articleModule;
        },
        methods: {
            handleSubmit() {

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
    .content-chapter{
        font-size: 0.85rem;
        margin: 10px 0;
    }
</style>
<style lang="css" rel="stylesheet/css">
    @import '../../../static/css/index.css';
</style>
