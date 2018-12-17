<template>
<div>
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <!--<FormItem prop="yzm">-->
    <!--<Input type="text" v-model="formInline.yzm" placeholder="yzm">-->
    <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
    <!--</Input>-->
    <!--</FormItem>-->
    <!--<div class="yzm">-->
    <!--<img :src="root" @click="root=location+'/captcha.html?r='+Math.random()">-->
    <!--</div>-->
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
    </FormItem>
  </Form>
</div>
</template>
<script>
  import axios from 'axios'
  import getUrl from '../apis'

  export default {
    data() {
      return {
//        location: window.location.href,
//        location: window.location.href,
//        root:window.location.href+'captcha.html',
        location: 'http://localhost',
        root: 'http://localhost' + '/captcha.html',
        formInline: {
          user: '',
          password: '',
//          yzm: ''
        },
        ruleInline: {
          user: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
//            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
//          yzm: [
//            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
//          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        let _this = this;
        // account: zhangsan  用户名
        // password:12356       密码
        axios.post(getUrl('login'), {//请求参数
          username: _this.formInline.user,
          password: _this.formInline.password,
          //captcha:_this.formInline.yzm
        })
          .then(function (response) {
            console.log('loginresponse', response);
            console.log('status', response.status);
            let login_return = response.data;
//                if(response.data.status==1||response.data.status==3)
//                {
            //that.$Message.success(response.data.msg);
//                  _this.$router.push({path: '/index'});
//                  _this.$store.commit('get_login_return',login_return);
//                }
//                else {
//                  _this.$Message.success(response.data.msg);
//                  _this.$router.push({path: '/'});
//                }
            let status = response.status;
            if (status == 200) {
              _this.$Message.success("登陆成功");
              _this.$router.push({path: '/index'});
              _this.$store.commit('get_login_return', login_return);
            }
            else {
              let message=response.message;
              _this.$Message.success(message);
              _this.$router.push({path: '/'});
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>
<style>
  .ivu-form-item-content {
    text-align: center;
  }

  .yzm {
    text-align: center;
  }
</style>
