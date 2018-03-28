
// 获取初始数据
TOOL._initPage();

// 抽奖前奖品随机特效
var timer = null;
clearInterval(timer);
timer = setInterval(function () {
    TOOL._randomEffect($('.prize-item:not(".active")'), 'swing');
}, 1000);

/*
* 开始抽奖：
*
*/
$('.prize-item').on('click', function () {

    if (TOOL._flag) {

        var self = $(this);
        if (self.hasClass('active')) {
            if (TOOL._remainNum <= 0) {
                TOOL._showInterfaceBox();
            }
            return false;
        }
        var id = self.attr('data-prizeid');
        // 抽奖api /Home/Click  id:金蛋索引
        $.post("/Home/Click", { id: id }, function (response) {

            if (response.status == 0) {
                clearInterval(timer);

                TOOL._prizeDrawDataInit(response); // 抽奖通用数据初始化

                // 固定抽奖工具消失
                $('#tool-fixed').css('display', 'none');
                // 开始抽奖工具显示
                self.parent('.prize-item-box').children('.tool').css('display', 'block');

                // 抽奖之前奖品晃动特效
                self.removeClass('swing').addClass('swing');

                // 500毫秒后抽奖前奖品特效显示
                setTimeout(function () {

                    // 开始抽奖工具消失
                    self.parent('.prize-item-box').children('.tool').css('display', 'none');
                    // 抽出的奖品显示
                    self.addClass('active');

                    // 200毫秒后
                    setTimeout(function () {

                        // 固定抽奖工具显示
                        $('#tool-fixed').css('display', 'block');

                        // 单个奖品弹窗显示
                        TOOL._singlePrizeModalShow();
                        timer = setInterval(function () {
                            TOOL._randomEffect($('.prize-item:not(".active")'), 'swing');
                        }, 1000);

                    }, 200);

                }, 500);
            } else if (response.status == 1) {
                alert('抽奖次数已用完...');
            }
            else {
                alert('操作失败，请稍后重试...');
            }
        }).fail(function () {
            alert('网络错误，请稍后重试...');
        })
       





    }

});

function clickinfo(id,link)
{

    $.post("/Home/SetCLick", {id:id},function (data) {
        window.location.href = link;
    })
}