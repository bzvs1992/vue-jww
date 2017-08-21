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
            <li v-for="(record, index) in recordsShow" :key="index" @click.stop="showAddr(record)" v-if="index >= 0">
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
  import Record from './Record';

  export default {
    name: 'app',
    components: {
      Record
    },
    data() {
      return {
        h5url: 'https://h5.niu.xunlei.com/',
        appid: "wx33d87c078872bf59", // 微信appid
        // openid: 'betatest_lupinyi',  // debub 调试
        openid: '',
        // tokenid:'ec0ca37f332afa2a49ba48e74d374774', // debug 调试
        tokenid: '',
        prizeType: '', // 奖品类型
        myqq: '', // QQ号码
        myaddress: '', // 收货地址
        myname: '', // 姓名
        myphone: '', // 手机号码
        myxunlei: '', // 迅雷帐号
        isAddr: false, // 填写收货地址
        isAddrShow: false, // 是否显示填写地址
        records: [], // 总的中奖记录
        recordsShow: null, // filter后展示的记录
        recordsIdx: 2, // 2为显示全部, 1为已领取，0为待填写
        pageno: 1, // 记录页数
        ticket_id: '',
      }
    },
    methods: {
      goGame() {
        window.location.href = 'https://game.niu.xunlei.com/dfw/jww.html';
      },
      showPageno(e) {
        let self = this;
        if ((e.target.scrollTop / 80) > 14 * self.pageno) {
          self.pageno = self.pageno + 1;
          self.getRecords();
        }
        // console.log(e.target.scrollTop / 80)
      },
      showAddr(record) {
        if (record.state == 1) {
          this.prize = record.pro_info.name;
          this.prizeType = record.pro_info.type;
          this.ticket_id = record.ticket_id;
          this.isPop = true;
          this.isAddr = true;
        }
      },
      cloPop() {
        this.isPop = false;
        this.isAddr = false;
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
        this.myname = e.target.value;
      },
      setQQ(e) {
        this.myqq = e.target.value;
      },
      setAddress(e) {
        this.myaddress = e.target.value;
      },
      setPhone(e) {
        this.myphone = e.target.value;
      },
      setXunlei(e) {
        this.myxunlei = e.target.value;
      },
      getRecords() {
        let self = this;
        self.$http.jsonp(self.h5url + 'lottery/dolls/querylog?openid=' + self.openid + '&pageno=' + self.pageno +
          '&state=0', {
            jsonp: 'cb'
          }).then(function (res) {
          if (res.body.rtn == 0) {
            self.records = self.records.concat(res.body.data.record);
            self.recordsShow = self.records.filter((v, i) => (v.ticket_id));
          } else {
            console.log(res.body.errinfo);
          }
        }, function (err) {
          console.log('后台无反应');
        });
      },
      filterNoadr() {
        this.recordsShow = this.records.filter((v, i) => (v.state == 1));
        this.recordsIdx = 0;
      },
      filterGood() {
        this.recordsShow = this.records.filter((v, i) => (v.state == 2));
        this.recordsIdx = 1;
      },
      filterAll() {
        this.recordsShow = this.records.filter((v, i) => (v.ticket_id));
        this.recordsIdx = 2;
      },
      filterOut() {
        this.recordsShow = this.records.filter((v, i) => (v.state == 3));
        this.recordsIdx = 3;
      },
      addPageno() {
        this.pageno++;
      },
      loginTo() {
        let href = location.href;
        let redirect_uri = encodeURIComponent(href);
        redirect_uri = encodeURIComponent(this.h5url + "wechat/openid?redirect=" + redirect_uri);
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' +
          redirect_uri + '&response_type=code&scope=snsapi_base&state=login#wechat_redirect';
        location.href = url;
      }
    },
    mounted() {
      let self = this;
      // self.getRecords();
      // return;
      let _openid = self.$cookie.get('openid'),
        _tokenid = self.$cookie.get('tokenid');
      if (_openid) {
        self.openid = _openid;
        self.tokenid = _tokenid;
        // console.log(_openid);
        self.$cookie.set('openid', _openid, {
          domain: '.xunlei.com'
        });
        self.$cookie.set('tokenid', _tokenid, {
          domain: '.xunlei.com'
        });
        self.getRecords();
      } else {
        self.loginTo();
      }
    }
  }

</script>
