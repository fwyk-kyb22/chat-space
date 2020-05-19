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
      var html = `<div class="main_chat__message_list__container">
                    ${name}
                    ${created_at}
                    <div class="main_chat__message_list__container__message">
                    ${content}
                    ${image}
                  </div>`
    } else if (message.content) {
      var html =  `<div class="main_chat__message_list__container">
                    ${name}
                    ${created_at}
                    <div class="main_chat__message_list__container__message">
                    ${content}
                  </div>`
    } else if (message.image) {
      var html = `<div class="main_chat__message_list__container">
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
    })
  })
})