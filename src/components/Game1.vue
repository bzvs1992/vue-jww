<template>
	<section class="wrap">
        <div class="doll_index">
            <div class="doll_wp">
                <!--头部-->
                <div class="doll_header"> <a href="#" class="doll_back" title="返回">返回</a>
                    <h3 class="doll_tit">夹娃娃</h3>
                    <div class="doll_bean"> <i class="doll_bean_ico"></i> <span class="doll_bean_num">90</span> <i class="doll_bean_plus"></i> </div>
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
                            <li class="doll_item">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face1"></i>
                                    <div class="doll_img_goods"></div>
                                    <div class="doll_img_name doll_img_name_ticket">
                                        <div class="doll_img_txt"></div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                            <li class="doll_item">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face2"></i>
                                    <div class="doll_img_name doll_img_name_gift">
                                        <div class="doll_img_txt"></div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                            <li class="doll_item">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face3"></i>
                                    <div class="doll_img_goods"> <img src="../images/170x200.jpg" alt=""> </div>
                                    <div class="doll_img_name doll_img_name_goods">
                                        <div class="doll_img_txt">iphone7 plus</div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                            <li class="doll_item">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face1"></i>
                                    <div class="doll_img_goods"></div>
                                    <div class="doll_img_name doll_img_name_ticket">
                                        <div class="doll_img_txt"></div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                            <li class="doll_item">
                                <div class="doll_img"> <i class="doll_img_face doll_img_face2"></i>
                                    <div class="doll_img_name doll_img_name_gift">
                                        <div class="doll_img_txt"></div>
                                    </div>
                                    <i class="doll_body"></i> </div>
                            </li>
                            <li class="doll_item">
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
                <div class="light light_left"> <i class="light_dot light_dot_twinkle"></i></div>
                <div class="light light_right"><i class="light_dot light_dot_twinkle"></i></div>
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
                <span class="doll_ico_coin" :class="{'doll_coin_animate': isStart}"></span> <span class="coin_cover"></span> <a href="#" class="btn_down" title="开始" @click.prevent="gameStart()" :class="{'move': isDown}"></a> </div>
        </div>
    </section>
</template>

<script>
    let ulTimer = null;
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
    })();
	export default {
		name: 'game',
		data() {
			return {
				isStart: false,
                isDown: false,
                count: -294, 
                idx: 0,
                isMove: false,
                isShow: false,
                isAni: 0,
                gameTime:0
			}
		},
        methods: {
            gameStart(){
                let self = this;
                self.isStart = true;
                self.isDown = true;
                self.isMove = true;
                // setTimeout(function(){
                //     self.isDown = false;
                // },100);
                // setTimeout(function(){
                //     self.isMove = false;
                //     self.isShow = true;
                // },1500);
                // setTimeout(function(){
                //     self.isAni = 1;
                // },3500);
                self.idx = parseInt(Math.abs(self.count) / 74);
            },
            gameAni(){
                this.count += 1;
                if(this.count>0) this.count = -294;
                if(this.isStart){
                    this.gameTime += 1;
                }
                if(this.gameTime > 100){
                    this.isDown = false;
                }
                if(this.gameTime > 1500){
                    this.isMove = false;
                    this.isShow = true;
                }
                if(this.gameTime > 3000){
                    this.isAni = 1;
                }
                window.requestAnimFrame(this.gameAni);
            }
        },
        mounted() {
            let self = this;
            window.requestAnimFrame(self.gameAni);
        }

	}
</script>