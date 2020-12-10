$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1( data ){
  //data.forEach(function(value, index, array) {
  //});
  let val = 0;
  data.sort(function(a, b){return a-b});
  let one = 0;
  let three = 1;
  for( let i = 0; i < data.length; ++i ){
    switch( parseInt(data[i]) - val ){
      case 1:
        ++one;
        console.log( val + " => " + data[i] + " : one(" + one + ")" )
        break;
      case 3:
        ++three;
        console.log( val + " => " + data[i] + " : three(" + three + ")" )
        break;
      default:
        console.log( val + " => " + data[i] )
        break;
    }
    val = parseInt(data[i]);
  }
  $('#answer span').text( one * three );
  //$('#bonus span').html(  );
}
function part2( data ){
  let arrangemnet = 0;
  let val = 1;
  data.push( 0 );
  data.sort(function(a, b){return a-b});
  
  let num_in_a_row = 0; // consecutive removable numbers
  for( let i = 0; i < data.length; ++i ){
  }
  $('#answer2 span').text( val );
  //$('#bonus span').html(  );
}

$.get( "input2.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  part1( data );

  let input = [];
  data.forEach(function(number) {
    input.push( parseInt(number) )
  });
  part2( input );
});
