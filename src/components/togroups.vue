<template>
  <!--移入某个分组-->
  <div class="big" style="height: 100%;background:#ffffff;">
    <!--分组管理-->
    <div class="top ">
      <div class="mes">
        <p>移至分组</p>
        <router-link to="/groups">
          <div class="txt">
            <p style="color:#ffffff;">完成</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="bot">
      <div class="group_lists">
        <div class="group_li flex just_bet" v-for="(li,index) in groups" v-if="index!==0" @click="teamChange(li.team_id,li.name)">
          <div class="left flex">
            <div class="group_txt">{{li.name}}</div>
          </div>
          <div class="group_menu" v-if="li.team_id==team_id"><img src="../assets/img/gou.png" alt=""></div>
        </div>
      </div>
    </div>
    <myFooter></myFooter>

  </div>

</template>
<style>
  .group_lists {
    padding-bottom: 3rem;
  }

  .group_add {
    height: 2.3rem;
    line-height: 2.3rem;
    padding: 0 0.3rem;
    border-bottom: 0.025rem solid #dedfe1;
    font-size: 0.7rem;
  }

  .group_add img {
    width: 1.2rem;
    vertical-align: middle;
    margin: 0 0.2rem;
  }

  .group_li {
    height: 2.3rem;
    line-height: 2.3rem;
    padding: 0 0.3rem;
    border-bottom: 0.025rem solid #dedfe1;
    vertical-align: middle;
    font-size: 0.7rem;
  }

  .group_txt {
    display: inline-block;
    vertical-align: middle;
  }

  .group_li img {
    vertical-align: middle;
  }

  .group_li .group_icon {
    height: 2.3rem;
    line-height: 2.3rem;
  }

  .group_li .group_icon img {
    width: 1rem;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.3rem;
  }

  .group_menu img {
    width: 1.2rem;
    display: inline-block;
    vertical-align: middle;
  }
</style>
<script>
  import myFooter from './footer'
  //import $ from 'jquery'
  import axios from 'axios'
  import getUrl from '../apis'

  export default {
    components: {myFooter},
    data() {
      return {
        groups: [],//分组列表
        perDetail:this.$store.state.perDetail,
        team_id:this.$store.state.perDetail.team_id,
        user_id:this.$store.state.perDetail.user_id,
        choseindex:1
      }
    },
    mounted: function () {
      //主页装载完毕后请求数据避免tab切换重复请求
      let _this = this;
      _this.getTeamList();
    },
    methods: {
      getTeamList: function () {
        console.log('getTeamList');
        let _this = this;
        axios.get(getUrl('getTeamList'))
          .then(function (response) {
            _this.groups = response.data.data.team_list;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      teamChange: function (team_id,name) {
       console.log('team_id',team_id);
       console.log('name',name);
       console.log('perDetail',this.perDetail);
       console.log('initteam_id',this.team_id);
       this.team_id=team_id;
       let _this=this;
        axios.post(getUrl('addTeamUser'),
          {
            teamId: team_id,
            current_teamId:this.$store.state.perDetail.team_id,
            teamUser:this.user_id,
          }
        )
          .then(function (response) {
            _this.$Message.success(response.data.msg);
            _this.$router.push({name: 'groups'});
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    computed:{

    }
  }

</script>
<style>
  .demo-auto-complete-item {
    padding: 4px 0;
    border-bottom: 1px solid #F6F6F6;
  }

  .demo-auto-complete-group {
    font-size: 12px;
    padding: 4px 6px;
  }

  .demo-auto-complete-group span {
    color: #666;
    font-weight: bold;
  }

  .demo-auto-complete-group a {
    float: right;
  }

  .demo-auto-complete-count {
    float: right;
    color: #999;
  }

  .demo-auto-complete-more {
    display: block;
    margin: 0 auto;
    padding: 4px;
    text-align: center;
    font-size: 12px;
  }
</style>
