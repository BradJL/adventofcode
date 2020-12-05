$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var seats = new Array(128*44)
var highestID = -1;

function doItNTimes(value, index, array) {
  if( value == null || value == "" || value == undefined ) return; // May not be necessary anymore with the trim() call, below.
  
  let row = value.substitute(/[LR]/g, '').substitute( 'B', '1' ).substitute( 'F', '0' );
  let column = value.substitute(/[BF]/g, '').substitute( 'R', '1' ).substitute( 'L', '0' );
  
  row = parseInt( row, 2 );
  column = parseInt( column, 2 );
  
  let id = row * 8 + column;
  
//  let thisID = 127;
//  if( value[0] = 'F' ){ thisID /= 2; thisID.floor(); }
//  FFBBFRRR
  
  
  if( highestID < id ){
    highestID = id;
  }
}

doItNTimes( "BBFFBBFRLL" );

// $.get( "input.txt", function( data ) {
//   $('#input span').text('(Bytes: ' + (data.length) + ')');
//   data.trim().split(/\r?\n/).forEach(doItNTimes);
   $('#answer span').text(highestID);
//   $('#answer2 span').text("Answer 2");
// });
