<template>
    <div id="refresh">
        我是刷新组件
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "Refresh",
        beforeRouteEnter ( to, from, next ) {
            next ( vm => {
                // 跳转从哪个路由跳过来的路由
                console.log ( from.fullPath );
                // vm.$router.replace ( '/refresh' );
                vm.$router.replace ( from.fullPath );
            });
        }
    };
</script>

<style lang="css" rel="stylesheet/css">

</style>
