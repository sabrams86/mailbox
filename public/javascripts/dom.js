$(document).ready(function(){

  var allCheckboxes = $(':checkbox');
  var checkAllIcon = $('.select-all-emails').children(':first');
  var allStars = $('i.star');

  if(sessionStorage.length > 0){
    for (var j = 0; j < allCheckboxes.length; j++) {
      if(sessionStorage.getItem('selectedEmail-'+j) === 'false') {
        $(':checkbox:nth-child('+j+')').checked = false;
      } else {
        $(':checkbox:nth-child('+j+')').checked = true;
      }
    }
    console.log(sessionStorage);
  }

  for (var i = 0; i < allCheckboxes.length; i++) {
    $(':checkbox').change(function(){
      sessionStorage.setItem('selectedEmail-'+i, this.checked)
    });
    console.log(sessionStorage);
  }

  // if (sessionStorage.getItem('selectedEmails')){
  //   if (sessionStorage.getItem('selectedEmails') === 'false'){
  //     $(':checkbox')[0].checked = false;
  //   } else {
  //     $(':checkbox')[0].checked = true;
  //
  //   }
  // }
  // $(':checkbox:first').change(function(){
  //   sessionStorage.setItem('selectedEmails', this.checked)
  //   console.log(sessionStorage);
  // });



  $('.select-all-emails').click(function(){
    //if the box is checked, change it to unchecked and uncheck all checkboxes.  Disable menu buttons
    if (checkAllIcon.hasClass('fa-check-square-o')){
      checkAllIcon.removeClass('fa-check-square-o');
      checkAllIcon.addClass('fa-square-o');
      allCheckboxes.each(function(e){
        allCheckboxes[e].checked = false;
      });
      $('.mark-as-read, .mark-as-unread, .delete-selected-emails').attr('disabled', 'disabled');
    //if the box is unchecked, change it to checked and check all checkboxes
    } else if (checkAllIcon.hasClass('fa-square-o')){
      checkAllIcon.removeClass('fa-square-o');
      checkAllIcon.addClass('fa-check-square-o');
      allCheckboxes.each(function(e){
        allCheckboxes[e].checked = true;
      });
      $('.mark-as-read, .mark-as-unread, .delete-selected-emails').removeAttr('disabled');
    //if the box is half checked, change it to checked and check all checkboxes
    } else {
      checkAllIcon.removeClass('fa-minus-square-o');
      checkAllIcon.addClass('fa-check-square-o');
      allCheckboxes.each(function(e){
        allCheckboxes[e].checked = true;
      });
    }
  });

  allCheckboxes.each(function(e,i){
    $(this).click(function(){
      //if any emails are checked, check all is changed to half checked and menu items are enabled
      if ( $(':checked').length > 0 ){
        checkAllIcon.removeClass('fa-check-square-o, fa-square-o');
        checkAllIcon.addClass('fa-minus-square-o');
        $('.mark-as-read, .mark-as-unread, .delete-selected-emails').removeAttr('disabled');
      //if no emails are checked, check all icon is changed to empty and menu items are disabled
      } else {
        checkAllIcon.addClass('fa-check-square-o, fa-square-o');
        checkAllIcon.removeClass('fa-minus-square-o');
        $('.mark-as-read, .mark-as-unread, .delete-selected-emails').attr('disabled', 'disabled');
      }
    });
  });

  allStars.each(function(e){
    $(this).click(function(){
      var id = $(this).parents('tr').children('td:first').children('div').attr('name');
      $(this).toggleClass('fa-star-o');
      $(this).toggleClass('fa-star');
      if ($(this).hasClass('fa-star')) {
        var data = {"starred": true};
      } else {
        var data = {"starred": false};
      }
      var xhr = new XMLHttpRequest;
      xhr.open('post', '/inbox/'+id, true)
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data));
    });
  });

});
