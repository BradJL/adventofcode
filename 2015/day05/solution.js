$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1(data) {
  let niceStringsCount = 0;
  data.forEach(function(value, index, array) {
    let vowels = value.replace(/[^aeiou]/g,"");
    let badStrings = value.match(/(ab|cd|pq|xy)/);
    let doubleLetters
      // = value.match(/(aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|oo|pp|qq|rr|ss|tt|uu|vv|ww|xx|yy|zz)/);
      = value.match(/(.)\1/);

    if( vowels.length >= 3 && badStrings == null && doubleLetters != null ){
      ++niceStringsCount;
    }
  });
  $('#answer span').text( niceStringsCount );
}

function part2( data ){
  let niceStringsCount = 0;
  data.forEach(function(value, index, array) {
    let pairRepeats = value.match(/(..).*\1/);
    let pairRepeat = false;
    if( pairRepeats ){
      for(let i = 0; i < pairRepeats.length; ++i ){
        if( pairRepeats[i].length > 3 ){
          pairRepeat = true;
        }
      }
    };

    let charRepeatWOneCharBetwixts = value.match(/(.).\1/);
    let charRepeatWOneCharBetwixt = false;
    if( charRepeatWOneCharBetwixts ) {
      for( let i = 0; i < charRepeatWOneCharBetwixts.length; ++i ){
        if( charRepeatWOneCharBetwixts[i].length >= 3 ){
          charRepeatWOneCharBetwixt = true;
        }
      }
    };
    
    if( pairRepeat && charRepeatWOneCharBetwixt ){
      ++niceStringsCount;
    };
  });
  $('#answer2 span').text( niceStringsCount );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  part1( data );
  part2( data );
});
