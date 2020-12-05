$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}  // Thanks, internet.

const newline = "<br />";

// Returns: HTML to display an airplane seat selection style seating chart (ascii art).
// Why? Just for fun.
function seatingChart(){
  let retval ="";
  for( let i = 0; i < 128; ++i ){
    let txt = (i*8).toString() + "-" + (i*8+7).toString() + " ";
    txt = "&nbsp;".repeat( 10 - txt.length ) + txt;
    
    retval = retval.concat( txt, seats.substring(i*8,i*8+8), newline );
  }
  return retval;
}

// Parse the next line of input.
function doItNTimes(value, index, array) {
  if( value == null || value == "" || value == undefined ) return; // May not be necessary anymore with the trim() call, below.
  
  let row = value.replace(/[LR]/g, '').replace(/B/g, '1' ).replace(/F/g, '0' );
  let column = value.replace(/[BF]/g, '').replace(/R/g, '1' ).replace(/L/g, '0' );
  
  row = parseInt( row, 2 );
  column = parseInt( column, 2 );
  
  let id = row * 8 + column;
  
  seats =seats.replaceAt(id, '■');
  
  if( highestID < id ){
    highestID = id;
  }
}

var seats = '□'.repeat(128 * 8);
var highestID = -1;

//doItNTimes( "BBFFBBFRLL" ); //debug

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\r?\n/).forEach(doItNTimes);
  $('#answer span').text(highestID);
  $('#answer2 span').text( (seats.indexOf("■□■")+1 ) );
  $('#bonus span').html( seatingChart() );
});
