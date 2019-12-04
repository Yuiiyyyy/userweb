<template>
    <div class="login-container">
        <img :src="require('../assets/imgs/logo_login.jpg')" alt="">
        <div class="login-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <div class="title">欢迎登录</div>
                <div class="noaccount">没有账号?去<span @click="regHandler">注册</span></div>
                <el-input prop="account" v-model="ruleForm.account" placeholder="请输入您的手机号" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                </el-input>
                <el-input prop="password" v-model="ruleForm.password" placeholder="请输入您的密码" type="password" show-password clearable>
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
                <div class="msg" v-show="isCorrect">请输入正确的密码或账号</div>
                <div class="password">
                    <el-checkbox v-model="checked">记住用户名和密码</el-checkbox>
                    <span>忘记密码?</span>
                </div>
                <el-button @click="submitForm('ruleForm')">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
const Base64 = require('js-base64').Base64
    import {
        getLoginApi
    } from '../api/api.js'
    export default {
        name: 'login',
        data() {
            // 验证账号非空
            var validateAccount = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error("账号不能为空"));
                } else {
                    callback();
                }
            };
            // 验证密码非空
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    account: '',
                    password: '',
                },
                rules: {
                    account: [{
                        validator: validateAccount,
                        trigger: 'blur'
                    }],
                    password: [{
                        validator: validatePassword,
                        trigger: 'blur'
                    }]
                },
                isCorrect: false, //账号密码不正确时显示
                checked: false//记住密码
            }
        },
        methods: {
            regHandler() {
                this.$router.push('/reg')
            },
            submitForm(formName) {
                const that = this
                if(that.checked){
                    let passWord = Base64.encode(that.ruleForm.password)
                    that.setCookie(that.ruleForm.account, passWord, 7);
                }else{
                    that.clearCookie();
                }
                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let hasCollection = this.$store.state.hasCollection
                        getLoginApi(this.ruleForm.account, this.ruleForm.password)
                        .then((res) => {
                                if(res.data.code==0){
                                    this.isCorrect = false
                                    sessionStorage.setItem('username',this.ruleForm.account)
                                    this.$router.push('/manager/managedemand')
                                    if(hasCollection!==0){
                                        this.$router.push('/manager/managedemand')
                                    }else{
                                        this.$router.push('/index/detail')
                                    }
                                }else{
                                    this.isCorrect = true
                                } 
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        
                    }else {
                        return false;
                    }
                });
            },
            //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); 
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); 
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            this.ruleForm.account = arr2[1]; 
                        } else if (arr2[0] == 'userPwd') {
                            this.ruleForm.password = Base64.decode(arr2[1]);
                        }
                    }
                }
            },
            //清除cookie
            clearCookie() {
                this.setCookie("", "", -1); 
            }
        },
        mounted(){
            this.getCookie();
        }
    }
</script>

<style lang="less" scoped>
    .login-container {
        width: 100%;
        min-height: 900px;
        background: url('../assets/imgs/bc_login.jpg') center center no-repeat;
        background-size: 80% 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            position: fixed;
            top: 34px;
            left: 20%;
        }

        .login-box {
            width: 350px;
            height: 370px;
            padding: 10px 35px;
            background-color: #fff;
            box-shadow: 0px 10px 23px 0px rgba(183, 183, 183, 0.44);
            border-radius: 3px;
            span{
                cursor: pointer;
            }
            .title {
                display: flex;
                justify-content: center;
                font-family: MicrosoftYaHei;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 42px;
                letter-spacing: 0px;
                color: #f05050;
            }

            .noaccount {
                float: right;
                margin: 20px 0px 10px;
                font-family: MicrosoftYaHei;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 25px;
                letter-spacing: 0px;
                color: #f05050;
            }

            .el-input {
                border: solid 1px #f05050;
                margin-bottom: 20px;

                .el-input__icon {
                    font-size: 18px;
                    color: #fb7a1c
                }
            }

            /deep/ .el-input__inner {
                border: none;
            }

            // 修改选中框效果
            /deep/ .el-checkbox__inner {
                background-color: #fff;
                border: 1px solid #fb7a1c;
            }

            /deep/ .el-checkbox {
                color: #999999;
                font-family: MicrosoftYaHei;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 14px;
                letter-spacing: 0px;
            }

            /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
                color: #fb7a1c;
                background-color: #fb7a1c;

            }

            /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
                color: #fb7a1c;
            }

            .password {
                display: flex;
                justify-content: space-between;

                span {
                    font-family: MicrosoftYaHei;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 14px;
                    letter-spacing: 0px;
                    color: #999999;
                }
            }

            .msg {
                color: red;
                margin-bottom: 10px;
                font-size: 14px;
            }

            .el-button {
                margin-top: 30px;
                width: 100%;
                background-color: #fb7a1c;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 19px;
                letter-spacing: 0px;
                color: #ffffff;
            }
        }
    }
</style>