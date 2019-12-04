<template>
    <div class="ml-container">
       <el-table v-show="showProject" :data="projectDemand" stripe style="width: 100%" :header-cell-style="{background:'#fa7a1b',height:'42px',color:'#fff',fontWeight:'normal'}">
            <el-table-column align="center" label="编号" type="index">
            </el-table-column>
            <el-table-column align="center" label="项目名称" prop="pName">
            </el-table-column>
            <el-table-column align="center" label="发布日期" prop="pDate">
            </el-table-column>
            <el-table-column align="center" label="项目领域" prop="pTypeStr">
            </el-table-column>
            <el-table-column align="center" label="项目类型" prop="pDemand">
            </el-table-column>
            <el-table-column align="center" label="项目所处阶段" prop="stageStr">
            </el-table-column>
            <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="clickDetailHandler(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-table v-show="showDemand" :data="demandData" stripe style="width: 100%" :header-cell-style="{background:'#fa7a1b',height:'42px',color:'#fff',fontWeight:'normal'}">
            <el-table-column align="center" label="编号" type="index">
            </el-table-column>
            <el-table-column align="center" label="需求名称" prop="demandName">
            </el-table-column>
            <el-table-column align="center" label="发布日期" prop="date">
            </el-table-column>
            <el-table-column align="center" label="单位名称" prop="eName">
            </el-table-column>
            <el-table-column align="center" label="需求类型" prop="ptrpeStr">
            </el-table-column>
            <el-table-column align="center" label="用户类型" prop="utrpeStr">
            </el-table-column>
            <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                <el-button size="small" @click="clickDetailHandler(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-table  v-show="showExpert" :data="expertData" stripe style="width: 100%" :header-cell-style="{background:'#fa7a1b',height:'42px',color:'#fff',fontWeight:'normal'}">
            <el-table-column align="center" label="编号" type="index">
            </el-table-column>
            <el-table-column align="center" label="专家姓名" prop="userName">
            </el-table-column>
            <el-table-column align="center" label="专业特长" prop="speciality">
            </el-table-column>
            <el-table-column align="center" label="工作单位" prop="workunit">
            </el-table-column>
            <el-table-column align="center" label="荣誉" prop="honor">
            </el-table-column>
            <el-table-column align="center" label="专家简介" prop="introduction">
            </el-table-column>
            <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="clickDetailHandler(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-box">
            <el-pagination background :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="total"  @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getProjectListApi, getDemandListApi, getExpertListApi } from '@/api/api.js'
    export default {
        data(){
            return{
                projectDemand:[],
                currentPage: 1,
                total:1,
                pagesize:10,
                demandData:[],
                expertData:[],
                showProject:false,
                showDemand:false,
                showExpert:false,
            }
        },
        methods: {
            clickDetailHandler(row){
                // console.log(row);
                this.$store.dispatch('changeDetailId',row.id)
                this.$store.dispatch('changeDemandType',row.ptype)
                this.$router.push('/index/detail')
            },
            handleCurrentChange(val){
                this.currentPage = val
                let listName = this.$store.state.listName
                if(listName=='project'){
                    this.getProjectList(this.currentPage)
                }else if(listName=='demand'){
                    this.getDemandList(this.currentPage)
                }else if(listName=='expert'){
                    this.getExpertList(this.currentPage)
                }
                // console.log(val);
                
            },
            getProjectList(curPage){
                getProjectListApi(this.currentPage).then((res)=>{
                    // console.log(res);
                    if(res.data.code==0){
                        this.projectDemand = res.data.data.list
                        this.total = res.data.data.count
                    }
                })
            },
            getDemandList(curPage){
                getDemandListApi(this.currentPage).then((res)=>{
                    // console.log(res);
                    if(res.data.code==0){
                        this.demandData = res.data.data.list
                        this.total = res.data.data.count
                    }
                })
            },
            getExpertList(curPage){
                getExpertListApi(this.currentPage).then((res)=>{
                    // console.log(res);
                    if(res.data.code==0){
                        this.expertData = res.data.data.list
                        this.total = res.data.data.count
                    }
                })
            }
        },
        created(){
            let listName = this.$store.state.listName
            if(listName=='project'){
                this.showProject = true
                this.getProjectList(this.currentPage)
            }else if(listName == 'demand'){
                this.showDemand = true
                this.getDemandList(this.currentPage)
            }else if(listName == 'expert'){
                this.showExpert = true
                this.getExpertList(this.currentPage)
            }
        }
    }
</script>

<style>
    /* 修改分页背景色 */
    .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #fa7a1b !important;
    }
    .el-pagination.is-background .el-pager li:hover{
        color: #fa7a1b !important;
    }
</style>
<style lang="less" scoped>
    .ml-container{
        width: 1200px;
        margin: 40px auto;
        .el-table{
            .el-button{
                width: 64px;
                background-color: #fff8f3;
                border: solid 1px #fa7a1b;
                color: #fa7a1b;
                font-size: 14px;
            }
        }
        /deep/ .el-table .cell{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        .pagination-box{
            margin-top: 30px;
            display: flex;
            justify-content: center;
        }
    }
</style>