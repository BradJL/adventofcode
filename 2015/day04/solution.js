$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

$.get( "input.txt", function( data ) {
  let i = 1;
  let md5hash = md5(data.trim() + i);
  
  while( md5hash.substring(0,5) != "00000" ){
    ++i;
    md5hash = md5(data.trim() + i);
  }

  $('#input span').text( "(Bytes:" +  data.length + ")" );
  $('#answer span').text( i );
  //$('#answer2 span').text(  );
});
