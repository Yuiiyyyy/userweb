<template>
    <!-- 首页 -->
    <div class="index-container">
        <!-- 总数预览 -->
        <div class="total-box">
            <div class="single-box">
                <div class="left">
                    <img :src="require('../../assets/imgs/resource.png')" alt="">
                </div>
                <div class="right">
                    <div class="top">{{projectCount}}</div>
                    <div class="bottom">资源总数</div>
                </div>
            </div>
            <div class="single-box">
                <div class="left">
                    <img :src="require('../../assets/imgs/zhifeiji.png')" alt="">
                </div>
                <div class="right">
                    <div class="top">{{demandCount}}</div>
                    <div class="bottom">需求发布量</div>
                </div>
            </div>
            <div class="single-box">
                <div class="left">
                    <img :src="require('../../assets/imgs/expert.png')" alt="">
                </div>
                <div class="right">
                    <div class="top">{{expertCount}}</div>
                    <div class="bottom">专家总数</div>
                </div>
            </div>
            <div class="single-box">
                <div class="left">
                    <img :src="require('../../assets/imgs/liwu.png')" alt="">
                </div>
                <div class="right">
                    <div class="top">11</div>
                    <div class="bottom">活动举办</div>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="list-box">
            <div class="top">
                <div class="single-list-box">
                    <div class="title">
                        <div class="left">
                            <img :src="require('../../assets/imgs/pic_1.jpg')" alt="">
                            <h3>项目展示</h3>
                        </div>
                        <div class="right" @click="checkMore('project')">查看更多>></div>
                    </div>
                    <div class="resource-box">
                        <el-table @row-click="rowClickProject" :data="resourceData" stripe style="width: 100%" :header-cell-style="{background:'#fa7a1b',height:'42px',color:'#fff',fontWeight:'normal'}" >
                            <el-table-column label="项目名称" prop="pName"></el-table-column>
                            <el-table-column label="类型" prop="pTypeStr"></el-table-column>
                            <el-table-column label="项目所处阶段" prop="stageStr"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="single-list-box">
                    <div class="title">
                        <div class="left">
                            <img :src="require('../../assets/imgs/pic_2.jpg')" alt="">
                            <h3>需求对接</h3>
                        </div>
                        <div class="right" @click="checkMore('demand')">查看更多>></div>
                    </div>
                    <div class="resource-box">
                        <el-table @row-click="rowClickDemand" :data="demandData" stripe style="width: 100%" :header-cell-style="{background:'#fa7a1b',height:'42px',color:'#fff',fontWeight:'normal'}">
                            <el-table-column label="需求类型" prop="ptrpeStr" align="center">
                            </el-table-column>
                            <el-table-column label="需求名称" prop="demandName"></el-table-column>
                            <el-table-column label="发布单位" prop="eName"></el-table-column>
                            <el-table-column label="发布日期" prop="date"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="single-list-box">
                    <div class="title">
                        <div class="left">
                            <img :src="require('../../assets/imgs/pic_3.jpg')" alt="">
                            <h3>专家展示</h3>
                        </div>
                        <div class="right" @click="checkMore('expert')">查看更多>></div>
                    </div>
                    <div class="resource-box">
                        <el-table @row-click="rowClickExpert" :data="expertData" stripe style="width: 100%" :header-cell-style="{background:'#fa7a1b',height:'42px',color:'#fff',fontWeight:'normal'}">
                            <el-table-column label="序号" type="index" align="center"></el-table-column>
                            <el-table-column label="照片" align="center">
                                <template slot-scope="scope">
                            　　　　<img :src="require('../../assets/imgs/man.jpg')" width="50" height="50" v-if="scope.row.sexStr=='男'" />
                            　　　　<img :src="require('../../assets/imgs/woman.jpg')" width="50" height="50"  v-if="scope.row.sexStr=='女'" />
                            　　</template>
                            </el-table-column>
                            <el-table-column label="姓名" prop="userName"></el-table-column>
                            <el-table-column label="工作单位" prop="workunit"></el-table-column>
                            <el-table-column label="荣誉" prop="honor"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="single-list-box">
                    <div class="title">
                        <div class="left">
                            <img :src="require('../../assets/imgs/pic_4.jpg')" alt="" >
                            <h3>培训活动</h3>
                        </div>
                        <div class="right">查看更多>></div>
                    </div>
                    <div class="resource-box">
                        <el-table :data="trainingData" stripe style="width: 100%" :header-cell-style="{background:'#fa7a1b',height:'42px',color:'#fff',fontWeight:'normal'}">
                            <el-table-column label="序号" type="index" align="center"></el-table-column>
                            <el-table-column label="活动" prop="acitivity" align="center"></el-table-column>
                            <el-table-column label="活动时间" prop="aDate" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 合作伙伴 -->
        <div class="partner-box">
            <!-- 标题 -->
            <div class="title">
                <img :src="require('../../assets/imgs/pic_5.jpg')" alt="">
                <h3>合作伙伴</h3>
            </div>
            <div class="img-box">
                    <div class="single" v-for="(item,index) in imgList" :key="index">
                        <img :src="item.img" alt="">
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getIndexApi } from '@/api/api.js'
    export default {
        data(){
            return{
                imgList:[
                    {img:require('../../assets/imgs/img_1.jpg')},
                    {img:require('../../assets/imgs/img_2.jpg')},
                    {img:require('../../assets/imgs/img_3.jpg')},
                    {img:require('../../assets/imgs/img_4.jpg')},
                    {img:require('../../assets/imgs/img_5.jpg')},
                    {img:require('../../assets/imgs/img_1.jpg')},
                    {img:require('../../assets/imgs/img_2.jpg')},
                    {img:require('../../assets/imgs/img_3.jpg')}
                ],
                resourceData:[],
                demandData:[],
                expertData:[],
                trainingData:[
                    {
                        acitivity:'第十七届中国国际人才交流大会将于4月14日-15日在深召开',
                        aDate:'2019-01-17'
                    },
                    {
                        acitivity:'2019年全国科技工作会议在京闭幕',
                        aDate:'2019-01-11'
                    },
                    {
                        acitivity:'第十七届中国国际人才交流大会预选供应商公开遴选启事',
                        aDate:'2019-01-09'
                    },
                    {
                        acitivity:'祝勤公使出席中国国际人才交流协会驻英代表处成立30周年纪念活动',
                        aDate:'2018-12-03'
                    },
                    {
                        acitivity:'英国约克公爵安德鲁王子访问北京大学汇丰商学院',
                        aDate:'2018-11-06'
                    },
                    {
                        acitivity:'中国政府友谊奖颁奖仪式在北京举行',
                        aDate:'2018-09-30'
                    },
                    {
                        acitivity:'引进外国人才智力成果首次亮相全国科技活动周',
                        aDate:'2018-05-22'
                    },
                    {
                        acitivity:'第十七届中国国际人才交流大会组委会第一次会议在深圳召开',
                        aDate:'2018-09-19'
                    },
                    {
                        acitivity:'深圳：改革开放40年“中国硅谷”炼成记',
                        aDate:'2018-08-27'
                    },
                ],
                projectCount:'0',
                demandCount:'0',
                expertCount:'0',
                showMan:false,
                showWoman:false,
            }
        },
        methods:{
            checkMore(val){
                this.$store.dispatch('changeListName',val)
                this.$router.push('/index/morelist')
            },
            rowClickProject(row){
                // console.log(row);
                this.$store.dispatch('changeListName','project')
                this.$store.dispatch('changeDetailId',row.id)
                this.$store.dispatch('changeType',0)
                this.$router.push('/index/detail')
            },
            rowClickDemand(row){
                // console.log(row.ptype);
                this.$store.dispatch('changeDemandType',row.ptype)
                this.$store.dispatch('changeListName','demand')
                this.$store.dispatch('changeDetailId',row.id)
                this.$store.dispatch('changeType',1)
                // console.log('需求类型',this.$store.state.demandType);
                this.$router.push('/index/detail')
            },
            rowClickExpert(row){
                // console.log(row);
                this.$store.dispatch('changeListName','expert')
                this.$store.dispatch('changeDetailId',row.id)
                this.$store.dispatch('changeType',2)
                this.$router.push('/index/detail')
            },
        },
        created(){
            getIndexApi().then((res)=>{
                // console.log(res.data);
                this.resourceData = res.data.data.projectList
                this.demandData = res.data.data.demandList
                this.expertData = res.data.data.expertList
                this.projectCount = res.data.data.projectCount
                this.demandCount = res.data.data.demandCount
                this.expertCount = res.data.data.expertCount
            })
        },
    }
</script>

<style>
.el-table--enable-row-hover .el-table__body tr:hover{
    cursor: pointer;
}
</style>


<style lang="less" scoped>
    .index-container{
        width: 100%;
        height: 100%;
        margin: 50px auto;
        .total-box{
            width: 1200px;
            margin: 0 auto;
            height: 150px;
            background-color: #ffffff;
            box-shadow: 0px 0px 20px 0px rgba(102, 102, 102, 0.1);
            display: flex;
            justify-content: space-around;
            align-items: center;
            .single-box{
                display: flex;
                .left{
                    width: 66px;
                    height: 66px;
                    background-image: linear-gradient(90deg,#f93b5e 0%,#fa7a1b 100%),linear-gradient(#fa7a1b,#fa7a1b);
                    background-blend-mode: normal,normal;
                    border-radius: 33px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 70%;
                        height: 70%;
                    }
                }
                .right{
                    margin-left: 30px;
                    .top{
                        font-family: Arial-BoldMT;
                        font-size: 36px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 36px;
                        letter-spacing: 0px;
                        color: #333333;
                    }
                    .bottom{
                        font-family: MicrosoftYaHei;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 36px;
                        letter-spacing: 0px;
                        color: #333333;
                    }
                }
            }
        }
        .list-box{
            width: 1200px;
            margin: 0 auto;
            margin-top: 100px;
            .top{
                display: flex;
                justify-content: space-between;
                .single-list-box{
                    min-width: 580px;
                    .resource-box{
                        min-height:300px;
                        background-color: #ffffff;
                        box-shadow: 0px 0px 20px 0px rgba(102, 102, 102, 0.1);
                        padding: 10px;
                        margin-top: 20px;
                        /deep/ .el-table .cell{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        // /deep/ .el-table .cell img{
                        //     width: 50px;
                        // }
                    }
                    .title{
                        line-height: 24px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin:20px 0;
                        .left{
                            font-family: MicrosoftYaHei-Bold;
                            font-size: 24px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 0px;
                            letter-spacing: 0px;
                            color: #333333;
                            display: flex;
                            align-items: center;
                            img{
                                width: 24px;
                                height: 24px;
                                background-image: linear-gradient(90deg,#f93b5e 0%,#fa7a1b 100%);
                                margin-right: 10px;
                                margin-left: 5px;
                            }
                        }
                        .right{
                            font-family: MicrosoftYaHei;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 0px;
                            letter-spacing: 0px;
                            color: #999999;
                            cursor: pointer;
                        }
                    }
                }
            }
            .bottom{
                display: flex;
                justify-content: space-between;
                .single-list-box{
                    min-width: 580px;
                    .resource-box{
                        min-height: 500px;
                        background-color: #ffffff;
                        box-shadow: 0px 0px 20px 0px rgba(102, 102, 102, 0.1);
                        padding: 10px;
                        margin-top: 20px;
                        /deep/ .el-table .cell{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .title{
                        line-height: 24px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin:20px 0;
                        .left{
                            font-family: MicrosoftYaHei-Bold;
                            font-size: 24px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 0px;
                            letter-spacing: 0px;
                            color: #333333;
                            display: flex;
                            align-items: center;
                            img{
                                width: 24px;
                                height: 24px;
                                background-image: linear-gradient(90deg,#f93b5e 0%,#fa7a1b 100%);
                                margin-right: 10px;
                                margin-left: 5px;
                            }
                        }
                        .right{
                            font-family: MicrosoftYaHei;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 0px;
                            letter-spacing: 0px;
                            color: #999999;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .partner-box{
            width: 1200px;
            margin: 0 auto;
            margin-top: 40px;
            .title{
                display: flex;
                align-items: center;
                img{
                    width: 26px;
                    height: 24px;
                    margin-right: 10px;
                }
                h3{
                    font-family: MicrosoftYaHei-Bold;
                    font-size: 24px;
                    font-stretch: normal;
                    line-height: 0px;
                    letter-spacing: 0px;
                    color: #333333;
                }
            }
            .img-box{
                margin-top: 40px;
                display: flex;
                flex-wrap: wrap;
                .single{
                    width: 280px;
                    height: 190px;
                    border: 1px dashed #dfdfdf;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-left: none;
                    border-top: none;
                }
            }
        }
    }

</style>