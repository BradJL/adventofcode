$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var niceStringsCount = 0;

function doItNTimes(value, index, array) {
  let vowels = value.replace(/[^aeiou]/g,"");
  let badStrings = value.match(/(ab|cd|pq|xy)/);
  let doubleLetters = value.match(/(aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|oo|pp|qq|rr|ss|tt|uu|vv|ww|xx|yy|zz)/);
  
  if( vowels.length >= 3 && badStrings == null && doubleLetters != null ){
    ++niceStringsCount;
  }
}

function part2( data ){
  return data.match(/(..).*\1/)
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\r?\n/).forEach(doItNTimes);
  $('#answer span').text( niceStringsCount );
  
  $('#answer2 span').text( part2( "abcdefcdghij" ) );
  //$('#bonus span').html(  );
});
