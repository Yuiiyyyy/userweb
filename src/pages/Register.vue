<template>
    <div class="reg-container">
        <img :src="require('../assets/imgs/logo_login.jpg')" alt="">
        <div class="reg-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="title">快速注册</div>
                <div class="type">
                    <div class="type-title">类型选择</div>
                    <div class="select">
                        <el-radio-group v-model="ruleForm.uType">
                            <el-radio-button :label="1">企业</el-radio-button>
                            <el-radio-button :label="2">机构</el-radio-button>
                            <el-radio-button :label="0">园区</el-radio-button>
                            <el-radio-button :label="3">政府</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="reg-title">注册信息</div>
                <div class="contacts">
                    <el-form-item label="联系人：" prop="linkMan">
                        <el-input v-model="ruleForm.linkMan" clearable :maxlength="16"></el-input>
                    </el-form-item>
                </div>
                <div class="company">
                    <el-form-item label="单位名称：" prop="companyName">
                        <el-input v-model="ruleForm.companyName" clearable :maxlength="30"></el-input>
                    </el-form-item>
                </div>
                <div class="tel">
                    <el-form-item prop="phone" label="手机号码：">
                        <el-input v-model="ruleForm.phone" clearable></el-input>
                    </el-form-item>
                </div>
                <div class="smscode">
                    <el-form-item prop="code" label="验证码：">
                        <el-input v-model="ruleForm.code" clearable :maxlength="5"></el-input>
                        <div class="pic-box">
                            <img @click="changeCode" :src="codeImg" alt="验证码">
                        </div>
                    </el-form-item>
                    <span class="showMsg" v-show="showMsg">请输入正确验证码！</span>
                </div>
                <div class="password">
                    <el-form-item prop="password" label="登录密码">
                        <el-input v-model="ruleForm.password" clearable show-password></el-input>
                    </el-form-item>
                </div>
                <div class="city">
                    <el-form-item prop="sheng" label="地区">
                        <!-- <Linkage :sheng="sheng" :shi="shi" :qu="qu"/> -->
                        <div class="linkage">
                            <el-select v-model="ruleForm.sheng" @change="choseProvince" placeholder="省级地区">
                                <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="ruleForm.shi" @change="choseCity" placeholder="市级地区">
                                <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="ruleForm.qu" @change="choseBlock" placeholder="区级地区">
                                <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                </div>
                <div class="login" @click="clickLoginHandler">已有账号？去登录</div>
                <div class="btn">
                    <el-button @click="onSubmit('ruleForm')">快速注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getCodeApi, getRegisterApi } from "@/api/api.js";
    export default {
        data() {
            //  验证手机号是否合法
            let checkTel = (rule, value, callback) => {
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
            //验证码是否为空
            let checkSmscode = (rule, value, callback) => {
                 if (!value) {
                    return callback(new Error('验证码不能为空'));
                    } else {
                    const reg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{5}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的验证码'));
                    }
                }
            }
            // 验证密码
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入登录密码'));
                } else {
                    const reg=/^(\w){6,20}$/
                    if(reg.test(value)){
                        callback();
                    }else{
                        return callback(new Error('请输入6-20个字母、数字、下划线'));
                    }
                }
            }
            return {
                ruleForm: {
                    uType:1,
                    linkMan: '',
                    companyName: '',
                    phone: '',
                    code: '',
                    password: '',
                    sheng: '', //省 
                    shi: '', //市
                    qu: '', //区
                },
                rules: {
                    linkMan: [{
                        required: true,
                        message: '请输入联系人',
                        trigger: 'blur'
                    }],
                    companyName: [{
                        required: true,
                        message: '请输入单位名称',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    phone: [{
                        required: true,
                        validator: checkTel,
                        trigger: 'blur'
                    }],
                    code: [{
                        required: true,
                        validator: checkSmscode,
                        trigger: 'blur'
                    }],
                    sheng:[{
                        required: true,
                        message: '请选择地区',
                        trigger: 'blur'
                    }]
                },
                value: [],
                options: [],
                flag: true,
                type: 0,
                codeImg:'',
                mapJson: require('@/json/map.json'),
                province: '',
                shi1: [],
                qu1: [],
                city: '',
                block: '',
                isSelected:true,
                showMsg:false
            };
        },
        methods: {
            // 图片验证码
            changeCode(){
                getCodeApi().then((res)=>{
                    this.codeImg = res
                })
            },
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
                        this.ruleForm.shi = this.province[index2].children[0].id
                        this.qu1 = this.province[index2].children[0].children
                        this.ruleForm.qu = this.province[index2].children[0].children[0].id
                        this.E = this.qu1[0].id
                        // console.log(this.ruleForm.shi,this.ruleForm.qu);
                    }
                }
            },
            // 选市
            choseCity: function (e) {
                for (var index3 in this.city) {
                    if (e === this.city[index3].id) {
                        this.qu1 = this.city[index3].children
                        this.ruleForm.qu = this.city[index3].children[0].id
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
            //提交表单
            onSubmit(formName){
               this.$refs[formName].validate((valid)=>{
                   if(valid){
                        getRegisterApi(this.ruleForm).then((res)=>{
                            if(res.data.code===-2){
                                this.showMsg = true
                            }else if(res.data.code==0){
                                this.showMsg = false
                                this.$router.push('/login')
                            }
                        })
                        // console.log(this.ruleForm);
                   }
               }) 
            },
            clickLoginHandler(){
                this.$router.push('/login')
            }
        },
        created(){
            getCodeApi().then((res)=>{
                this.codeImg = res
                // console.log(res);
                
            })
            this.getCityData()
        }
    };
</script>

<style>
    .el-radio-button__inner{
        margin-left: 30px;
        width: 100px;
        border: 1px solid #eeeeee;
        border-radius: 4px;
        font-size: 14px;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        background-color: #fb7a1c;
        border: 1px solid #fb7a1c;
        border-radius: 4px;
        box-shadow: none;
    }
    .el-radio-button__inner:hover{
        color: #fb7a1c
    }
    .el-radio-button:first-child .el-radio-button__inner{
        border: 1px solid #eeeeee;
        border-radius: 4px;
        
    }
</style>

<style lang="less" scoped>
    .reg-container {
        width: 100%;
        min-height: 900px;
        background: url("../assets/imgs/bc_login.jpg") center center no-repeat;
        background-size: 80% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            position: fixed;
            top: 20px;
            left: 10%;
        }
        
        .reg-box {
            width: 560px;
            height: 700px;
            display: flex;
            justify-content: center;
            padding: 40px 35px;
            background-color: #fff;
            box-shadow: 0px 10px 23px 0px rgba(183, 183, 183, 0.44);
            border-radius: 3px;

            .title {
                display: flex;
                justify-content: center;
                font-family: MicrosoftYaHei;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 42px;
                letter-spacing: 0px;
                color: #f05050;
            }

            .type {
                .type-title {
                    font-family: MicrosoftYaHei-Bold;
                    font-size: 14px;
                    font-weight: bold;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #0d0d0d;
                    margin-bottom: 12px;
                }

            }

            .reg-title {
                font-family: MicrosoftYaHei-Bold;
                font-size: 14px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #0d0d0d;
                margin: 40px 0px 20px;
            }
            .smscode{
                position: relative;
                .pic-box{
                    img{
                        position: absolute;
                        width: 80px;
                        height: 40px;
                        top: 0px;
                        left: 380px;
                    }
                }
                .showMsg{
                    font-size: 14px;
                    color: red;
                    margin-left: 100px;
                }
            }
            .city {
                display: flex;
                justify-content: space-around;

                .el-cascader {
                    width: 120px;
                }

                span {
                    color: #606266;
                    font-size: 14px;
                }
                .linkage {
                    width: 100%;
                    display: flex;
                    justify-content: space-around;

                    .el-select {
                        margin-left: 10px;
                    }
                }
            }
            .login{
                font-size: 12px;
                display: flex;
                justify-content: flex-end;
                color: #f05050;
                cursor: pointer;
            }
            .btn {
                display: flex;
                justify-content: center;
                margin-top: 50px;

                .el-button {
                    width: 200px;
                    background-color: #fb7a1c;
                    border-radius: 3px;
                    color: #fff;
                }
            }
        }
    }
</style>