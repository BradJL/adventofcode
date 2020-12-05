$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

$.get( "input.txt", function( data ) {
  let ans = 0;
  let i = 0;
  let md5hash = "";
  
  while( md5hash.substring(0,6) != "000000" ){
    ++i;
    md5hash = md5(data.trim() + i);
    if( !ans && md5hash.substring(0,5) != "00000" ){
      ans = i;
    }
  }

  $('#input span').text( "(Bytes:" +  data.length + ")" );
  $('#answer span').text( ans );
  $('#answer2 span').text( i );
});
