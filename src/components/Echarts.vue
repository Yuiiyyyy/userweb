<template>
    <div id="myChart" :style="{width: '700px', height: '500px'}">

    </div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
require("echarts/lib/chart/radar")
    export default {
        methods: {
            initEcharts() {
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                myChart.setOption({
                    title: {
                        text: ''
                    },
                    tooltip: {},
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [{
                                name: '学历',
                                max: 5500
                            },
                            {
                                name: '项目阶段',
                                max: 15000
                            },
                            {
                                name: '能力',
                                max: 33000
                            }
                        ]
                    },
                    series: [{
                        name: '',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [{
                                value: [4300, 10000, 28000, 35000, 50000, 19000],
                                name: ''
                            },
                            {
                                value: [5000, 14000, 28000, 31000, 42000, 21000],
                                name: ''
                            }
                        ]
                    }]
                })
            }
        },
        mounted(){
            this.initEcharts()
        }
    }
</script>

<style lang="scss" scoped>

</style>