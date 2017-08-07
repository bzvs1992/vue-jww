<template>
	<section class="wrap">
        <div class="doll_index">
            <div class="doll_wp">
                <!--头部-->
                <div class="doll_header"> <a href="#" class="doll_back" title="返回">返回</a>
                    <h3 class="doll_tit">夹娃娃</h3>
                    <div class="doll_bean"> <i class="doll_bean_ico"></i> <span class="doll_bean_num">{{ myBean }}</span> <i class="doll_bean_plus"></i> </div>
                    <a href="#" class="doll_entry doll_mine"></a> <a href="#" class="doll_entry doll_rule"></a>
                </div>
                <!--夹娃娃-->
                <div class="machine">
                    <div class="machine_clip" :class="{ 'move': isMove }"> <i class="mc_line" style="height:354px;"></i> <i class="mc_circle"></i>
                        <div class="mc_arm_left mc_arm" :class="{ 'move': isDown }"> <i class="mc_arm_item"></i> </div>
                        <div class="mc_arm_right mc_arm" :class="{ 'move': isDown }"> <i class="mc_arm_item"></i> </div>
                    </div>
                    <div class="doll_box">
                        <ul class="doll_list" :style="{'transform':'translate3d('+count+'px,0,0'}">
                            <li class="doll_item" :class="{'catch': idx == 0}">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face1"></i>
                                    <div class="doll_img_goods"></div>
                                    <div class="doll_img_name doll_img_name_ticket">
                                        <div class="doll_img_txt"></div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                            <li v-for="item in dolls" :key="item.key">

                            </li>
                            <li class="doll_item" :class="{'catch': idx == 1}">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face2"></i>
                                    <div class="doll_img_name doll_img_name_gift">
                                        <div class="doll_img_txt"></div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                            <li class="doll_item" :class="{'catch': idx == 2}">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face3"></i>
                                    <div class="doll_img_goods"> <img src="../images/170x200.jpg" alt=""> </div>
                                    <div class="doll_img_name doll_img_name_goods">
                                        <div class="doll_img_txt">iphone7 plus</div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                            <li class="doll_item" :class="{'catch': idx == 3}">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face1"></i>
                                    <div class="doll_img_goods"></div>
                                    <div class="doll_img_name doll_img_name_ticket">
                                        <div class="doll_img_txt"></div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                            <li class="doll_item" :class="{'catch': idx == 4}">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face2"></i>
                                    <div class="doll_img_name doll_img_name_gift">
                                        <div class="doll_img_txt"></div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                            <li class="doll_item" :class="{'catch': idx == 5}">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face3"></i>
                                    <div class="doll_img_goods"> <img src="../images/170x200.jpg" alt=""> </div>
                                    <div class="doll_img_name doll_img_name_goods">
                                        <div class="doll_img_txt">iphone7 plus</div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                        </ul>
                        <div class="doll_item" id="item_sel" :class="{ 'move': isShow, 'ani1': isAni == 1, 'ani2': isAni == 2 }">
                            <div class="doll_img"> <i class="doll_img_face doll_img_face2 doll_img_faces"></i>
                                <div class="doll_img_name doll_img_name_gift">
                                    <div class="doll_img_txt"></div>
                                </div>
                                <i class="doll_body"></i> </div>
                        </div>	
                    </div>
                </div>
                <!--闪烁灯-->
                <div class="light light_left"> <i :class="{'light_dot_twinkle': light, 'light_dot': !light}"></i></div>
                <div class="light light_right"><i :class="{'light_dot_twinkle': light, 'light_dot': !light}"></i></div>
            </div>
            <!--通知-->
            <div class="doll_notice">
                <ul>
                    <li> <span class="head_img"><img src="../images/head_img.png" alt=""></span> 我以为是骗人的，没想到手机第二天就到了 </li>
                </ul>
            </div>
            <!--底部-->
            <div class="doll_opt">
                <div class="times_tips">单次</div>
                <div class="hole"></div>
                <span class="doll_ico_coin" :class="{'doll_coin_animate': isDown}"></span> <span class="coin_cover"></span> <a href="#" class="btn_down" title="开始" @click.prevent="gameStart()" :class="{'move': isStart}"></a> </div>
        </div>
    </section>
</template>

<script>
    let ulTimer = null;
    let lineTime = null;
    import Doll from './Doll';

	export default {
		name: 'game',
		data() {
			return {
				isStart: false,
                isDown: false,
                count: -294, 
                idx: -1,
                isMove: false,
                isShow: false,
                isAni: 0,
                light: false,
                myBean:0,
                dolls:[
                    {
                        fa: 1,
                        img:'',
                        type: 1,
                        text: ''
                    },
                    {
                        fa: 2,
                        img:'',
                        type: 2,
                        text: ''
                    },
                    {
                        fa: 3,
                        img:'../images/170x200.jpg',
                        type: 3,
                        text: 'iphone7 plus'
                    }
                ]
			}
        },
        created() {
            this.dolls = this.dolls.concat(this.dolls);
        },
        methods: {
            gameStart(){
                let self = this;
                self.isStart = true;
                self.isDown = true;
                self.isMove = true;
                self.myBean -= 1000;
                setTimeout(function(){
                    self.isStart = false;
                },100);
                setTimeout(function(){
                    self.isMove = false;
                    if(Math.abs(self.count) % 49 > 14){
                        // 抓到娃娃
                        // self.idx = parseInt(Math.abs(self.count) / 70);
                        let j = parseInt((self.count + 294) / 49);
                        self.idx = self.nowIndex(j);
                        self.isShow = true;
                    }else{
                        // 没有抓到娃娃
                    }
                    // console.log(parseInt(Math.abs(self.count) / 49), Math.abs(self.count) % 49);
                },1500);
                setTimeout(function(){
                    self.isAni = 1;
                    self.idx = -1;
                    self.isDown = false;
                },3500);
                setTimeout(function(){
                    self.isAni = 0;
                    self.isShow = false;
                },5000);
            },
            nowIndex(n){
                let i = 0;
                if(n>4){
                    i = 1;
                }else if(n>2){
                    i = 2;
                }else if(n>0){
                    i = 3;
                }else{
                    i = 4;
                }
                return i;
            }
        },
        mounted() {
            let self = this;
            let oUrl = 'https://h5.niu.xunlei.com/goldbean/query?openid=betatest_lupinyi';
            ulTimer = setInterval(function(){
                self.count += 1;
                if(self.count>0) self.count = -294;
            },1000/60);
            lineTime = setInterval(function(){
                self.light = !self.light;
            },600);
            self.$http.jsonp(oUrl,{jsonp:'cb'}).then(function(response){
                if(response.body.rtn == 0){
                    self.myBean = response.body.data.balance;
                }
            })
        },
        destroyed(){
            clearInterval(ulTimer);
        }
	}
</script>