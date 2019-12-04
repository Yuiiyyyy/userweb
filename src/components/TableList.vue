<template>
    <div class="table-container">
        <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#fa7a1b',height:'42px',color:'#fff',fontWeight:'normal'}">
            <el-table-column v-for="(item,index) in titleList" :key="index" :prop="item.prop" :label="item.title">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                titleList:[{title:'项目名称',prop:'name'},{title:'项目领域',prop:'area'},{title:'项目所处阶段',prop:'period'}],
                tableData:[{name:'xxxxx',area:'生命健康',period:'xxxxxx'},
                {name:'xxxxx',area:'生命健康',period:'xxxxxx'},
                {name:'xxxxx',area:'生命健康',period:'xxxxxx'},
                {name:'xxxxx',area:'生命健康',period:'xxxxxx'},
                {name:'xxxxx',area:'生命健康',period:'xxxxxx'},
                {name:'xxxxx',area:'生命健康',period:'xxxxxx'},
                {name:'xxxxx',area:'生命健康',period:'xxxxxx'}
                ]
            }
        },
    }
</script>

<style lang="less" scoped>
    .table-container{
        .el-table{
            width: 100%;
            height: 100%;
        }
    }
</style>