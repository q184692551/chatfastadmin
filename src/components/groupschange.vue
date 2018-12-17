<template>

  <div class="big" style="height: 100%;background:#ffffff;">

    <div class="alert" v-if="show_menu" @click="bigClick($event)">
      <div id="fenzu" class="add_alert" @click.stop>
        <p>添加分组</p>
        <p>请输入新分组名称</p>
        <p><input type="text" v-model="changename" placeholder="请输入分组名"></p>
        <div class="sure flex">
          <div class="btn flex_1" @click="show_menu=false">取消</div>
          <div class="btn flex_1" @click="upchngename($event)">确定</div>
        </div>
      </div>
    </div>
    <div class="alert" v-if="show_edit" @click="bigClick($event)">
      <div id="group" class="add_alert" @click.stop>
        <p>编辑分组</p>
        <p>请输入新的分组名称</p>
        <p><input type="text" v-model="editname" placeholder="请输入分组名"></p>
        <div class="sure flex">
          <div class="btn flex_1" @click="show_edit=false">取消</div>
          <div class="btn flex_1" @click="upedit()">确定</div>
        </div>
      </div>
    </div>


    <!--分组管理-->
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
        <p>添加分组</p>
      </div>
      <div class="group_lists">

        <div class="group_li flex just_bet" v-for="(li,index) in groups" v-if="index!==0" @click="showedit(li.team_id,li.name)">
          <div class="left flex">
            <div class="group_icon" @click.stop="groupdel(index)"><img src="../assets/img/cut.png" alt=""/></div>
            <div class="group_txt">{{li.name}}</div>
          </div>
          <div class="group_menu" v-if="delindex!==index"><img src="../assets/img/menu.png" alt=""></div>

          <div class="group_del" v-if="delindex==index">
            <v-touch v-on:tap="suredel(li.team_id)">
              <p>删除</p>
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
        group_name: "分组管理",
        groups: [],//分组列表
        liveindex: null,//当前点击index
        delindex: false,//当前点击删除 false index
        show_menu: false,//是否显示添加分组
        show_edit: false,//是否线上编辑分组
        changename: null, //分组名称
        editname: null, //编辑分组名称
        team_id: null
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
      showAdd: function () {
        this.show_menu = true;
      },
      showedit: function (team_id,name) {
        if(this.delindex!==false)
        {
          this.delindex=false;
        }
        else {
          this.show_edit = true;
          this.team_id = team_id;
          this.editname=name;
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
      suredel: function (team_id) {
        //删除分组
        let _this=this;
        axios.post(getUrl('removeTeam'), {
          teamId: team_id,
        })
          .then(function (response) {
            _this.show_menu = false;
            console.log('status', response.data.status);
            console.log('data', response.data);
            if (response.data.code == 1) {
              _this.$Message.success(response.data.msg);
              _this.getTeamList();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      upchngename: function () {
        let _this = this;
        // 参数：teamName->分组名称，teamOwner->创建者ID
        axios.post(getUrl('add_team_name'),{
          name: this.changename
        })
          .then(function (response) {
            _this.show_menu = false;
            console.log('status', response.data.status);
            console.log('data', response.data);
            if (response.data.code == 1) {
              console.log('suc');
              _this.$Message.success(response.data.msg);
              _this.getTeamList();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      upedit: function () {
        let _this = this;
        //teamId->当前分组ID,teamName->分组名称，teamOwner->当前修改分组用户Id
        axios.post(getUrl('renameTeam'), {
          name: this.editname,
          teamId: this.team_id
        })
          .then(function (response) {
            _this.show_edit = false;
            if (response.data.code == 1) {
              _this.$Message.success(response.data.msg);
              _this.getTeamList();
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
