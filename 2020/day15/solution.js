$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function part1( data ){
  let turn = 0
  let lastNum;
  let numbers = [];
  data.split(/,/).forEach(function(value, index, array) {
    ++turn;
    lastNum = value;
    numbers[ lastNum ] = turn;
  });
  
  while( turn <= 10 ){
    ++turn;
    if (numbers[lastNum] != null) { // if it's been said before
      console.log( "found " + lastNum );
      // The == and != operators consider null equal to only null or undefined
      lastNum = turn - numbers[lastNum];
    } else {
      lastNum = 0;
    }
    console.log( "saying " + lastNum );
    numbers[ lastNum ] = turn;
  }
  $('#answer span').text( lastNum );
  //$('#bonus span').html(  );
}
function part2( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {
//   $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim();
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( "0,3,6" );
//   part1( data );
//   part2( data );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});
