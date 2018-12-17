<template>
  <!--查看所有群成员-->
  <div class="big" id="mem_add">
    <div class="top ">
      <div class="mem_add ">
        <router-link to="/groupsdetail">
        <p class="cancel">返回</p>
        </router-link>
        <p>{{chatGroup_title}}</p>
      </div>
    </div>
    <div class="bot">
      <div class="search_out" style="text-align: center;vertical-align: middle;">
        <div class="" style="display: inline-block;margin-top: 0.5rem;">
          <AutoComplete v-model="value4" icon="ios-search" placeholder="input here" style="width:300px"
                        @on-select="searchselcet" :filter-method="filterMethod">
            <div class="demo-auto-complete-item" v-for="item in chatgroups" v-if="chatgroups.length>0">
              <div class="mes_li flex just_start">
                <div class="head_out">
                  <div class="mes_head ">
                    <img :src="item.avatar" alt="">
                  </div>
                </div>
                <Option :value="item.id" :key="item.id">
                  <div class="head_search_txt">{{item.name}}</div>
                  <!--<div class="time otw">14:00</div>-->
                </Option>
              </div>
            </div>
            <div class="demo-auto-complete-item" v-else>
              <div class="head_search_txt">
                搜索结果为空
                <!--<div class="time otw">14:00</div>-->
              </div>
            </div>
          </AutoComplete>
        </div>
      </div>
      <div class="groups_li flex just_bet">
        <div class="group_name flex">
          <div class="li_l"><img src="img/down_icon.png" alt=""></div>&nbsp;&nbsp;
          <div class="li_txt">全部群成员</div>
        </div>
        <div class="group_count">{{chatgroups.length}} 人</div>
      </div>
      <div class="chose_shows">

        <div class="chose_li flex just_start" v-for="(mem,index) in chatgroups" @click.stop="to_send(mem)">
          <div class="head_out">
            <div class="mes_head ">
              <!--<img src="img/head1.png" alt="">-->
              <img :src="mem.avatar" alt="">
            </div>
          </div>
          <div class="chose_content flex_1 flex just_bet">
            <p class="check_name  otw">{{mem.name}}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style>
  #mem_add .bot
  {
    /*margin-top: 2.3rem;*/
  }
</style>
<script>
  import axios from 'axios'
  import getUrl from '../apis'
  export default {
    data() {
      return {
        timeOutEvent:0,
        chatGroup_title:this.$store.state.groupliving.name,
        chatgroups:this.$store.state.groupliving.users,//群成员
        gid:this.$store.state.groupliving.id,
        value4: '',
      }
    },
    mounted: function () {
      //主页装载完毕后请求数据避免tab切换重复请求
      //this.getmembersbygid();
      console.log('chatgroups',this.chatgroups);
    },
    methods: {
      filterMethod (value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      getmembersbygid:function () {
        let _this=this;
        let gid=_this.gid;
        axios.get(getUrl('getGroupUser'),{
          params:{
            cgid:gid
          }
        })
          .then(function (response) {
            _this.chatgroups = response.data.data.data;
            console.log('_this.chatgroups',_this.chatgroups);
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      searchselcet: function (user_id) {
        let _this = this;
        let uid = _this.$store.state.userinfo.user_id;
        let data = {
          'type': 1,//单私聊
          'chatid': user_id,//聊天对方id
          'userid': uid //当前用户id
        };
        this.$store.commit("change_type", data);
        this.$store.commit("change_mesList", '');
        _this.$router.push({name: 'message'});
      },
      to_send:function (item) {
        //查看个人信息 无分组
        let _this=this;
        _this.$store.commit("perDetail", item);
        _this.$router.push({name: 'per_send'});
      },
      user_detail:function (user_id) {
        console.log('user_id',user_id);
      }
    },
    computed: {}
  }
</script>
