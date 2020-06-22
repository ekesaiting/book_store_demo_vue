<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field
                    v-model="login.username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名需要在4~10个字符之间"
                    :rules="[{validator: checkUsername , message: '用户名需要在4~10个字符之间'}]"
            />
            <van-field
                    v-model="login.password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码需要在6~20个字符之间"
                    :rules="[{ required: true, message: '请填写密码' },{ validator:checkPwd, message: '密码需要在6~20个字符之间' }]"
            />
            <van-field
                    v-model="checkPassword"
                    type="password"
                    name="密码"
                    label="确认密码"
                    placeholder=""
                    :rules="[{ validator: dCheckPwd, message: '密码不一致' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="danger" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>
        <van-button round block type="info" to="/">
            回到首页
        </van-button>
        {{result}}
    </div>
</template>

<script>

    export default {
        name: "register",
        data: function () {
            return {
                login: {
                    username: '',
                    password: ''
                },
                userNamepattern:/\d{4}/,
                pwdPattern: /\d{6}/,
                checkPassword:'',
                token: '',
                result: ''
            }
        },
        methods: {
            toLogin: function () {
                axios.post("http://localhost:8181/user/register", this.login).then(resp => {
                    if (resp.data.code===2001){
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
            checkUsername(val){
                return /\w{4,10}/.test(val);
            },
            checkPwd(val){
                return /\w{6,20}/.test(val);
            },
           dCheckPwd(){
                return this.login.password===this.checkPassword;
           },
            onSubmit(values) {
                this.toLogin();
            },
        }
    }

</script>

<style scoped >

</style>