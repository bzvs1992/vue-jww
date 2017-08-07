<template>
  <div class="game">
    <section class="wrap">
      <div class="doll_index">
        <div class="doll_wp">
          <!--头部-->
          <div class="doll_header"> <a href="#" class="doll_back" title="返回">返回</a>
            <h3 class="doll_tit">夹娃娃</h3>
            <div class="doll_bean"> <i class="doll_bean_ico"></i> <span class="doll_bean_num">{{ myBean }}</span> <i class="doll_bean_plus"></i>              </div>
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
                <li class="doll_item" v-for="(item, index) in dolluls" :key="item.index" :class="{'catch': idx == index}" :data-idx="index">
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
            <p v-if="isAddrShow">您也可以稍后去中奖记录里面填写QQ号码</p>
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
                  <label>收货地址：</label>
                  <input type="text" @input="setXunlei">
                </div>
                <p class="tips">请确认填写无误，收货信息无法二次修改</p>
              <div class="p_btn_wp"><a href="#" class="btn_submit" title="确定" @click.prevent="subAddr">确定</a></div>
        </div> 
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  
  // 奖品轮播 计时器
  let ulTimer = null;
  // 两边灯光 计时器
  let lineTimer = null;
  // 评论条轮播 计时器
  let disTimer = null;

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
    computed: mapState([
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
      "isAddrShow"]
    ),
    created() {
      let _dolls_ = _dolls.concat(_dolls);
      // console.log(_dolls);
      _dolls_.map( (v,i) => {
          v.face = parseInt(Math.random() * 3 + 1);
      });
      this.$store.commit('setDolls', {_dolls, _dolls_});
      this.$store.commit('setPls', _pls);
      this.$store.commit('setCount', -this.dollw*_dolls.length);
    },
    methods: {
      // ...mapMutations(['gameStart']),
      setName(e){
        this.$store.commit('setName', e.target.value);
      },
      setQQ(e){
        this.$store.commit('setQQ', e.target.value);
      },
      setAddress(e){
        this.$store.commit('setAddress', e.target.value);
      },
      setPhone(e){
        this.$store.commit('setPhone', e.target.value);
      },
      setXunlei(e){
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
        self.$http.jsonp(self.h5url + 'lottery/dolls/pick?openid=' + self.openid + '&tokenid=' + self.tokenid, {
          jsonp: 'cb'
        }).then(function (res) {
          if (res.body.rtn == 0) {
            self.$store.commit('setToken', res.body.data.token);
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
        self.$store.commit('setStart', true);
        self.$store.commit('setDown', true);
        self.$store.commit('setOpen', true);
        setTimeout(function () {
          if (Math.abs(self.count) % 49 > 14) {
            // 抓到娃娃 
            let j = parseInt((self.count + _dolls.length * self.dollw) / 49);
            let idx = parseInt(((_dolls.length + 1) * 2 - j) / 2);
            let idxon = idx >= _dolls.length ? idx - _dolls.length : idx;
            self.$store.commit('setIdx',idx);
            self.$store.commit('setIdxon', idxon);
            // console.log(j,self.idx);
            self.$store.commit('setShow', true);
            self.$store.commit('setDown', false);
            self.gameCb();
          } else {
            // 没有抓到娃娃
            self.gameRest(1500);
            self.$store.commit('setDown', false);
            self.$store.commit('setOpen', false);
            console.log('未抓中');
          }
        }, 1500);
      },
      gameCb() {
        let self = this;

        // self.gameSuc();
        // self.gameRest(4000);
        // return;

        self.$http.jsonp(self.h5url + 'lottery/dolls/status?openid=' + self.openid + '&tokenid=' + self.tokenid + '&pro_id=' + self.pro_id + '&token=' +
          self.token, {
            jsonp: 'cb'
          }).then(function (res) {
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
          self.$store.commit('setAni',2);
          self.$store.commit('setDown', false);
          self.$store.commit('setOpen', false);
          self.$store.commit('setHole', true);
        }, 3000);
      },
      // 游戏重置
      gameRest(tim) {
        let self = this;
        setTimeout(function () {
          self.$store.commit('setIdx', -1);
          self.$store.commit('setAni',0);
          self.$store.commit('setHole',false);
          self.$store.commit('setShow', false);
          self.$store.commit('setDown', false);
          self.$store.commit('setStart', false);
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
        this.$router.push({
          path: '/record'
        })
      },
      showAddr(){
        this.$store.commit('setSuc', false);
        this.$store.commit('setPop', true);
        this.$store.commit('setAddr', true);
      },
      subAddr(){
        let self = this;
        let myinfo = {
          "name": self.myname,
          "tel": self.myaddress,
          "qq": self.myqq,
          "xlusername": self.myxunlei,
          "addr": self.myaddress
        };
        let urlParams = encodeURIComponent(JSON.stringify(myinfo));
        this.$http.jsonp(this.h5url + 'lottery/dolls/addr?ticket_id=' + self.ticket_id + '&info=' + urlParams,{
          jsonp: 'cb'
        }).then(function(res){
            if(res.body.rtn == 0){
              this.cloPop();
            }else{
              alert('提交失败')
            }
        }, function(res){
            alert(res.errinfo);
        });
      },
      goPrize() {
        this.$router.push({
          path: '/prize'
        })
      },
      showIntro() {
        this.$store.commit('setPop', true);
        this.$store.commit('setIntro', true);
      },
      getBeans() {
        // 金豆总数
        let self = this;
        self.$http.jsonp(self.h5url+'goldbean/query?openid='+self.openid, {
          jsonp: 'cb'
        }).then(function (res) {
          if (res.body.rtn == 0) {
            self.$store.commit('setBean', res.body.data.balance);
          }
        });
      }
    },
    mounted() {
      let self = this;

      self.getBeans();
      
      ulTimer = setInterval(function () {
        self.$store.commit('addCount');
        if (self.count > 0){
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
