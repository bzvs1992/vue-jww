<template>
  <div class="game">
    <section class="wrap">
      <div class="doll_index">
        <div class="doll_wp">
          <!--头部-->
          <div class="doll_header"> <a href="#" class="doll_back" title="返回">返回</a>
            <h3 class="doll_tit">夹娃娃</h3>
            <div class="doll_bean"> <i class="doll_bean_ico"></i> <span class="doll_bean_num">{{ myBean >= 10000 ? myBean/10000 + "万" :  myBean }}</span>              <i class="doll_bean_plus" @click="openPay"></i></div>
            <a href="#" class="doll_entry doll_mine" @click.prevent="goRecord"></a> <a href="#" class="doll_entry doll_rule"
              @click.prevent="showIntro"></a>
          </div>
          <!--夹娃娃-->
          <div class="machine">
            <div class="machine_clip" :class="{ 'move': isDown }"> <i class="mc_line" style="height:354px;"></i> <i class="mc_circle"></i>
              <div class="mc_arm_left mc_arm" :class="{ 'move': isOpen }"> <i class="mc_arm_item"></i> </div>
              <div class="mc_arm_right mc_arm" :class="{ 'move': isOpen }"> <i class="mc_arm_item"></i> </div>
            </div>
            <div class="doll_box">
              <ul class="doll_list" :style="{ 'transform':'translate3d('+count+'px,0,0', 'width': dolluls.length*dollw + 'px' }">
                <li class="doll_item" v-for="(item, index) in dolluls" :key="item.index" :class="{'catch': idx == index}" :data-gid="item.id">
                  <Doll :doll="item" :face="item.face" />
                </li>
              </ul>
            </div>
            <div class="doll_hole" :class="{ 'hole_open': isHole }"></div>
            <div class="doll_item" id="item_sel" :class="{ 'move': isShow, 'ani1': isAni == 1, 'ani2': isAni == 2 }">
              <!-- <div class="doll_img"> <i class="doll_img_face doll_img_faces"></i>
                <div class="doll_img_name doll_img_name_gift">
                  <div class="doll_img_txt"></div>
                </div>
                <i class="doll_body"></i> </div>  -->

              <Doll :doll="dolls[idxon]" :face="0" />
            </div>
          </div>
          <!--闪烁灯-->
          <div class="light light_left"> <i :class="{'light_dot_twinkle': light, 'light_dot': !light}"></i></div>
          <div class="light light_right"><i :class="{'light_dot_twinkle': light, 'light_dot': !light}"></i></div>
        </div>
        <!--通知-->
        <div class="doll_notice">
          <ul>
            <li v-for="(dis, index) in pls" :key="index">
              <transition name="disani">
                <Discuss :dis="dis" v-if="index == disIdx" />
              </transition>
            </li>
          </ul>
        </div>
        <!--底部-->
        <div class="doll_opt">
          <div class="times_tips">单次</div>
          <div class="hole"></div>
          <span class="doll_ico_coin" :class="{ 'doll_coin_animate': isStart }"></span> <span class="coin_cover"></span>
          <a href="#" class="btn_down" title="开始" @click.prevent="gameStart" :class="{'move': isBtnOn}"></a>
        </div>
      </div>


      <div class="tips_box" v-if="isGot">没有夹准， 看准时机出夹！</div>
      <div class="tips_box" v-if="isCatch">差一点就中奖啦！</div>

    </section>

    <!-- 弹窗背景 -->
    <div class="cover" v-if="isPop"></div>
    <!-- 游戏规则 -->
    <transition name="fadein">
      <div class="mpop_box mpop_box_game" v-if="isIntro" style="margin:-200px 0 0 -154px;">
        <div class="mpop_cont1">
          <div class="game_tips">
            <h4>游戏规则</h4>
            <p>玩法说明：</p>
            <p>实物奖品不提供发票，如需售后可凭收货手机号 联系京东处理
            </p>
            <p>夹娃娃能否夹中，取决于出夹的时机：娃娃夹起 后能否成功放入背包，取决于奖品的概率：部分 奖品由京东负责发货，若京东部门地区缺货，导 致无法正常派送，我们将在两个工作日内通知用 户，用户可在订单内申请退金豆，即可退换奖品
              价值等额的金豆，用户可以使用金豆在领奖台兑 换其他奖品。
            </p>
            <p>奖品图片仅供参考，具体奖品请以实际收到的为 准。
            </p>
            <div class="p_btn_wp">
              <a href="#" class="p_btn" title="继续游戏" @click.prevent="cloPop">继续游戏</a>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 中奖弹窗 -->
    <transition name="fadein">
      <div class="mpop_box mpop_box_game" v-if="isSuc">
        <div class="mpop_hd">
          <h4>恭喜</h4>
        </div>
        <div class="mpop_cont">
          <div class="info_tips">
            <strong>恭喜抓中{{ prize }}</strong>
            <p v-if="isAddrShow">您可以稍后去中奖记录里填写相关信息来领取</p>
            <div class="p_btn_wp">
              <a href="#" class="p_btn btn_radius" title="继续游戏" @click.prevent="cloPop">继续游戏</a>
              <a href="#" class="p_btn btn_radius" title="马上填写" @click.prevent="showAddr" v-if="isAddrShow">马上填写</a>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 填写收货信息 -->
    <transition name="fadein">
      <div class="mpop_box" v-if="isAddr">
        <div class="mpop_hd">
          <h4 class="mpop_tit">填写收货信息</h4>
          <a href="#" class="mpop_clo" title="关闭" @click.prevent="cloPop()">关闭</a></div>
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

    <transition name="fadein">
      <div class="mpop_box" v-if="popPay">
        <div class="mpop_hd">
          <h4 class="mpop_tit">获取金豆</h4>
          <a href="javascript:;" @click.prevent="cloPay" class="mpop_clo" title="关闭">关闭</a>
        </div>
        <div class="mpop_cont">
          <div class="integ_area">
            <div class="integ_hd"><span class="fc_red">我的金豆：{{ myBean >= 10000 ? myBean/10000 + "万" :  myBean }}</span> <a href="beans_detail.html"
                class="more" title="明细">明细</a></div>
            <ul class="integ_list">
              <li v-for="(item, index) in payBeanConfig" :key="index">
                <span class="num">{{ item.beanNum>=10000 ? item.beanNum/10000 + "万" : item.beanNum }}金豆</span> <a href="javascript:;"
                  @click.prevent="showPayConfirm(item.productid, item.beanNum)" class="btn_nor btn_get" title="获取">获取</a> </li>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fadein">
      <div class="mpop_box" v-if="popPayConfirm">
        <div class="mpop_hd">
          <h4 class="mpop_tit">获取金豆</h4>
          <a href="javascript:;" class="mpop_clo" @click.prevent="cloPay" title="关闭">关闭</a>
        </div>
        <div class="mpop_cont">
          <div class="rec_area">
            <div class="rec_cont"> <strong class="num">{{ payBean.num >= 10000 ? payBean.num/10000 + "万" : payBean.num }}金豆</strong> </div>
            <a href="javascript:;" class="btn_nor" @click.prevent="gotoPay(payBean.productid, payBean.num)" title="">立即支付{{ payBean.num/beanScale }}元</a>
            <p class="rec_tips">您将先充值钻石，充值后自动兑换<i class="ico_ques" @click="openBeanExplain">？</i></p>
          </div>
          <div class="pop_box" v-if="beanExplain">
            <a href="javascript:;" class="pop_clo" @click.prevent="cloExplain" title="关闭">关闭</a>
            <span class="pop_gray_bg"></span>
            <p class="tips">您充值钻石后，将自动兑换鲜花道具增加魅力值，同时附赠金豆。魅力值可点击首页头像查看，使用金豆可参与娱乐场游戏。（1元可充10钻，自动兑换鲜花道具增加1魅力值，同时附赠1000金豆）</p>
          </div>
        </div>
      </div>
    </transition>



  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';

  // 奖品轮播 计时器
  let ulTimer = null;
  // 两边灯光 计时器
  let lineTimer = null;
  // 评论条轮播 计时器
  let disTimer = null;

  let orderInter = null;

  let sending = false;

  import Doll from './Doll';
  import Discuss from './Discuss';

  // 评论
  let _pls = window.jww_pl_json;

  // 奖品
  let _dolls = window.jww_json;

  // let dolsl_w = dollw * dolls.length;
  // console.log(_dolls);

  export default {
    name: 'game',
    components: {
      Doll,
      Discuss
    },
    data() {
      return {
        isGot: false,
        isCatch: false,
        isAddBeans: false,
        popPayConfirm: false,
        beanExplain: false,
        payBeanConfig: [],
        popPay: false,
        payBean: {
          'productid': 0,
          'beanNum': 0
        },
        beanScale: 1000, //金豆和人民币的比例
        payGetBean: {
          'num': 0,
          'charmNum': 0
        },
      }
    },
    computed: mapState([
      "appid",
      "h5url",
      "isBtnOn",
      "isPop",
      "isHole",
      "isIntro",
      "isSuc",
      "isStart",
      "isDown",
      "isOpen",
      "dollw",
      "dollws",
      "count",
      "idx",
      "idxon",
      "isShow",
      "isAni",
      "light",
      "myBean",
      "token",
      "ticket_id",
      "pls",
      "disIdx",
      "prize",
      "got",
      "dolls",
      "dolluls",
      "isAddr",
      "openid",
      "tokenid",
      "pro_id",
      "prizeType",
      "myqq",
      "myaddress",
      "myname",
      "myphone",
      "myxunlei",
      "isAddrShow"
    ]),
    created() {
      // this.$cookie.delete('openid');
      // this.$cookie.delete('tokenid');
      let _dolls_ = _dolls.concat(_dolls);
      // console.log(_dolls);
      _dolls_.map((v, i) => {
        v.face = parseInt(Math.random() * 3 + 1);
      });
      this.$store.commit('setDolls', {
        _dolls,
        _dolls_
      });
      this.$store.commit('setPls', _pls);
      this.$store.commit('setCount', -this.dollw * _dolls.length);

    },
    methods: {
      // ...mapMutations(['gameStart']),
      loginTo() {

        // this.$cookie.set('openid', 'betatest_lupinyi');
        // this.$cookie.set('tokenid', 'ec0ca37f332afa2a49ba48e74d374774');

        let href = location.href;
        let redirect_uri = encodeURIComponent(href);
        redirect_uri = encodeURIComponent(this.h5url + "wechat/openid?redirect=" + redirect_uri);
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' +
          redirect_uri + '&response_type=code&scope=snsapi_base&state=login#wechat_redirect';
        location.href = url;
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
      gameStart() {
        let self = this;
        self.$store.commit('setBtnOn', true);
        setTimeout(function () {
          self.$store.commit('setBtnOn', false);
        }, 100);

        // 以防连续点击开始按钮
        if (self.isStart) {
          return false;
        }

        // self.gameGoing();
        // return;

        // 查询 token 成功才算游戏开始
        self.$http.jsonp(self.h5url + 'lottery/dolls/pick', {
          jsonp: 'cb'
        }).then(function (res) {
          if (res.body.rtn == 0) {
            self.$store.commit('setToken', res.body.data.token);
            self.gameGoing();
          } else {
            self.gameRest(1500);
            alert('金豆不足!');
          }
        }, function (err) {
          self.gameRest(1500);
          console.log('后台无数据!');
        });
      },
      gameGoing() {
        let self = this;
        self.$store.commit('setStart', true);
        self.$store.commit('setDown', true);
        self.$store.commit('setOpen', true);
        setTimeout(function () {
          if (Math.abs(self.count) % 49 > 14) {
            // 抓到娃娃 
            let j = parseInt((self.count + _dolls.length * self.dollw) / 49);
            let idx = parseInt(((_dolls.length + 1) * 2 - j) / 2);
            let idxon = idx >= _dolls.length ? idx - _dolls.length : idx;
            self.$store.commit('setIdx', idx);
            self.$store.commit('setIdxon', idxon);
            // console.log(j,self.idx);
            self.$store.commit('setShow', true);
            self.$store.commit('setDown', false);
            self.$store.commit('setGot', 1);
            self.gameCb();
          } else {
            // 没有抓到娃娃
            self.gameCb();
            self.gameRest(1500);
            self.$store.commit('setDown', false);
            self.$store.commit('setOpen', false);
            setTimeout(function () {
              self.isGot = true;
            }, 1600);
            setTimeout(function () {
              self.isGot = false;
            }, 3200);
            console.log('未抓中');
          }
        }, 1500);
      },
      gameCb() {
        let self = this;

        // self.gameSuc();
        // self.gameRest(4000);
        // return;

        self.$http.jsonp(self.h5url + 'lottery/dolls/status?got=' + self.got + '&pro_id=' + self.pro_id + '&token=' +
          self.token, {
            jsonp: 'cb'
          }).then(function (res) {
          if (!self.got) return;
          if (res.body.rtn == 0) {
            // console.log(res);
            self.$store.commit('setTicketId', res.body.data.ticket_id);
            self.$store.commit('setPrize', res.body.data.pro_info);
            self.gameSuc();
            self.gameRest(4000);
            console.log('中奖');
          } else {
            self.gameFail();
            self.gameRest(4500);
            console.log('未中奖');
          }
        }, function (err) {
          self.gameFail();
          self.gameRest(4500);
          console.log('抽奖出错!');
        });
      },
      // 抓到娃娃
      gameSuc() {
        let self = this;
        setTimeout(function () {
          self.$store.commit('setAni', 1);
          self.$store.commit('setDown', false);
          self.$store.commit('setOpen', false);
          self.gameWin();
        }, 3000);
      },
      // 显示奖品
      gameWin() {
        let self = this;
        setTimeout(function () {
          self.$store.commit('setPop', true);
          self.$store.commit('setSuc', true);
        }, 1000);
      },
      // 未抓到
      gameFail() {
        let self = this;
        setTimeout(function () {
          self.$store.commit('setAni', 2);
          self.$store.commit('setDown', false);
          self.$store.commit('setOpen', false);
          self.$store.commit('setHole', true);
        }, 3000);
        setTimeout(function () {
          self.isCatch = true;
        }, 3500);
        setTimeout(function () {
          self.isCatch = false;
        }, 5400);
      },
      // 游戏重置
      gameRest(tim) {
        let self = this;
        setTimeout(function () {
          self.$store.commit('setIdx', -1);
          self.$store.commit('setAni', 0);
          self.$store.commit('setHole', false);
          self.$store.commit('setShow', false);
          self.$store.commit('setDown', false);
          self.$store.commit('setStart', false);
          self.$store.commit('setGot', 0);
          self.getBeans();
        }, tim);
      },
      cloPop() {
        this.$store.commit('setPop', false);
        this.$store.commit('setIntro', false);
        this.$store.commit('setSuc', false);
        this.$store.commit('setAddr', false);
      },
      goRecord() {
        if (this.isPop) {
          return;
        }
        this.$router.push({
          path: '/record'
        })
      },
      showAddr() {
        this.$store.commit('setSuc', false);
        this.$store.commit('setPop', true);
        this.$store.commit('setAddr', true);
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
            this.cloPop();
          } else {
            alert('提交失败')
          }
        }, function (res) {
          alert(res.errinfo);
        });
      },
      goPrize() {
        this.$router.push({
          path: '/prize'
        })
      },
      showIntro() {
        if (this.isAddr) {
          return;
        }
        this.$store.commit('setPop', true);
        this.$store.commit('setIntro', true);
      },
      getBeans() {
        // 金豆总数
        let self = this;
        self.$http.jsonp(self.h5url + 'goldbean/query', {
          jsonp: 'cb'
        }).then(function (res) {
          if (res.body.rtn == 0) {
            self.$store.commit('setBean', res.body.data.balance);
          }
        });
      },
      openPay() {
        let self = this;
        self.$http.jsonp(self.h5url + 'recharge/getlist', {
          jsonp: 'cb'
        }).then(function (res) {
          if (res.body.rtn == 0) {
            self.payBeanConfig = [];
            let listArr = res.body['data'].prolist;
            for (var i in listArr) {
              self.payBeanConfig.push({
                "productid": listArr[i].seqid,
                "beanNum": listArr[i].goldbean_main
              });
            }
            self.popPay = true;
          }
        }); 
      },
      showPayConfirm(productid, beanNum) {
        this.payBean.num = beanNum;
        this.payBean.productid = productid;
        this.popPay = false;
        this.popPayConfirm = true;
      },
      gotoPay(productid, beanNum) {
        let _this = this;
        if (orderInter) {
          //清除定时器
          clearInterval(orderInter);
        }

        // if (!this.openid) {
        //   this.openid = commonObj.cookie("openid");
        // }

        if (sending == true) {
          // commonObj.showTip("正在拉起支付...");
          return false; //正在支付
        }

        sending = true;

        setTimeout(function () {
          sending = false;
        }, 5000); //5秒之后自动解除锁

        beanNum = parseInt(beanNum);
        let url = _this.h5url + 'wechat/order/pay' + '?openid=' + _this.openid + '&productid=' + productid +
          '&count=1&comefrom=wxpay';
        // alert("gotoPay: " + url);
        _this.$http.jsonp(url, {
          jsonp: 'cb'
        }).then(function (response) {
          let resObj = response.body;
          // alert(JSON.stringify(resObj));

          if (resObj.rtn == 0) {
            var wxPayObj = {
              "appId": _this.appid.toString(),
              "timestamp": resObj.data.paydata.timeStamp.toString(), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              "nonceStr": resObj.data.paydata.nonceStr.toString(), // 支付签名随机串，不长于 32 位
              "package": resObj.data.paydata.package.toString(), // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              "signType": resObj.data.paydata.signType.toString(), // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              "paySign": resObj.data.paydata.paySign.toString(), // 支付签名
              "success": function (res) {
                // 支付成功后的回调函数
                // alert('拉起成功');
                // alert(JSON.stringify(res));
                // _this.closePop();
                // commonObj.showTip("正在查询...");
                orderInter = setInterval(function () {
                  _this.checkOrder(resObj.data.orderid, function (checkResObj) {
                    //console.log(checkResObj);

                    if (checkResObj.rtn == 0 && checkResObj.data.paysucc == 1) {
                      clearInterval(orderInter); //停止回查订单定时器

                      _this.payGetBean.num = parseInt(checkResObj.data.goldbean_main) + parseInt(
                        checkResObj.data.goldbean_extr);
                      _this.payGetBean.charmNum = checkResObj.data.meili;
                      // _this.showPaySuccess(); //展示充值成功弹窗

                      _this.getBeans(); //回查我的金豆
                      alert('充值成功');
                    }
                  });
                }, 2000);
              },
              cencel: function (res) { // 支付取消回调函数
                // commonObj.showTip("您取消了支付，高富帅不要走~");
              },
              fail: function (res) { // 支付失败回调函数
                // commonObj.showTip("网络繁忙，请稍候再试");
                // //拉起支付失败，重新配置
                _this.getWxSdkConfigSign(function (resObj) {});
              }
            };
            
            alert(JSON.stringify(wxPayObj));
            alert('拉起支付');
            wx.chooseWXPay(wxPayObj); //拉起微信支付
            
          } else if (resObj.rtn == 1004 || resObj.rtn == 2 || resObj.rtn == 101) {
            // this.getWxCode(); //重新获取code，重新登录
          } else {
            // commonObj.showTip("网络繁忙，请稍候再试~");
          }

          setTimeout(function () {
            sending = false; //两秒后再解锁，以防多次点击
          }, 4000);
        });
      },
      //微信sdk初始化签名获取
      getWxSdkConfigSign: function (callback) {
        let href = location.href;
        let hrefArr = href.split("#");
        href = hrefArr[0];

        let url = this.h5url + 'wechat/app/signature?url=' + encodeURIComponent(href);
        // alert("getWxSdkConfigSign: " + url);

        this.$http.jsonp(url, {
          jsonp: 'cb'
        }).then(function (response) {
          var resObj = response.body;
          // alert(JSON.stringify(resObj));
          if (resObj.rtn == 0) {
            var wxSdkConfig = {
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: resObj.data.appid, // 必填，公众号的唯一标识
              timestamp: resObj.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: resObj.data.nonce, // 必填，生成签名的随机串
              signature: resObj.data.signature, // 必填，签名，见附录1
              jsApiList: [
                'checkJsApi',
                'chooseWXPay', //拉起支付
                'openAddress', //共享地址
                'onMenuShareTimeline', //分享到朋友圈
                'onMenuShareAppMessage', //分享给朋友
                'onMenuShareQQ', //分享到qq
                'onMenuShareWeibo', //分享到微博
                'onMenuShareQZone' //分享到qq空间
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            }
            //alert("wxSdkConfig:" + JSON.stringify(wxSdkConfig));
            wx.config(wxSdkConfig);

            wx.error(function (res) {
              // alert("wxSdkConfig:" + JSON.stringify(res));
            });

            wx.ready(function () {
              var shareObj = {
                title: "玩夹娃娃娃游戏，送金豆大礼包",
                desc: "每日登陆游戏，即可获赠金豆！",
                link: 'https://game.niu.xunlei.com/dfw/jww.html',
                type: "link",
                imgUrl: 'http://game.niu.xunlei.com/dfw/icon.png'
              };
              /* 微信分享 */
              wx.onMenuShareTimeline({
                title: shareObj.title, // 分享标题
                link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareObj.imgUrl, // 分享图标
                success: function () {},
                cancel: function () {}
              });

              wx.onMenuShareAppMessage({
                title: shareObj.title, // 分享标题
                desc: shareObj.desc, // 分享描述
                link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareObj.imgUrl, // 分享图标
                type: shareObj.type, // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {},
                cancel: function () {}
              });

              wx.onMenuShareQQ({
                title: shareObj.title, // 分享标题
                desc: shareObj.desc, // 分享描述
                link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareObj.imgUrl, // 分享图标
                success: function () {},
                cancel: function () {}
              });

              wx.onMenuShareWeibo({
                title: shareObj.title, // 分享标题
                desc: shareObj.desc, // 分享描述
                link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareObj.imgUrl, // 分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });

              wx.onMenuShareQZone({
                title: shareObj.title, // 分享标题
                desc: shareObj.desc, // 分享描述
                link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareObj.imgUrl, // 分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
            });
          }

          if (callback) {
            callback(resObj);
          }
        });
      },
      checkOrder: function (orderid, callback) {
        let url = this.h5url + 'wechat/order/isPaySucc?openid=' + this.openid + '&orderid=' + orderid;
        // alert( "发起checkOrder: " + url );
        this.$http.jsonp(url, {
          jsonp: 'cb'
        }).then(function (response) {
          var resObj = response.body;
          // alert( "checkOrder结果: " + JSON.stringify(resObj) );
          if (callback) {
            callback(resObj);
          }
        });
      },
      cloPay() {
        this.popPay = false;
        this.popPayConfirm = false;
      },
      openBeanExplain() {
        this.beanExplain = true;
      },
      cloExplain() {
        this.beanExplain = false;
      }
    },
    mounted() {
      let self = this;
      let _openid = 'betatest_lupinyi',
        _tokenid = 'ec0ca37f332afa2a49ba48e74d374774';
      self.$store.commit('setOpenid', _openid);
      self.$store.commit('setTokenid', _tokenid);
      // console.log(_openid);
      self.$cookie.set('openid', _openid, {
        domain: '.xunlei.com'
      });
      self.$cookie.set('tokenid', _tokenid, {
        domain: '.xunlei.com'
      });
      self.getBeans();
      
      // this.getWxSdkConfigSign(function(resObj) {});

      ulTimer = setInterval(function () {
        self.$store.commit('addCount');
        if (self.count > 0) {
          self.$store.commit('reCount');
        }
      }, 1000 / 60);

      lineTimer = setInterval(function () {
        self.$store.commit('setLight');
      }, 600);

      disTimer = setInterval(function () {
        self.$store.commit('setDisIdx');
        if (self.disIdx >= self.pls.length) {
          self.$store.commit('reDisIdx');
        }
      }, 4000);

    },
    destroyed() {
      clearInterval(ulTimer);
      clearInterval(lineTimer);
      clearInterval(disTimer);
    }
  }

</script>

<style>
  .game {
    position: relative;
    width: 100%;
    height: 100%;
  }

</style>
