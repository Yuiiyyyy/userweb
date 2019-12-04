<template>
    <div class="md-container">
        <div class="card-box">
            <!-- 列表内容 -->
            <el-card class="box-card">
                <div class="title">需求列表</div>
                <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection" align="center">
                    </el-table-column>
                    <el-table-column type="index" :index="indexMethod" label="序号" align="center">
                    </el-table-column>
                    <el-table-column prop="identifier" label="用户编号" align="center">
                    </el-table-column>
                    <el-table-column prop="utrpeStr" label="用户类型" align="center">
                    </el-table-column>
                    <el-table-column prop="date" label="注册日期" align="center">
                    </el-table-column>
                    <el-table-column prop="statusStr" label="用户状态" align="center">
                    </el-table-column>
                    <el-table-column prop="nickname" label="用户名称" align="center">
                    </el-table-column>
                    <el-table-column prop="ptrpeStr" label="需求类型" align="center">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click.stop="clickUpdate(scope.row)" type="text" size="small" class="el-icon-edit">
                            </el-button>
                            <el-button @click.stop="clickRemove(scope.row)" type="text" size="small" class="el-icon-delete">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="all">
                    <i class="el-icon-delete"></i>
                    <span @click="deleteSelected">批量删除</span>
                </div>
            </el-card>
            <!-- 分页 -->
            <div class="pagination-box">
                <el-pagination background layout="prev, pager, next" :page-size="pagesize" :total="total"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <!-- 弹出框 -->
            <!-- 人才需求 -->
            <el-dialog title="人才需求" :visible.sync="dialogVisible" width="70%" :before-close="handleDemandClose" center
                close-on-click-modal>
                <el-form ref="form" :model="form" label-width="120px" :rules="talentRules">
                    <el-row>
                        <!-- 左边 -->
                        <el-col :span="12">
                            <el-form-item label="需求名称：" prop="nameCh">
                                <el-input v-model="form.nameCh" size="medium" clearable :maxlength="64">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="用人单位(中文)：" prop="unitCh">
                                <el-input v-model="form.unitCh" size="medium" clearable :maxlength="64">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="用人单位(英文)：">
                                <el-input v-model="form.unitEn" size="medium" clearable :maxlength="64">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="单位性质：">
                                <el-select v-model="form.natureCh">
                                    <el-option v-for="item in natureList" :key="item.label" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="需求概况(中文)：" prop="surveyCh">
                                <el-input type="textarea" v-model="form.surveyCh" size="medium" :rows="5" clearable
                                    :maxlength="512">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="需求概况(英文)：">
                                <el-input type="textarea" v-model="form.surveyEn" size="medium" :rows="5" clearable
                                    :maxlength="512">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="负责人姓名(中文)：" prop="leaderCh">
                                <el-input v-model="form.leaderCh" size="medium" clearable :maxlength="16">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="负责人姓名(英文)：">
                                <el-input v-model="form.leaderEn" size="medium" clearable :maxlength="16">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="负责人职位(英文)：">
                                <el-input v-model="form.leaderPositionEn" size="medium" clearable :maxlength="16">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="负责人职位(中文)：">
                                <el-input v-model="form.leaderPositionCh" size="medium" clearable :maxlength="16">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="传真：">
                                <el-input v-model="form.fax" size="medium" clearable :maxlength="16" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="电子邮箱：" prop="email">
                                <el-input v-model="form.email" size="medium" clearable :maxlength="32">
                                </el-input>
                            </el-form-item>

                        </el-col>
                        <!-- 右边 -->
                        <el-col :span="12">
                            <el-form-item label="预期目标(中文)：" prop="targetCh">
                                <el-input type="textarea" v-model="form.targetCh" size="medium" :rows="3" clearable
                                    :maxlength="512" placeholder="引进海外专家需要解决的问题和预期目标(中文)">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="预期目标(英文)：">
                                <el-input type="textarea" v-model="form.targetEn" size="medium" :rows="3" clearable
                                    :maxlength="512" placeholder="引进海外专家需要解决的问题和预期目标(英文)">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="对专家要求(中文)：" prop="requireCh">
                                <el-input type="textarea" v-model="form.requireCh" size="medium" :rows="2" clearable
                                    :maxlength="256">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="对专家要求(英文)：">
                                <el-input type="textarea" v-model="form.requireEn" size="medium" :rows="2" clearable
                                    :maxlength="256">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="拟聘专家人次：" prop="recruitCount" placeholder="请输入阿拉伯数字" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');">
                                <el-input v-model="form.recruitCount" size="medium" clearable :maxlength="4">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="专家来华时长(中文)：" prop="termCh">
                                <el-input v-model="form.termCh" size="medium" clearable :maxlength="3" placeholder="天"
                                    onkeyup="this.value=this.value.replace(/[^\d.]/g,'');">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="专家来华时长(英文)：" prop="termEn">
                                <el-input v-model="form.termEn" size="medium" clearable :maxlength="3"
                                    placeholder="days" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="专家工作条件(中文)：" prop="conditionsCh">
                                <el-input v-model="form.conditionsCh" size="medium" clearable :maxlength="64">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="专家工作条件(英文)：">
                                <el-input v-model="form.conditionsEn" size="medium" clearable :maxlength="64">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="所属行业：">
                                <el-cascader :options="industryList" v-model="form.pTypeInt"></el-cascader>
                            </el-form-item>
                            <el-form-item label="负责人电话：" prop="phone">
                                <el-input v-model="form.phone" size="medium" clearable :maxlength="16"
                                    onkeyup="this.value=this.value.replace(/[^\d.]/g,'');">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="负责人手机：" prop="mobile">
                                <el-input v-model="form.mobile" size="medium" clearable :maxlength="16" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="其他：">
                                <el-input v-model="form.other" size="medium" clearable :maxlength="16">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editDemandHandler">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 企业需求 -->
            <el-dialog title="企业需求" :visible.sync="companyVisible" width="70%" :before-close="handleProjectClose" center
                close-on-click-modal>
                <el-form ref="companyForm" :model="companyForm" label-width="120px" :rules="companyRules">
                    <el-row>
                        <!-- 左边 -->
                        <el-col :span="12">
                            <el-form-item label="需求名称：" prop="demandName">
                                <el-input v-model="companyForm.demandName" size="medium" clearable :maxlength="64">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="单位名称：" prop="eName">
                                <el-input v-model="companyForm.eName" size="medium" clearable :maxlength="128">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="单位性质：" >
                                <el-select v-model="companyForm.eNature">
                                    <el-option v-for="item in natureList" :key="item.label" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="联系电话：" prop="ePhone">
                                <el-input v-model="companyForm.ePhone" size="medium" clearable :maxlength="128" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="联系邮箱："  prop="eEmail">
                                <el-input v-model="companyForm.eEmail" size="medium" clearable :maxlength="128">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="单位简介：">
                                <el-input type="textarea" :rows="3" :cols="44" v-model="companyForm.eBrief"
                                    size="medium" clearable :maxlength="512">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="所需资源描述：">
                                <el-input type="textarea" :rows="3" :cols="44" v-model="companyForm.eDemand"
                                    size="medium" clearable :maxlength="512">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="自有资源状况简介:">
                                <el-input type="textarea" :rows="3" :cols="44" v-model="companyForm.eSourceBrief"
                                    size="medium" clearable :maxlength="512">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <!-- 右边 -->
                        <el-col :span="12">
                            <el-form-item label="官网地址：" prop="eWebsite">
                                <el-input v-model="companyForm.eWebsite" size="medium" clearable :maxlength="64">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="通讯地址：" prop="eAddress">
                                <el-input v-model="companyForm.eAddress" size="medium" clearable :maxlength="64">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="联系人(中):" prop="eLinkmanCh">
                                <el-input v-model="companyForm.eLinkmanCh" size="medium" clearable :maxlength="32">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="联系人(英):">
                                <el-input v-model="companyForm.eLinkmanEn" size="medium" clearable :maxlength="32">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="供需定位：">
                                <el-select v-model="companyForm.eLocation">
                                    <el-option v-for="item in locationList" :key="item.label" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="承接项目资本:">
                                <el-input v-model="companyForm.eCapital" size="medium" clearable :maxlength="6"
                                    placeholder="单位：万元" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="对接合作方式：">
                                <el-select v-model="companyForm.eCooperation">
                                    <el-option v-for="item in cooperationList" :key="item.label" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="补充说明：">
                                <el-input type="textarea" v-model="companyForm.eRemark" size="medium" :rows="3"
                                    clearable :maxlength="512">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="companyVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editProjectHandler">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        getUserDemandListApi,
        getUserDemandEditApi,
        getUserDemandDeleteApi,
        getUpdateTalentApi,
        getUpdateCompanyApi
    } from '../../api/api.js'
    export default {
        data() {
            // 验证邮箱
            var checkEmail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('邮箱不能为空'))
                } else {
                    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的邮箱'));
                    }
                }
            };
            // 验证手机号
            var checkTel = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {
                tableData: [],
                ids: [], //选中id
                checkAll: false,
                selectList: [],
                isIndeterminate: true,
                curPage: 1, //当前页
                total: 1, //总条数
                dialogVisible: false, //人才需求弹出框
                companyVisible: false,
                pagesize: 10, //每页条数
                // 人才需求数据
                form: {
                    nameCh: '',
                    unitCh: '',
                    unitEn: '',
                    natureCh: 0,
                    natureEn: '',
                    surveyCh: '',
                    surveyEn: '',
                    targetCh: '',
                    targetEn: '',
                    requireCh: '',
                    requireEn: '',
                    recruitCount: '',
                    termCh: '',
                    termEn: '',
                    conditionsCh: '',
                    conditionsEn: '',
                    pTypeInt: [1, 1001],
                    leaderCh: '',
                    leaderEn: '',
                    leaderPositionEn: '',
                    leaderPositionCh: '',
                    phone: '',
                    mobile: '',
                    email: '',
                    fax: '',
                    other: '',
                },
                talentRules: {
                    nameCh: [{
                        required: true,
                        message: '请输入用户名称',
                        trigger: 'blur'
                    }],
                    unitCh: [{
                        required: true,
                        message: '请输入用人单位',
                        trigger: 'blur'
                    }],
                    surveyCh: [{
                        required: true,
                        message: '请输入需求概况',
                        trigger: 'blur'
                    }],
                    targetCh: [{
                        required: true,
                        message: '请输入引进海外专家需要解决的问题和预期目标',
                        trigger: 'blur'
                    }],
                    requireCh: [{
                        required: true,
                        message: '请输入对专家的要求',
                        trigger: 'blur'
                    }],
                    conditionsCh: [{
                        required: true,
                        message: '请输入专家工作条件',
                        trigger: 'blur'
                    }],
                    leaderCh: [{
                        required: true,
                        message: '请输入负责人姓名',
                        trigger: 'blur'
                    }],
                    mobile: [{
                        validator: checkTel,
                        required: true,
                        trigger: 'blur'
                    }],
                    email: [{
                        validator: checkEmail,
                        required: true,
                        trigger: 'blur'
                    }],
                    recruitCount:[{
                        required: true,
                        message: '请输入拟聘专家人次',
                        trigger: 'blur'
                    }]
                },
                // 项目类型
                industryList: [{
                        value: 1,
                        label: 'IT互联网',
                        children: [{
                                value: 1001,
                                label: '移动互联网'
                            },
                            {
                                value: 1002,
                                label: 'O2O'
                            },
                            {
                                value: 1003,
                                label: '生活服务'
                            },
                            {
                                value: 1004,
                                label: '社交网络'
                            },
                            {
                                value: 1005,
                                label: '企业服务'
                            },
                            {
                                value: 1006,
                                label: '电子商务'
                            },
                            {
                                value: 1007,
                                label: '大数据'
                            },
                            {
                                value: 1008,
                                label: '计算机软件'
                            },
                            {
                                value: 1009,
                                label: '在线教育'
                            },
                        ]
                    },
                    {
                        value: 2,
                        label: '高新产业',
                        children: [{
                                value: 2001,
                                label: '金融科技'
                            },
                            {
                                value: 2002,
                                label: '智慧城市'
                            },
                            {
                                value: 2003,
                                label: '物联网'
                            },
                            {
                                value: 2004,
                                label: 'VR/AR/MR'
                            },
                            {
                                value: 2005,
                                label: '区块链'
                            },
                            {
                                value: 2006,
                                label: '人工智能'
                            },
                            {
                                value: 2007,
                                label: '云计算'
                            },
                            {
                                value: 2008,
                                label: '智能制造'
                            },
                            {
                                value: 2009,
                                label: '节能环保'
                            },
                            {
                                value: 2010,
                                label: '新能源'
                            },
                            {
                                value: 2011,
                                label: '新材料'
                            },
                            {
                                value: 2012,
                                label: '国防军工'
                            },
                            {
                                value: 2013,
                                label: '航空航天'
                            },
                        ]
                    },
                    {
                        value: 3,
                        label: '文化创意',
                        children: [{
                                value: 3001,
                                label: '文化传媒广告'
                            },
                            {
                                value: 3002,
                                label: '新媒体'
                            },
                            {
                                value: 3003,
                                label: '影视文化'
                            },
                            {
                                value: 3004,
                                label: '二次元'
                            },
                            {
                                value: 3005,
                                label: '创意设计'
                            },
                            {
                                value: 3006,
                                label: '游戏动漫'
                            },
                        ]
                    },
                    {
                        value: 4,
                        label: '大健康产业',
                        children: [{
                                value: 4001,
                                label: '医药'
                            },
                            {
                                value: 4002,
                                label: '医疗服务'
                            },
                            {
                                value: 4003,
                                label: '体育'
                            },
                            {
                                value: 4004,
                                label: '保健品'
                            },
                            {
                                value: 4005,
                                label: '健康管理'
                            },
                            {
                                value: 4006,
                                label: '健康护理'
                            }
                        ]
                    },
                    {
                        value: 5,
                        label: '其他',
                        children: [{
                                value: 5001,
                                label: '现代农业'
                            },
                            {
                                value: 5002,
                                label: '母婴系列'
                            },
                            {
                                value: 5003,
                                label: '传统领域'
                            },
                            {
                                value: 5004,
                                label: '其他'
                            },
                        ]
                    }
                ],
                // 企业需求
                companyForm: {
                    demandName: '',
                    eName: '',
                    eNature: 0,
                    ePhone: '',
                    eEmail: '',
                    eWebsite: '',
                    eAddress: '',
                    eLinkmanCh: '',
                    eLinkmanEn: '',
                    eBrief: '',
                    eDemand: '',
                    eLocation: 0,
                    eSourceBrief: '',
                    eCapital: '',
                    eCooperation: 0,
                    eRemark: '',
                },
                companyRules:{
                    demandName:[{
                        required: true,
                        message: '请输入需求名称',
                        trigger: 'blur'
                    }],
                    eName:[{
                        required: true,
                        message: '请输入单位名称',
                        trigger: 'blur'
                    }],
                    ePhone:[{
                        validator: checkTel,
                        required: true,
                        trigger: 'blur'
                    }],
                    eEmail:[{
                        validator: checkEmail,
                        required: true,
                        trigger: 'blur'
                    }],
                    eWebsite:[{
                        required: true,
                        message: '请输入官网地址',
                        trigger: 'blur'
                    }],
                    eAddress:[{
                        required: true,
                        message: '请输入通讯地址',
                        trigger: 'blur'
                    }],
                    eLinkmanCh:[{
                        required: true,
                        message: '请输入联系人(中)',
                        trigger: 'blur'
                    }]
                },
                // 学历
                education: [{
                        label: 0,
                        radio: '专科及以下'
                    },
                    {
                        label: 1,
                        radio: '本科'
                    },
                    {
                        label: 2,
                        radio: '研究生'
                    },
                    {
                        label: 3,
                        radio: '博士及以上'
                    },
                ],
                //合作方式
                cooperationList:[
                    {value:0,label:'股权合作'},
                    {value:1,label:'联合开发'},
                    {value:2,label:'购买'},
                    {value:3,label:'许可使用'},
                    {value:4,label:'其他(请补充说明)'},
                ],
                // 企业性质
                natureList: [{
                        value: 0,
                        label: '国有控股'
                    },
                    {
                        value: 1,
                        label: '民营控股'
                    },
                    {
                        value: 2,
                        label: '中外合资'
                    },
                    {
                        value: 3,
                        label: '政府机关'
                    },
                    {
                        value: 4,
                        label: '事业单位'
                    }
                ],
                //供需定位
                locationList: [{
                    value: 0,
                    label: '农/林/牧/渔业'
                }, {
                    value: 1,
                    label: '采矿业'
                }, {
                    value: 2,
                    label: '制造业'
                }, {
                    value: 3,
                    label: '电力/热力/燃气/水的生产和供应业'
                }, {
                    value: 4,
                    label: '建筑业'
                }, {
                    value: 5,
                    label: '批发/零售业'
                }, {
                    value: 6,
                    label: '交通运输/仓储/邮政业'
                }, {
                    value: 7,
                    label: '住宿和餐饮业'
                }, {
                    value: 8,
                    label: '信息传输/软件/信息技术服务业'
                }, {
                    value: 9,
                    label: '金融业'
                }, {
                    value: 10,
                    label: '房地产业'
                }, {
                    value: 11,
                    label: '租赁/商务服务业'
                }, {
                    value: 12,
                    label: '科学研究/技术服务业'
                }, {
                    value: 13,
                    label: '水利/环境/公共设施管理业'
                }, {
                    value: 14,
                    label: '教育'
                }, {
                    value: 15,
                    label: '卫生/社会工作业'
                }, {
                    value: 16,
                    label: '文化/体育/娱乐业'
                }, {
                    value: 17,
                    label: '综合'
                }, ]
            }
        },
        methods: {
            // 编辑
            clickUpdate(row) {
                // console.log(row);
                if (row.ptrpeStr == '人才需求') {
                    this.dialogVisible = true
                    getUserDemandEditApi(row.id)
                        .then((res) => {
                            // console.log(res);
                            if (res.data.code == 0) {
                                this.form = res.data.data.demand
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                } else if (row.ptrpeStr == '企业需求') {
                    this.companyVisible = true
                    getUserDemandEditApi(row.id)
                        .then((res) => {
                            console.log(res);
                            if (res.data.code == 0) {
                                // this.dialogVisible = true;
                                this.companyForm = res.data.data.demand
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            },
            // 删除
            clickRemove(row) {
                if (this.ids.indexOf(row.id) == -1) {
                    this.ids.push(row.id)
                }
                // console.log(this.ids);
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getUserDemandDeleteApi(this.ids)
                        .then((res) => {
                            if(res.data.code==0){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                                this.getListData(this.curPage)
                            }
                        })
                }).catch(() => {
                    this.ids.pop(row.id)
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 批量删除
            deleteSelected() {
                if (this.ids.length) {
                    this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        getUserDemandDeleteApi(this.ids)
                            .then((res) => {
                                if(res.data.code==0){
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    })
                                    this.getListData(this.curPage)
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
            // 点击选择
            handleSelectionChange(val) {
                // console.log(val);
                for (let obj of val) {
                    if (this.ids.indexOf(obj.id) == -1) {
                        this.ids.push(obj.id)
                    }
                }
                // console.log(this.ids);
            },
            // 关闭需求模态框
            handleDemandClose() {
                this.dialogVisible = false
            },
            // 关闭企业模态框
            handleProjectClose() {
                this.companyVisible = false
            },
            // 确认修改人才需求
            editDemandHandler() {
                let formObj = {}
                for (let key in this.form) {
                    formObj[key] = this.form[key]
                    formObj.pTypeInt = this.form.pTypeInt[1]
                }
                // console.log(formObj);
                getUpdateTalentApi(formObj)
                    .then((res) => {
                        if (res.data.code == 0) {
                            this.dialogVisible = false
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            // 确认修改企业需求
            editProjectHandler() {
                let formObj = {}
                for (let key in this.companyForm) {
                    formObj[key] = this.companyForm[key]
                }
                // console.log(formObj);
                getUpdateCompanyApi(formObj)
                    .then((res) => {
                        if (res.data.code == 0) {
                            this.companyVisible = false
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            // 分页
            handleCurrentChange(val) {
                // console.log(val);
                this.curPage = val
                this.getListData(this.curPage)
            },
            // 获取列表信息
            getListData(curPage) {
                getUserDemandListApi(this.curPage).then((res) => {
                    if (res.data.code == 0) {
                        this.tableData = res.data.data.list
                        this.total = res.data.data.count
                    }
                    // console.log(res.data);

                })
            },
            // 自定义索引
            indexMethod(index) {
                let curpage = this.curPage //单前页码，具体看组件取值
                let limitpage = this.pagesize //每页条数，具体是组件取值
                return (index + 1) + (curpage - 1) * limitpage
            }
        },
        created() {
            this.getListData(1)
        },
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

    /* 修改表单label与输入框间距 */
    .el-form-item__label {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #0d0d0d;
    }

    .el-form-item__content {
        margin-left: 10px !important;
    }
</style>


<style lang="less" scoped>
    .md-container {
        margin-left: 30px;
        margin-right: 30px;
        display: flex;
        justify-content: center;

        .card-box {
            width: 100%;
            height: 100%;

            .title {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: bold;
                color: #333333;
                margin-bottom: 20px;
            }

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

            .all {
                margin-top: 20px;
                // margin-left: 80px;

                i {
                    color: #fb7a1c;
                    font-size: 20px;
                    margin-left: 20px;
                }

                span {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0px;
                    letter-spacing: 0px;
                    color: #999999;
                    cursor: pointer;
                }

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
            }

            .el-dialog {
                .el-form {
                    .el-form-item {
                        display: flex;
                        justify-content: center;
                        width: 100%;

                        .el-input {
                            width: 340px;
                        }

                        .el-select {
                            width: 340px;
                        }

                        .el-textarea {
                            width: 340px;
                        }

                        .el-cascader {
                            width: 340px;
                        }
                    }

                }
            }
        }

        .pagination-box {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
    }
</style>