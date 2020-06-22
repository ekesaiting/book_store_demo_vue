<template>
    <div class="userinfo">
        <h1>用户信息</h1>
        <van-cell-group v-show="loginState">
        <van-cell title="" :value="username"  center >
            <template #icon>
                <van-image
                        round
                        width="5rem"
                        height="5rem"
                        src="../avatar.jpg"
                />
            </template>
        </van-cell>
        <van-cell title="用户id" :value="userId"  />
        <van-cell title="地址管理" is-link to="/addressList" />
        </van-cell-group>
        <van-button round size="large" to="/login" type="danger" v-show="!loginState">登入</van-button>
        <div style="height: 20px"></div>
        <van-button round size="large" to="/register" type="info" v-show="!loginState">注册</van-button>
        <van-button round size="large" @click="logout" type="danger" v-show="loginState">退出登入</van-button>
        <tab-btn></tab-btn>
    </div>

</template>

<script>
    import TabBtn from "../components/tabBtn";
    export default {
        name: "UserInfo",
        components: {TabBtn},
        computed:{
            loginState(){
                return this.username != null
            },
            username(){
                return localStorage.getItem("USER_NAME")
            },
            userId(){
                return localStorage.getItem("USER_ID")
            }

        },
        methods:{
            logout(){
               this.$store.commit("logout");
                this.$router.go(0)
                }
            },
    }
</script>

<style scoped lang="less">
    .userinfo{
        .van-cell__title {
            font-size: 120%;
            font-weight: bold;
            text-align: left;
            padding: 0;
        }
        .van-cell__value{
            font-size: 120%;
        }
    }



</style>