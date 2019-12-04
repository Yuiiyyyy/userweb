<template>
    <div class="mp-container">
        <div class="card-box">
            <el-card class="box-card">
                <div class="title">密码修改</div>
                <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                    <el-form-item label="原密码：" prop="oldPwd">
                        <el-input v-model="form.oldPwd" size="medium" show-password clearable></el-input>
                        <div class="showMsg" v-show="showMsg">原密码错误，请确认！</div>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="newPwd">
                        <el-input v-model="form.newPwd" size="medium" show-password clearable></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="rePwd">
                        <el-input v-model="form.rePwd" size="medium" show-password clearable></el-input>
                    </el-form-item>
                </el-form>
                <div class="btn-box">
                    <el-button size="medium" @click="onSubmit('form')">确定</el-button>
                    <el-button size="medium" class="cancel">取消</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { getChangePwdApi } from '@/api/api.js'
    export default {
        inject:['reload'],
        data(){
            // 验证新密码
            var checkPassword = (rule, value, callback)=>{
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    const reg=/^(\w){6,20}$/
                    if(reg.test(value)){
                        callback();
                    }else{
                        return callback(new Error('请输入6-20个字母、数字、下划线'));
                    }
                }
            }
            // 验证确认密码
            var checkRepeatPassword = (rule, value, callback)=>{
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else {
                    if(this.form.newPwd!=this.form.rePwd){
                        return callback(new Error('两次输入密码不同，请检查'))
                    }else{
                        callback()
                    }
                }
            }
            return{
                form:{
                    oldPwd:'',
                    newPwd:'',
                    rePwd:''
                },
                rules:{
                   oldPwd:[{
                        required: true,
                        message:'请输入原密码',
                        trigger: 'blur'
                   }], 
                   newPwd:[{
                        required: true,
                        validator: checkPassword,
                        trigger: 'blur'
                   }],
                   rePwd:[{
                        required: true,
                        validator: checkRepeatPassword,
                        trigger: 'blur'
                   }]
                },
                showMsg:false
            }
        },
        methods:{
            onSubmit(formName){
                const _this = this
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        getChangePwdApi(this.form).then((res)=>{
                            if(res.data.code==0){
                                this.showMsg = false
                                this.$message({
                                    type: 'success',
                                    message: '修改密码成功!'
                                })
                                setTimeout(() => {
                                    this.$router.push('/login')
                                }, 1000);
                            }else{
                                this.showMsg = true
                            }
                            // console.log(res);
                        }).catch(()=>{
                            this.$message({
                                type: 'error',
                                message: '修改失败!'
                            })
                        })
                    }
                })
            }
        }
    }
</script>
<style>
    .el-form-item__label {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #0d0d0d;
        font-weight: bold;
    }

    .el-form-item__content {
        margin-left: 10px !important;
    }
</style>


<style lang="less" scoped>
    .mp-container{
        padding: 0 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .showMsg{
            color: red;
            font-size: 14px;
            line-height: 20px;
        }
        .card-box{
            width: 100%;
            height: 100%;
            .box-card {
                height: 500px;
                padding: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .title {
                display: flex;
                justify-content: center;
                font-family: MicrosoftYaHei-Bold;
                font-size: 18px;
                line-height: 22px;
                color: #1a1a1a;
                font-weight: bold;
            }
            .el-form {
                margin-top: 60px;

                .el-form-item {
                    display: flex;
                    justify-content: center;

                    .el-input {
                        width: 480px;
                    }
                }
            }
            .btn-box {
                display: flex;
                justify-content: center;

                .el-button {
                    margin-top: 30px;
                    width: 100px;
                    background-color: #fb7a1c;
                    color: #fff;
                    border: none;
                }
                .cancel{
                    background-color: #f2f2f2;
                    color: #666;
                }
            }
        }
    }
</style>