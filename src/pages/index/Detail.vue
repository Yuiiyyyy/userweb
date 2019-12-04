<template>
    <div class="detail-container">
        <div class="card-box">
            <el-card class="box-card" v-show="showProject">
                <div class="title">
                    <h3>项目详情</h3>
                    <div class="btn-box">
                        <el-button size="small" @click="clickCollectHandler(0)">收藏</el-button>
                        <el-button size="small" @click="checkMoreListHandler">项目列表</el-button>
                        <el-button size="small" @click="clickJointHandler">请求对接</el-button>
                    </div>
                </div>
                <el-form ref="form" :model="projectForm" label-width="150px">
                    <el-form-item label="项目名称：">
                        <span>{{projectForm.pName}}</span>
                    </el-form-item>
                    <el-form-item label="项目简介：">
                        <span>{{projectForm.pBrief}}</span>
                    </el-form-item>
                    <el-form-item label="项目类型：">
                        <span>{{projectForm.pTypeStr}}</span>
                    </el-form-item>
                    <el-form-item label="项目阶段：">
                        <span>{{projectForm.stageStr}}</span>
                    </el-form-item>
                    <el-form-item label="项目需求：">
                        <span>{{projectForm.pDemand}}</span>
                    </el-form-item>
                    <el-form-item label="项目成果：">
                        <span>{{projectForm.pResults}}</span>
                    </el-form-item>
                    <el-form-item label="项目资金需求：">
                        <span>{{projectForm.pCapitalDemand}}</span>
                    </el-form-item>
                    <h3>项目创建人信息</h3>
                    <el-form-item label="姓名：">
                        <span>{{projectForm.userName}}</span>
                    </el-form-item>
                    <el-form-item label="学历：">
                        <span>{{projectForm.educationStr}}</span>
                    </el-form-item>
                    <el-form-item label="毕业学校：">
                        <span>{{projectForm.graduationSchool}}</span>
                    </el-form-item>
                    <el-form-item label="专业：">
                        <span>{{projectForm.major}}</span>
                    </el-form-item>
                    <el-form-item label="研究机构：">
                        <span>{{projectForm.researchInstitution}}</span>
                    </el-form-item>
                    <el-form-item label="研究机构简介：">
                        <span>{{projectForm.researchInstitutionBrief}}</span>
                    </el-form-item>
                    <el-form-item label="地址：">
                        <span>{{projectForm.address}}</span>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="box-card" v-show="showDemand">
                <div class="title">
                    <h3>需求详情</h3>
                    <div class="btn-box">
                        <el-button size="small" @click="clickCollectHandler(0)">收藏</el-button>
                        <el-button size="small" @click="checkMoreListHandler">项目列表</el-button>
                        <el-button size="small" @click="clickJointHandler">请求对接</el-button>
                    </div>
                </div>
                <el-form ref="demandForm" :model="demandForm" v-show="showTalentDemand" label-width="150px">
                    <el-form-item label="需求名称：">
                        <span>{{demandForm.nameCh}}</span>
                    </el-form-item>
                    <el-form-item label="需求概况：">
                        <span>{{demandForm.surveyCh}}</span>
                    </el-form-item>
                    <el-form-item label="用人单位：">
                        <span>{{demandForm.unitCh}}</span>
                    </el-form-item>
                    <el-form-item label="所属行业：">
                        <span>{{demandForm.unitCh}}</span>
                    </el-form-item>
                    <el-form-item label="问题和目标：">
                        <span>{{demandForm.targetCh}}</span>
                    </el-form-item>
                    <el-form-item label="对专家的要求：">
                        <span>{{demandForm.requireCh}}</span>
                    </el-form-item>
                    <el-form-item label="拟聘专家人次：">
                        <span>{{demandForm.recruitCount}}</span>
                    </el-form-item>
                    <el-form-item label="专家来华时长：">
                        <span>{{demandForm.termCh}}</span>
                    </el-form-item>
                    <el-form-item label="专家工作条件：">
                        <span>{{demandForm.conditionsCh}}</span>
                    </el-form-item>
                    <h3>负责人信息</h3>
                    <el-form-item label="负责人姓名：">
                        <span>{{demandForm.leaderCh}}</span>
                    </el-form-item>
                    <el-form-item label="负责人职位：">
                        <span>{{demandForm.leaderPositionCh}}</span>
                    </el-form-item>
                </el-form>
                <el-form ref="demandForm" :model="demandForm" v-show="showCompanyDemand" label-width="150px">
                    <el-form-item label="单位名称：">
                        <span>{{demandForm.eName}}</span>
                    </el-form-item>
                    <el-form-item label="单位性质：">
                        <span>{{demandForm.natureChStr}}</span>
                    </el-form-item>
                    <el-form-item label="官网地址：">
                        <span>{{demandForm.eWebsite}}</span>
                    </el-form-item>
                    <el-form-item label="单位简介：">
                        <span>{{demandForm.eBrief}}</span>
                    </el-form-item>
                    <el-form-item label="所需资源描述：">
                        <span>{{demandForm.eDemand}}</span>
                    </el-form-item>
                    <el-form-item label="单位所在区域及自有资源状况简介：">
                        <span>{{demandForm.eSourceBrief}}</span>
                    </el-form-item>
                    <el-form-item label="承接项目资本(单位：万元)：">
                        <span>{{demandForm.eCapital}}</span>
                    </el-form-item>
                    <el-form-item label="对接合作方式：">
                        <span>{{demandForm.eCooperationStr}}</span>
                    </el-form-item>
                    <el-form-item label="补充说明：">
                        <span>{{demandForm.eRemark}}</span>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="box-card" v-show="showExpert">
                <div class="title">
                    <h3>专家详情</h3>
                    <div class="btn-box">
                        <el-button size="small" @click="clickCollectHandler(0)">收藏</el-button>
                        <el-button size="small" @click="checkMoreListHandler">项目列表</el-button>
                        <el-button size="small" @click="clickJointHandler">请求对接</el-button>
                    </div>
                </div>
                <el-form ref="expertForm" :model="expertForm" label-width="150px">
                    <el-form-item label="专家姓名：">
                        <span>{{expertForm.userName}}</span>
                    </el-form-item>
                    <el-form-item label="专家姓名：">
                        <span>{{expertForm.userName}}</span>
                    </el-form-item>
                    <el-form-item label="专家头像：">
                        <!-- <img :src="`http://45.40.206.109:9999/${expertForm.img}`" alt=""> -->
                    </el-form-item>
                    <el-form-item label="性别：">
                        <span>{{expertForm.sexStr}}</span>
                    </el-form-item>
                    <el-form-item label="国籍：">
                        <span>{{expertForm.nationalityStr}}</span>
                    </el-form-item>
                    <el-form-item label="身份：">
                        <span>{{expertForm.identity}}</span>
                    </el-form-item>
                    <el-form-item label="学历：">
                        <span>{{expertForm.educationStr}}</span>
                    </el-form-item>
                    <el-form-item label="专业(本科)：" v-show="showBachelor">
                        <span>{{expertForm.majorUndergraduate}}</span>
                    </el-form-item>
                    <el-form-item label="毕业院校(本科)：" v-show="showBachelor">
                        <span>{{expertForm.schoolUndergraduate}}</span>
                    </el-form-item>
                    <el-form-item label="专业(硕士)：" v-show="showMaster">
                        <span>{{expertForm.majorMaster}}</span>
                    </el-form-item>
                    <el-form-item label="毕业院校(硕士)：" v-show="showMaster">
                        <span>{{expertForm.schoolMaster}}</span>
                    </el-form-item>
                    <el-form-item label="专业(博士)：" v-show="showDoctor">
                        <span>{{expertForm.majorDoctor}}</span>
                    </el-form-item>
                    <el-form-item label="毕业院校(博士)：" v-show="showDoctor">
                        <span>{{expertForm.schoolDoctor}}</span>
                    </el-form-item>
                    <el-form-item label="荣誉：">
                        <span>{{expertForm.honor}}</span>
                    </el-form-item>
                    <el-form-item label="专业特长：">
                        <span>{{expertForm.speciality}}</span>
                    </el-form-item>
                    <el-form-item label="专家简介：">
                        <span>{{expertForm.introduction}}</span>
                    </el-form-item>
                    <el-form-item label="主要学术成果：">
                        <span>{{expertForm.academic}}</span>
                    </el-form-item>
                    <el-form-item label="工作单位：">
                        <span>{{expertForm.workunit}}</span>
                    </el-form-item>
                    <el-form-item label="其他：">
                        <span>{{expertForm.other}}</span>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
        <!-- 视频播放器 -->
        <div class="video-box" v-show="isShow">
            <div class="title">项目路演</div>
            <video src="" class="video" controls="controls">您的浏览器不支持视频播放</video>
        </div>
        <!-- 综合指数 -->
        <div class="index-box" v-show="isShow" id="index-box">
            <div class="title">综合指数</div>
            <div class="pic-box">
                <Echarts />
            </div>
        </div>
    </div>
</template>

<script>
import Echarts from '../../components/Echarts'
import {getProjectDetailApi,getDemandDetailApi, getExpertDetailApi,getCollectionClickApi} from "@/api/api.js";
    export default {
        components:{
            Echarts
        },
        data() {
            // 
            return {
                detailName: '',
                listName: '',
                indexPic: require('../../assets/imgs/index.jpg'),
                showProject: false,
                showDemand: false,
                showExpert: false,
                id: '',
                type: '',
                // 项目列表
                projectForm: {},
                // 需求列表
                demandForm: {},
                expertForm: {},
                showTalentDemand: false,
                showCompanyDemand: true,
                isShow: false,
                showBachelor: true,
                showMaster: true,
                showDoctor: true,
            }
        },
        created() {
            this.detailName = this.$store.state.detailId
            this.listName = this.$store.state.listName
            if (this.listName == 'project') {
                this.isShow = true
                this.showProject = true
                this.type = 0
                this.$store.dispatch('changeType', this.type)
                getProjectDetailApi(this.detailName).then((res) => {
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.projectForm = res.data.data
                    }
                })
            } else if (this.listName == 'demand') {
                this.showDemand = true
                this.type = 1
                this.$store.dispatch('changeType', this.type)
                // console.log('需求类型',this.$store.state.demandType)
                if (this.$store.state.demandType == 0) {
                    //人才需求
                    this.showTalentDemand = true
                } else if (this.$store.state.demandType == 1) {
                    // 企业需求
                    this.showCompanyDemand = true
                }
                getDemandDetailApi(this.detailName).then((res) => {
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.demandForm = res.data.data.demand
                    }
                })
            } else if (this.listName == 'expert') {
                this.showExpert = true
                this.type = 2
                this.$store.dispatch('changeType', this.type)
                getExpertDetailApi(this.detailName).then((res) => {
                    if (res.data.code == 0) {
                        // console.log(res);
                        this.expertForm = res.data.data
                        if (this.expertForm.majorUndergraduate == '') {
                            this.showBachelor = false
                        } else if (this.expertForm.majorMaster == '') {
                            this.showMaster = false
                        } else if (this.expertForm.majorDoctor == '') {
                            this.showDoctor = false
                        }
                    }
                })
            }
            // console.log(this.$store.state.type);
        },
        methods: {
            clickCollectHandler(val) {
                this.$store.dispatch('changeCollection', val)
                this.id = this.$store.state.detailId
                // console.log(this.id);
                getCollectionClickApi(this.id, this.type).then((res) => {
                    if (res.data.code == -1000) {
                        this.$alert('请登录', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/login')
                            }
                        });
                    } else if (res.data.code == 0) {
                        this.$confirm('收藏成功！是否查看收藏列表', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$router.push('/manager/collection')
                        }).catch(() => {

                        });
                    } else if (res.data.code == -2) {
                        this.$confirm('已经收藏过了！是否查看收藏列表', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$router.push('/manager/collection')
                        }).catch(() => {

                        });
                    }
                    // console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
            },
            checkMoreListHandler() {
                this.$router.push('/index/morelist')
            },
            clickJointHandler(){
                this.$notify({
                    title: '提示',
                    message: '即将上线！Coming soon!',
                    offset: 100
                });
            }
        }

    }
</script>

<style lang="less" scoped>
    .detail-container {
        width: 1200px;
        height: 100%;
        margin: 50px auto;

        .card-box {
            .box-card {
                padding: 40px;

                img {
                    width: 100px;
                    height: 100px;
                }
            }

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .btn-box {
                    .el-button {
                        width: 100px;
                        border-radius: 3px;
                        color: #fff;
                        background-color: #f05050;
                    }
                }
            }

            /deep/ .el-form-item__label {
                font-weight: bold;
                color: #606266;
                font-size: 14px;
            }

            /deep/ .el-form-item__content span {
                font-size: 14px;
                color: rgb(141, 146, 161);
                line-height: 30px;
            }
        }

        .video-box {
            padding: 40px;

            .title {
                font-size: 24px;
                color: #333;
                font-family: MicrosoftYaHei-Bold;
                font-weight: bold;
            }

            .video {
                margin-top: 30px;
                width: 100%;
                height: 500px;
            }
        }

        .index-box {
            padding: 40px;

            .title {
                font-size: 24px;
                color: #333;
                font-family: MicrosoftYaHei-Bold;
                font-weight: bold;
            }

            .pic-box {
                width: 620px;
                height: 400px;
                margin: 40px auto 0px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>