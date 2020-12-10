$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function doItNTimes(value, index, array) {
}
function part1( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer span').text(  );
  //$('#bonus span').html(  );
}
function part2( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
//   data.forEach(doItNTimes);
//   part1( data );
//   part2( data );
});
