<template>
  <div class="big " id="pass">
    <div class="mine_title">
      <div class="top">
        <div class="chat flex just_bet">
          <router-link to="/mine">
            <p class="i_Back">
             <img src="../assets/img/left_icon_act.png" alt="">&nbsp;返回
            </p>
          </router-link>
          <p class="chat_title flex_1">修改密码</p>
        </div>
      </div>
    </div>
    <div class="bot">
      <div class="tab flex just_bet">
        <div class="tab_l">
          旧密码
        </div>
        <div class="tab_input">
          <input :type="old_pass_type" placeholder="请输入旧密码"  v-model="old_pass"/>
        </div>
        <div class="tab_r flex just_end">
          <div class="check">
            <label class="my_protocol" @click.stop="get_oldpass()">
              <input class="input_agreement_protocol3" type="checkbox" name="search_check"  v-model="old_pass_check"/>
              <span></span>
            </label>
          </div>
        </div>
      </div>
      <div class="tab flex just_bet">
        <div class="tab_l just_start">
          新密码
        </div>
        <div class="tab_input">
          <input :type="new_pass_type" placeholder="请输入新密码" v-model="new_pass"/>
        </div>
        <div class="tab_r flex just_end">
          <div class="check">
            <label class="my_protocol" @click.stop="get_newpass()">
              <input class="input_agreement_protocol3" type="checkbox" name="search_check" v-model="new_pass_check"/>
              <span></span>
            </label>
          </div>
        </div>
      </div>
      <div class="tab flex just_bet">
        <div class="tab_l just_start">
          确认密码
        </div>
        <div class="tab_input">
          <input :type="re_pass_type" placeholder="请再次输入新密码" v-model="re_pass"/>
        </div>
        <div class="tab_r flex just_end">
          <div class="check">
            <label class="my_protocol" @click.stop="get_repass()">
              <input class="input_agreement_protocol3" type="checkbox" name="search_check" v-model="re_pass_check"/>
              <span></span>
            </label>
          </div>
        </div>
      </div>
      <div class=" pass_btn " @click.stop="repassnow()">修改密码</div>
    </div>
  </div>
</template>
<style>
  #pass .bot
  {
  }
</style>
<script>
  import axios from 'axios'
  import getUrl from '../apis'
  export default {
    data() {
      return {
        login_return: this.$store.state.login_return,
        old_pass_check:false,
        new_pass_check:false,
        re_pass_check:false,
        old_pass:null,//旧密码
        new_pass:null,//新密码
        re_pass:null,//确认密码
        old_pass_type:'password',
        new_pass_type:'password',
        re_pass_type:'password'
      }
    },
    mounted: function () {
      console.log('login_return', this.login_return);
    },
    methods:{
      get_oldpass:function () {
        this.old_pass_check==true?this.old_pass_type='password':this.old_pass_type='text';
      },
      get_newpass:function () {
        this.new_pass_check==true?this.new_pass_type='password':this.new_pass_type='text';
      },
      get_repass:function () {
        this.re_pass_check==true?this.re_pass_type='password':this.re_pass_type='text';
      },
      repassnow:function () {
        console.log('repassnow');
        let _this=this;
        let old_pass=_this.old_pass;
        let new_pass=_this.new_pass;
        let re_pass=_this.re_pass;
        if(new_pass==re_pass)
        {
          axios.post(getUrl('repass'),{
            oldpassword:old_pass,
            newpassword:new_pass,
            renewpassword:re_pass
          })
            .then(function (response) {
              console.log('repass',response.data);
              if(response.data.code===1)
              {
                _this.$Message.success(response.data.msg);
                _this.$router.push({name: 'login'});
              }
              else {
                _this.$Message.error(response.data.msg);
              }

            })
            .catch(function (error) {

            });
        }
        else {
          _this.$Message.error("两次输入的密码不一致");
        }
      }
    }
  }
</script>

