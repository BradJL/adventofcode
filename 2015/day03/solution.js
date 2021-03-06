$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var x = 0;
var y = 0;
var sX = 0;
var sY = 0;
var rsX = 0;
var rsY = 0;
var houses = new Set([x + "," + y]);
var houses2 = new Set([sX + "," + sY]);
var santasTurn = true;

function doItNTimes(value, index, array) {
  switch( value ){
  case '>':
    ++x;
    santasTurn ? ++sX : ++rsX;
    break;
  case '<':
    --x;
    santasTurn ? --sX : --rsX;
    break;
  case '^':
    --y;
    santasTurn ? --sY : --rsY;
    break;
  case 'v':
    ++y;
    santasTurn ? ++sY : ++rsY;
    break;
  }
  houses.add( x + "," + y );
  houses2.add( sX + "," + sY );
  houses2.add( rsX + "," + rsY );
  
  santasTurn = !santasTurn;
}

$.get( "input.txt", function( data ) {
  data.trim().split('').forEach(doItNTimes);
  $('#input span').text( "(Directions:" +  data.trim().length + ")" );
  $('#answer span').text( houses.size );  
  $('#answer2 span').text( houses2.size );
});
