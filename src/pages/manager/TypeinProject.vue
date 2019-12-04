<template>
    <div class="tp-container">
        <div class="form-box">
            <el-card class="box-card">
                <div class="title">项目信息录入</div>

                <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                    <el-row>
                        <!-- 左边 -->
                        <el-col :span="12">
                            <el-form-item label="项目名称：" prop="pName">
                                <el-input v-model="form.pName" size="medium" clearable :maxlength="128"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名：" prop="userName">
                                <el-input v-model="form.userName" size="medium" clearable :maxlength="16"></el-input>
                            </el-form-item>
                            <el-form-item label="毕业学校：">
                                <el-input v-model="form.graduationSchool" size="medium" clearable :maxlength="64">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="手机号：" prop="tel">
                                <el-input v-model="form.tel" size="medium" clearable onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                            </el-form-item>
                            <el-form-item label="研究机构：">
                                <el-input v-model="form.researchInstitution" size="medium" clearable :maxlength="32">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="研究机构简介：">
                                <el-input type="textarea" v-model="form.researchInstitutionBrief" :rows="3"
                                    :maxlength="300"></el-input>
                            </el-form-item>
                            <el-form-item label="项目类型：">
                                <el-cascader :options="pTypeList" v-model="form.pTypeInt"></el-cascader>
                            </el-form-item>
                            <el-form-item label="项目需求：" prop="pDemand">
                                <el-input v-model="form.pDemand" :rows="3" :maxlength="32" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="项目预期：">
                                <el-input type="textarea" v-model="form.pExpectation" :rows="3" :maxlength="300">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="寻求合作方式：">
                                <el-select v-model="form.pCooperationMode" @visible-change="visibleChange">
                                    <el-option v-for="item in coopreationList" :key="item.label" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- 右边 -->
                        <el-col :span="12">
                            <el-form-item label="日期：" prop="pDate">
                                <el-date-picker v-model="form.pDate" type="date" placeholder="选择日期" format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="学历：">
                                <el-select v-model="form.education" @visible-change="visibleChange">
                                    <el-option v-for="item in education" :key="item.label" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="专业：">
                                <el-input v-model="form.major" size="medium" clearable :maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱：" prop="email">
                                <el-input v-model="form.email" size="medium" clearable :maxlength="32"></el-input>
                            </el-form-item>
                            <el-form-item label="地址：" prop="address">
                                <el-input v-model="form.address" size="medium" clearable :maxlength="64"></el-input>
                            </el-form-item>
                            <el-form-item label="项目简介：">
                                <el-input type="textarea" v-model="form.pBrief" :rows="3" :maxlength="256">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="项目阶段：">
                                <el-select v-model="form.pStage" @visible-change="visibleChange">
                                    <el-option v-for="item in pStageList" :key="item.label" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="项目成果：">
                                <el-input type="textarea" v-model="form.pResults" :rows="3" :maxlength="300">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="项目资金需求：">
                                <el-input v-model="form.pCapitalDemand" :rows="3" :maxlength="16" clearable="" placeholder="单位：万元" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                            </el-form-item>
                            <el-form-item label="补充说明：">
                                <el-input type="textarea" v-model="form.suppleStatement" :rows="3" :maxlength="300">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="btn-box">
                    <el-button size="medium" @click="onSubmit('form')">提交</el-button>
                </div>
            </el-card>

        </div>
    </div>
</template>

<script>
    import {
        getUpdateProjectApi,
        getProjectApi
    } from '@/api/api.js'
    export default {
        inject: ['reload'],
        data() {
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
            return {
                form: {
                    pName: '',
                    pDate: '',
                    userName: '',
                    education: 0,
                    graduationSchool: '',
                    major: '',
                    tel: '',
                    email: '',
                    researchInstitution: '',
                    address: '',
                    researchInstitutionBrief: '',
                    pBrief: '',
                    pTypeInt: [1, 1001],
                    pStage: 0,
                    pDemand: '',
                    pResults: '',
                    pExpectation: '',
                    pCapitalDemand: '',
                    pCooperationMode: 0,
                    suppleStatement: '',
                },
                rules: {
                    pName: [{
                        required: true,
                        message: '请输入项目名称',
                        trigger: 'blur'
                    }],
                    userName: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    tel: [{
                        required: true,
                        validator: checkTel,
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        validator: checkEmail,
                        trigger: 'blur'
                    }],
                    pDate: [{
                        required: true,
                        message: '请选择日期',
                        trigger: 'blur'
                    }],
                    address: [{
                        required: true,
                        message: '请输入地址',
                        trigger: 'blur'
                    }],
                    pDemand: [{
                        required: true,
                        message: '请输入项目需求',
                        trigger: 'blur'
                    }],
                },
                selectTime: '',
                selectMajor: '',
                majorList: [{
                        value: 0,
                        label: '生物技术和诊断'
                    },
                    {
                        value: 0,
                        label: 'Biological technology and diagnosis'
                    },
                    {
                        value: 1,
                        label: '消费科技'
                    },
                    {
                        value: 1,
                        label: 'Consumption science and technology'
                    },
                    {
                        value: 2,
                        label: '网络安全'
                    },
                    {
                        value: 2,
                        label: 'Network security'
                    },
                    {
                        value: 3,
                        label: '数据管理与分析 '
                    },
                    {
                        value: 3,
                        label: 'Data management and analysis'
                    },
                    {
                        value: 4,
                        label: '教育科技'
                    },
                    {
                        value: 4,
                        label: 'Educational science and technology'
                    },
                    {
                        value: 5,
                        label: '金融科技'
                    },
                    {
                        value: 5,
                        label: 'Financial science and technology'
                    },
                    {
                        value: 6,
                        label: '健康和看护技术'
                    },
                    {
                        value: 6,
                        label: 'Healthcare and nursing technology'
                    },
                    {
                        value: 7,
                        label: '健身科技'
                    },
                    {
                        value: 7,
                        label: 'Fitness science and technology'
                    },
                    {
                        value: 8,
                        label: '工业科技'
                    },
                    {
                        value: 8,
                        label: 'Industrial science and technology'
                    },
                    {
                        value: 9,
                        label: '科技材料和衍生品'
                    },
                    {
                        value: 9,
                        label: 'Science and technology materials and derivatives'
                    },
                    {
                        value: 10,
                        label: '媒体通讯'
                    },
                    {
                        value: 10,
                        label: 'Media communication'
                    },
                    {
                        value: 11,
                        label: '智慧城市'
                    },
                    {
                        value: 11,
                        label: 'Smart city'
                    },
                    {
                        value: 12,
                        label: '人工智能和虚拟现实'
                    },
                    {
                        value: 12,
                        label: 'AI and VR'
                    },
                    {
                        value: 13,
                        label: '其他（请补充说明）'
                    },
                    {
                        value: 13,
                        label: 'Others (please state in details)'
                    }
                ],
                // 合作方式
                coopreationList: [{
                        value: 0,
                        label: '股权合作'
                    },
                    {
                        value: 1,
                        label: '联合开发'
                    },
                    {
                        value: 2,
                        label: '购买'
                    },
                    {
                        value: 3,
                        label: '许可使用'
                    },
                    {
                        value: 4,
                        label: '其他(请补充说明)'
                    },
                ],
                // 学历
                education: [{
                        value: 0,
                        label: '专科及以下'
                    },
                    {
                        value: 1,
                        label: '本科'
                    },
                    {
                        value: 2,
                        label: '研究生'
                    },
                    {
                        value: 3,
                        label: '博士及以上'
                    },
                ],
                // 项目类型
                pTypeList: [{
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
                // 项目阶段
                pStageList: [{
                        value: 0,
                        label: '尚未获投'
                    },
                    {
                        value: 1,
                        label: '种子轮'
                    },
                    {
                        value: 2,
                        label: '天使轮'
                    },
                    {
                        value: 3,
                        label: 'preA轮'
                    },
                    {
                        value: 4,
                        label: 'A轮'
                    },
                    {
                        value: 5,
                        label: 'A+轮'
                    },
                    {
                        value: 6,
                        label: 'B轮'
                    },
                    {
                        value: 7,
                        label: 'C轮'
                    },
                    {
                        value: 8,
                        label: 'preIPO'
                    },
                    {
                        value: 9,
                        label: 'IPO'
                    },
                    {
                        value: 10,
                        label: '已上市'
                    },
                ]
            }
        },
        methods: {
            onSubmit(formName) {
                // console.log(this.form);
                this.$refs[formName].validate((valid) => {
                    const formObj = {}
                    for (let key in this.form) {
                        formObj[key] = this.form[key]
                        formObj.pType = this.form.pTypeInt[1]
                    }
                    // console.log(formObj);
                    if (valid) {
                        getUpdateProjectApi(formObj).then((res) => {
                            if (res.data.code == 0) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.reload()
                            }
                        })
                    }
                })
            },
            visibleChange(isVisible){
                const isEdge = window.navigator.userAgent.includes('Edge');
                if (isEdge && !isVisible) {
                    document
                        .querySelectorAll('body > .el-select-dropdown.el-popper')
                        .forEach((it) => it.remove());
                }
            }
        },
        created() {
            getProjectApi().then((res) => {
                console.log(res);
                if (res.data.code == 0) {
                    this.form = res.data.data
                }
            })
        }
    }
</script>

<style>
    .el-form-item__label {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #0d0d0d;
    }

    .el-form-item__content {
        margin-left: 10px !important;
    }

    /* 修改选中框边框颜色 */
    .el-input__inner:focus,
    .el-input__inner:hover,
    .el-textarea__inner:focus,
    .el-textarea__inner:hover,
    .el-select__caret:focus,
    .el-select__caret:hover,
    .el-cascader__inner:focus,
    .el-cascader__inner:hover {
        border: 1px solid #fb7a1c;
    }

    .el-cascader-node.in-active-path,
    .el-cascader-node.is-active,
    .el-cascader-node.is-selectable.in-checked-path {
        color: #fb7a1c;
    }

    .el-select .el-input.is-focus .el-input__inner {
        border: 1px solid #fb7a1c;
    }

    .el-select-dropdown__item.selected {
        color: #fb7a1c;
    }
</style>

<style lang="less" scoped>
    .tp-container {
        display: flex;
        justify-content: center;
        padding: 0 30px;

        .form-box {
            width: 100%;
            height: 100%;

            .box-card {
                padding: 40px;
                padding-bottom: 100px;
            }

            .title {
                display: flex;
                justify-content: center;
                font-family: MicrosoftYaHei-Bold;
                font-size: 18px;
                line-height: 22px;
                color: #1a1a1a;
                font-weight: bold;
            }

            .el-form {
                margin-top: 40px;

                .el-form-item {
                    display: flex;
                    justify-content: center;

                    .el-input {
                        width: 360px;
                    }

                    /deep/ .el-input__inner:hover,
                    .el-input__inner:focus {
                        border: 1px solid #fb7a1c;
                    }

                    /deep/ .el-textarea__inner:hover {
                        border: 1px solid #fb7a1c;
                    }

                    /deep/ .el-textarea__inner:focus {
                        border: 1px solid #fb7a1c;
                    }

                    .el-select {
                        width: 360px;
                    }

                    .el-cascader {
                        width: 360px;
                    }

                    .el-textarea {
                        width: 360px;
                    }

                    .el-radio-group {
                        width: 360px;

                        .el-radio {
                            margin-left: 5px;
                            margin-top: 10px;

                            /* 修改单选框样式 */
                            /deep/ .el-radio__inner {
                                background-color: #fff;
                                border: 1px solid #fb7a1c;
                            }

                            /deep/ .el-radio__input.is-checked .el-radio__inner {
                                color: #fb7a1c;
                                background-color: #fb7a1c;
                            }

                            /deep/ .el-radio__input.is-checked+.el-radio__label {
                                color: #fb7a1c;
                            }
                        }
                    }
                }
            }
        }

        .btn-box {
            display: flex;
            justify-content: center;
            margin-top: 10px;

            .el-button {
                margin-top: 30px;
                width: 220px;
                background-color: #fb7a1c;
                color: #fff;
                border: none;
            }
        }
    }
</style>