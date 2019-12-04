import axios from 'axios'
// import Qs from 'qs'

const api = '/api'

//---------------------------------------------------------------------------web页面-------------------------------------------------------------------------------

//登录
export let getLoginApi = (username,password)=>{
    return axios.get(`${api}/ulogin`,{params:{username,password}})
}

// 退出登录
export let getLogoutApi = ()=>{
    return axios.post(`${api}/users/loginOut`)
}

//注册
export let getRegisterApi = (data)=>{
    return axios({
        url:`${api}/users/add`,
        method:'post',
        data
    })
}

//图片验证码
export let getCodeApi = ()=>{
    return axios.get(`${api}/captcha.jpg`,{
        responseType: 'arraybuffer'
    }).then((res) =>{
        return 'data:image/png;base64,' + btoa(
            new Uint8Array(res.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
    })
}

// 首页
export let getIndexApi = ()=>{
    return axios.get(`${api}/home`)
}

//========================================================================列表页=========================================================================
// 项目列表
export let getProjectListApi = (start) =>{
    return axios.get(`${api}/project/list`,{params:{start}})
}

// 需求列表
export let getDemandListApi = (start) =>{
    return axios.get(`${api}/userdemand/webList`,{params:{start}})
}

// 专家列表
export let getExpertListApi = (start) =>{
    return axios.get(`${api}/expert/list`,{params:{start}})
}

//=======================================================================详情页===============================================================================
//项目详情
export let getProjectDetailApi = (id)=>{
    return axios.get(`${api}/project/webGet`,{params:{id}})
}

//需求详情
export let getDemandDetailApi = (id)=>{
    return axios.get(`${api}/userdemand/get`,{params:{id}})
}

//专家详情
export let getExpertDetailApi = (id)=>{
    return axios.get(`${api}/expert/get`,{params:{id}})
}


//--------------------------------------------------------------------需求页面-------------------------------------------------------------------------------
// 获取需求列表
export let getUserDemandListApi = (start)=>{
    return axios.get(`${api}/userdemand/list`,{params:{start}})
} 

//编辑数据回填
export let getUserDemandEditApi = (id)=>{
    return axios.get(`${api}/userdemand/get`,{params:{id}})
}

//删除
export let getUserDemandDeleteApi = (data)=>{
    return axios({
        url:`${api}/userdemand/delete`,
        method:'post',
        data
    })
}
//===========================================================================项目============================================================================
// 项目录入
export let getUpdateProjectApi = (data)=>{
    return axios({
        url:`${api}/project/saveOrUpdate`,
        method:'post',
        data
    })
}

//获取项目
export let getProjectApi = ()=>{
    return axios.get(`${api}/project/get`)
}


// 人才需求录入及编辑确认修改
export let getUpdateTalentApi = (data)=>{
    return axios({
        url:`${api}/talentDemand/saveOrUpdate`,
        method:'post',
        data
    })
}

//企业需求录入及更新
export let getUpdateCompanyApi = (data)=>{
    return axios({
        url:`${api}/enterprisedemand/saveOrUpdate`,
        method:'post',
        data
    })
}

//==========================================================================收藏=====================================================================================
// 收藏列表
export let getCollectionApi = (start,type)=>{
    return axios.get(`${api}/collection/list`,{params:{start,type}})
}

// 收藏 删除
export let getCollectionDeleteApi = (data)=>{
    return axios({
        url:`${api}/collection/delete`,
        method:'post',
        data
    })
}

// 点击收藏
export let getCollectionClickApi = (id,type)=>{
    return axios.get(`${api}/collection/collect`,{params:{id,type}})
}

//==========================================================================账号========================================================================================
//修改密码
export let getChangePwdApi = (data)=>{
    return axios({
        url:`${api}/users/updatepwd`,
        method:'post',
        data
    })
}

//获取账号信息回填
export let getAccountInfoApi = ()=>{
    return axios.get(`${api}/users/get`)
}

//修改账号信息
export let getChangeInfoApi = (linkMan,phone)=>{
    return axios.get(`${api}/users/update`,{
        params:{linkMan,phone}
    })
}