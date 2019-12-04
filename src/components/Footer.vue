<template>
    <div class="footer-container">
        <div class="footer">
            <div class="main">
                <div class="tabs">
                    <span @click="changeHash('/index/platform')">平台介绍</span>
                    <span @click="changeHash('/index/business')">商务合作</span>
                    <span @click="changeHash('/index/dissertation')">专题展示</span>
                    <span class="last" @click="changeHash('/index/training')">培训活动</span>
                </div>
                <div class="about">
                    <h4>关于我们</h4>
                    <p>关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们</p>
                </div>
            </div>
        </div>
        <div class="copy">
            <span>版权信息</span>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            changeHash(hash){
                this.$router.push(hash)
            }
        }
    }
</script>

<style lang="less" scoped>
    .footer-container{
        .footer{
            height: 200px;
            width: 100%;
            background-color: #1b1b1b;
            .main{
                width: 1200px;
                height: 100%;
                margin: auto;
                .tabs{
                    width: 100%;
                    height: 16px;
                    display: flex;
                    padding: 30px 0;
                    justify-content: center;
                    align-items: center;
                    border-bottom: 1px solid #2b2b2b;
                    span{
                        font-family: MicrosoftYaHei;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 30px;
                        letter-spacing: 0px;
                        color: rgba(255, 255, 255, 0.6);
                        padding: 0px 20px;
                        border-right: 1px solid rgba(255, 255, 255, 0.6);
                    }
                    .last{
                        border-right: none;
                    }
                }
                .about{
                    padding-left: 20px;
                    h4{
                        font-family: PingFang-SC-Medium;
                        font-size: 20px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 26px;
                        letter-spacing: 0px;
                        color: #ffffff;
                    }
                    p{
                        font-family: PingFang-SC-Medium;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 26px;
                        letter-spacing: 0px;
                        color: rgba(255, 255, 255, 0.36);
                    }
                }
            }
        }
        .copy{
            width: 100%;
            height: 42px;
            background-color: #0d0d0d;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                font-family: PingFang-SC-Medium;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 26px;
                letter-spacing: 0px;
                color: rgba(255, 255, 255, 0.36);
            }
        }
    }
</style>