<template>
    <div>
        <el-menu class="el-menu-vertical-demo" background-color="#fb7a1c" text-color="#fff" active-text-color="#fb7a1c">
            <div class="logo">智力SHOW</div>
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <div class="right">
                    <span slot="title">项目录入</span>
                    <span>+</span>
                </div>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-edit-outline"></i>
                <div class="right">
                    <span slot="title">需求录入</span>
                    <span>+</span>
                </div>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <div class="right">
                    <span slot="title">需求管理</span>
                    <span>+</span>
                </div>
            </el-menu-item>
           <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>账号管理</span>
                </template>
                <el-menu-item index="4-1">账号信息</el-menu-item>
                <el-menu-item index="4-2">密码管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="5">
                <i class="el-icon-star-off"></i>
                <div class="right">
                    <span slot="title">收藏</span>
                    <span>+</span>
                </div>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
        }
    }
</script>

<style lang="less" scoped>
        .el-menu {
            width: 200px;
            height: 100%;
            padding-bottom: 700px;
            .logo {
                font-family: MicrosoftYaHei-Bold;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 97px;
                letter-spacing: 0px;
                color: #ffffff;
                display: flex;
                justify-content: center;
            }
            i{
                color: #fff
            }
            .el-submenu__title{
                color: #fff;
            }
            
        }
        .el-menu-item:focus{
                background-color: #fff;
            }
        .el-menu-item.is-active {
            background-color: #fff !important;
        }
        .el-menu-item:focus i{
            color: #fb7a1c;
        }
        .el-menu-item.is-active i{
            color: #fb7a1c;
        }
        .el-menu-item{
            display: flex;
            align-items: center;
            .right{
                flex: 1;
                display: flex;
                justify-content: space-between;
            }
        }
</style> 