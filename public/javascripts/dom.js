$(document).ready(function(){

  var allCheckboxes = $(':checkbox');
  var checkAllIcon = $('.select-all-emails').children(':first');

  $('.select-all-emails').click(function(){
    //if the box is checked, change it to unchecked and uncheck all checkboxes
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
    //if the box is half checked, change it to checked and check all checkboxes
    } else {
      checkAllIcon.removeClass('fa-minus-square-o');
      checkAllIcon.addClass('fa-check-square-o');
      allCheckboxes.each(function(e){
        allCheckboxes[e].checked = true;
      });
    }
  });

  allCheckboxes.each(function(){
    $(this).click(function(){
      if ( $(':checked').length > 0 ){
        checkAllIcon.removeClass('fa-check-square-o, fa-square-o');
        checkAllIcon.addClass('fa-minus-square-o');
        $('.mark-as-read, .mark-as-unread, .delete-selected-emails').removeAttr('disabled');
      } else {
        checkAllIcon.addClass('fa-check-square-o, fa-square-o');
        checkAllIcon.removeClass('fa-minus-square-o');
        $('.mark-as-read, .mark-as-unread, .delete-selected-emails').attr('disabled', 'disabled');
      }
    });
  });

});
