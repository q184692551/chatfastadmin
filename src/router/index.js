import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import groups from '@/components/groups'
import groupschange from '@/components/groupschange'
import groupsdetail from '@/components/groupsdetail'
import file from '@/components/file'
import mine from '@/components/mine'
import mine_detail from '@/components/mine_detail'
import message from '@/components/message'
import login from '@/components/login'
import pass from '@/components/pass'
import mem_add from '@/components/mem_add'
import mem_create from '@/components/mem_create'
import mem_show from '@/components/mem_show'
import per_detail from '@/components/per_detail'
import per_send from '@/components/per_send'
import togroups from '@/components/togroups'
import chatGroupchange from '@/components/chatGroupchange'
import div from '@/components/div'
import uptest from '@/components/uptest'
import overtest from '@/components/overtest'
import resend from '@/components/resend'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'sel', // 这是链接激活时的class
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/groups',
      name: 'groups',
      component: groups
    },
    {
      path: '/groupschange',
      name: 'groupschange',
      component: groupschange
    },
    {
      path: '/file',
      name: 'file',
      component: file
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/mine_detail',
      name: 'mine_detail',
      component: mine_detail
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/pass',
      name: 'pass',
      component: pass
    },
    {//添加群成员
      path:'/mem_add',
      name:'mem_add',
      component:mem_add
    },
    {//添加群成员
      path:'/mem_create',
      name:'mem_create',
      component:mem_create
    },
    {//查看所有群成员
      path:'/mem_show',
      name:'mem_show',
      component:mem_show
    },
    {//群详情
      path:'/groupsdetail',
      name:'groupsdetail',
      component:groupsdetail
    },
    {//个人信息详情
      path:'/per_detail',
      name:'per_detail',
      component:per_detail
    },
    {
      path:'/per_send',
      name:'per_send',
      component:per_send
    },
    {//移入某分组
      path:'/togroups',
      name:'togroups',
      component:togroups
    },
    {//群聊管理
      path:'/chatGroupchange',
      name:'chatGroupchange',
      component:chatGroupchange
    },
    {
      path:'/div',
      name:'div',
      component:div
    },
    {
      path:'/uptest',
      name:'uptest',
      component:uptest
    },
    {
      path:'/overtest',
      name:'overtest',
      component:overtest
    },
    {
      path:'/resend',
      name:'resend',
      component:resend
    }

  ]
})
