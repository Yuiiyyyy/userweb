<template>
    <div class="carousel-container">
        <el-carousel indicator-position="outside" height=650px>
            <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                <img :src="item" alt="">
            </el-carousel-item>
        </el-carousel>
        <div class="text-box">
            <p @click="clickToActivity">第十八届中国国际人才交流大会主宾国（俄罗斯）系列活动在莫斯科正式启动</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                bannerList:[require('../assets/imgs/banner.png'),require('../assets/imgs/banner.png'),require('../assets/imgs/banner.png')]
            }
        },
        methods:{
            clickToActivity(){
                this.$router.push('/index/training')
            }
        }
    }
</script>

<style lang="less" scoped>
    .carousel-container{
        width: 100%;
        height: 650px;
        background-color: lightsteelblue;
        position: relative;
        .el-carousel__item{
            img{
                width: 100%;
                height: 650px;
            }
        }
        .text-box{
            position: absolute;
            top: 150px;
            left: 375px;
            z-index: 99;
            color: #fff;
            p{
                width: 70%;
                font-family: MicrosoftYaHei;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                line-height: 50px;
                cursor: pointer;
            }
        }
    }
</style>