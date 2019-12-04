<template>
    <div class="cl-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="项目" name="0">
                <div class="card-box">
                    <el-card class="box-card">
                        <el-table :data="tableData" stripe @selection-change="handleSelectionChange" @row-click="rowClickProject">
                            <el-table-column type="selection" align="center">
                            </el-table-column>
                            <el-table-column type="index" :index="indexMethod" label="序号" align="center">
                            </el-table-column>
                            <el-table-column prop="identifier" label="项目编号" align="center">
                            </el-table-column>
                            <el-table-column prop="pName" label="项目名称" align="center">
                            </el-table-column>
                            <el-table-column prop="pDate" label="时间" align="center">
                            </el-table-column>
                            <el-table-column prop="uTypeStr" label="用户类型" align="center">
                            </el-table-column>
                            <el-table-column prop="pTypeStr" label="项目领域" align="center">
                            </el-table-column>
                            <el-table-column prop="stageStr" label="项目阶段" align="center">
                            </el-table-column>
                            <el-table-column prop="operation" label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button @click.stop="clickRemove(scope.row)" type="text" size="small"
                                        class="el-icon-delete">
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="all">
                            <i class="el-icon-delete"></i>
                            <span @click="deleteSelected">批量删除</span>
                        </div>
                        <div class="pagination-box">
                            <el-pagination background layout="prev, pager, next" :page-size="pagesize" :total="total"
                                @current-change="handleCurrentChange">
                            </el-pagination>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="需求" name="1">
                <div class="card-box">
                    <el-card class="box-card">
                        <el-table :data="tableData" stripe @selection-change="handleSelectionChange" @row-click="rowClickDemand">
                            <el-table-column type="selection" align="center">
                            </el-table-column>
                            <el-table-column type="index" :index="indexMethod" label="序号" align="center">
                            </el-table-column>
                            <el-table-column prop="identifier" label="需求编号" align="center">
                            </el-table-column>
                            <el-table-column prop="nickname" label="用户名称" align="center">
                            </el-table-column>
                            <el-table-column prop="pDate" label="时间" align="center">
                            </el-table-column>
                            <el-table-column prop="dTypeStr" label="人才类型" align="center">
                            </el-table-column>
                            <el-table-column prop="uTypeStr" label="用户类型" align="center">
                            </el-table-column>
                            <el-table-column prop="statusStr" label="审核状态" align="center">
                            </el-table-column>
                            <el-table-column prop="operation" label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button @click.stop="clickRemove(scope.row)" type="text" size="small"
                                        class="el-icon-delete">
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="all">
                            <i class="el-icon-delete"></i>
                            <span @click="deleteSelected">批量删除</span>
                        </div>
                        <div class="pagination-box">
                            <el-pagination background layout="prev, pager, next" :page-size="pagesize" :total="total"
                                @current-change="handleCurrentChange">
                            </el-pagination>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="专家" name="2">
                <div class="card-box">
                    <el-card class="box-card">
                        <el-table :data="tableData" stripe @selection-change="handleSelectionChange" @row-click="rowClickExpert">
                            <el-table-column type="selection" align="center">
                            </el-table-column>
                            <el-table-column type="index" :index="indexMethod" label="序号" align="center">
                            </el-table-column>
                            <el-table-column prop="identifier" label="专家编号" align="center">
                            </el-table-column>
                            <el-table-column prop="nickname" label="姓名" align="center">
                            </el-table-column>
                            <el-table-column prop="honor" label="荣誉" align="center">
                            </el-table-column>
                            <el-table-column prop="speciality" label="专业特长" align="center">
                            </el-table-column>
                            <el-table-column prop="workunit" label="工作单位" align="center">
                            </el-table-column>
                            <el-table-column prop="introduction" label="专家简介" align="center">
                            </el-table-column>
                            <el-table-column prop="operation" label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button @click.stop="clickRemove(scope.row)" type="text" size="small"
                                        class="el-icon-delete">
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="all">
                            <i class="el-icon-delete"></i>
                            <span @click="deleteSelected">批量删除</span>
                        </div>
                        <div class="pagination-box">
                            <el-pagination background layout="prev, pager, next" :page-size="pagesize" :total="total"
                                @current-change="handleCurrentChange">
                            </el-pagination>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="活动" name="3" class="activity">
                <div class="card-box">
                    <el-card class="box-card">
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {
        getCollectionApi,
        getCollectionDeleteApi
    } from '@/api/api.js'
    export default {
        data() {
            return {
                activeName: '1',
                tableData: [],
                projectData: [],
                curpage: 1,
                type: 1,
                pagesize: 10,
                total: 1,
                ids: []
            }
        },
        methods: {
            // tab切换
            handleClick(val) {
                // console.log(typeof val.index)
                let _type = parseInt(val.index)
                // console.log(typeof _type);

                this.type = _type
                // console.log('type',this.type);
                // console.log('session',this.$store.state.type);
                
                
                this.getCollectionList(this.curpage, this.type)
            },
            // 自定义索引
            indexMethod(index) {
                if (index < 10) {
                    return `000${index}`
                } else if (index < 100) {
                    return `00${index}`
                }
            },
            // 获取收藏列表
            getCollectionList(page, type) {
                getCollectionApi(this.curpage, this.type)
                    .then((res) => {
                        // console.log(res);
                        if (res.data.code == 0) {
                            this.tableData = res.data.data.list
                            this.total= res.data.data.count
                        }else if(res.data.code==-1000){
                            this.$alert('请登录', {
                                confirmButtonText: '确定',
                                callback: () => {
                                    this.$router.push('/login')
                                }
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            // 删除
            clickRemove(row) {
                if (this.ids.indexOf(row.id) == -1) {
                    this.ids.push(row.id)
                }
                // console.log(this.ids);
                this.$confirm('此操作删除此条收藏, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getCollectionDeleteApi(this.ids)
                        .then((res) => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getCollectionList(this.curPage)
                        })
                }).catch(() => {
                    this.ids.pop(row.id)
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //点击勾选
            handleSelectionChange(val) {
                // console.log(val);
                for (let obj of val) {
                    if (this.ids.indexOf(obj.id) == -1) {
                        this.ids.push(obj.id)
                    }
                }
            },
            // 批量删除
            deleteSelected() {
                if (this.ids.length) {
                    this.$confirm('此操作将永久删除所有收藏, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        getCollectionDeleteApi(this.ids)
                            .then((res) => {
                                if(res.data.code==0){
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    })
                                    this.getCollectionList(this.curPage)
                                }
                            })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            // 切换当前页
            handleCurrentChange(val) {
                this.curpage = val
                this.getCollectionList(this.curpage,this.type)
            },
            rowClickProject(row){
                // console.log(row.dataId);
                this.$store.dispatch('changeListName','project')
                this.$store.dispatch('changeDetailId',row.dataId)
                this.$router.push('/index/detail')
            },
            rowClickDemand(row){
                // console.log(row.pType);
                this.$store.dispatch('changeDemandType',row.pType)
                // console.log('需求类型',this.$store.state.demandType)
                
                this.$store.dispatch('changeListName','demand')
                this.$store.dispatch('changeDetailId',row.dataId)
                this.$router.push('/index/detail')
            },
            rowClickExpert(row){
                this.$store.dispatch('changeListName','expert')
                this.$store.dispatch('changeDetailId',row.dataId)
                this.$router.push('/index/detail')
            }
        },
        created() {
            this.type = this.$store.state.type
            // console.log('类型',this.type);
            this.activeName = this.type.toString()
            this.getCollectionList(1, this.type)
            
        }
    }
</script>

<style>
    /* 修改分页背景色 */
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #fa7a1b !important;
    }

    .el-pagination.is-background .el-pager li:hover {
        color: #fa7a1b !important;
    }

    .el-tabs__item {
        font-size: 18px;
        line-height: 18px;
        color: #333;
        font-weight: bold;
        padding-left: 20px;
    }

    .el-tabs__item:hover {
        color: #fa7a1b;
    }

    .el-tabs__item.is-active {
        color: #fa7a1b;
    }

    .el-tabs__active-bar {
        background-color: #fa7a1b;
    }

    .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
    .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
    .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        padding-left: 20px;
    }

    
</style>

<style lang="less" scoped>
    .cl-container {
        padding: 20px 40px;
        /deep/ .el-button--primary{
            background-color: #fa7a1b;
            border: 1px solid #fa7a1b;
        }
        .card-box {
            width: 100%;
            height: 100%;

            .box-card {
                padding: 20px 40px;
                padding-bottom: 100px;
                min-height: 400px;
                .el-table {

                    // 修改选中框效果
                    /deep/ .el-checkbox__inner {
                        background-color: #fff;
                        border: 1px solid #fb7a1c;
                    }

                    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
                        color: #fb7a1c;
                        background-color: #fb7a1c;
                    }

                    /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
                        color: #fb7a1c;
                    }

                    .el-button {
                        font-size: 18px;
                        color: #fb7a1c;
                    }
                }
                /deep/ .el-table .cell{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

        .all {
            margin-top: 20px;

            span {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #999999;
                cursor: pointer;
            }

            i {
                color: #fb7a1c;
                font-size: 20px;
                margin-left: 20px;
            }
        }

        .pagination-box {
            display: flex;
            justify-content: center;
            margin-top: 50px;
        }
    }
</style>