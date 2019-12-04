import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    listName:sessionStorage.getItem('listname') ||'',//列表名
    detailId:sessionStorage.getItem('detailId') ||'',//带入详情页id
    hasCollection:sessionStorage.getItem('collection') ||'',//是否收藏
    type:sessionStorage.getItem('type') || 1,//收藏类型
    demandType:sessionStorage.getItem('demandType') || 0,//需求类型
  },
  mutations: {
    ListName(state,newVal){
      sessionStorage.setItem('listname', JSON.stringify(newVal))
      state.listName = newVal
    },
    DetailId(state,id){
      sessionStorage.setItem('detailId', id)
      state.detailId = id
    },
    Collection(state,newVal){
      sessionStorage.setItem('collection', newVal)
      state.hasCollection = newVal
    },
    Type(state,newVal){
      sessionStorage.setItem('type', newVal)
      state.type = newVal
    },
    DemandType(state,newVal){
      sessionStorage.setItem('demandType', newVal)
      state.demandType = newVal
    }
  },
  actions: {
    changeListName(context,newVal){
      context.commit('ListName',newVal)
    },
    changeDetailId(context,id){
      context.commit('DetailId',id)
    },
    changeCollection(context,newVal){
      context.commit('Collection',newVal)
    },
    changeType(context,newVal){
      context.commit('Type',newVal)
    },
    changeDemandType(context,newVal){
      context.commit('DemandType',newVal)
    }
  },
  modules: {
  }
})
