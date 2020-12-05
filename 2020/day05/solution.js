$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function doItNTimes(value, index, array) {
  if( value == null || value == "" || value == undefined ) return; // May not be necessary anymore with the trim() call, below.

}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\r?\n/).forEach(doItNTimes);
  $('#answer span').text("Answer 1");
  $('#answer2 span').text("Answer 2");
});
