$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

$.get( "input.txt", function( data ) {
  let len = data.length - 1;
  let down = data.replace(/[^\)]/g, "").length;
  let up = len - down.length;
  $('#answer span').text( "(Len:" +  len + ") Up " + up + ", Down " + down + " = " + (up - down) );
  //$('#answer2 span').text("");
});
