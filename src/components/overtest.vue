<template>
  <div class="big">
    <div class="top">
      <div class="mes">
        <p>消息(1)</p>
      </div>
      <div class="search_out" style="text-align: center;vertical-align: middle;">
        <div class="" style="display: inline-block;margin-top: 0.5rem;">
          <AutoComplete v-model="value4"  icon="ios-search" placeholder="input here" style="width:300px" @on-select="searchselcet" @on-change="searchUser">
            <div class="demo-auto-complete-item" v-for="item in searchList" v-if="searchList.length>0">
              <div class="mes_li flex just_start" >
                <div class="head_out">
                  <div class="mes_head">
                    <img :src="item.avatar" alt="">
                  </div>
                </div>
                <Option :value="item.id" :key="item.id">
                  <div  class="head_search_txt">{{item.name}}</div>
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
    </div>
    <div class="over">
      <p>开始一条</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>23333333333333333</p>
      <p>安德森大家顶顶顶顶顶顶顶顶顶</p>
      <p>但是大是大非无从选择</p>
      <p>最后一条</p>
    </div>
    <myFooter></myFooter>
  </div>

</template>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: width .5s
  }
  .fade-enter, .fade-leave-active {
    width: 2rem;
  }
  .emoji {
    width: 1.25rem;
    height: 1.25rem;
  }
  .over
  {
    margin-bottom: 4.2rem;
    margin-top: 5.2rem;
  }
</style>
<script>
  import myFooter from './footer'
  import $ from 'jquery'
  import axios from 'axios'
  import getUrl from '../apis'

  export default {
    components: {myFooter},
    data() {
      return {
        mesList: [],
        delShow: -1,
        nohead: "'../assets/img/head2.png'",
        name: '',
        value4: '',
        searchList:[]//搜索用户列表
      }
    },
    filters:{
//      content:function (e) {
//        let s=JSON.parse(e).content;
////        console.log('返回消息',s);
////        //let chat=data.content.replace(/<[^>]*>/g);//去除文字的<...></...>标签
////        let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
////        let rs = '';
////
////        for (var i = 0; i < s.length; i++) {
////
////          rs = rs + s.substr(i, 1).replace(pattern, '');
////
////        }
//        console.log('s',s);
//        return s;
//        //return data.content;
//      },
      content:function (e,show) {
        let data=JSON.parse(e);
        let backstr=data[show];

        if(show==='content')
        {
          backstr=emoji(backstr);
        }
        console.log('backstr',backstr);
        return backstr;
      },
      avatar:function (e) {
        let data=JSON.parse(e);
        return data.headimg;
      }
    },
    mounted: function () {
      let that = this;
      //初始化消息队列
      axios.get(getUrl('getQueueList'))
        .then(function (response) {
          that.mesList = response.data;
          console.log('that.mesList',that.mesList);
        })

        .catch(function (error) {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                // 这里写清除token的代码
                console.log('401');
                that.$router.push({path: '/login'});
            }
          }
        });
      console.log('mesList',that.mesList);
      that.initsearchList();
    },
    methods: {
      showcontent:function (e) {
        //消息概览中图片只显示为[图片]
        let data=JSON.parse(e);
        let backstr=data['content'];
        let backimg='[图片]';
        if(backstr.indexOf('img')!==(-1))
        {
          backstr=backimg;
        }
        return backstr;
      },
      prev:function (index) {
        this.delShow=index;
        console.log('prev',this.delShow);
      },
      next:function (index) {
        this.delShow=-1;
        console.log('prev',this.delShow);
      },
      swipetop:function (event) {
        let sc=$(document).scrollTop();//滚动条距顶部距离
        console.log('sc',sc);
        let scend=sc+20;//滚动条距顶部距离
        $(document).scrollTop(scend);
      },
      delchat:function (index) {
        console.log('index',index);
        let _this=this;
        axios.post(getUrl('searchUser'),{
        })
          .then(function(response){
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
      //dblclick、keyup、mousemove onmouseover 所有原生js事件去掉on
      toChart: function (item) {
        let _this = this;
//        console.log('item',item);
        let data = {
          'type': item.type,
          'chatid': item.from_id,
          'userid': item.user_id,
          'nickname':item.name
        };
        this.$store.commit("change_mesList", '');
        this.$store.commit("change_type", data);
        _this.$router.push({name: 'message'});

      },
      initsearchList:function (e) {
        //初始化搜索列表
        let key='""';
        let _this=this;
        axios.post(getUrl('searchUser'))
          .then(function(response){
            let searchback=response.data.data;
            console.log('searchback',searchback);
            _this.searchList = searchback;
          }).catch(function(response){
          console.log(response);//发生错误时执行的代码
        })
      },
      searchselcet:function (user_id) {
        let _this=this;
        let uid = _this.$store.state.userinfo.user_id;
        let data = {
          'type': "user",//单私聊
          'chatid': user_id,//聊天对方id
          'userid': uid //当前用户id
        };
        this.$store.commit("change_type", data);
        _this.$router.push({name: 'message'});
      },
      searchUser:function (value) {
        //根据用户名搜索
        let key='';
        let _this=this;
        if(value!=="")
        {
          axios.post(getUrl('searchUser'), {
              keyword : value
          }).then(function(response){
            let searchback=response.data.data;
            _this.searchList = searchback;
          }).catch(function(response){
            console.log(response);//发生错误时执行的代码
          })
        }
        else {
          _this.initsearchList();
        }

      },
    }
  }

</script>
