<template>
    <div class="ai-container">
        <div class="form-box">
            <el-card class="box-card">
                <div class="title">账号信息修改</div>
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="联系人：">
                        <el-input v-model="form.contact" size="medium" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式：">
                        <el-input v-model="form.tel" size="medium" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div class="btn-box">
                    <el-button size="medium" @click="changeInfo">确定</el-button>
                    <el-button size="medium" class="cancel">取消</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { getAccountInfoApi,getChangeInfoApi } from "@/api/api.js";
    export default {
        data() {
            return {
                form: {
                    contact:'',
                    tel:''
                }
            }
        },
        created(){
            getAccountInfoApi().then((res)=>{
                // console.log(res);
                if(res.data.code==0){
                    this.form.contact = res.data.data.linkMan
                    this.form.tel = res.data.data.phone
                }
            })
        },
        methods:{
            changeInfo(){
               getChangeInfoApi(this.form.contact,this.form.tel).then((res)=>{
                   if(res.data.code==0){
                       this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                   }
                // console.log(res);
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
    .ai-container {
        padding: 0 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .form-box {
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
                margin-top: 40px;

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