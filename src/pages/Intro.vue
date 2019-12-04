<template>
    <div>
        <Header/>
        <Carousel/>
        <router-view></router-view>
        <Footer/>
    </div>
</template>

<script>
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
    export default {
        components:{
            Header,
            Carousel,
            Footer
        }
    }
</script>

<style lang="less" scoped>
   
</style>