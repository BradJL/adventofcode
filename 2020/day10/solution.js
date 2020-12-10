$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1( data ){
  let val = 0;
  data.sort(function(a, b){return a-b});
  let one = 0;
  let three = 1;
  for( let i = 0; i < data.length; ++i ){
    switch( parseInt(data[i]) - val ){
      case 1:
        ++one;
        //console.log( val + " => " + data[i] + " : one(" + one + ")" )
        break;
      case 3:
        ++three;
        //console.log( val + " => " + data[i] + " : three(" + three + ")" )
        break;
      default:
        //console.log( val + " => " + data[i] )
        break;
    }
    val = parseInt(data[i]);
  }
  $('#answer span').text( one * three );
  //$('#bonus span').html(  );
}
function part2( data ){
  let val = 1;
  data.push( 0 );
  data.sort(function(a, b){return a-b});
  
  let num_in_a_row = 0; // consecutive removable numbers
  for( let i = 1; i < data.length-1; ++i ){
    if( data[i+1] - data[i-1] > 3 ){
      ++num_in_a_row;
    } else {
      switch( num_in_a_row ){
      case 0:
        break;
      case 1:
        val *= 2;
        break;
      case 2:
        val *= 4;
        break;
      case 3:
        val *= 7;
        break;
      case 4:
        val *= 12;
        break;
      }
      num_in_a_row = 0;
    }
  }
  $('#answer2 span').text( val );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  let input = [];
  data.forEach(function(number) {
    input.push( parseInt(number) )
  });
  part1( input );
  part2( input );
});
