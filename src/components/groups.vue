<template>
  <div style="display: block;height: 100%;">

    <v-touch v-on:tap="groups_change($event)">
    <div class="say_menu" :style="{ left: say_menu_left +'px', top: say_menu_top + 'px' }" v-if="group_menu">
      <div class="pop_menu_top flex">
        <p class="flex_1" >分组管理</p>
      </div>
      <div class="pop_down">
        <img src="../assets/img/black_down.png" alt="" />
      </div>
    </div>
    </v-touch>
    <v-touch v-on:tap="chatGroupchange($event)">
    <div class="say_menu" :style="{ left: say_menu_left +'px', top: say_menu_top + 'px' }" v-if="chatGroup_menu">
      <div class="pop_menu_top flex">
        <p class="flex_1" >群聊管理</p>
      </div>
      <div class="pop_down">
        <img src="../assets/img/black_down.png" alt="" />
      </div>
    </div>
    </v-touch>
    <v-touch v-on:tap="goupmenuhide" style="height: 100%;">
    <div class="big" >
        <!--分组管理-->
      <div class="alert" v-if="groupAdd" @click="bigClick($event)">
        <div id="fenzu" class="add_alert" @click.stop>
          <p>添加分组</p>
          <p>请输入新分组名称</p>
          <p><input type="text" v-model="groupAddname" placeholder="请输入分组名"></p>
          <div class="sure flex">
            <div class="btn flex_1" @click="groupAdd=false">取消</div>
            <div class="btn flex_1" @click="upgroupAdd($event)">确定</div>
          </div>
        </div>
      </div>
      <div class="alert" v-if="groupChat" @click="bigClick($event)">
        <div id="groupChat" class="add_alert" @click.stop>
          <p>添加群聊</p>
          <p>请输入新群聊名称</p>
          <p><input type="text" v-model="groupChatname" placeholder="请输入分组名"></p>
          <div class="sure flex">
            <div class="btn flex_1" @click="groupChat=false">取消</div>
            <div class="btn flex_1" @click="upgroupChat($event)">确定</div>
          </div>
        </div>
      </div>
        <!--分组管理-->
        <div class="top ">
          <div class="mes">
            <p>{{group_name}}</p>
            <div class="add" id="add" @click="alert_what">
              <img src="../assets/img/top_add.png" alt="">
            </div>
          </div>
        </div>
        <div class="bot" style="padding-bottom: 3.5rem;">
          <!--<div class="search_out" style="text-align: center;vertical-align: middle;">-->
            <!--<div style="display: inline-block;margin-top: 0.5rem;">-->
              <!--<AutoComplete v-model="value4" icon="ios-search" placeholder="input here" style="width:300px"-->
                            <!--@on-select="searchselcet" @on-change="searchUser">-->
                <!--<div class="demo-auto-complete-item" v-for="item in searchList" v-if="item">-->
                  <!--<div class="mes_li flex just_start">-->
                    <!--<div class="head_out">-->
                      <!--<div class="mes_head ">-->
                        <!--<img :src="item.avatar" alt="">-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<Option :value="item.id" :key="item.id">-->
                      <!--<div class="head_search_txt">{{item.name}}</div>-->
                      <!--&lt;!&ndash;<div class="time otw">14:00</div>&ndash;&gt;-->
                    <!--</Option>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="demo-auto-complete-item" v-else>-->
                  <!--<div class="head_search_txt">-->
                    <!--搜索结果为空-->
                    <!--&lt;!&ndash;<div class="time otw">14:00</div>&ndash;&gt;-->
                  <!--</div>-->
                <!--</div>-->
              <!--</AutoComplete>-->
            <!--</div>-->
          <!--</div>-->
          <div class="groups_nav flex">
            <p class="flex_1" :class="{'sel':showType===0}" @click.stop="changegroupType(0)"><span>分组</span></p>
            <p class="flex_1" :class="{'sel':showType===1}" @click.stop="changegroupType(1)"><span>群聊</span></p>
          </div>
          <div  class="mes_shows">
            <div v-if="showType==0" v-for="(team,index) in getTeamList" :key="index">
              <v-touch v-on:press="goupmenu($event)" @click.stop>
                <div class="groups_li flex just_bet">
                  <div class="group_name flex"  @click.stop="Teamtoggle(index)">
                    <div class="li_l"><img src="../assets/img/down_icon.png" alt=""></div>&nbsp;&nbsp;
                    <div class="li_txt">{{team.name}}</div>
                  </div>
                  <div class="group_count">{{thisliveNum(team.data)}}/{{team.data.length}}</div>
                </div>
              </v-touch>
              <div v-show="team.data&&activeIndex.indexOf(index)!==-1">
                <div class="mes_li flex just_start" v-for="it in team.data" @click.stop="to_perdetail(it)">
                  <div class="head_out">
                    <div class="mes_head ">
                      <img :src="it.avatar" alt="">
                    </div>
                  </div>
                  <div class="mes_content flex_1 flex just_bet">
                    <div class="txt_out flex_1">
                      <p class="mes_tit  otw">{{it.nickname}}</p>
                      <p class="mes_txt  otw">{{defaultShow}}</p>
                    </div>
                    <!--<div class="time otw">14:00</div>-->
                  </div>
                </div>
              </div>
            </div>
            <div v-for="(it,index) in groups" :key="index"
                 v-if="showType==1&&it.gname!==null">
              <v-touch v-on:press="chatGroupMenu($event)">
              <div class="groups_li flex just_bet" >
                <div class="group_name flex just_bet"  @click.stop="groupstodetail(it)">
                  <div class="li_l"><img src="../assets/img/down_icon.png" alt=""></div>&nbsp;&nbsp;
                  <div class="li_txt">{{it.name}}</div>
                </div>
                <!--<Dropdown trigger="click" placement="left-start" class="addwhite">-->
                  <!--<img src="../assets/img/add.png" alt="">-->
                  <!--<DropdownMenu slot="list">-->
                    <!--<li class="ivu-dropdown-item" @click="membershow(it.gid)">查看群成员</li>-->
                    <!--<li class="ivu-dropdown-item" @click="memberadd(it.gid)">新增</li>-->
                  <!--</DropdownMenu>-->
                <!--</Dropdown>-->
              </div>
              </v-touch>
            </div>

          </div>
        </div>
        <myFooter></myFooter>

    </div>
    </v-touch>
  </div>
</template>
<script>
  import myFooter from './footer'
  //import $ from 'jquery'
  import axios from 'axios'
  import getUrl from '../apis'

  var timeOutEvent = 0;//定时器
  export default {
    components: {myFooter},
    data() {
      return {
        getTeamList: [],//分组列表
        groups: [],//群聊列表
        defaultShow: '[离线请留言]',
        showType: this.$store.state.liveshowtype, //0 分组 1群聊
        live: [],//当前在线人数，需获取,
        activeIndex: [],//分组列表展开控制
        groupsIndex: [],//群聊列表展开控制
        group_name: "分组",
        GroupUsers: [], //群下属成员
        name: '',
        value4: '',
        searchList: [],//搜索用户列表
        say_menu_left:100,
        say_menu_top:200,
        group_menu:false,//是否显示分组中菜单
        chatGroup_menu:false,//是否显示群聊中菜单
        groupAdd:false,//新增分组是否显示
        groupChat:false,//群聊是否显示
        groupAddname:null,//新增分组名称
        groupChatname:null //新增群名称
      }
    },
    mounted: function () {
      //主页装载完毕后请求数据避免tab切换重复请求
      let _this = this;
      console.log('this.$store.state.liveshowtype',this.$store.state.liveshowtype);
      if (_this.showType == 0) {
        _this.group_name = '分组';
        axios.get(getUrl('getTeamList'))
          .then(function (response) {
            _this.getTeamList = response.data.data.team_list;
          })
          .catch(function (error) {
            if (error.response) {
              switch (error.response.status) {
                case 401:
                  // 这里写清除token的代码
                  console.log('401');
                  _this.$router.push({path: '/login'});
              }
            }
          });
      }
      else {
        _this.group_name = '群聊';
        axios.get(getUrl('getGroupList'))
          .then(function (response) {
            _this.groups = response.data.data;
          })
          .catch(function (error) {
            if (error.response) {
              switch (error.response.status) {
                case 401:
                  // 这里写清除token的代码
                  console.log('401');
                  _this.$router.push({path: '/login'});
              }
            }
          });
      }
      axios.get(getUrl('getOnlineUser'))
        .then(function (response) {

          let living = response.data.data;
          console.log('living', living);
          _this.live = [];
          _this.live = _this.live.concat(living);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.initsearchList();
    },
    methods: {
      alert_what:function () {
        let _this = this;
        _this.showType==0?_this.groupAdd=true:_this.groupChat=true;
      },
      bigClick: function (event) {
        //外部点击
        this.groupAdd = false;//隐藏新增分组菜单
        this.groupChat=false;
      },
      upgroupAdd:function(s){
        //新增分组
        let _this = this;
        // 参数：teamName->分组名称，teamOwner->创建者ID
        axios.post(getUrl('add_team_name'), {
          name: this.groupAddname,
        })
          .then(function (response) {
            _this.groupAdd = false;
            if (response.data.code == 1) {
              console.log('suc');
              _this.$Message.success(response.data.msg);
              _this.getlist();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      upgroupChat:function (e) {
        //创建新群
        let _this = this;
        let uid = _this.$cookies.get('uid');
        let groupChatname=this.groupChatname;
        _this.$store.commit("lgName", groupChatname);
        _this.$router.push({name: 'mem_create'});
        // 参数：teamName->分组名称，teamOwner->创建者ID
//        axios.post(getUrl('createChatGroup'), {
//          name: this.groupChatname,
//        })
//          .then(function (response) {
//            _this.groupChat = false;
//            if (response.data.status == 1) {
//              _this.$Message.success(response.data.msg);
//              _this.getlist();
//            }
//          })
//          .catch(function (error) {
//            console.log(error);
//          });
      },
      initsearchList: function (e) {
        //初始化搜索列表
        let key = '""';
        let _this = this;
        axios.post(getUrl('searchUser'),{
          keyword:''
        })
          .then(function (response) {
            let searchback = response.data.data;
            console.log('searchback', searchback);
            _this.searchList = searchback;
          }).catch(function (response) {
          console.log(response);//发生错误时执行的代码
        })
      },
      //dblclick、keyup、mousemove onmouseover 所有原生js事件去掉on
      getlist: function () {
        let _this = this;
        if (_this.showType == 0) {
          _this.group_name = '分组';
          axios.get(getUrl('getTeamList'))
            .then(function (response) {
              _this.getTeamList = response.data.data.team_list;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else {
          _this.group_name = '群聊';
          axios.get(getUrl('getGroupList'))
            .then(function (response) {
              _this.groups = response.data.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      changegroupType: function (e) {
        let _this = this;
        _this.showType = e;
        _this.$store.commit("liveshowtype", e);
        this.getlist();
      },
      Teamtoggle: function (index) {
        //分组项点击展开
        let find = this.activeIndex.indexOf(index);
        if (find === -1) {
          this.activeIndex = this.activeIndex.concat(index);
        }
        else {
          this.activeIndex.splice(find, 1);
        }
      },
      grouptoggle: function (index, gid) {
        console.log('index', index);
        console.log('gid', gid);
        let find = this.groupsIndex.indexOf(index);
        if (find === -1) {
          this.groupsIndex = this.groupsIndex.concat(index);
        }
        else {
          this.groupsIndex.splice(find, 1);
        }
        this.getGroupUser(index, gid);
      },
      memberadd: function () {
        console.log('memberadd', memberadd);
      },
      groupstodetail: function (it) {
        //跳转到群详情页面
        let _this=this;
        console.log('it',it);
        _this.$store.commit("groupliving", it);
        _this.$router.push({name: 'groupsdetail'});
      },
      membershow: function (gid) {
        console.log('membershow-gid', gid);
      },
      memberadd: function (gid) {
        console.log('memberadd-gid', gid);
      },
      thisliveNum: function (e) {
        // 计算当前分组下在线人数
        let _this = this;
        let total_live = 0;
        if (e&&e.length > 0) {
          for (let i = 0; i < e.length; i++) {
            if (_this.live.indexOf(e[i].user_id) !== -1) {
              total_live++;
            }
          }
        }

        return total_live;
      },
      searchselcet: function (user_id) {
        let _this = this;
        let uid = _this.$cookies.get('uid');
        let data = {
          'type': 1,//单私聊
          'chatid': user_id,//聊天对方id
          'userid': uid //当前用户id
        };
        this.$store.commit("change_type", data);
        _this.$router.push({name: 'message'});
      },
      searchUser: function (value) {
        //根据用户名搜索
        let key = '';
        let _this = this;
        if (value !== "") {
          axios.post(getUrl('searchUser'), {
            keyword: value
          }).then(function (response) {
            let searchback = response.data.data;
            console.log('searchback',searchback)
            _this.searchList = searchback;
          }).catch(function (response) {
            console.log(response);//发生错误时执行的代码
          })
        }
        else {
          _this.initsearchList();
        }

      },
      toChart: function (event) {
        let _this = this;
        let e = event.currentTarget;
        let userid = e.getAttribute('data-userid');
        let chatid = null;
        let fs_sn = e.getAttribute('data-fs_sn');
        let type = e.getAttribute('data-type');

        if (type == 'user') {
          chatid = fs_sn.split("#");
          for (var i = 0; i < chatid.length; i++) {
            if (chatid[i] === userid) {
              chatid.splice(i, 1);
            }
          }
        }
        if (type == 'group'){
          chatid = fs_sn;
        }
        chatid = Number(chatid);
        let data = {
          'type': type,
          'chatid': chatid,
          'userid': userid
        };
        this.$store.commit("change_type", data);
        this.$store.commit("change_mesList", '');
        _this.$router.push({name: 'message'});

      },goupmenu:function (event) {
        //长按显示分组管理菜单
        let _this=this;
        let clientX=event.changedPointers[0].clientX;
        let clientY=event.changedPointers[0].clientY;
        let clientXleft=(clientX-30)>0?clientXleft=(clientX-30):clientXleft=0;
        _this.say_menu_left=clientXleft;
        _this.say_menu_top=clientY-50;
        _this.group_menu==true?_this.group_menu=false:_this.group_menu=true;
      },
      goupmenuhide:function () {
        let _this=this;
        _this.group_menu=false;
        _this.chatGroup_menu=false;
      },
      groups_change:function (event) {
        //展示分组管理页面
        let _this=this;
        _this.$router.push({name: 'groupschange'});
      },
      chatGroupMenu:function (event) {
        //长按显示群聊点击菜单
        console.log('chatGroupMenu');
        let _this=this;
        let clientX=event.changedPointers[0].clientX;
        let clientY=event.changedPointers[0].clientY;
        let clientXleft=(clientX-30)>0?clientXleft=(clientX-30):clientXleft=0;
        _this.say_menu_left=clientXleft;
        _this.say_menu_top=clientY-50;
        _this.chatGroup_menu==true?_this.chatGroup_menu=false:_this.chatGroup_menu=true;
      },
      to_perdetail:function (item) {
        //查看个人信息
      let _this=this;
        _this.$store.commit("perDetail", item);
        _this.$router.push({name: 'per_detail'});
      },
      chatGroupchange:function () {
        //群聊管理
        console.log('群聊管理')
        this.$router.push({name: 'chatGroupchange'});
      }
    },
    computed: {}
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
