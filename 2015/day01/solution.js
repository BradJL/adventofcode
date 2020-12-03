$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

$.get( "input.txt", function( data ) {
  let len = data.length - 1;
  let down = data.replace(/[^\)]/g, "").length;
  let up = len - down;
  $('#input span').text( "(Lenth:" +  len + ")" );
  $('#answer span').text( "Up " + up + ", Down " + down + " = " + (up - down) );
  //$('#answer2 span').text("");
});
