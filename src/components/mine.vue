<template>
  <div class="big mine">
    <!--修改昵称-->
    <div class="alert" v-if="nameShow" @click="bigClick($event)">
      <div id="fenzu" class="add_alert" @click.stop>
        <p>修改昵称</p>
        <p>请输入修改昵称</p>
        <p><input type="text" v-model="name" placeholder="请输入新昵称"></p>
        <div class="sure flex">
          <div class="btn flex_1" @click="nameShow=false">取消</div>
          <div class="btn flex_1" @click="changename($event)">确定</div>
        </div>
      </div>
    </div>
    <div class="personal">
      <div class="personal_head">
        <div class="head_out flex">
          <label for="filedown">
          <div class="mes_head ">
            <img :src="nohead" alt="" :onerror="nohead">
          </div>
          </label>
        </div>
        <div class="head_txt">{{userinfo.name}}</div>
      </div>
      <!--<div class="tab flex just_bet">-->
      <!--<router-link to="/mine_detail">-->
      <!--<div class="tab_l">-->
      <!--我的资料-->
      <!--</div>-->
      <!--</router-link>-->
      <!--<div class="tab_r flex just_end">-->
      <!--<div class="tab_icon">-->
      <!--<img src="img/right_s.png" alt=""/>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <router-link to="/pass">
        <div class="tab flex just_bet">

          <div class="tab_l">
            安全设置
          </div>

          <div class="tab_r flex just_end">
            <div class="tab_icon">
              <img src="../assets/img/right_s.png" alt=""/>
            </div>
          </div>
        </div>

      </router-link>
      <div class="tab flex just_bet" @click="alertshow()">

        <div class="tab_l">
          修改昵称
        </div>

        <div class="tab_r flex just_end">
          <div class="tab_icon">
            <img src="../assets/img/right_s.png" alt=""/>
          </div>
        </div>
      </div>
      <div class="logout" @click="logout">
        退出登陆
      </div>
    </div>
    <myFooter></myFooter>
    <!--上传头像-->
    <input type="file" v-show="false" id="filedown" @change="handlehead" ref="filedowninputer"/>
  </div>
</template>
<script>
  import axios from 'axios'
  import getUrl from '../apis'
  import myFooter from './footer'

  export default {
    components: {myFooter},
    data() {
      return {
        nohead: "../assets/img/head2.png",
        login_return: this.$store.state.login_return,
        userinfo: this.$store.state.userinfo,
        name:null,
        nameShow:false
      }
    },

    mounted: function () {

      this.info();

    },
    methods: {
      alertshow:function () {
        this.nameShow = true;//隐藏
      },
      bigClick: function (event) {
        //外部点击
        this.nameShow = false;//隐藏
      },
      changename:function(s){
        //新增分组
        let _this = this;
        console.log('name',_this.name);
        // 参数：teamName->分组名称，teamOwner->创建者ID
        axios.post(getUrl('updateName'), {
          name: this.name,
        })
          .then(function (response) {
            _this.nameShow = false;
            _this.$Message.success('修改昵称成功');
            _this.info();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      info:function () {
        let _this=this;
        axios.get(getUrl('loginuser'))
          .then(function (response) {
            console.log('response',response.data.data);
            let info=response.data.data;
            _this.userinfo=info;
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
      handlehead: function () {
        //上传文件
        let _this = this;
        let inputDOM = this.$refs.filedowninputer;
        // 通过DOM取文件数据
        this.file = inputDOM.files[0];
        this.errText = '';
        let size = Math.floor(this.file.size / 1024);
        if (size > 5120) {
          // 这里可以加个文件大小控制
          return false
        }
        // 触发这个组件对象的input事件
        this.$emit('input', this.file);
        // 这里就可以获取到文件的名字了
        this.fileName = this.file.name;
        console.log('this.file.name;', this.file.name);
        console.log('this.file', this.file);
        let fd = this.file;
        let type = _this.$store.state.livechattype;
        let chatid = _this.$store.state.livechatid;
        let _token = _this.$store.state.token;
        let formData = new FormData();
        formData.append('image', this.file); // 文件数据
//        formData.append('id', chatid); // 其他的一些参数
//        formData.append('type', type); // 其他的一些参数
//        formData.append('_token', _token);
//        formData.append('name', this.file.name); // 其他的一些参数
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        axios.post(getUrl('re_avatar'), formData, config)
          .then(function (response) {
            console.info('re_avatar',response.data);
            let code=response.data.code;
            if(code===1)
            {
              _this.$Message.success(response.data.msg);
              _this.userinfo.avatar=response.data.data.data;

            }
//            let img = response.data.data.url;
//            that.send_value += that.imgbe(img);
          })
          .catch(function (error) {
            console.log(error);
          });
        // 这里加个回调也是可以的
        this.onChange && this.onChange(this.file, inputDOM.value);
      },
      logout: function (e) {
        let _this = this;
        axios.get(getUrl('logout'))
          .then(function (response) {
            if (response.status == 200) {
              _this.$Message.success(response.data.message);
              _this.$router.push({path: '/login'});
            }
            else {
              _this.$Message.success(response.data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>
