<template>
<div>

  <Modal title="View Image" v-model="visible">
    <img :src="viewSrc" v-if="visible" style="width:100%">
  </Modal>
</div>
</template>
<script>
  export default {
    data () {
      return {
        visible: false,
        viewSrc:'',
      }
    },
    mounted:function () {
      let _this=this;
      _this.visible=true;
      _this.viewSrc='https://o5wwk8baw.qnssl.com/' + 'a42bdcc1178e62b4694c830f028db5c0' + '/large';
    },
    methods: {
    },

  }
</script>
<style>
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
</style>
