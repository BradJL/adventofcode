$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1( data, iterations ){
  let turn = 0
  let lastNum;
  let lastSpoken = 0;
  let numbers = [];
  data.split(/,/).forEach(function(value, index, array) {
    ++turn;
    lastNum = parseInt(value);
    lastSpoken = numbers[value];
    numbers[ lastNum ] = turn; console.log( "adding " + lastNum + "(" + turn + ")" );
  });
  
  do {
    if(lastSpoken) { // if it's been said before
      //console.log( "found " + lastNum );
      // The == and != operators consider null equal to only null or undefined
      lastNum = turn - lastSpoken;
    } else {
      //console.log( "didn't find " + lastNum );
      lastNum = 0;
    }
    ++turn;
    //console.log( "saying " + lastNum );
    lastSpoken = numbers[lastNum];
    numbers[ lastNum ] = turn; console.log( "adding " + lastNum + "(" + turn + ")" );
  } while( turn < iterations );
  $('#answer span').text( lastNum );
  //$('#bonus span').html(  );
}
function part2( data, iterations ){
  let turn = 0
  let lastNum;
  let lastSpoken = 0;
  let numbers = [];
  data.split(/,/).forEach(function(value, index, array) {
    ++turn;
    lastNum = parseInt(value);
    lastSpoken = numbers[value];
    numbers[ lastNum ] = turn; //console.log( "adding " + lastNum + "(" + turn + ")" );
  });
  
  do {
    if(lastSpoken) { // if it's been said before
      //console.log( "found " + lastNum );
      // The == and != operators consider null equal to only null or undefined
      lastNum = turn - lastSpoken;
    } else {
      //console.log( "didn't find " + lastNum );
      lastNum = 0;
    }
    ++turn;
    //console.log( "saying " + lastNum );
    lastSpoken = numbers[lastNum];
    numbers[ lastNum ] = turn; //console.log( "adding " + lastNum + "(" + turn + ")" );
    switch( turn ){
    case 1000000:
    case 2000000:
    case 3000000:
    case 4000000:
    case 5000000:
    case 6000000:
    case 7000000:
    case 8000000:
    case 9000000:
    case 10000000:
    case 15000000:
    case 20000000:
    case 25000000:
        console.log( turn );
        break;
    }
  } while( turn < iterations );
  $('#answer2 span').text( lastNum );
}

$.get( "input.txt", function( data ) {
  data = data.trim();
  $('#input span').text('(Lines: ' + (data.length) + ')');
//   part1( "0,3,6", 10 );
//   part1( "1,3,2", 2020 );
//  part1( data, 2020 );
  part2( data, 30000000 );
//   part2( data );
});
