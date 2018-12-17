// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import base from './base'
import iView from 'iview'; // 导入组件库
import 'iview/dist/styles/iview.css';
import state from "./store/rootState"; // 导入样式
import VueClipboard from 'vue-clipboard2'//复制功能
import ElementUI from 'element-ui'
import './assets/css/iconfont.css'
import {emoji} from './utils/emoji.js'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'}) //声明 v-touch标签
Vue.prototype.emoji = emoji

Vue.use(ElementUI)

Vue.use(Vuex)
Vue.use(iView);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueClipboard)
// 引入静态资源
require('./assets/css/css.css')

const store = new Vuex.Store({
  state: {
    //组件共用公共数据，需要改变时_this.$store.commit
    login_return: [],//登陆时返回信息
    livechattype: 0,
    livechatid: 0,
    liveshowtype: 0,//分组中激活选项卡
    livegroupname:'',//创建群聊时群聊名称
    uid: null,//当前用户uid
    nickname: '',//当前用户昵称
    avatar: '',//当前用户头像
    mesList: [],//当前展示消息
    perDetail: [],//当前查看个人信息
    groupliving: [],//当前群聊
    userinfo: [],//初始化用户信息
    user_chose: false, //是否显示用户选择
    chatGroupAdd:false,//是否显示群聊新增用户
    changename: null,//当前输入群组名称
    token:'' ,//当前_token
    srclive:'',//当前上传图片地址
    mes_count:99, //新消息数量
    selmesid:'',//当前操作msgid
  },
  mutations: {
    lgName:function (state,data) {//livegroupname
      state.livegroupname=data;
    },
    selmesid:function (state,data) {
      state.selmesid=data;
    },
    mes_count:function (state,data) {
      state.mes_count=data;
    },
    token:function(state,data){
      state.token=data;
    },
    srclive:function (state,data) {
      state.srclive=data;
    },
    teamname:function (state, data) {//
      state.changename = data;
    },
    user_chose(state, data){
      state.user_chose = data;
    },
    chatGroupAdd(state,data){
      state.chatGroupAdd=data;
    },
    change_type(state, data) {
      state.livechattype = data.type
      state.livechatid = data.chatid
      state.uid = data.userid
      state.nickname = data.nickname
    },
    change_mesList(state, data) {
      state.mesList = data;
    },
    perDetail(state, data) {
      //改变个人信息
      state.perDetail = data;
    },
    groupliving(state, data) {
      state.groupliving = data;
    },
    liveshowtype(state, data) {
      state.liveshowtype = data;
    },
    get_login_return(state, data) {
      state.login_return = data;
    },
    userinfo(state, data) {
      state.userinfo = data;
    }
  }
})
// export default store
/* eslint-disable no-new */
new Vue({
  el: '#chart_m',
  router,
  store,
  components: {App},
  mounted: function () {
    //主页装载完毕后请求数据避免tab切换重复请求
    // 如果是想禁用长按弹出菜单, 用js
    var rinyScroll=function(options){
      this.options=options;
      this.el=document.getElementById(this.options.el);
    };


//el为局部滚动元素的id
    var myScroll=new rinyScroll({
      el:'#chart_m'
    });



  },
  methods: {},
  template: '<App/>'

})






