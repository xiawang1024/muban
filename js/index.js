var lottery = new LotteryCard(document.getElementById('js_lottery'),{
  size: 20, //滑动区域大小
  percent: 50, //激活百分比到谋个值 就全显示
  resize: true, //canvas的大小是否是可变的
  cover: '#999999' //img or color string, default gray
});
lottery.on('start',function(){
  //中奖结果，传递是中奖结果图片地址
  lottery.setResult('...imageSrc');
}).on('end',function(){}).on('reset',function(){});