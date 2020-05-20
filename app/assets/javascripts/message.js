$(function(){
  
  function buildHTML(message) {
    var name =   `<div class="main_chat__message_list__container__name">
                    ${message.user_name}
                  </div> `
    var created_at =`<div class="main_chat__message_list__container__created_at">
                       ${message.created_at}
                    </div>`
    var content =`<p main_chat__message_list__container__message__content">
                   ${message.content}
                  </p>`
    var image = `<img src="` + message.image + `" class="main_chat__message_list__container__message__image" >
                </div>` 
    
    if (message.content && message.image) {
      var html = `<div class="main_chat__message_list__container" data-message-id=${message.id}>
                    ${name}
                    ${created_at}
                    <div class="main_chat__message_list__container__message">
                    ${content}
                    ${image}
                  </div>`
    } else if (message.content) {
      var html =  `<div class="main_chat__message_list__container" data-message-id=${message.id}>
                    ${name}
                    ${created_at}
                    <div class="main_chat__message_list__container__message">
                    ${content}
                  </div>`
    } else if (message.image) {
      var html = `<div class="main_chat__message_list__container" data-message-id=${message.id}>
                    ${name}
                    ${created_at}
                    <div class="main_chat__message_list__container__message">
                    ${image}
                  </div>`
    };
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html =  buildHTML(data);
      $('.main_chat__message_list').append(html);
      $('form')[0].reset();
      $('.main_chat__message_list').animate({ scrollTop: $('.main_chat__message_list')[0].scrollHeight});
      $('.main_chat__message_form__box--btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.main_chat__message_form__box--btn').prop('disabled', false);
    });
  
  })
  var reloadMessages = function() {
    var last_message_id = $('.main_chat__message_list__container:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat__message_list').append(insertHTML);
        $('.main_chat__message_list').animate({ scrollTop: $('.main_chat__message_list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
})