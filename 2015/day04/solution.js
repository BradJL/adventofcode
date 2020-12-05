$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

$.get( "input.txt", function( data ) {
  let i = 1;
  var md5hash = md5(data.trim() + i);

  $('#input span').text( "(Bytes:" +  data.length + ")" );
  $('#answer span').text( md5hash.substring(0,5) );
  //$('#answer2 span').text(  );
});
