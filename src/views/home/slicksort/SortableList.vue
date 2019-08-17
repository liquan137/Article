<template>
    <div class="article-list-box">
        <slot/>
    </div>
</template>

<script>
    import {ContainerMixin} from 'vue-slicksort';

    export default {
        mixins: [ContainerMixin],
        name: "SortableList"
    };
</script>

<style scoped>
</style>
