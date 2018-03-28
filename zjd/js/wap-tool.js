var TOOL = {

    // 标记
    _flag: true,

    // 拦截标记
    _extraActivity: {
        trigger: false,
        url: '',
        end: false
    },

    // 抽奖接口
    // _interface: $("#prize-interface").val(),

    // 剩余抽奖次数
    _remainNum: 0,

    // 所有弹窗关闭
    _closeAllModalBox: function () {
        $('#mask, #modal-box, #modal-message-box, .modal-gold:not(".left-top, .right-bottom"), #modal-ribbon, #light-beam-box, ' +
        '#modal-all-prizes-box, #modal-single-prize-box, .all-prizes-box').css('display', 'none');
    },

    // 根元素默认高度
    _defaultHeight: function () {
        var h = $(window).height() > 627 ? $(window).height() : (12.6 + 'rem');
        $('#root, #loading').height(h);
    },

    // 广播
    _broadcast: function (data) {
       
        var broadcastStr = '';
        var count = 0;

        $.each(data, function (index, item) {
            broadcastStr += '<li>' + item + '</li>'
        });
        $('#broadcast').html('').html('<ul>' + broadcastStr + broadcastStr + '</ul>');
        var liHeight = $('li', '#broadcast ul').eq(0).height();
        var liLength = $('li', '#broadcast ul').length;
        $('ul', '#broadcast').height(liHeight * liLength);

        // 滚动特效
        setInterval(function () {
            if (count >= liLength / 2) {
                count = 0;
                $('ul', '#broadcast').css('top', 0);
            }
            count++;
            $('ul', '#broadcast').animate({ top: -(liHeight * count) + 'px' }, 'slow');
        }, 3000);
    },

    // ios提示
    _iosNotice: function (data) {
        if (data.ios_notice !== '' && $('.ios-notice').length <= 0) {
            $('#root').append('<p class="ios-notice">' + data + '</p>');
        }
    },

    // 活动规则
    _rules: function (data) {
        
        var rulesStr = '';
        $.each(data, function (index, item) {
            rulesStr += '<p>' + item + '</p>'
        });
        $('#modal-message-box').html('').html(rulesStr);
    },

    // 所有已抽到奖品
    _myPrizes: function (data) {


        var prizeSmall = '';
        if (data.length <= 0) {
            prizeSmall = '<p>要记得先抽奖哦！</p>';
            $('#modal-all-prizes-box').html('').html(prizeSmall);
        } else {
            $.each(data, function (index, item) {
                prizeSmall += '<a  class="modal-prize-item"  onclick=clickinfo(' + item.id + ',\'' + item.link + '\')>' +
                            '<img src="' + item.img_adress + '" alt="' + item.alt + '"></a>'
            });
            $('#modal-all-prizes-box').html('').html(prizeSmall);
        }
    },

    // 抽奖情况
    _prizeDrawSituation: function (data) {
        $.each(data, function (key, value) {
            if (!value) {
                $('.prize-item[data-prizeid="' + key + '"]').removeClass('active')
                                                            .addClass('active');
            }
        });
    },

    // 抽奖成功弹窗内容更新
    _prizeDrawSuccess: function (data, remainNum) {
        var textStr = '';
        $('h3', '#modal-box').text('' + data.alt+ '');

        if (remainNum > 0) {
            textStr = '再试一次 有' + remainNum + '次机会';
        } else {
            textStr = '该活动抽奖次数已用光';
        }

        $('#modal-single-prize-box').html('')
                                    .html(
        '<a id="single-prize" class="single-prize" onclick=clickinfo(' + data.id + ',\'' + data.link+ '\')>' +
          '<img src="' + data.img_adress + '" alt="' + data.alt + '">' +
        '</a>' +
        '<a id="get-prize-btn" onclick=clickinfo(' + data.id + ',\'' + data.link + '\') class="get-prize-btn">立即领取</a>' +
        '<p class="remain-notice">' + textStr + '</p>');
    },

    // 单个奖品弹窗显示
    _singlePrizeModalShow: function () {
        this._flag = true;
        $('.modal-content', '#modal-box').css('background-color', 'transparent');
        $('#mask, #modal-box, #modal-single-prize-box, #light-beam-box').css('display', 'block');
        setTimeout(function () {
            $('.modal-gold:not(".left-top, .right-bottom")').css('display', 'block');
            $('#modal-ribbon').css('display', 'block');
        }, 0);
    },

    // 抽奖前奖品随机特效
    _randomEffect: function (eles, className) {
        var len = eles.length;
        var _index = Math.floor(Math.random() * len);
        if (len > 0) {
            eles.removeClass(className);
            setTimeout(function () {
                eles.eq(_index).addClass(className);
            }, 0);
        }
    },

    // 抽奖通用数据初始化
    _prizeDrawDataInit: function (response) {
        var self = this;
        self._flag = false;
        var bigImgData = response.data.prize_big;  // 中奖弹窗大图
        var smallImgData = response.data.prizes_small;  // 奖品小图
        var remainNum = response.data.remain_prizes.num;  // 剩余抽奖次数
        self._prizeDrawSuccess(bigImgData, remainNum);  // 抽奖成功弹窗内容更新
    
        self._myPrizes(smallImgData);  // 我的奖品内容更新
        self._remainNum = remainNum;

        // 拦截弹窗数据更新
        $.extend(self._extraActivity, response.data.extra_activity);
    },

 
   

    // 页面初始化
    _initPage: function (callback) {

        var self = this;
        //console.log(self._interface);
        $.post("/Home/GetInit", function (response) {

            if (response.status == 0) {
                var data = response.data;
               
                var status = { "1": data.remain_prizes.status._1, "3": data.remain_prizes.status._3, "2": data.remain_prizes.status._2, "5": data.remain_prizes.status._5, "4": data.remain_prizes.status._4, "6": data.remain_prizes.status._6 }
                var data = response.data;
                self._remainNum = response.data.remain_prizes.num  // 剩余抽奖次数

                // 回调函数(针对刮券抽奖)
                if (callback) {
                    callback();
                }
                
                self._broadcast(data.broadcast_msg); // 广播
                self._iosNotice(data.ios_notice); // ios提示
                self._rules(data.activity_rules); // 活动规则
                self._myPrizes(data.prizes_small); // 我的奖品
                self._prizeDrawSituation(status); // 已抽奖情况数据更新
                $.extend(self._extraActivity, data.extra_activity); // 拦截弹窗数据更新

                /*
                * 
                */
                if (self._extraActivity.trigger && !self._extraActivity.end) {
                    self._interfaceInit();
                } else if (!self._extraActivity.trigger && self._extraActivity.end) {
                    $('h3', '#modal-box').text(''); // 弹窗标题为空

                    // 我的奖品“特殊弹窗”
                    $('#mask, #modal-box, #modal-all-prizes-box, .all-prizes-box').css('display', 'block');
                    $('#loading').remove(); // 页面加载提示消失
                } else {
                    $('#loading').remove(); // 页面加载提示消失
                }

                if (!self._extraActivity.show_extra) {
                    $('#more-draw-btn').css('display', 'none');
                }
            } else {
                alert('操作失败，请稍后重试...');
            }

        }).fail(function () {
            alert('网络错误，请稍后重试...');
        })


        //var response = { "status": 0, "msg": "", "data": { "prizes_small": [], "extra_activity": {}, "broadcast_msg": ["恭喜182****6116获得<span>10万额度环球黑卡</span>", "恭喜186****2051获得<span>50万借款额度</span>", "恭喜176****6029获得<span>10万额度环球黑卡</span>", "恭喜135****7101获得<span>5000借款额度</span>", "恭喜157****0818获得<span>10万额度环球黑卡</span>", "恭喜152****4275获得<span>5000借款额度</span>", "恭喜157****7765获得<span>688元理财红包</span>", "恭喜133****9888获得<span>88元彩票红包</span>", "恭喜158****6475获得<span>688元理财红包</span>", "恭喜137****5079获得<span>688元理财红包</span>", "恭喜152****8996获得<span>10万额度环球黑卡</span>", "恭喜138****5058获得<span>88元彩票红包</span>", "恭喜152****7969获得<span>88元彩票红包</span>", "恭喜130****1856获得<span>5000借款额度</span>", "恭喜177****6563获得<span>88元彩票红包</span>", "恭喜159****8075获得<span>5000借款额度</span>", "恭喜181****4665获得<span>免费POS机一台</span>", "恭喜155****5568获得<span>688元理财红包</span>", "恭喜136****2226获得<span>688元理财红包</span>", "恭喜151****7806获得<span>688元理财红包</span>", "恭喜138****4657获得<span>10万额度环球黑卡</span>", "恭喜136****7796获得<span>5000借款额度</span>", "恭喜181****6272获得<span>10万额度环球黑卡</span>", "恭喜158****4553获得<span>免费POS机一台</span>", "恭喜176****3063获得<span>688元理财红包</span>", "恭喜136****0233获得<span>88元彩票红包</span>", "恭喜150****2570获得<span>5000借款额度</span>", "恭喜153****3222获得<span>免费POS机一台</span>", "恭喜156****7056获得<span>10万额度环球黑卡</span>", "恭喜130****6131获得<span>88元彩票红包</span>", "恭喜152****7179获得<span>688元理财红包</span>", "恭喜133****7552获得<span>10万额度环球黑卡</span>", "恭喜182****7935获得<span>50万借款额度</span>", "恭喜182****2034获得<span>5000借款额度</span>", "恭喜150****0828获得<span>50万借款额度</span>", "恭喜153****6780获得<span>免费POS机一台</span>", "恭喜137****8047获得<span>免费POS机一台</span>", "恭喜137****3487获得<span>免费POS机一台</span>", "恭喜139****8900获得<span>50万借款额度</span>", "恭喜182****6996获得<span>5000借款额度</span>", "恭喜186****0197获得<span>免费POS机一台</span>", "恭喜189****8538获得<span>688元理财红包</span>", "恭喜137****6187获得<span>88元彩票红包</span>", "恭喜175****2831获得<span>免费POS机一台</span>", "恭喜137****4649获得<span>50万借款额度</span>", "恭喜181****9130获得<span>5000借款额度</span>", "恭喜133****2361获得<span>5000借款额度</span>", "恭喜136****7422获得<span>688元理财红包</span>", "恭喜150****2008获得<span>88元彩票红包</span>", "恭喜150****1798获得<span>688元理财红包</span>"], "remain_prizes": { "status": { "1": true, "3": true, "2": true, "5": true, "4": true, "6": true }, "num": 6 }, "prize_big": {}, "ios_notice": "", "activity_rules": ["1.本活动100%中奖，有iPhoneX、现金红包、流量话费、彩票红包、贷款红包、理财红包、神秘奖品等多个奖项。", "2.本活动为概率中奖，每个奖品每日发放数量有限，祝君好运。", "3.本活动最终解释权归活动举办方所有，若有疑问请联系客服：010-52747178，或QQ：3471653040"] } }

        


    },

    // 显示拦截弹窗
    _showInterfaceBox: function () {
        var self = this;
        self._closeAllModalBox();
        if (self._extraActivity.trigger && !self._extraActivity.end) {
            self._interfaceInit();
        } else if (!self._extraActivity.trigger && self._extraActivity.end) {
            $('h3', '#modal-box').text('');
            $('#mask, #modal-box, #modal-all-prizes-box, .all-prizes-box').css('display', 'block');
        } else {
            return;
        }
    },

    // 一进页面点击更多显示拦截弹窗
    _enterPageShowInterfaceBox: function () {
        var self = this;
        self._closeAllModalBox();
        self._enterPageInterfaceInit();
    }

};

// 点击显示活动规则 || 我的奖品 && 不影响抽奖
$('a', '.button-box').on('click', function () {
    if (TOOL._flag) {
        $('.modal-content', '#modal-box').css('background-color', '#f9f9f9');
        $('.all-prizes-box').css('display', 'none');
        if ($(this).text() == '活动规则') {
            $('h3', '#modal-box').text($(this).text());
            $('#mask, #modal-box, #modal-message-box').css('display', 'block');
        } else {
            $('h3', '#modal-box').text($(this).text());
            $('#mask, #modal-box, #modal-all-prizes-box').css('display', 'block');
        }
    }
});

// 关闭模态框 && 拦截弹窗判断逻辑
$('#close-btn').on('click', function () {
    if ($('#modal-single-prize-box').css('display') == 'block') {
        TOOL._showInterfaceBox();
    } else {
        TOOL._closeAllModalBox();
    }
});

// 点击奖品链接弹窗消失
$('#single-prize, #get-prize-btn').on('click', function () {
    TOOL._closeAllModalBox();
});

// 拦截框关闭判断
$('#intercept-close-btn').on('click', function () {
    $('#modal-intercept-box').removeClass('close-active').addClass('close-active');
    $('#more-draw-btn').css('display', 'block');
    setTimeout(function () {
        $('#modal-intercept-box').removeClass('close-active');
        $('#mask, #modal-intercept-box').css('display', 'none');
    }, 500);
});
$('#more-draw-btn').on('click', function () {
    TOOL._enterPageShowInterfaceBox();
});

// 设置根元素默认高度
TOOL._defaultHeight();