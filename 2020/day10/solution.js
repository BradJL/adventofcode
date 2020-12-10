$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1( data ){
  let val = 0;
  data.sort(function(a, b){return a-b});
  let ones = 0;
  let threes = 1;
  for( let i = 0; i < data.length; ++i ){
    switch( data[i] - val ){
      case 1:
        ++ones;
       break;
      case 3:
        ++threes;
        break;
      default:
        break;
    }
    val = data[i];
  }
  $('#answer span').text( ones * threes );
}
function part2( data ){
  let val = 1;
  data.push( 0 );
  data.sort(function(a, b){return a-b});
  
  let num_in_a_row = 0; // consecutive removable numbers
  for( let i = 1; i < data.length; ++i ){
    if( i != data.length - 1 && data[i+1] - data[i-1] < 3 ){
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
      default:
        val *= ( 7 + 5 * (num_in_a_row - 3) );
        break;
      }
      console.log(i + " " + num_in_a_row + " " + val);
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
