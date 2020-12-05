$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}  // Thanks, internet.

var seats = [];
for( let i = 0; i < 128; ++i ){
  seats.push( "12345678 : " + i*8 );
}
seats = '□'.repeat(128 * 8);

var highestID = -1;

function seatingChart(){
  let retval ="";
  for( let i = 0; i < 128; ++i ){
    retval = retval.concat( seats.substring(i*8,i*8+8), "\n" );
  }
  return retval;
}
function doItNTimes(value, index, array) {
  if( value == null || value == "" || value == undefined ) return; // May not be necessary anymore with the trim() call, below.
  
  let row = value.replace(/[LR]/g, '').replace(/B/g, '1' ).replace(/F/g, '0' );
  let column = value.replace(/[BF]/g, '').replace(/R/g, '1' ).replace(/L/g, '0' );
  
  //console.log( row + "," + column );
  row = parseInt( row, 2 );
  column = parseInt( column, 2 );
  
  let id = row * 8 + column;
  
  seats =seats.replaceAt(id, '■');
  //console.log( row + "," + column + "," + id );
  
//  let thisID = 127;
//  if( value[0] = 'F' ){ thisID /= 2; thisID.floor(); }
//  FFBBFRRR
  
  
  if( highestID < id ){
    highestID = id;
  }
}

//doItNTimes( "BBFFBBFRLL" );

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\r?\n/).forEach(doItNTimes);
  $('#answer span').text(highestID);
  $('#answer2 span').text( (seats.indexOf("■□■")+1 ) + "<br>" + seatingChart() );
  printSeats();
});
