$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

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
//   part1( data );
//   part2( data );
  
  let input = [];
  data.forEach(function(number, index, array) {
    input.push(parseInt(number))
  });
  part1( input );
  part2( input );
});
