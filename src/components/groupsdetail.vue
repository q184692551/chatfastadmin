<template>
  <div class="big ">
    <div class="mine_title">
      <div class="top">
        <div class="chat flex just_bet">
          <p class="i_Back" @click.stop="back()"><img src="img/left_icon_act.png" alt="">&nbsp;返回</p>
          <p class="chat_title flex_1">群聊详情</p>
        </div>
      </div>
    </div>
    <div class="tab flex just_bet">
      <div class="tab_l">
        群聊名称
      </div>
      <div class="tab_r flex just_end">
        <div class="head_out">
          {{groupliving.name}}
        </div>
      </div>
    </div>
    <div class="tab flex just_bet" @click.stop="showAll()">
      <div class="tab_l flex_1">
        群聊成员
      </div>
      <div class="tab_r flex just_end">
        <div class="head_out">
          共 {{chatgroups.length}} 人
        </div>
        <div class="tab_icon">
          <img src="../assets/img/right_s.png" alt=""/>
        </div>
      </div>
    </div>
    <div class="avatars flex just_start" @click.stop="showAll()">
      <!--index<9-->
      <div class="avatar_out"  v-for="(per,index) in chatgroups" v-if="index<9" @click.stop="to_send(per)">

          <div class="mes_head" >
            <img :src="per.avatar" alt="">
          </div>
          <p class="otw">{{per.name}}</p>
      </div>
      <div class="avatar_out last" @click.stop="invite()" v-if="invited">
        <div class="mes">
          <!--<img :src="'../uploads/'+item.avatar" alt="">-->
          <img src="../assets/img/chatadd.png" alt="" />
        </div>
        <p >邀请</p>
      </div>
    </div>
    <div class="logout" @click.stop="to_chatgroup()">进入群聊</div>
  </div>
</template>
<style>
  .avatars
  {
    background: #ffffff;
  }
  .avatars .avatar_out
  {
    width: 20%;
    text-align: center;
    font-size: 0.7rem;
    color: #666666;
    margin-bottom: 1rem;
    height: 3rem;
  }
  .avatars .avatar_out .mes_head
  {
    margin-top: 0.5rem;
  }
  .avatars .avatar_out .mes_head img
  {
    height: 1.875rem;
  }
  .avatars .avatar_out p
  {
    max-width: 100%;
    margin-top: 0.1rem;
  }
  .last
  {
    /*height: 1.875rem;*/
  }
  .last .mes
  {
    margin-top: 0.5rem;
    /*height: 1.875rem;*/
  }
  .last p
  {
    color: #0999fc;
    margin-top: 0.5rem;
  }
</style>
<script>
  import axios from 'axios'
  import getUrl from '../apis'
  export default {
    data() {
      return {
        groupliving:this.$store.state.groupliving,
        chatgroups:'',//
        gid:this.$store.state.groupliving.id,
        invited:false //是否有邀请权限
      }
    },
    mounted: function () {
      console.log('groupliving',this.groupliving);
      this.getmembersbygid();
    },
    methods: {
      showAll:function () {
        //显示群聊所有人列表
        console.log('showAll');
        this.$router.push({name: 'mem_show'});
      },
      to_send:function (item) {
        //查看个人信息 无分组
        let _this=this;
        console.log('item',item);
        _this.$store.commit("perDetail", item);
        _this.$router.push({name: 'per_send'});
      },
      showpersonal:function () {
        //展示个人详情
        console.log('showpersonal');
      },
      invite:function () {
        this.$router.push({name: 'mem_add'});
      },
      back:function () {
        this.$router.push({name: 'groups'});
      },
      getmembersbygid:function () {
        let _this=this;
        let gid=_this.gid;
        _this.chatgroups = this.$store.state.groupliving.users;
        let ownerId=this.$store.state.groupliving.user_id;
        let uid = _this.$store.state.userinfo.user_id;
        uid===ownerId?_this.invited=true:_this.invited=false;
        console.log('uid',uid)
        console.log('ownerId',ownerId);
      },
      to_chatgroup:function () {
        let _this=this;
        let gid=_this.gid;
        let uid = _this.$store.state.userinfo.user_id;
        let data = {
          'type': "group",
          'chatid': _this.gid,
          'userid': uid,
          'nickname':_this.groupliving.name
        };
        this.$store.commit("change_type", data);
        this.$store.commit("change_mesList", '');
        _this.$router.push({name: 'message'});
      }
    },
    computed: {}
  }
</script>
