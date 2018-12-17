<template>
  <!--个人信息详情页-->
  <div class="big mine">
    <div class="mine_title">
      <div class="top">
        <div class="chat flex just_bet">
          <router-link to="/groups">
          <p class="i_Back"><img src="../assets/img/left_icon_act.png" alt="">&nbsp;返回</p>
          </router-link>
          <p class="chat_title flex_1"></p>
        </div>
      </div>
    </div>
    <div class="bot">
      <div class="tab flex just_bet">
        <div class="tab_l">
          头像
        </div>

        <div class="tab_r flex just_end">
          <div class="head_out">
            <div class="mes_head ">
              <img :src="perDetail.avatar" alt="">
            </div>
          </div>
          <div class="tab_icon">
            <!--<img src="../assets/img/right_s.png" alt=""/>-->
          </div>
        </div>
      </div>
      <div class="tab flex just_bet">
        <div class="tab_l flex_1">
          昵称
        </div>

        <div class="tab_r flex just_end">
          <div class="head_out">
            {{perDetail.nickname}}
          </div>

          <div class="tab_icon">

          </div>
        </div>
      </div>
      <div class="tab flex just_bet">
        <div class="tab_l flex_1">
          分组
        </div>

        <div class="tab_r flex just_end" @click="togroups">
          <div class="head_out">
            {{team_name}}
          </div>

          <div class="tab_icon">
            <img src="../assets/img/right_s.png" alt=""/>
          </div>
        </div>
      </div>
      <div class="logout" @click="perchat">
        发送消息
      </div>
    </div>

  </div>
</template>
<style>
  .bot
  {
    /*margin-top: 2.3rem;*/
  }
</style>
<script>
    export default {
        data() {
            return {
              perDetail:this.$store.state.perDetail,
              userinfo:this.$store.state.userinfo,
              team_name:''
            }
        },
        mounted: function () {
          console.log('perDetail',this.perDetail);
          let team_name=this.$store.state.perDetail.team_name?team_name=this.$store.state.perDetail.team_name:team_name="未分组";
          this.team_name=team_name;
          console.log('team_name',team_name);
        },
        methods: {
          perchat:function (e) {
            //发送私聊消息
            console.log('perchat',this.userinfo);
            let _this=this;
            let uid = _this.userinfo.user_id;
            let user_id=_this.perDetail.user_id;
            let data = {
              'type': "user",//单私聊
              'chatid': user_id,//聊天对方id
              'userid': uid //当前用户id
            };
            console.log('per_detail',data);
            _this.$store.commit("change_type", data);
            _this.$store.commit("change_mesList", '');
            _this.$router.push({name: 'message'});
          },
          togroups:function () {
            //将用户移入某个分组
            this.$router.push({name: 'togroups'});
          }
        },
        computed: {}
    }
</script>
