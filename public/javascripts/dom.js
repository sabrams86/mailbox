$(document).ready(function(){

  $('.select-all-emails').click(function(){
    var checkAll = $(this).children(':first')
    checkAll.toggleClass('fa-check-square-o');
    checkAll.toggleClass('fa-square-o');
    if (checkAll.hasClass('fa-check-square-o')){
      $(':checkbox').each(function(e){
        $(':checkbox')[e].checked = true;
      });
      $('.mark-as-read, .mark-as-unread, .delete-selected-emails').removeAttr('disabled');
    } else if (checkAll.hasClass('fa-square-o')){
      $(':checkbox').each(function(e){
        $(':checkbox')[e].checked = false;
      });
      $('.mark-as-read, .mark-as-unread, .delete-selected-emails').attr('disabled', 'disabled');
    }
  });

});
