$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var niceStringsCount = 0;
var niceStringsCount2 = 0;

function part1(value, index, array) {
  let vowels = value.replace(/[^aeiou]/g,"");
  let badStrings = value.match(/(ab|cd|pq|xy)/);
  let doubleLetters = value.match(/(aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|oo|pp|qq|rr|ss|tt|uu|vv|ww|xx|yy|zz)/);
  
  if( vowels.length >= 3 && badStrings == null && doubleLetters != null ){
    ++niceStringsCount;
  }
}

function part2( data ){
  let pairRepeat = data.match(/(..).*\1/);
  if( pairRepeat && pairRepeat[0].length > 3 ){ pairRepeat = true; };
  let charRepeatWOneCharBetwixt = data.match(/(.).*\1/);
  if( charRepeatWOneCharBetwixt && charRepeatWOneCharBetwixt[0].length > 3 ){ charRepeatWOneCharBetwixt = true; };
  return pairRepeat && charRepeatWOneCharBetwixt;
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\r?\n/).forEach(part1);
  $('#answer span').text( niceStringsCount );
  
  $('#answer2 span').text( part2( "uurcxstgmygtbstg" ) );
  //$('#bonus span').html(  );
});
