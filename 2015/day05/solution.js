$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var niceStringsCount = 0;

function part1(value, index, array) {
  let vowels = value.replace(/[^aeiou]/g,"");
  let badStrings = value.match(/(ab|cd|pq|xy)/);
  let doubleLetters = value.match(/(aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|oo|pp|qq|rr|ss|tt|uu|vv|ww|xx|yy|zz)/);
  
  if( vowels.length >= 3 && badStrings == null && doubleLetters != null ){
    ++niceStringsCount;
  }
}

function part2( data ){
  let niceStringsCount2 = 0;
  data.forEach(function(value, index, array) {
    let pairRepeat = value.match(/(..).*\1/);
    if( pairRepeat && pairRepeat[0].length > 3 ){ pairRepeat = true; } else { pairRepeat = false };
    let charRepeatWOneCharBetwixt = value.match(/(.).*\1/);
    if( charRepeatWOneCharBetwixt && charRepeatWOneCharBetwixt[0].length > 3 ){ charRepeatWOneCharBetwixt = true; } else { charRepeatWOneCharBetwixt = false; };
    if( pairRepeat && charRepeatWOneCharBetwixt ){ ++niceStringsCount2; };
  });
//   data.forEach( function(value, index, array){
//     let pairRepeat = value.match(/(..).*\1/);
//     if( pairRepeat && pairRepeat[0].length > 3 ){ pairRepeat = true; } else { pairRepeat = false };
//     let charRepeatWOneCharBetwixt = value.match(/(.).*\1/);
//     if( charRepeatWOneCharBetwixt && charRepeatWOneCharBetwixt[0].length > 3 ){ charRepeatWOneCharBetwixt = true; } else { charRepeatWOneCharBetwixt = false; };
//     if( pairRepeat && charRepeatWOneCharBetwixt ){ ++niceStringsCount2; };
//   });
  $('#answer2 span').text( niceStringsCount2 );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  data.forEach(part1);
  $('#answer span').text( niceStringsCount );
  part2( data );
});
