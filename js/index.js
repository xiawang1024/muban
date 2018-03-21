//移动端实现button:active
// document.addEventListener('touchstart',function(){},false);
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
      content: '请填写标*号的信息！',
    });
    return 
  }
})
