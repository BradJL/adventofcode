$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

$.get( "input.txt", function( data ) {
  let down = data.replace(/\(/g, "").length;
  let up = data.length - down.length;
  $('#answer span').text( "Up " + up + ", Down " + down + " = " + (up - down) );
  //$('#answer2 span').text("");
});
