<template>
  <!--转发选择群或者人员-->
  <div class="big" id="mem_add">
    <div class="top ">
      <div class="mem_add ">
        <p class="cancel" @click.stop="user_chosehide()">取消</p>
        <p>转发消息</p>
      </div>

    </div>
    <div class="bot">
      <div class="search_out">
        <div class="search" id="search_input">
          <input type="text"/>
          <div class="search_before">
            <span><img src="img/search.png" alt=""></span><span>搜索</span>
          </div>
        </div>
      </div>
      <div class="groups_li flex just_bet">
        <div class="group_name flex">
          <div class="li_l"><img src="img/down_icon.png" alt=""></div>&nbsp;&nbsp;
          <div class="li_txt">所有人</div>
        </div>
        <!--<div class="group_count">5/24</div>-->
      </div>
      <div class="chose_shows ">
        <div class="chose_li flex just_start" v-for="(mem,index) in memList">
          <div class="head_out">
            <div class="mes_head ">
              <img :src="mem.avatar" alt="">
            </div>
          </div>
          <div class="chose_content flex_1 flex just_bet">
            <p class="check_name  otw">{{mem.name}}</p>
            <div class="check">
              <label class="my_protocol">
                <!--:value="mem.id+'_'+mem.name"-->
                <input class="input_agreement_protocol" type="radio" name="search_check"
                       :value="chosemodel(mem.id,mem.name,'user')" v-model="checkbox"/>
                <span></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="groups_li flex just_bet">
        <div class="group_name flex">
          <div class="li_l"><img src="img/down_icon.png" alt=""></div>&nbsp;&nbsp;
          <div class="li_txt">所有群</div>
        </div>
        <!--<div class="group_count">5/24</div>-->
      </div>
      <div class="chose_shows ">
        <div class="chose_li flex just_start" v-for="(mem,index) in group_List">
          <div class="head_out">
            <div class="mes_head ">
              <img :src="mem.groupAvatar" alt="">
            </div>
          </div>
          <div class="chose_content flex_1 flex just_bet">
            <p class="check_name  otw">{{mem.name}}</p>
            <div class="check">
              <label class="my_protocol">
                <!--:value="mem.id+'_'+mem.name"-->
                <input class="input_agreement_protocol" type="radio" name="search_check"
                       :value="chosemodel(mem.id,mem.name,'group')" v-model="checkbox"/>
                <span></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="chosed_total flex just_bet">
        <p>已选择:{{checkbox.length}}人</p>
        <div class="sure_out">
          <div class="sure" @click.stop="resend()">
            确定
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import axios from 'axios'
  import getUrl from '../apis'

  export default {
    data() {
      return {
        timeOutEvent: 0,
        memList: [],//所有成员
        group_List: [],//所有群
        gid: this.$store.state.groupliving.gid,//当前群id
        checkbox: [],
        memid: [],
        memname: [],
        mesid: this.$store.state.selmesid, //转发消息id
        resendtype: this.$store.state.livechattype
      }
    },
    mounted: function () {
      //主页装载完毕后请求数据避免tab切换重复请求
      this.initlist();
      this.initGroupList();//获取群聊列表
      console.log('mesid', this.mesid);
      console.log('resendtype', this.resendtype);
    },
    methods: {
      user_chosehide: function () {
        let _this = this;
        _this.$store.commit('user_chose', false);
        _this.$router.push({path: '/message'});

      },
      initlist: function () {
        let _this = this;
        axios.get(getUrl('getSelectList'))
          .then(function (response) {
            let list = response.data.data;
            _this.memList = list;
            console.log('list', list);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      initGroupList: function () {
        //初始化群聊列表
        //group_List
        let _this = this;
        axios.get(getUrl('getGroupList'))
          .then(function (response) {
            let list = response.data.data;
            _this.group_List = list;
            console.log('list', list);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      resend: function () {
        //转发消息
        let _this = this;
        let checkbox = this.checkbox;
        let str_type=checkbox.type.toString();
        let to = str_type+'_'+checkbox.id;
        let postData = {
          id: _this.mesid,
          type: _this.resendtype,
          to: to
        };
        console.log('postData', postData);
        console.log('checkbox', checkbox);
        axios.post(getUrl('forwardMessage'), postData)
          .then(function (response) {
          //转发消息
            console.log('转发消息',response.data.data);
//          _this.$Message.success("创建成功");
//          _this.$store.commit('teamname', '');
//          _this.$store.commit('user_chose', false);
//          _this.$router.push({name: 'groups'});
            _this.$router.back(-1);
        })
          .catch(function (response) {
          console.log(response);//发生错误时执行的代码
//          _this.$Message.success("创建失败");
//          _this.$store.commit('teamname', '');
//          _this.$router.push({name: 'groups'});
        })

      },
      chosemodel: function (id, name,type) {
//        let _this=this;
//        _this.memid.push(id);
//        _this.memname.push(name);

        let val = {
          id: id,
          name: name,
          type:type
        }
        return val;
      }
    },
    computed: {}
  }
</script>
