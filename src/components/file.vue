<template>
  <div class="big">
    <div class="top ">
      <div class="mes ">
        <p>文件</p>
      </div>
    </div>
    <div class="bot">
      <!--<div class="search_out">-->
        <!--<div class="search" id="search_input">-->
          <!--<input type="text"/>-->
          <!--<div class="search_before">-->
            <!--<span><img src="../assets/img/search.png" alt=""></span><span>搜索</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="search_out" style="text-align: center;vertical-align: middle;">
        <div style="display: inline-block;margin-top: 0.5rem;">
          <AutoComplete v-model="value4" icon="ios-search" placeholder="input here" style="width:300px"
                        @on-change="searchinit($event)" @on-select="searchselcet">
            <div class="demo-auto-complete-item" v-for="item in fileList" v-if="item">
              <div class="mes_li flex just_start">
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
      <div class="file_lists">
        <div v-for="li in fileList">
          <div class="file_li" v-if="imgtype(li.type)">
            <!--file_img 图片文件类型-->
            <div class="file_out flex just_bet">
              <div class="file_l flex">
                <div class="type"><img src="../assets/img/img.png" alt=""></div>
                <div class="file_txt ">
                  <p class="otw"><img :src="'/'+li.url" alt=""></p>
                  <p class="file_info otw">{{li.name}}</p>
                  <p class="file_info otw">{{li.size}}&nbsp;·&nbsp;{{li.user_name}}</p>
                </div>
              </div>
              <Dropdown trigger="click" style="text-align: center;" placement="bottom-end">
                <a href="javascript:void(0)">
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem @click.native="filedown(li)">下载</DropdownItem>
                  <DropdownItem  @click.native="del(li)">删除</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div class="file_li" v-if="!imgtype(li.type)">
            <div class="file_time">2018年6月21日</div>
            <!--file_other非图片文件类型-->
            <div class="file_out flex just_bet">
              <div class="file_l flex">
                <div class="type"><img src="../assets/img/txt.png" alt=""></div>
                <div class="file_txt">
                  <p class="otw">{{li.name}}</p>
                  <p class="file_info">{{li.size}}&nbsp;·&nbsp;{{li.user_name}}</p>
                </div>
              </div>
              <Dropdown trigger="click" style="text-align: center;" placement="bottom-end">
                <!--<div class="file_down">-->
                  <!--<img src="../assets/img/file_down.png" alt=""/>-->
                <!--</div>-->
                <a href="javascript:void(0)">
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem @click.native="filedown(li)">下载</DropdownItem>
                  <DropdownItem  @click.native="del(li)">删除</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <myFooter></myFooter>
    </div>
  </div>
</template>
<style>
  .bot
  {
  }
  .file_info
  {
    max-width: 6rem;
  }
  .file_txt p
  {
    max-width: 12rem;
  }
  .ivu-dropdown-menu{
    min-width: 100px;
  }
</style>
<script>
  import myFooter from './footer'
  //import $ from 'jquery'
  import axios from 'axios'
  import getUrl from '../apis.js'
  export default {
    components: {myFooter},
    data() {
      return {
        fileList: [],
        search:null,
        userinfo:this.$store.state.userinfo,
        value4: '',
      }
    },
    mounted: function () {
      //主页装载完毕后请求数据避免tab切换重复请求
      this.userInfo();
    },
    methods: {
      searchselcet: function (user_id) {
        console.log(user_id);
        //点击搜索项
//        let _this = this;
//        let uid = _this.$cookies.get('uid');
//        let data = {
//          'type': 1,//单私聊
//          'chatid': user_id,//聊天对方id
//          'userid': uid //当前用户id
//        };
//        this.$store.commit("change_type", data);
//        _this.$router.push({name: 'message'});
      },
      //dblclick、keyup、mousemove onmouseover 所有原生js事件去掉on
      userInfo:function () {
      //获取用户信息
        let _this=this;
        axios.get(getUrl('loginuser'))
          .then(function (response) {
           console.log('response',response.data.data);
           let info=response.data.data;
           _this.getlist(info);
          })
          .catch(function (error) {
            if (error.response) {
              switch (error.response.status) {
                case 401:
                  // 这里写清除token的代码
                  _this.$router.push({path: '/login'});
              }
            }
          });
      },
      getlist:function (info) {
        console.log('getlist');
        let _this = this;
        let user_id=info.id;
        console.log('user_id',user_id);
        console.log('userinfo',_this.userinfo);
        axios.post(getUrl('getfileList'),{
          user_id:user_id,
          search:''
        })
          .then(function(response){
            _this.fileList = response.data.data;
          })
          .catch(function(error){
            if (error.response){
              switch (error.response.status) {
                case 401:
                  // 这里写清除token的代码
                  _this.$router.push({path:'/login'});
              }
            }
          });
      },
      searchselcet:function (user_id) {
        let _this=this;
        let uid = _this.$store.state.userinfo.user_id;
//        let data = {
//          'type': "user",//单私聊
//          'chatid': user_id,//聊天对方id
//          'userid': uid //当前用户id
//        };
//        this.$store.commit("change_type", data);
//        _this.$router.push({name: 'message'});
      },
      searchinit:function (e) {
        let _this=this;
        axios.get(getUrl('loginuser'))
          .then(function (response) {
            console.log('response',response.data.data);
            let info=response.data.data;
            _this.searchfile(info,e);

          })
          .catch(function (error) {
            if (error.response) {
              switch (error.response.status) {
                case 401:
                  // 这里写清除token的代码
                  _this.$router.push({path: '/login'});
              }
            }
          });
      },
      searchfile:function (info,e) {
        console.log('searchfile');
        let _this = this;
        let user_id=info.id;
        axios.post(getUrl('getfileList'),{
          user_id:user_id,
          search:e
        })
          .then(function (response) {
            _this.fileList = response.data.data;
            console.log('_this.fileList',_this.fileList);
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
      },
      imgtype:function (type) {
        console.log('type',type);
        if(type==='gif'||type==='jpeg'||type==='jpg'||type==='png')
        {
          return true;
        }
        else {
          return false;
        }
      },
      opendown:function (e) {
        window.location.href = '/returnResource?path=' + e
      },
      filedown:function (li) {
        let _this = this;
        let file_id=li.id;
        let user_id=_this.$store.state.userinfo.user_id;
        axios.get(getUrl('download')+'?user_id='+user_id+'&file_id='+file_id,{
          headers: {
            'Content-type': 'application/json'
          },

        })
          .then(function (response) {
            console.log('response',response);
            let message=response.data.message;
            console.log('message',message);
            _this.opendown(message);
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
      },
      del:function (li) {
        let _this = this;
        let file_id=li.id;
        let user_id=_this.userinfo.user_id;
        axios.post(getUrl('delfile'),{
            user_id: user_id,
            file_id:file_id
        })
          .then(function (response) {
            _this.userInfo();
            _this.$Message.success("删除成功");
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
    }
  }

</script>
