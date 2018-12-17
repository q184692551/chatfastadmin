<template>
  <div class="big mine">
      <div class="top">
        <div class="chat flex just_bet">
          <router-link to="/groupsdetail">
            <p class="i_Back"><img src="../assets/img/left_icon_act.png" alt="">&nbsp;返回</p>
          </router-link>
          <p class="chat_title flex_1"></p>
        </div>
      </div>
    <div class="personal">
      <div class="personal_head">
        <div class="head_out flex">
          <div class="mes_head ">
            <img :src="perDetail.avatar" alt="">
          </div>
        </div>
        <div class="head_txt">{{perDetail.name}}</div>
      </div>

      <div class="logout" @click.stop="send()">
        发送消息
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>
<style>
  .top .chat
  {
    height: auto;
    line-height: 1;
  }
</style>
<script>
  import axios from 'axios'
  import getUrl from '../apis'
  import myFooter from './footer'
  export default {
    components: {myFooter},
    data(){
      return {
        perDetail:this.$store.state.perDetail,
      }
    },
    methods:{
      send:function (e){
        //发送消息
        let _this=this;
        let user_id=_this.perDetail.id;
        let uid = _this.$store.state.userinfo.user_id;
        let data = {
          'type': "user",//单私聊
          'chatid': user_id,//聊天对方id
          'userid': uid //当前用户id
        };
        console.log('per_send',data);
        _this.$store.commit("change_type", data);
        this.$store.commit("change_mesList", '');
        _this.$router.push({name: 'message'});
      }
    }
  }
</script>
