import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        h5url:'https://h5.niu.xunlei.com/',
        appid: "wx33d87c078872bf59",  // 微信appid
        // openid: 'betatest_lupinyi',  // debub 调试
        openid:'',
        // tokenid:'ec0ca37f332afa2a49ba48e74d374774', // debug 调试
        tokenid:'',
        pro_id: '1',
        isBtnOn: false, // 开始按钮点击
        isPop: false, // 是否显示浮层背景
        isHole: false, // 打开黑洞
        isIntro: false, // 显示游戏说明
        isSuc: false, // 显示获奖窗口
        isStart: false, // 游戏开始，投币落下
        isDown: false, // 钩子下落
        isOpen: false, // 钩子张开
        dollw: 98,  // 每个公仔的宽度
        count: 0,  // 排列公仔的位移
        idx: -1, // 钩中的（双倍后的）公仔序号，暂时不显示
        idxon: 0, // 钩中的真实公仔序号
        isShow: false, // 钩中的公仔显示
        isAni: 0, // 中奖结束的动画
        light: false, // 灯光
        myBean: 0, // 金豆总数
        token: '', // 中奖查询的 token
        ticket_id: '', // 兑奖号
        pls: null, //评论
        disIdx: 0, // 评论显示的序列号
        prize: '', // 中的奖品
        got: 0,  // 抓中为 1
        dolls: null, //公仔数据
        dolluls: null, // 排列轮播的公仔，两倍于 dolls
        prizeType: '',  // 奖品类型
        myqq: '', // QQ号码
        myaddress: '', // 收货地址
        myname: '', // 姓名
        myphone: '', // 手机号码
        myxunlei: '', // 迅雷帐号
        isAddr: false,   // 填写收货地址
        isAddrShow: false,  // 是否显示填写地址
        records: [],  // 总的中奖记录
        recordsShow: null, // filter后展示的记录
        recordsIdx:2, // 2为显示全部, 1为已领取，0为待填写
        pageno: 1   // 记录页数
    },
    mutations: {
        setDolls(state, {_dolls, _dolls_}){
            state.dolls = _dolls;
            state.dolluls = _dolls_;
        },
        setPls(state, pls) {
            state.pls = pls;
        },
        setToken(state, token){
            state.token = token
        },
        setBtnOn(state, bo){
            state.isBtnOn = bo;
        },
        setStart(state, bo){
            state.isStart = bo;
        },
        setDown(state, bo){
            state.isDown = bo;
        },
        setOpen(state, bo){
            state.isOpen = bo;
        },
        setShow(state, bo){
            state.isShow = bo;
        },
        setIdx(state, idx){
            state.idx = idx;
        },
        setIdxon(state, idxon){
            state.idxon = idxon;
            state.pro_id = state.dolls[idxon].id;
        },
        setTicketId(state, id){
            state.ticket_id = id;
        },
        setPrize(state,info){
            state.prize = info.name;
            state.prizeType = info.type;
        },
        setAni(state, i){
            state.isAni = i;
        },
        setPop(state, bo){
            state.isPop = bo;
        },
        setSuc(state, bo){
            state.isSuc = bo;
            state.isAddrShow = (state.prizeType == 'bean' || state.prizeType == 'gamecard' ) ? false : true;
        },
        setHole(state, bo){
            state.isHole = bo;
        },
        setAddr(state, bo){
            state.isAddr = bo;
        },
        setIntro(state, bo){
            state.isIntro = bo;
        },
        setBean(state, beans){
            state.myBean = beans;
        },
        addCount(state){
            state.count ++;
        },
        setCount(state, n){
            state.count = n;
        },
        reCount(state){
            state.count = -state.dolls.length * state.dollw;
        },
        setLight(state){
            state.light = !state.light;
        },
        setDisIdx(state){
            state.disIdx ++;
        },
        reDisIdx(state){
            state.disIdx = 0;
        },
        setRecords(state, records){
            state.records = state.records.concat(records);
            state.recordsShow = state.records;
        },
        setQQ(state, val){
            state.myqq = val;
        },
        setName(state, val){
            state.myname = val;
        },
        setAddress(state, val){
            state.myaddress = val;
        },
        setPhone(state, val){
            state.myphone = val;
        },
        setXunlei(state, val){
            state.myxunlei = val;
        },
        setGot(state, bo){
            state.got = bo;
        },
        filterAll(state){
            state.recordsShow = state.records;
            state.recordsIdx = 2;
        },
        filterNoadr(state){
            state.recordsShow = state.records.filter((v,i) => (v.state == 1));
            state.recordsIdx = 0;
        },
        filterGood(state){
            state.recordsShow = state.records.filter((v,i) => (v.state == 2));
            state.recordsIdx = 1;
        },
        filterOut(state){
            state.recordsShow = state.records.filter((v,i) => (v.state == 3));
            state.recordsIdx = 3;
        },
        addPageno(state){
            state.pageno ++
        },
        setOpenid(state, id){
            state.openid = id;
        },
        setTokenid(state, id){
            state.tokenid = id;
        }
    }

})

export default store;