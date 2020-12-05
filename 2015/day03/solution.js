//$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var x = 0;
var y = 0;
var houses = new Set();

function doItNTimes(value, index, array) {
  //if( value == null || value == "" || value == undefined ) return;
  // part 1
  switch( value ){
  case '>':
    ++x;
  case '<':
    --x;
  case '^':
    --y;
  case 'v':
    ++y;
    break;
  }
  houses.add( x + "," + y );
  
  // part 2
}

$.get( "input.txt", function( data ) {
  data.trim().split('').forEach(doItNTimes);
  $('#input span').text( "(Bytes:" +  data.length + ")" );
  $('#answer span').text( houses.length );
  
  //$('#answer2 span').text();
});
