<template>
    <div id="header-container">
        <!-- 左边logo和tab -->
        <div class="left">
            <div class="logo" @click="clickLogoHandler">智力SHOW</div>
            <div class="tabs">
                <span :class="{selected:curSelect==0}" @click="changeTab('/index/platform',0)">平台介绍</span>
                <span :class="{selected:curSelect==1}" @click="changeTab('/index/business',1)">商务合作</span>
                <span :class="{selected:curSelect==2}" @click="changeTab('/index/dissertation',2)">专题展示</span>
                <span :class="{selected:curSelect==3}" @click="changeTab('/index/training',3)">培训活动</span>
            </div>
        </div>
        <!-- 右边登录注册 -->
        <div class="right">
            <i class="el-icon-user"></i>
            <div v-show="isShow">
                <span @click="loginHandler">登录</span> /
                <span @click="regHandler">注册</span>
            </div>
            <el-dropdown size="small" @command="handleCommand">
                <span v-show="showUser">
                    {{username}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='manager'>后台管理</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </span>
            </el-dropdown>

        </div>
    </div>
</template>

<script>
import { getLogoutApi } from "@/api/api.js";
    export default {
        inject:['reload'],
        data() {
            return {
                curSelect: 0,
                username: 'xxx',
                isShow: false,
                showUser: false
            }
        },
        created() {
            switch (location.hash) {
                case '#/index/platform':
                    this.curSelect = 0;
                    break;
                case '#/index/business':
                    this.curSelect = 1;
                    break;
                case '#/index/dissertation':
                    this.curSelect = 2;
                    break;
                case '#/index/training':
                    this.curSelect = 3;
                    break;
            }
            if (sessionStorage.getItem('username')) {
                this.username = sessionStorage.getItem('username')
                this.showUser = true
            } else {
                this.isShow = true
            }
        },
        methods: {
            changeTab(hash, index) {
                this.curSelect = index
                this.$router.history.push(hash)
            },
            loginHandler() {
                this.$router.push('/login')
            },
            regHandler() {
                this.$router.push('/reg')
            },
            clickLogoHandler() {
                this.$router.push('/')
            },
            handleCommand(command){
                let _this = this
                if(command=='logout'){
                    sessionStorage.setItem('username','')
                    getLogoutApi().then((res)=>{
                        if(res.data.code==0){
                            _this.reload()
                        }else if(res.data.code==-1000){
                            sessionStorage.setItem('username','')
                            _this.reload()
                        }
                    })
                }else if(command=='manager'){
                    this.$router.push('/manager/managedemand')
                }
            }
        }
    }
</script>

<style>
    
    
</style>

<style lang="less" scoped>
    #header-container {
        height: 86px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            width: 100%;
            height: 100%;
            line-height: 86px;
            display: flex;
            justify-content: space-between;

            .logo {
                font-size: 36px;
                margin-left: 56px;
                font-family: AlibabaPuHuiTiB;
                cursor: pointer;
            }

            .tabs {
                margin-right: 180px;

                span {
                    padding: 20px 0;
                    margin-right: 70px;
                    font-size: 16px;
                    font-weight: normal;
                    letter-spacing: 0px;
                    color: #333333;
                    font-family: MicrosoftYaHei-Bold;
                    cursor: pointer;
                }

                .selected {
                    border-bottom: 3px solid #fa7222;
                    color: #fa7222;
                }
            }
        }

        .right {
            color: #fff;
            min-width: 120px;
            height: 26px;
            line-height: 26px;
            padding: 30px;
            background-image: linear-gradient(90deg,
                    #f93b5e 0%,
                    #fa7a1b 100%),
                linear-gradient(#fa7a1b,
                    #fa7a1b);
            background-blend-mode: normal, normal;
            display: flex;
            justify-content: center;
            align-items: center;

            i {
                font-size: 20px;
            }

            span {
                margin-left: 1px;
                cursor: pointer;
            }
            /deep/ .el-dropdown{
                color: #fff;
            }
            // /deep/ .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
            //     color: #fa7222;
            // }
            // /deep/ .el-select-dropdown__item{
            //     color: #fa7222;
            // }
            // /deep/ .el-dropdown-menu .el-popper .el-dropdown-menu--small{
            //     color: #fa7222;
            // }
        }
    }
</style>