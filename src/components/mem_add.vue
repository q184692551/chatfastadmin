<template>
  <div class="big" id="mem_add">
    <div class="top ">
      <div class="mem_add ">

        <router-link to="/groupsdetail">
        <p class="cancel">取消</p>
        </router-link>
        <p>添加群成员</p>
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
      <!--<div class="groups_li flex just_bet">-->
        <!--<div class="group_name flex">-->
          <!--<div class="li_l"><img src="img/down_icon.png" alt=""></div>&nbsp;&nbsp;-->
          <!--<div class="li_txt">所有人</div>-->
        <!--</div>-->
        <!--<div class="group_count">5/24</div>-->
      <!--</div>-->
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
                <input class="input_agreement_protocol" type="checkbox" name="search_check" :value="chosemodel(mem.id,mem.name)" v-model="checkbox"/>
                <span></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="chosed_total flex just_bet">
        <p>已选择:{{checkbox.length}}人</p>
        <div class="sure_out">
          <div class="sure" @click="addGroupUser()">
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
        timeOutEvent:0,
        memList:[],
        gid:this.$store.state.groupliving.id,//当前群id
        users:this.$store.state.groupliving.users,
        memchosed:[],
        checkbox:[]
      }
    },
    mounted: function () {
      //主页装载完毕后请求数据避免tab切换重复请求
      this.initlist();
      console.log('users',this.users);
    },
    methods: {
      initlist:function () {
        let _this=this;
        axios.get(getUrl('getSelectList'))
          .then(function (response) {
            let list = response.data.data;
            //做比较的两个数组
            let users =_this.users;//数组1
            let back=[];
            for(let i=0;i<list.length;i++)
            {
              let flag = true;
              for(let j=0;j<users.length;j++)
              {
                  if(list[i].id==users[j].id)
                  {
                    flag=false;
                    break;
                  }
              }
              if (flag && list[i].id!= "") {
                back.push(list[i]);
              }
            }
            _this.memList=back;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      addGroupUser:function () {
        //添加群成员
        let _this=this;
        let checkbox=this.checkbox;
        let checkid="";
        let chckname="";
        for (let c in  checkbox)
        {
//          checkid.push("|"+checkbox[c].id);
          checkid+=checkbox[c].id+"|";
//          chckname.push(checkbox[c].name);
          chckname+=checkbox[c].name+",";
        }
        let idreg=/\|$/gi;
        let namereg=/,$/gi;
        checkid=checkid.replace(idreg,"");
        chckname=chckname.replace(namereg,"");
        let name=_this.$store.state.changename;
        let postData={
          id:_this.gid,
          userids:checkid,
          usernames:chckname
        };
        console.log('postData',postData);
        axios.post(getUrl('groupAddUser'), postData)
          .then(function (response) {
            _this.$Message.success("添加成员成功");
            _this.$router.push({name: 'groups'});
        }).catch(function (response) {
          console.log(response);//发生错误时执行的代码
        })
      },
      chosemodel:function (id,name) {
        let _this=this;
//        _this.memid.push(id);
//        _this.memname.push(name);
        let val={
          id:id,
          name:name
        }
        return val;
      }
    },
    computed: {}
  }
</script>
