$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var sum = 0;

function doItNTimes(value, index, array) {
  let yesses = new Set( value.trim().replace(/[\r\n\t ]/g,"").split('') );
  sum += yesses.size();
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\n\n/).forEach(doItNTimes);
  $('#answer span').text( sum );
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
});
