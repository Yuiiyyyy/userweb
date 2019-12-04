<template>
    <div class="top-container">
        <div class="left">
            <img :src="require('../assets/imgs/option.png')" alt="">
        </div>
        <div class="right">
            <div class="head">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <el-dropdown size="small" @command="handleCommand">
                <span>
                    {{username}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="home">回到首页</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </span>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { getLogoutApi } from "@/api/api.js";
    export default {
        inject:['reload'],
        data(){
            return{
                input2:'',
                username:'admin'
            }
        },
        created(){
            if(sessionStorage.getItem('username')){
                this.username = sessionStorage.getItem('username')
            }
        },
        methods:{
            handleCommand(command){
                const _this = this
                // console.log(command);
                if(command=='home'){
                    this.$router.push('/')
                }else if(command=='logout'){
                    sessionStorage.setItem('username','')
                    getLogoutApi().then((res)=>{
                        if(res.data.code==0){
                            _this.reload()
                            _this.$router.push('/')
                        }else if(res.data.code==-1000){
                            sessionStorage.setItem('username','')
                            _this.reload()
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .top-container {
        width: 100%;
        height: 60px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            width: 20px;
            height: 20px;
            margin-left: 20px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .right {
            display: flex;
            align-items: center;
            .search {
                margin-right: 100px;
                .el-input{
                    border-radius: 10px;
                    font-family: MicrosoftYaHei;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 21px;
                    letter-spacing: 0px;
                    color: #c5c5c5;
                }
            }
            .head {
                margin-right: 50px;
                display: flex;
                align-items: center;
                span {
                    margin-left: 10px;
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 25px;
                    letter-spacing: 0px;
                    color: #999999;
                    cursor: pointer;
                }

                .select {
                    color: #c8cbd0;
                }
            }
        }
    }
</style>