<template>
    <div>
        <h1>登入</h1>
        <van-form @submit="onSubmit">
            <van-field
                    v-model="login.username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="login.password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="danger" native-type="submit">
                    登入
                </van-button>
            </div>
        </van-form>
        <van-button style="margin-bottom: 16px" round size="large" to="/register" type="info" >前往注册</van-button>
        <van-button round block type="default" to="/">
            回到首页
        </van-button>
        {{result}}
    </div>
</template>

<script>

    export default {
        name: "login",
        data: function () {
            return {
                login: {
                    username: '',
                    password: ''
                },
                token: '',
                result: ''
            }
        },
        methods: {
            toLogin: function () {
                axios.post("http://localhost:8181/user/login", this.login).then(resp => {
                    if (resp.data.code===2000){
                        this.token = "Bearer" + resp.data.data.token;
                        localStorage.setItem("JWT_TOKEN",this.token);
                        localStorage.setItem("USER_ID",resp.data.data.userId);
                        localStorage.setItem("USER_NAME",resp.data.data.username);
                        this.$router.go(-1)
                    }
                    else {
                        if (resp.data.data==null){
                            this.result=resp.data.msg;
                        }
                        else{
                            this.result=resp.data.data;
                        }

                    }
                }, error => {
                    console.log(error);
                })
            },
            test: function () {
                axios.get("http://localhost:8181/test/test_guest").then(resp => {
                    this.result = resp.data;
                })
            },
            onSubmit(values) {
                this.toLogin();
            },
        }
    }

</script>

<style scoped>

</style>