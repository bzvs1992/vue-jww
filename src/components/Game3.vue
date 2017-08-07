<template>
  <div class="game">
    <section class="wrap">
      <div class="doll_index">
        <div class="doll_wp">
          <!--头部-->
          <div class="doll_header"> <a href="#" class="doll_back" title="返回">返回</a>
            <h3 class="doll_tit">夹娃娃</h3>
            <div class="doll_bean"> <i class="doll_bean_ico"></i> <span class="doll_bean_num">{{ myBean }}</span> <i class="doll_bean_plus"></i>              </div>
            <a href="#" class="doll_entry doll_mine" @click.prevent="goPrize()"></a> <a href="#" class="doll_entry doll_rule"
              @click.prevent="showIntro()"></a>
          </div>
          <!--夹娃娃-->
          <div class="machine">
            <div class="machine_clip" :class="{ 'move': isDown }"> <i class="mc_line" style="height:354px;"></i> <i class="mc_circle"></i>
              <div class="mc_arm_left mc_arm" :class="{ 'move': isOpen }"> <i class="mc_arm_item"></i> </div>
              <div class="mc_arm_right mc_arm" :class="{ 'move': isOpen }"> <i class="mc_arm_item"></i> </div>
            </div>
            <div class="doll_box">
              <ul class="doll_list" :style="{ 'transform':'translate3d('+count+'px,0,0', 'width': dollws*2 + 'px' }">
                <li class="doll_item" v-for="(item, index) in dolls" :key="item.index" :class="{'catch': idx == index}" :data-idx="index">
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
          <a href="#" class="btn_down" title="开始" @click.prevent="gameStart()" :class="{'move': isBtnOn}"></a>
        </div>
      </div>

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
              <a href="#" class="p_btn" title="继续游戏" @click.prevent="cloPop()">继续游戏</a>
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
            <p>您也可以稍后去中奖记录里面填写QQ号码</p>
            <div class="p_btn_wp">
              <a href="#" class="p_btn btn_radius" title="继续游戏" @click.prevent="cloPop()">继续游戏</a>
              <a href="#" class="p_btn btn_radius" title="马上填写" @click.prevent="showAddr()">马上填写</a>
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
          <a href="#" class="mpop_clo" title="关闭">关闭</a></div>
        <div class="mpop_cont">
        <div class="fill_addr">
                <div class="input_box">
                  <label>收货人：</label>
                  <input type="text">
                </div>
                <div class="input_box">
                  <label>手机号码：</label>
                  <input type="text">
                </div>
                <div class="input_box">
                  <label>收货地址：</label>
                  <input type="text">
                </div>
                <p class="tips">请确认填写无误，收货信息无法二次修改</p>
              <div class="p_btn_wp"><a href="#" class="btn_submit" title="确定" @click.prevent="cloPop()">确定</a></div>
        </div> 
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  
  // 奖品轮播 计时器
  let ulTimer = null;
  // 两边灯光 计时器
  let lineTimer = null;
  // 评论条轮播 计时器
  let disTimer = null;
  //奖品接口
  let h5url = 'https://h5.niu.xunlei.com/';
  let openid = 'betatest_lupinyi';
  let tokenid = 'ec0ca37f332afa2a49ba48e74d374774';
  let pro_id = '1';

  // 金豆查询
  let beansUrl = 'https://h5.niu.xunlei.com/goldbean/query?openid=' + openid;

  import Doll from './Doll';
  import Discuss from './Discuss';
  import img1 from '../images/170x200.jpg';

  // 评论
  let pls = window.jww_pl_json;

  // 奖品
  let dolls = window.jww_json;
  let doll_w = 98;
  let dolsl_w = doll_w * dolls.length;
  // console.log(dolls);

  export default {
    name: 'game',
    components: {
      Doll,
      Discuss
    },
    data() {
      return {
        isBtnOn: false, // 开始按钮点击
        isPop: false, // 是否显示浮层背景
        isHole: false, // 打开黑洞
        isIntro: false, // 显示游戏说明
        isSuc: false, // 显示获奖窗口
        isStart: false, // 游戏开始，投币落下
        isDown: false, // 钩子下落
        isOpen: false, // 钩子张开
        dollws: dolsl_w,
        count: -dolsl_w,
        idx: -1, // 钩中的暂时不显示
        idxon: 0, // 钩中的
        isShow: false, // 钩中的公仔显示
        isAni: 0, // 中奖结束的动画
        light: false, // 灯光
        myBean: 0, // 金豆总数
        token: '', // 中奖查询的 token
        ticket_id: '', // 兑奖号
        pls: pls, //评论
        disIdx: 0, // 评论显示的序列号
        prize: '', // 中的奖品
        dolls: dolls, //公仔
        isAddr: false   // 填写收货地址
      }
    },
    created() {
      this.dolls = this.dolls.concat(this.dolls);
      this.dolls.map( (v,i) => {
        v.face = parseInt(Math.random() * 3 + 1)
      });
    },
    methods: {
      gameStart() {
        let self = this;

        self.isBtnOn = true;
        setTimeout(function () {
          self.isBtnOn = false;
        }, 100);

        // 以防连续点击开始按钮
        if (self.isStart) {
          return false;
        }

        // self.gameGoing();
        // return;

        // 查询 token 成功才算游戏开始
        self.$http.jsonp(h5url + 'lottery/dolls/pick?openid=' + openid + '&tokenid=' + tokenid + '&pro_id=' + pro_id, {
          jsonp: 'cb'
        }).then(function (res) {
          if (res.body.rtn == 0) {
            self.token = res.body.data.token;
            self.gameGoing();
          } else {
            self.gameRest(1500);
            console.log('金豆不足!');
          }
        }, function (err) {
          self.gameRest(1500);
          console.log('后台无数据!');
        });
      },
      gameGoing() {
        let self = this;
        self.isStart = true;
        self.isDown = true;
        self.isOpen = true;
        setTimeout(function () {
          if (Math.abs(self.count) % 49 > 14) {
            // 抓到娃娃 
            let j = parseInt((self.count + self.dollws) / 49);
            self.idx = parseInt(((dolls.length + 1) * 2 - j) / 2);
            self.idxon = self.idx > dolls.length ? self.idx - dolls.length : self.idx;
            // console.log(j,self.idx);
            self.isShow = true;
            self.isDown = false;
            self.gameCb();
          } else {
            // 没有抓到娃娃
            self.gameRest(1500);
            self.isDown = false;
            self.isOpen = false;
            console.log('未抓中');
          }
        }, 1500);
      },
      gameCb() {
        let self = this;

        // self.gameSuc();
        // self.gameRest(4000);
        // return;

        self.$http.jsonp(h5url + 'lottery/dolls/status?openid=' + openid + '&tokenid=' + tokenid + '&pro_id=' + pro_id + '&token=' +
          self.token, {
            jsonp: 'cb'
          }).then(function (res) {
          if (res.body.rtn == 0) {
            self.ticket_id = res.body.data.ticket_id;
            self.prize = res.body.data.pro_info.name;
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
          self.isAni = 1;
          self.isDown = false;
          self.isOpen = false;
          self.gameWin();
        }, 3000);
      },
      // 显示奖品
      gameWin() {
        let self = this;
        setTimeout(function () {
          self.isPop = true;
          self.isSuc = true;
        }, 1000);
      },
      // 未抓到
      gameFail() {
        let self = this;
        setTimeout(function () {
          self.isAni = 2;
          self.isDown = false;
          self.isOpen = false;
          self.isHole = true;
        }, 3000);
      },
      // 游戏重置
      gameRest(tim) {
        let self = this;
        setTimeout(function () {
          self.idx = -1; // 消失的娃娃再出现
          self.isAni = 0; // 抓住的娃娃回到原点
          self.isHole = false;
          self.isShow = false;
          self.isDown = false;
          self.isStart = false;
          self.getBeans();
        }, tim);
      },
      cloPop() {
        this.isPop = false;
        this.isIntro = false;
        this.isSuc = false;
        this.isAddr = false;
      },
      goRecord() {
        this.$router.push({
          path: '/record'
        })
      },
      showAddr(){
        this.isSuc = false;
        this.isAddr = true;
      },
      goPrize() {
        this.$router.push({
          path: '/prize'
        })
      },
      showIntro() {
        this.isPop = true;
        this.isIntro = true;
      },
      getBeans() {
        // 金豆总数
        let self = this;
        self.$http.jsonp(h5url+'goldbean/query?openid='+openid, {
          jsonp: 'cb'
        }).then(function (res) {
          if (res.body.rtn == 0) {
            self.myBean = res.body.data.balance;
          }
        });
      }
    },
    mounted() {
      let self = this;

      self.getBeans();
      
      ulTimer = setInterval(function () {
        self.count += 1;
        if (self.count > 0) self.count = -self.dollws;
      }, 1000 / 60);

      lineTimer = setInterval(function () {
        self.light = !self.light;
      }, 600);

      disTimer = setInterval(function () {
        self.disIdx += 1;
        if (self.disIdx >= self.pls.length) {
          self.disIdx = 0;
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
