<template>
    
</template>

<script>
    // import axios from 'axios'
    export default {
        data() {
            return {
                mapJson: require('../json/map.json'),
                province: '',
                sheng: '',
                shi: '',
                shi1: [],
                qu: '',
                qu1: [],
                city: '',
                block: '',
            }
        },
        methods: {
            // 加载china地点数据，三级
            getCityData: function () {
                var that = this
                var data = this.mapJson
                that.province = []
                that.city = []
                that.block = []
                // 省市区数据分类
                for (var item in data) {
                    if (item.match(/0000$/)) { //省
                        that.province.push({
                            id: item,
                            value: data[item],
                            children: []
                        })
                    } else if (item.match(/00$/)) { //市
                        that.city.push({
                            id: item,
                            value: data[item],
                            children: []
                        })
                    } else { //区
                        that.block.push({
                            id: item,
                            value: data[item]
                        })
                    }
                }
                // 分类市级
                for (var index in that.province) {
                    for (var index1 in that.city) {
                        if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0,
                                2)) {
                            that.province[index].children.push(that.city[index1])
                        }
                    }
                }
                // 分类区级
                for (var item1 in that.city) {
                    for (var item2 in that.block) {
                        if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                            that.city[item1].children.push(that.block[item2])
                        }
                    }
                }
            },
            // 选省
            choseProvince: function (e) {
                for (var index2 in this.province) {
                    if (e === this.province[index2].id) {
                        this.shi1 = this.province[index2].children
                        this.shi = this.province[index2].children[0].value
                        this.qu1 = this.province[index2].children[0].children
                        this.qu = this.province[index2].children[0].children[0].value
                        this.E = this.qu1[0].id
                    }
                }
            },
            // 选市
            choseCity: function (e) {
                for (var index3 in this.city) {
                    if (e === this.city[index3].id) {
                        this.qu1 = this.city[index3].children
                        this.qu = this.city[index3].children[0].value
                        this.E = this.qu1[0].id
                        // console.log(this.E)
                    }
                }
            },
            // 选区
            choseBlock: function (e) {
                this.E = e;
                // console.log(this.E)
            },
        },
        created: function () {
            this.getCityData()
        }
    }
</script>

<style lang="less" scoped>
    .linkage {
        width: 100%;
        display: flex;
        justify-content: space-around;

        .el-select {
            margin-left: 10px;
        }
    }
</style>