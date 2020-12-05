$('#answer span').text('Calculating...');
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
    break;
  case '<':
    --x;
    break;
  case '^':
    --y;
    break;
  case 'v':
    ++y;
    break;
  }
  console.log( x + "," + y );
  houses.add( x + "," + y );
  
  // part 2
}

$.get( "input.txt", function( data ) {
  data.trim().split('').forEach(doItNTimes);
  $('#input span').text( "(Bytes:" +  data.length + ")" );
  $('#answer span').text( houses.size );
  
  //$('#answer2 span').text();
});
