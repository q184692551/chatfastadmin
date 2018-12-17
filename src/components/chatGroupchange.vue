<template>

  <div class="big" style="height: 100%;background:#ffffff;">
    <!--群聊管理-->
    <div class="alert" v-if="show_menu" @click="bigClick($event)">
      <div id="fenzu" class="add_alert" @click.stop>
        <p>添加群聊</p>
        <p>请输入新群聊名称</p>
        <p><input type="text" v-model="changename" placeholder="请输入新群聊名称"></p>
        <div class="sure flex">
          <div class="btn flex_1" @click="show_menu=false">取消</div>
          <div class="btn flex_1" @click="upchngename($event)">确定</div>
        </div>
      </div>
    </div>
    <div class="alert" v-if="show_edit" @click="bigClick($event)">
      <div id="group" class="add_alert" @click.stop>
        <p>修改群名称</p>
        <p>请输入新群聊名称</p>
        <p><input type="text" v-model="editname " placeholder="请输入群聊名称"></p>
        <div class="sure flex">
          <div class="btn flex_1" @click="show_edit=false">取消</div>
          <div class="btn flex_1" @click="upedit()">确定</div>
        </div>
      </div>
    </div>
    <div class="alert" v-if="this.$store.state.user_chose">
      <userchose></userchose>
    </div>

    <!--群聊管理-->
    <div class="top ">
      <div class="mes">
        <p>{{group_name}}</p>
        <router-link to="/groups">
          <div class="txt">
            <p style="color:#ffffff;">完成</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="bot">
      <div class="group_add flex" @click="showAdd()">
        <div class="adddimg">
          <img src="../assets/img/group_add.png" alt=""/>
        </div>
        <p>添加群聊</p>
      </div>
      <div class="group_lists">

        <div class="group_li flex just_bet" v-for="(li,index) in groups"  @click="showedit(li.id,li.name)">
          <div class="left flex">
            <div class="group_icon" @click.stop="groupdel(index)"><img src="../assets/img/cut.png" alt=""/></div>
            <div class="group_txt otw" style="max-width:6rem" :title="li.name">{{li.name}}</div>
          </div>
          <div class="group_menu " v-if="delindex!==index" @click.stop="groupdel(index)"><img src="../assets/img/menu.png" alt=""></div>

          <div class="group_del add " v-if="delindex==index&&li.user_id==user_id&&delindex!==false">
            <v-touch v-on:tap="addmember(li.id)">
              <p>添加成员</p>
            </v-touch>
          </div>
          <div class="group_del " v-if="delindex==index&&li.user_id!==user_id&&delindex!==false">
            <!--http://localhost/groups/user/exit-->
            <v-touch v-on:tap="exit(li.id)">
              <p>退出群聊</p>
            </v-touch>
          </div>
          <div class="group_del " v-if="delindex==index&&li.user_id==user_id&&delindex!==false">
            <v-touch v-on:tap="suredel(li.id)">
              <p>解散群组</p>
            </v-touch>
          </div>
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
  .add p
  {
    background: #0999fc;
  }
</style>
<script>
  import myFooter from './footer'
  //import $ from 'jquery'
  import axios from 'axios'
  import getUrl from '../apis'
  import userchose from './userchose.vue'
  export default {
    components: {myFooter,userchose},
    data() {
      return {
        user_id:this.$store.state.userinfo.user_id, //用户信息
        group_name: "群聊管理",
        groups:[],//分组列表
        liveindex: null,//当前点击index
        delindex: false,//当前点击删除 false index
        show_menu: false,//是否显示添加分组
        show_edit: false,//是否线上编辑分组
       // user_chose:this.$store.state.user_chose,//是否显示用户选择
        changename: this.$store.state.changename, //分组名称
        editname: null, //编辑分组名称
        gid: null
      }
    },
    mounted: function () {
      //主页装载完毕后请求数据避免tab切换重复请求
      let _this = this;
      _this.getTeamList();
      let user_id=_this.user_id;
      if(!user_id){
        console.log('用户信息获取失败');
      }
    },
    methods: {
      exit:function (group_id) {
        //退出群聊
        let _this=this;
        axios.post(getUrl('exit'), {
          group_id:group_id,
        })
          .then(function (response) {
            _this.show_menu = false;
            _this.$Message.success(response.data.msg?response.data.msg:"退出群聊成功");
            _this.getTeamList();

          })
          .catch(function (error) {
            console.log(error);
            _this.$Message.success(response.data.msg?response.data.msg:"操作失败");
            _this.getTeamList();
          });
      },
      addmember:function (id) {
        console.log('addmember',id);
      },
      menus:function (index){
        //显示隐藏群操作对应菜单
         console.log('index',index);
      },
      getTeamList: function () {
        let _this = this;
        axios.get(getUrl('getGroupList'))
          .then(function (response) {
            _this.groups = response.data.data;
            console.log('groups',_this.groups);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      showAdd: function () {
        this.show_menu = true;
      },
      showedit: function (gid,gname) {
        if(this.delindex!==false)
        {
          this.delindex=false;
        }
        else {
          this.show_edit = true;
          this.gid = gid;
          this.editname=gname;
        }
      },
      bigClick: function (event) {
        //外部点击
        this.show_menu = false;//隐藏添加分组菜单
        this.show_edit = false;//隐藏编辑分组菜单
      },
      groupdel: function (index) {
        let _this = this;
        _this.delindex = index;
      },
      suredel: function (gid){
        //删除群组
        let _this=this;
        axios.post(getUrl('deleteGroup')+gid,{
          _method:"DELETE",
        })
          .then(function (response) {
            _this.show_menu = false;
            console.log('status', response.data.status);
            console.log('data', response.data);
              _this.$Message.success(response.data.msg?response.data.msg:"群聊解散成功");
              _this.getTeamList();
          })
          .catch(function (error) {
            console.log(error);
            _this.$Message.success(response.data.msg?response.data.msg:"操作失败");
            _this.getTeamList();
          });
      },
      upchngename: function (){
        let _this = this;
        let uid = _this.$store.state.userinfo.user_id;
        // 参数：teamName->分组名称，teamOwner->创建者ID
        _this.$store.commit('user_chose',true);//是否显示用户选择组件
        _this.$store.commit('teamname',_this.changename);
       // console.log('user_chose',this.$store.state.user_chose);
//        axios.post(getUrl('createChatGroup'), {
//          name: this.changename,
//        })
//          .then(function (response) {
//            _this.show_menu = false;
//            if (response.data.status == 1) {
//              console.log('suc');
//              _this.$Message.success(response.data.msg);
//              _this.getTeamList();
//            }
//            else {
//              _this.$Message.success(response.data.msg);
//            }
//          })
//          .catch(function (error) {
//            console.log(error);
//          });
      },
      upedit: function () {
        let _this = this;
        let id=this.gid;
        //teamId->当前分组ID,teamName->分组名称，teamOwner->当前修改分组用户Id
        axios.post(getUrl('updateGroupName')+ id, {
//          id: this.gid,
          _method:"PUT",
          name: this.editname,
        })
          .then(function (response) {
            _this.show_edit = false;
            if (response.status == 200) {
              _this.$Message.success(response.data.msg?response.data.msg:"修改成功");
              _this.getTeamList();
            }
            else {
              _this.$Message.error(response.data.msg?response.data.msg:"修改失败");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
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
