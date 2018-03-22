var lottery = new LotteryCard(document.getElementById('js_lottery'),{
  size: 10, //滑动区域大小
  percent: 50, //激活百分比到谋个值 就全显示
  resize: true, //canvas的大小是否是可变的
  cover: '#999999' //img or color string, default gray
});
lottery.on('start',function(){
  //中奖结果，传递是中奖结果图片地址
  lottery.setResult('../img/icon-no.png');
}).on('end',function(){
  $(document).dialog({      
    overlayClose:true,
    titleShow: false,
    content: '不好意思，再接再厉',
  });
}).on('reset',function(){});