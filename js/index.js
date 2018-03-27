//移动端实现button:active
document.addEventListener('touchstart',function(){},false);

//报名
;(function() {
	$('#protocol').on('change',function() {
		if($(this).prop("checked")){
		  $('.icon-select').addClass('z-cur')
		}else{
		  $('.icon-select').removeClass('z-cur')
		}
	  })
	  
	  $(document).on('click','#signUpBtn',function() {
	   
		if(!$('#protocol').prop("checked")){
		  $(document).dialog({      
			overlayClose:true,
			titleShow: false,
			content: '请同意用户协议！',
		  });
		  return 
		}
		if(!$('#name').val() || !$('#tel').val()){
		  $(document).dialog({      
			overlayClose:true,
			titleShow: false,
			content: '请填写标 <span style="color:#f00">*</span> 号的信息！',
		  });
		  return 
		}
	})
})()


// 答题
;(function() {
	$(document).on('click','#answerBtn',function(e) {
		e.preventDefault()
		$(document).dialog({      
		  overlayClose:true,
		  titleShow: false,
		  content: '感谢您的提交！',
		});
	})
})()

// 投票
;(function() {
	$(document).on('click','#voteBtn',function(e) {
		e.preventDefault()
		var voteValue = $('input[name="vote"]:checked').val()
		console.log(voteValue)
		if(voteValue){
			$(document).dialog({      
			type:'notice',
			infoText:'正在提交中...',
			autoClose:2500    
			});
		}else{
			$(document).dialog({      
			overlayClose:true,
			titleShow: false,
			content: '请您选择一个投票！',
			});
		}
	  
	})
})()

//投票结果页面
;(function() {

var myChart = echarts.init(document.getElementById('main'));
// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position:  function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = {top: 60};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
        }
    },
    color:['#f5576c','#2af598', '#cd9cf2', '#009efd', '#00f2fe'],
    
    series: [
        {
            name:'活动名字',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {                        
                normal: {
                    show: true,
                    position: 'inside',
                    color:'#333'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '12'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:1548, name:'张某某'},
                {value:335, name:'赵某某'},
                {value:310, name:'王某某'},
                {value:234, name:'李某某'},
                {value:135, name:'韩某某'},
            ]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
})()
