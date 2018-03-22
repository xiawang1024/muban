//移动端实现button:active
document.addEventListener('touchstart',function(){},false);

//报名
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


// 答题
$(document).on('click','#answerBtn',function(e) {
  e.preventDefault()
  $(document).dialog({      
    overlayClose:true,
    titleShow: false,
    content: '感谢您的提交！',
  });
})

// 投票
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
