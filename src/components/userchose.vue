<template>
  <!--创建群聊时选择成员-->
  <div class="big" id="mem_add">
    <div class="top ">
      <div class="mem_add ">
        <p class="cancel" @click.stop="user_chosehide()">取消</p>
        <p>新建群聊</p>
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
        <div class="group_count">5/24</div>
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
                <input class="input_agreement_protocol" type="checkbox" name="search_check"
                       :value="chosemodel(mem.id,mem.name)" v-model="checkbox"/>
                <span></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="chosed_total flex just_bet">
        <p>已选择:{{checkbox.length}}人</p>
        <div class="sure_out">
          <div class="sure" @click.stop="createGroupUser()">
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
        gid:this.$store.state.groupliving.gid,//当前群id
        checkbox:[],
        memid:[],
        memname:[]
      }
    },
    mounted: function () {
      //主页装载完毕后请求数据避免tab切换重复请求
      this.initlist();
    },
    methods: {
      user_chosehide:function(){
        let _this=this;
        _this.$store.commit('user_chose',false);
      },
      initlist:function(){
        let _this=this;
        axios.get(getUrl('getSelectList'))
          .then(function (response) {
            let list = response.data.data;
            _this.memList=list;
            console.log('list',list);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      createGroupUser:function () {
        //创建群聊时选择成员
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
          name:name,
          userids:checkid,
          usernames:chckname
        };
        console.log('postData',postData);
        axios.post(getUrl('createChatGroup'),postData).then(function (response) {
          _this.$Message.success("创建成功");
          _this.$store.commit('teamname','');
          _this.$store.commit('user_chose',false);
          _this.$router.push({name: 'groups'});

        }).catch(function (response) {
          console.log(response);//发生错误时执行的代码
          _this.$Message.success("创建失败");
          _this.$store.commit('teamname','');
          _this.$router.push({name: 'groups'});
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
