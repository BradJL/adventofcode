$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

$.get( "input.txt", function( data ) {
  $('#answer span').text( data.replace(/[\(]/g, "").length; - data.length );
  //$('#answer2 span').text("");
});
