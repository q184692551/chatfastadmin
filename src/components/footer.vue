<template>
  <div class="footer flex">

    <div class="foot_li flex_1">
      <router-link to="/index">
        <div class="img_foot " style="position: relative">
          <div class="bot_tip" v-if="$store.state.mes_count>0">
            <div class="mes_count">
              {{$store.state.mes_count}}<span v-if="$store.state.mes_count==99">+</span>
            </div>
          </div>
          <img src="../assets/img/foot1.png" alt="">
        </div>
        <p class="img_sel"><img src="../assets/img/foot1_sel.png" alt=""></p>
        <p class="txt">消息</p>
      </router-link>
    </div>
    <div class="foot_li flex_1">
      <router-link to="/groups">
        <div class="img_foot " style="position: relative">
          <!--<div class="bot_tip">-->
            <!--<div class="mes_count">-->

            <!--</div>-->
          <!--</div>-->
          <img src="../assets/img/foot2.png" alt="">
        </div>
        <p class="img_sel"><img src="../assets/img/foot2_sel.png" alt=""></p>
        <p class="txt">分组</p>
      </router-link>
    </div>
    <div class="foot_li flex_1">
      <router-link to="/file">
        <p class="img_foot"><img src="../assets/img/foot3.png" alt=""></p>
        <p class="img_sel"><img src="../assets/img/foot3_sel.png" alt=""></p>
        <p class="txt">文件</p>
      </router-link>
    </div>

    <div class="foot_li flex_1">
      <router-link to="/mine">
        <p class="img_foot">
          <img src="../assets/img/foot4.png" alt="">
        </p>
        <p class="img_sel"><img src="../assets/img/foot4_sel.png" alt=""></p>
        <p class="txt">我的</p>
      </router-link>
    </div>
  </div>
</template>

