<!--
    奖品记录 组件
-->
<template>
  <section class="wrap wp02" v-scroll="showPageno">
  <div class="tab_area">
    <div class="tab_nav">
      <ul>
        <li @click="filterNoadr" :class="{ 'on':recordsIdx == 0 }">待填写</li>
        <li @click="filterOut" :class="{ 'on':recordsIdx == 3 }">待发放</li>
        <li @click="filterGood" :class="{ 'on':recordsIdx == 1 }">已中奖</li>
        <li @click="filterAll" :class="{ 'on':recordsIdx == 2 }">全部</li>
      </ul>
    </div>
    <div class="tab_cont">
      <div class="tab_list">
        <ul>
          <li v-for="(record, index) in recordsShow" :key="index" @click="showAddr(record)">
              <Record :record="record" />
          </li>
        </ul>
        <div class="p_btn_wp">
        <a href="#" class="p_btn" title="返回夹娃娃" @click.prevent="goGame">返回夹娃娃</a>
        </div>
      </div>
    </div>
  </div>

  <!-- 填写收货信息 -->
    <transition name="fadein">
      <div class="mpop_box" v-if="isAddr">
        <div class="mpop_hd">
          <h4 class="mpop_tit">填写收货信息</h4>
          <a href="#" class="mpop_clo" title="关闭" @click.prevent="cloPop">关闭</a></div>
        <div class="mpop_cont">
          <div class="fill_addr">
            <div class="input_box">
              <label>收货人：</label>
              <input type="text" :value="myname" @input="setName">
            </div>
            <div class="input_box">
              <label>手机号码：</label>
              <input type="text" :value="myphone" @input="setPhone">
            </div>
            <div class="input_box" v-if=" prizeType == 'thing' ">
              <label>收货地址：</label>
              <input type="text" :value="myaddress" @input="setAddress">
            </div>
            <div class="input_box" v-else-if=" prizeType == 'qb' ">
              <label>QQ号码：</label>
              <input type="text" :value="myqq" @input="setQQ">
            </div>
            <div class="input_box" v-else>
              <label>迅雷帐号：</label>
              <input type="text" @input="setXunlei">
            </div>
            <p class="tips">请确认填写无误，收货信息无法二次修改</p>
            <div class="p_btn_wp"><a href="#" class="btn_submit" title="确定" @click.prevent="subAddr">确定</a></div>
          </div>
        </div>
      </div>
    </transition>
</section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Record from './record';

export default {
  name: 'records',
  components: {
    Record
  },
  computed: mapState([
    "h5url",
    "openid",
    "records",
    "recordsShow",
    "pageno",
    "recordsIdx",
    "isAddr",
    "myname",
    "myphone",
    "myqq",
    "myxunlei",
    "myaddress",
    "prizeType",
    "ticket_id"
  ]),
  methods: {
      goGame(){
          this.$router.go(-1);
      },
      showPageno(e){
        let self = this;
        if((e.target.scrollTop / 80) > 14*self.pageno){
          self.$store.commit('addPageno');
          self.getRecords();
        }
        // console.log(e.target.scrollTop / 80)
      },
      showAddr(record) {
        console.log(record);
        if(record.state == 1){
          this.$store.commit('setPrize', record.pro_info);
          this.$store.commit('setTicketId', record.ticket_id);
          this.$store.commit('setSuc', false);
          this.$store.commit('setPop', true);
          this.$store.commit('setAddr', true);
        }
      },
      cloPop() {
        this.$store.commit('setPop', false);
        this.$store.commit('setIntro', false);
        this.$store.commit('setSuc', false);
        this.$store.commit('setAddr', false);
      },
      subAddr() {
        let self = this;
        if (!(/^1[34578]\d{9}$/.test(self.myphone))) {
          alert("手机号码有误，请重填");
          return false;
        }
        let myinfo = {
          "name": self.myname,
          "tel": self.myphone,
          "qq": self.myqq,
          "xlusername": self.myxunlei,
          "addr": self.myaddress
        };
        let urlParams = encodeURIComponent(JSON.stringify(myinfo));
        this.$http.jsonp(this.h5url + 'lottery/dolls/addr?ticket_id=' + self.ticket_id + '&info=' + urlParams, {
          jsonp: 'cb'
        }).then(function (res) {
          if (res.body.rtn == 0) {
            alert('提交成功');
            this.cloPop();
          } else {
            alert('提交失败')
          }
        }, function (res) {
          alert(res.errinfo);
        });
      },
      setName(e) {
        this.$store.commit('setName', e.target.value);
      },
      setQQ(e) {
        this.$store.commit('setQQ', e.target.value);
      },
      setAddress(e) {
        this.$store.commit('setAddress', e.target.value);
      },
      setPhone(e) {
        this.$store.commit('setPhone', e.target.value);
      },
      setXunlei(e) {
        this.$store.commit('setXunlei', e.target.value);
      },
      getRecords(){
        let self = this;
        self.$http.jsonp(self.h5url + 'lottery/dolls/querylog?openid=' + self.openid + '&pageno=' + self.pageno + '&state=0', {
          jsonp: 'cb'
        }).then(function(res){
            if(res.body.rtn == 0){
              self.$store.commit('setRecords', res.body.data.record);
            }else{
              console.log(res.body.errinfo);
            }
        }, function(err){
            console.log('后台无反应');
        });
      },
      ...mapMutations([
        "filterNoadr",
        "filterGood",
        "filterAll",
        "filterOut",
        "addPageno"
      ]),
  },
  mounted(){
      this.getRecords();
  }
}
</script>

