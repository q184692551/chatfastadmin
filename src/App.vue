<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<!--<script type="text/javascript" src="vue-touch.js" ></script>-->
<script>
  import footer from '../src/components/footer.vue'
  import vueEmoji from '../src/components/emoji.vue'
  import axios from 'axios'
  import getUrl from './apis'
  import {emoji} from '../src/utils/emoji'

  var ws;
  //  window.onbeforeunload = function (e) {
  //    //直接关闭页面前时执行注销操作
  ////    e = e || window.event;
  ////
  ////    // 兼容IE8和Firefox 4之前的版本
  ////    if (e) {
  ////      e.returnValue = '关闭提示';
  ////    }
  ////
  ////    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
  ////    return '关闭提示';
  //      console.log('logout');
  //      let location='http://localhost';
  //      let _this=this;
  //      axios.post(getUrl('logout'))
  //        .then(function (response) {
  //          if(response.status==200)
  //          {
  //            console.log('1');
  //            _this.$Message.success(response.data.msg);
  //            _this.$router.push({path: '/'});
  //          }
  //          else {
  //            console.log('2');
  //            _this.$Message.success(response.data.msg);
  //          }
  //        })
  //        .catch(function (error) {
  //          console.log(error);
  //        });
  //  };


  //  let root_url = '/api';
  //  function is_login(callback_function){
  //
  //    json_post(root_url+'/wap/user/islogin', '', callback_function , false);
  //
  //  }
  //
  //  function bind_client(data){
  //    json_post(root_url+'/wap/index/bind', data, function(){}, true);
  //  }
  //
  //  function json_post(url, data, callback_function, async){
  //
  //    $.ajax({
  //      url: url,
  //      type: "POST",
  //      processData: true,
  //      async: async,
  //      data: data,
  //      dataType: 'json',
  //      success: callback_function
  //    });
  //
  //  }
  //
  //  function json_get(url, data, callback_function, async){
  //
  //    $.ajax({
  //      url: url,
  //      type: "GET",
  //      processData: true,
  //      async: async,
  //      data: data,
  //      dataType: 'json',
  //      success: callback_function
  //    });
  //
  //  }

  function bind(result) {
    $.ajax({
      url: '/bind',
      type: "GET",
      processData: true,
      cache: false,
      async: false,
      data: {client_id: result.client_id},
      dataType: 'json',
      success: function (result) {

        $('meta[name="csrf-token"]').attr('content', result.csrf_token);

        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': result.csrf_token
          }
        });

        //$("#chat_top .chart_r .username").html(result.name);
        $("#auth_user_name").text(result.name);
        $("#chat_top").data("userid", result.user_id); //当前登录用户ID
        t_user_id = result.user_id;
        t_avatar = result.avatar;

      }
    });
  }

  export default {
    name: 'App',
    components: {
      'my-footer': footer,
      vueEmoji
    },
    mounted: function (e) {
      let _this = this;
      _this.connecation();
    },
    methods: {
      bind: function (result) {
        let _this=this;
        axios.get(getUrl('bind'), {
          params: { //请求参数
            client_id: result.client_id,
          }
        })
          .then(function (result) {
            $('meta[name="csrf-token"]').attr('content', result.data.csrf_token);
            _this.$store.commit('token',result.data.csrf_token);
            console.log('token',result.data.csrf_token);
            $.ajaxSetup({
              headers: {
                'X-CSRF-TOKEN': result.data.csrf_token
              }
            });
            console.log('初始化用户信息',result.data);
            _this.$store.commit('userinfo',result.data);
          })
          .catch(function (response) {
          console.log(response);//发生错误时执行的代码
        })
      },
      connecation: function (e) {
        let _this = this;
        ws = new WebSocket("ws://192.168.1.145:98");
// 服务端主动推送消息时会触发这里的onmessage
        ws.onmessage = function (e) {
          // json数据转换成js对象
          var data = eval("(" + e.data + ")");
          console.log('server_return----', data);
          var type = data.type || '';
          switch (type) {
            // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
            case 'init':
              _this.bind(data);
              break;
            // 新建群聊
            case 'group_create':
//              group_create(data);
              console.log('group_create');
              break;
            //用户退出群聊
            case 'group_exit':
//              group_exit(data);
              console.log('group_exit');
              break;
            //群主添加新成员，向成员发送新群信息
            case 'group_adduser':
//              group_adduser(data);
              console.log('group_adduser');
              break;
            //移除群聊
            case 'group_removeuser':
//              group_removeuser(data);
              console.log('group_removeuser');
              break;
            //更新群名称
            case 'group_updatename':
//              group_updatename(data);
              console.log('group_updatename');
              break;
            //解散群组
            case 'group_delete':
//              group_delete(data);
              console.log('group_delete');
              break;
            case 'user':
              console.log('user',data);
              _this.message(data);
              break;
            case 'group':
//              messageShowToGroup(data);
              console.log('group');
              _this.message(data);
              break;
            default :
            // alert(e.data);
          }
        };
      },
      message: function (data) {
        let _this=this;
        let type = _this.$store.state.livechattype;
        let chatid = _this.$store.state.livechatid;
        let backData=_this.$store.state.mesList;
        let content={
          "user_name":data.content.user_name,
          "content":data.content.content,
          "headimg":data.content.headimg,
          "tips":data.content.tips
        };
        let appData = {
            "content":JSON.stringify(content),
            "created_at":data.updated_at,
//          "group_id":data.user_id,
            "id":data.msg_id,
            "msg_id":data.msg_id,
            "user_id": data.user_id
          };

        if(data.content.tips)
        {
          console.log('data.content.tips',data.content.tips)
          let id = data.msg_id;//要删除的id
          console.log('id',id);
          let array = _this.$store.state.mesList;
          let newArr = array.filter(function(obj){
            return id !== obj.id;
          });
          newArr.push(appData);
          this.$store.commit('change_mesList',newArr);
          //this.$store.state.mesList=newArr;
        }
        else {
          backData.push(appData);
          this.$store.commit("change_mesList", backData);
        }
      },
      logout: function (e) {
        console.log('logout');
        let location = 'http://localhost';
        let _this = this;
        axios.post(getUrl('logout'))
          .then(function (response) {
            if (response.status == 200) {
              console.log('1');
              _this.$Message.success(response.data.msg);
              _this.$router.push({path: '/login'});
            }
            else {
              console.log('2');
              _this.$Message.success(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      beforeunloadHandler(e) {
        // ...
        console.log('beforeunloadHandler');
      },
    },
    destroyed() {
      window.removeEventListener('beforeunload', e => this.onbeforeunload(e))
    }


  }

</script>
