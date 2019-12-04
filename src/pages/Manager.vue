<template>
    <div class="mg-container">
        <!-- 左边树菜单 -->
        <div class="left">
            <el-menu class="el-menu-vertical-demo" background-color="#fb7a1c" text-color="#fff"
                active-text-color="#fb7a1c" router>
                <div class="logo" @click="backToHome">智力SHOW</div>
                <el-menu-item index="typeinproject">
                    <i class="el-icon-menu"></i>
                    <div class="right">
                        <span slot="title">项目录入</span>
                        <span>+</span>
                    </div>
                </el-menu-item>
                <el-menu-item index="typeindemand">
                    <i class="el-icon-edit-outline"></i>
                    <div class="right">
                        <span slot="title">需求录入</span>
                        <span>+</span>
                    </div>
                </el-menu-item>
                <el-menu-item index="managedemand">
                    <i class="el-icon-setting"></i>
                    <div class="right">
                        <span slot="title">需求管理</span>
                        <span>+</span>
                    </div>
                </el-menu-item>
                <el-submenu index="accountinfo">
                    <template slot="title">
                        <div class="submenu">
                            <i class="el-icon-user"></i>
                            <div class="right">
                                <span slot="title">账号管理</span>
                                <span>+</span>
                            </div>
                        </div>
                    </template>
                    <el-menu-item index="accountinfo">账号信息</el-menu-item>
                    <el-menu-item index="managepassword">密码管理</el-menu-item>
                </el-submenu>
                <el-menu-item index="collection">
                    <i class="el-icon-star-off"></i>
                    <div class="right">
                        <span slot="title">收藏</span>
                        <span>+</span>
                    </div>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右边 -->
        <div class="right">
            <Top />
            <div class="main">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>

<script>
    import Top from '../components/Top'
    export default {
        components: {
            Top
        },
        data() {
            return {
                
            }
        },
        methods: {
            backToHome() {
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    .el-submenu__icon-arrow{
        display: none;
    }
</style>


<style lang="less" scoped>
    .mg-container {
        display: flex;
        .left {
            width: 200px;
            min-height: 900px;
            .el-menu {
                width: 200px;
                height: 100%;
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
                    cursor: pointer;
                }
                i {
                    color: #fff
                }

                .el-submenu__title {
                    color: #fff;
                }

            }

            .el-menu-item:focus {
                background-color: #fff;
            }

            .el-menu-item.is-active {
                background-color: #fff !important;
            }

            .el-menu-item:focus i {
                color: #fb7a1c;
            }

            .el-menu-item.is-active i {
                color: #fb7a1c;
            }

            .el-menu-item {
                display: flex;
                align-items: center;

                .right {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                }
            }
            
        }
        .right {
            flex: 1;
            width: 100%;
            .main {
                width: 100%;
                min-height: 900px;
                background-color: #f2f2f2;
                padding-top: 30px;
            }
        }

    }
    .el-submenu{
        .submenu{
            display: flex;
            align-items: center;
        }
        .right{
            flex: 1;
            display: flex;
            justify-content: space-between;
            color: #fff;
        }
    }
</style>