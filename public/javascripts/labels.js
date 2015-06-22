$(document).ready(function(){

  var addLabel = $(".add-label");
  var removeLabel = $('.remove-label');

  addLabel.each(function(e){
    $(this).click(function(){
      event.preventDefault();
      var labelName = $(this).html();
      var selected = $(':checked');
      selected.each(function(j){
        var id = $(this).parents('tr').children('td:first').children('div').attr('name');
        var snippet = $(this).parents('tr').children('td.snippet');
        var labelDiv = document.createElement('div');
        labelDiv.className = 'label';
        labelDiv.innerHTML = labelName;
        snippet.prepend(labelDiv);
        var xhr = new XMLHttpRequest;
        var data = {"label": labelName};
        xhr.open('post', '/inbox/'+id, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(JSON.stringify(data));
      });
    });
  });

  removeLabel.each(function(e){
    $(this).click(function(){
      event.preventDefault();
      var labelName = $(this).html();
      var selected = $(':checked');
      selected.each(function(j){
        var id = $(this).parents('tr').children('td:first').children('div').attr('name');
        var snippet = $(this).parents('tr').children('td.snippet');
        var labelDiv = snippet.children('.'+labelName).remove();
        var xhr = new XMLHttpRequest;
        var data = {"label": labelName};
        xhr.open('post', '/inbox/'+id+'/removelabel', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(JSON.stringify(data));
      });
    });
  });

});
