<template>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/orderList">订单</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/userInfo">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        name: "tabBtn",
        data() {
            return {
                active: 0,
            }
        },
        mounted() {
            switch (this.$route.path) {
                case "/home":
                    this.active = 0;
                    break;
                case "/orderList":
                    this.active = 1;
                    break;
                case "/userInfo":
                    this.active = 2;
                    break;
                default:
                    this.active = 0;
            }
        }
    }
</script>

<style scoped>

</style>