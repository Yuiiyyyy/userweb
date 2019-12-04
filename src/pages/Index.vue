<template>
    <div>
        <Header/>
        <Carousel/>
        <Platform/>
        <Footer/>
    </div>
</template>

<script>
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Platform from './index/Platform'
import Footer from '../components/Footer'
export default {
  components:{
    Header,
    Carousel,
    Platform,
    Footer
  }
}
</script>

<style lang="less" scoped>

</style>