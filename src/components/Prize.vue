<!--
    竞奖区 组件
-->
<template>
  <section class="wrap wp01">
    <header class="gray_hd_wp">
      <h3 class="hd_tit">兑奖专区</h3>
      <a href="#" class="back_link" title="返回游戏" @click.prevent="goGame()">返回游戏 &gt;</a>
    </header>
    <section class="cont_wp">
      <div class="hd_bar"><span class="user_num">我的金豆：{{ myBean }}</span><a href="#" class="txt_link" title="兑奖纪录" @click.prevent="goRecord()">兑奖纪录</a></div>
      <div class="top_adv">
        <img src="../images/640x156.jpg" alt="夹娃娃">
      </div>
      <ul class="pri_list">
        <li>
          <img src="../images/170x200.jpg" alt="锤子M1L">
          <div class="pri_info">
            <h4 class="pri_tit">锤子锤子锤子锤子锤子 M1L</h4>
            <span class="value">参考价：3200元</span>
            <span class="rest">剩2份</span>
            <a href="" class="btn_pri" title="400万金豆">400万金豆</a></div>
        </li>
        <li>
          <img src="../images/170x200.jpg" alt="锤子M1L">
          <div class="pri_info">
            <h4 class="pri_tit">锤子 M1L</h4>
            <span class="value">参考价：3200元</span>
            <span class="rest">剩2份</span>
            <a href="" class="btn_pri" title="400万金豆">
400万金豆
</a></div>
        </li>
        <li>
          <img src="../images/170x200.jpg" alt="锤子M1L">
          <div class="pri_info">
            <h4 class="pri_tit">锤子 M1L</h4>
            <span class="value">参考价：3200元</span>
            <span class="rest">剩2份</span>
            <a href="" class="btn_pri" title="400万金豆">
400万金豆
</a></div>
        </li>
        <li>
          <img src="../images/170x200.jpg" alt="锤子M1L">
          <div class="pri_info">
            <h4 class="pri_tit">锤子 M1L</h4>
            <span class="value">参考价：3200元</span>
            <span class="rest">剩2份</span>
            <a href="" class="btn_pri" title="400万金豆">
400万金豆
</a></div>
        </li>
        <li>
          <img src="../images/170x200.jpg" alt="锤子M1L">
          <div class="pri_info">
            <h4 class="pri_tit">锤子 M1L</h4>
            <span class="value">参考价：3200元</span>
            <span class="rest">剩2份</span>
            <a href="" class="btn_pri" title="400万金豆">
400万金豆
</a></div>
        </li>
        <li>
          <img src="../images/170x200.jpg" alt="锤子M1L">
          <div class="pri_info">
            <h4 class="pri_tit">锤子 M1L</h4>
            <span class="value">参考价：3200元</span>
            <span class="rest">剩2份</span>
            <a href="" class="btn_pri" title="400万金豆">
400万金豆
</a></div>
        </li>
        <li>
          <img src="../images/170x200.jpg" alt="锤子M1L">
          <div class="pri_info">
            <h4 class="pri_tit">锤子 M1L</h4>
            <span class="value">参考价：3200元</span>
            <span class="rest">剩2份</span>
            <a href="" class="btn_pri" title="400万金豆">
400万金豆
</a></div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'prize',
    data() {
      return {
        myBean: 0
      }
    },
    methods: {
      goGame() {
        this.$router.go(-1);
      },
      goRecord(){
        this.$router.push({path: '/record'})
      },
    },
    mounted() {
      let self = this;
      let oUrl = 'https://h5.niu.xunlei.com/goldbean/query?openid=betatest_lupinyi';
      self.$http.jsonp(oUrl, {
        jsonp: 'cb'
      }).then(function (response) {
        if (response.body.rtn == 0) {
          self.myBean = response.body.data.balance;
        }
      });
    }
  }

</script>
