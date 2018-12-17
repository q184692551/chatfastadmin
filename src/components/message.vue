<template>
  <div>
    <div class="big" id="message">

      <div class="say_menu" :style="{ left: say_menu_left +'px', top: say_menu_top + 'px' }" v-if="group_menu">
        <div class="pop_menu_top flex">
          <p class="flex_1" v-clipboard:copy="message"
             v-clipboard:success="onCopy"
             v-clipboard:error="onError">拷贝</p>
          <p class="flex_1" @click.stop="re_send()">转发</p>
          <p class="flex_1" @click.stop="withdraw()" v-if="mes.user_id==uid">撤回</p>
        </div>
        <div class="pop_down">
          <img src="../assets/img/black_down.png" alt=""/>
        </div>
      </div>
      <div class="top">
        <div class="chat flex just_bet">
          <router-link to="/index">
            <p class="i_Back"><img src="img/left_icon_act.png" alt="">消息</p>
          </router-link>
          <p class="chat_title just_center">{{nickname}}</p>
          <p class="top_menu"><img src="../assets/img/top_menu.png" alt=""></p>
        </div>
      </div>
      <div class="bot">
        <div class="chat_lists " @click.stop="hide_menu()">
          <div class="chat_li_out" v-for="mes in $store.state.mesList" v-if="$store.state.mesList.length>0">
            <div class="chat_li flex just_start"  v-if="mes.user_id==uid&&!tipsIf(mes.content)">
              <div class="mes_content flex_1 flex just_bet">
                <div class="txt_out flex_1">
                  <div class="bubble_txt flex just_end">
                    <p class="mes_tit  otw">{{mes.content|content('user_name')}}</p>
                    <p class="time otw">{{mes.updated_at}}</p>
                  </div>
                  <div class="bubble flex just_end">
                    <v-touch v-on:press="saymenu($event,mes)">
                      <!--<p class="bubble_txt otw" @click.stop>{{emoji(mes.chat)}}</p>-->
                      <!--v-html="emoji()"-->
                      <!--<p class="bubble_txt otw" @click.stop >{{mes.content|content('content')}}</p>-->
                      <!--<p class="bubble_txt otw" @click.stop="imgtest(mes.content)" v-html="showcontent(mes.content)"></p>-->
                      <p class="bubble_txt" @click.stop="imgView($event,mes.content)" :id="mes.id" v-html="showcontent(mes.content)"></p>
                    </v-touch>
                    <p><img src="../assets/img/bouble_right.png" alt=""/></p>
                  </div>
                </div>
              </div>
              <div class="head_out">
                <div class="mes_head ">
                  <img :src="mes.content|content('headimg')" alt="">
                </div>
              </div>
            </div>

            <div class="chat_li flex just_end" v-if="mes.user_id!==uid&&!tipsIf(mes.content)">
              <div class="head_out">
                <div class="mes_head ">
                  <img :src="mes.content|content('headimg')" alt="">
                </div>
              </div>
              <div class="mes_content flex_1 flex just_bet">
                <div class="txt_out flex_1">
                  <div class="bubble_txt flex">
                    <p class="mes_tit  otw">{{mes.content|content('user_name')}}</p>
                    <p class="time otw">{{mes.updated_at}}</p>
                  </div>
                  <div class="bubble flex" >
                    <p><img src="../assets/img/bubble_left.png" alt=""/></p>
                    <v-touch v-on:press="saymenu($event,mes)">
                      <!--<p class="bubble_txt" @click.stop>{{emoji(mes.chat)}}</p>-->
                      <p class="bubble_txt " @click.stop="imgView($event,mes.content)" v-html="showcontent(mes.content)"></p>
                      <!--<p v-for="src in imgarr" v-if="imgarr.length>0">-->
                      <!--<img :src="src" alt="" @click.stop="showsrc()">-->
                      <!--</p>-->
                    </v-touch>
                  </div>
                </div>
              </div>
            </div>
            <p class="withdraw" v-if="tipsIf(mes.content)" v-html="showcontent(mes.content)"></p>
          </div>
        </div>
      </div>
      <div class="send ">
        <div>
          <div class="send_out flex">
            <!--<Input v-model="send_value" type="textarea" :autosize="{minRows: 1,maxRows: 5}" placeholder="说点什么吧..." wrap="hard" />-->
              <div class="send_input flex_1" @click.stop="send_focus($event)">
                <editDiv v-model='send_value'></editDiv>
              </div>
          <div class="send_btn" @click="send()">发送</div>

          </div>

        </div>
        <div class="send_face flex">
          <p><i class="icon iconfont icon-face"  @click="showEmoji = !showEmoji"></i></p>
          <label for="file">
            <p><img src="../assets/img/img.png" height="17" alt="">
            </p>
          </label>
          <label for="filedown">
            <p><img src="../assets/img/file.png" height="17" alt="">
            </p>
          </label>
          <input type="file" v-show="false" id="file" @change="handleFileChange" ref="inputer"/>
          <input type="file" v-show="false" id="filedown" @change="handlefiledownChange" ref="filedowninputer"/>
        </div>
        <div class="emoji-box flex" v-if="showEmoji">
          <button
            class="pop-close"
            :plain="true"
            type="danger"
            size="mini"
            icon="close"
            @click="showEmoji = false"></button>
          <vue-emoji
            @select="selectEmoji">
          </vue-emoji>
          <span class="pop-arrow arrow"></span>
        </div>
      </div>
    </div>
    <Modal :title="visibleTit" v-model="visible">
      <img :src="viewSrc" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<style>
  .say_menu p
  {
    padding: 0 0.3rem;
  }
  #message .bot
  {
    margin-top: 0;
  }

</style>
<script>
  import axios from 'axios'
  import getUrl from '../apis'
  import vueEmoji from './emoji.vue'
  import editDiv from  './div.vue'
  import { emoji } from '../utils/emoji.js'
  import $ from 'jquery'
  export default {
    components: {vueEmoji,editDiv},
    data() {
      return {
        mesList: this.$store.state.mesList,
        delShow: false,
        nohead: "'../assets/img/head2.png'",
        uid: null,
        nickname:'',
        send_value:'',
        say_menu_left:100,
        say_menu_top:200,
        group_menu:false,//是否显示分组中菜单
        mes:[],//当前操作消息
        message: '',
        /*表情*/
        value: '',
        showEmoji: false,
        data: [],
        file:'',
        imgarr:[],
        visible: false,
        visibleTit:'',
        viewSrc:'',

      }
    },
    filters:{
      content:function (e,show) {
        let data=JSON.parse(e);
        let backstr=data[show];
        if(show==='content')
        {
          backstr=emoji(backstr);
        }
        return backstr;
      }
    },
    computed: {
      //计算属性
//    livechattype () {
//      return this.$store.state.livechattype
//    }
    },
    updated:function(){
//      this.$nextTick(function(){
//
//      })
      window.scrollTo(0,document.body.scrollHeight);
    },
    mounted: function () {
      //主页装载完毕后请求数据避免tab切换重复请求
      let that = this;
      let type = that.$store.state.livechattype;
      let chatid = that.$store.state.livechatid;
      that.nickname = that.$store.state.nickname;
      that.uid = that.$store.state.uid;
      if (type === "group"){
        axios.get(getUrl('getGroupMessage'), {
          params: { //请求参数
            group_id: chatid,
            type:type
          }
        }).then(function (response) {

          console.log('getGroupMessage', response.data.data);//请求正确时执行的代码
          that.mesList = response.data.data.reverse();
          that.$store.commit("change_mesList", that.mesList);
          console.log('mesList',that.mesList);
//          $(".bubble_txt").on('click','img',function(){
//            let data=$(this).attr('src');
//            console.log("bubble_txt",data);
//            that.visible=true;
//            that.viewSrc=data;
//          })

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
      }
      if (type === "user") {
        axios.get(getUrl('getUserMessage'), {
          params: { //请求参数
            user_id: chatid,
            type:type
          }
        })
          .then(function (response) {
            that.mesList = response.data.data.reverse();
            that.$store.commit("change_mesList", that.mesList);
            console.log('mesList',that.mesList);
//            $(".bubble_txt").on('click','img',function(){
//              let data=$(this).attr('src');
//              console.log("bubble_txt",data);
//              that.visible=true;
//              that.viewSrc=data;
//            })
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
      }

    },
    methods: {
      send_focus:function (e) {
        let el = e.target; //当前元素，可修改（能够用此方法获取到他的子元素等）
        this.send_value= '';
      },
      imgtest:function (e) {
        console.log('imgtest',e);
      },
      showsrc:function () {
        console.log('showsrc');
      },
      imgbe:function (e) {
        let _this=this;
        _this.$store.commit('srclive',e);
        //传入路径变为img标签
        let img='<img src="'+e+'" class="chatimg" width="100%" />';
        return img;
      },
      imgView:function (e,mes) {
        let el = e.target; //当前元素，可修改（能够用此方法获取到他的子元素等）
        let e2 = e.currentTarget;//当前元素，不可修改（不能用此方法获取到他的子元素等）
        let _this=this;
        let content=JSON.parse(mes);
        console.log('imgView',e);
        console.log('elsrc',el.src);
        console.log('e2',e2);
        console.log('mes.content',content.user_name);
        if(el.src)
        {
          _this.viewSrc=el.src;
          _this.visibleTit=content.user_name+'分享的图片';
          _this.visible=true;
        }
      },
      handleFileChange (e) {
        //上传图片
        let that=this;
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.file  = inputDOM.files[0];
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
        console.log('this.file.name;',this.file.name);
        console.log('this.file',this.file);
        let fd = this.file;
        let type = that.$store.state.livechattype;
        let chatid = that.$store.state.livechatid;
        let _token= that.$store.state.token;
        let formData = new FormData();
        formData.append('image', this.file); // 文件数据
        formData.append('id', chatid); // 其他的一些参数
        formData.append('type', type); // 其他的一些参数
        formData.append('_token',_token);
        formData.append('name', this.file.name); // 其他的一些参数
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        axios.post(getUrl('uploadimg'), formData ,config)
          .then(function (response) {
            let img=response.data.data.url;
            that.send_value += that.imgbe(img);
          })
          .catch(function (error) {
            console.log(error);
          });
        // 这里加个回调也是可以的
        this.onChange && this.onChange(this.file, inputDOM.value);
      },
      handlefiledownChange:function () {
        //上传文件
        let that=this;
        let inputDOM = this.$refs.filedowninputer;
        // 通过DOM取文件数据
        this.file  = inputDOM.files[0];
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
        console.log('this.file.name;',this.file.name);
        console.log('this.file',this.file);
        let fd = this.file;
        let type = that.$store.state.livechattype;
        let chatid = that.$store.state.livechatid;
        let _token= that.$store.state.token;
        let formData = new FormData();
        formData.append('file', this.file); // 文件数据
        formData.append('id', chatid); // 其他的一些参数
        formData.append('type', type); // 其他的一些参数
        formData.append('_token',_token);
        formData.append('name', this.file.name); // 其他的一些参数
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        axios.post(getUrl('uploadfile'), formData ,config)
          .then(function (response) {
            let img=response.data.data.url;
            that.send_value += that.imgbe(img);
          })
          .catch(function (error) {
            console.log(error);
          });
        // 这里加个回调也是可以的
        this.onChange && this.onChange(this.file, inputDOM.value);
      },
      showcontent:function (e) {
        let _this=this;
        let data=JSON.parse(e);
        let backstr=data['content'];
//        console.log('backstr',backstr);
//        var result=backstr.match(/<img[^>]+>/g);
//        _this.imgarr=result;
//        console.log('imgarr',result);
        return backstr;
      },
      tipsIf:function (e) {
        let data=JSON.parse(e);
        let backstr=data.tips;
        let msg_id=data.msg_id;
        if(backstr!==undefined)
        {
          return true;
        }
        else {
          return false;
        }
      },
      onCopy: function (e) {
        this.group_menu=false;
      },
      onError: function (e) {
        console.log('无法复制文本！')
      },
      chat_txt: function (e) {
        let string = e;
        return e;
      },
      send: function () {
        /**      message_type ->消息类型：1->私聊，0->群聊
         content -> 消息内容
         receive_id->接收人或群ID**!/**/
        let _this = this;
        let type = _this.$store.state.livechattype;
        let chatid = _this.$store.state.livechatid;
        let content = _this.send_value;
        console.log('beoresend',content);

        if(content=='')
        {
          $(".edit-div").html('');
        }
        if(type==='user')
        {
          axios.post(getUrl('sendPrivateMessage'), { //http://localhost/sendPrivateMessage
            type: type,
            content: content,
            to_user_id: chatid
          })
            .then(function (response) {
              _this.send_value='';
              $(".edit-div").html('');
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
        if(type==='group')
        {
          axios.post(getUrl('sendGroupMessage'), { //http://localhost/sendPrivateMessage
            type: type,
            content: content,
            group_id: chatid
          })
            .then(function (response) {
              _this.send_value='';
              $(".edit-div").html('');
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      saymenu:function (event,mes) {
        console.info('event',event);
        console.info('mes',mes);
        let sc=$(document).scrollTop();//滚动条距顶部距离
        let data=JSON.parse(mes.content);
        let backstr=emoji(data['content']);
        let _this=this;
        let clientX=event.changedPointers[0].clientX;
        let clientY=event.changedPointers[0].clientY;
        let clientXleft=(clientX-30)>0?clientXleft=(clientX-30):clientXleft=0;
        _this.$store.commit('selmesid',mes.id);
        _this.mes=mes;
        _this.message=backstr;
        _this.say_menu_left=clientXleft-30;
        _this.say_menu_top=clientY-50+sc;
        _this.group_menu===true?_this.group_menu=false:_this.group_menu=true;
      },
      hide_menu:function () {
        this.group_menu=false;
      },
      re_send:function () {
        //resend
        let _this=this;
        _this.$router.push({path: '/resend'});

      },
      withdraw:function () {

        let _this = this;
        let type = _this.$store.state.livechattype;
        let chatid = _this.$store.state.livechatid;
        _this.group_menu=false;
        /**
         * msg_id	string	撤回的消息ID
         type	string	    类型
         to_user_id			接收人ID**/
        if(type==='user')
        {
          let data={
            msg_id:_this.mes.id,
            type:type,
            to_user_id:chatid
          }

          axios.post(getUrl('userWithdraw'), data)
            .then(function (response) {
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
        if(type==='group')
        {
          /**
           * msg_id			撤回的消息ID
           type		      类型
           group_id			群ID**/
          let groupdata={
            msg_id:_this.mes.id,
            type:type,
            group_id:chatid
          }

          axios.post(getUrl('groupWithdraw'), groupdata)
            .then(function (response) {
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
      },
      /*表情*/
      selectEmoji (code) {
        this.showEmoji = false;
        this.send_value += emoji(code);
      },
      submit () {
        console.log('this.value',this.value);
        this.data.push(this.send_value);
        this.value = '';
      }
    }
  }


</script>


<style lang="scss">
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  #faceapp {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 3rem auto;
    width: 25rem;
    .icon {
      position: relative;
      margin-top: 1rem;
      .iconfont {
        cursor: pointer;
        color: #F7BA2A;
      }
      .emoji-box {
        position: absolute;
        z-index: 10;
        left: -0.5rem;
        top: 1.2rem;
        box-shadow: 0 0.2rem 1rem 0.05rem rgba(0, 0, 0, 0.2);
        background: white;
        .el-button {
          position: absolute;
          border: none;
          color: #FF4949;
          right: 0.6rem;
          top: 0.6rem;
          z-index: 10;
        }
        .arrow {
          left: 0.5rem;
        }
      }
      .submit {
        float: right;
      }
    }
    .comment {
      margin-top: 1rem;
      .item {
        padding: 0.5rem;
        margin: 0;
        border-top: 1px solid #bfcbd9;
      }
    }
  }

  .clearfix {
    &:after {
      content: '';
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }

  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  .fade-enter, .fade-leave-active { opacity: 0; }
  .fade-move { transition: transform .4s; }

  .list-enter-active, .list-leave-active { transition: all .5s; }
  .list-enter, .list-leave-active { opacity: 0; transform: translateX(1.5rem); }
  .list-leave-active { position: absolute !important; }
  .list-move { transition: all .5s;}
  .emoji
  {
    width: 1.25rem;
    height: 1.25rem;
  }

  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .uploadimg
  {
    width: 100%;
  }
  .bubble_txt img
  {
    width: 100%;
  }
</style>


