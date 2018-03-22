//移动端实现button:active
document.addEventListener('touchstart',function(){},false);

//报名start
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
// 报名end

// 答题单选
$('#answer .icon-select').click(function() {
  console.log(11)
  $('.icon-select').removeClass('z-cur')
  $(this).addClass('z-cur')
})
