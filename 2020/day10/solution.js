$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function valid(data) {
  
}

function arrangements( data, index ){
  let retVal = 0;
  if( index < data.length && parseInt(data[index]) - parseInt(data[index-1]) <= 3){
    retVal += arrangements( data, index + 1 );
  }
  if( index + 1 < data.length && parseInt(data[index + 1]) - parseInt(data[index-1]) <= 3){
    retVal += arrangements( data, index + 2 );
  }
  if( index + 2 < data.length && parseInt(data[index + 2]) - parseInt(data[index-1]) <= 3){
    retVal += arrangements( data, index + 3 );
  }
  return retVal;
}
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
  for( let i = 0; i < data.length, ++i ){
  }
  $('#answer2 span').text( val );
  //$('#bonus span').html(  );
}

$.get( "input2.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  let input = []
  data.trim().split(/\r?\n/).forEach(function(number) {
    input.push( parseInt(number) )
  });
//   data.forEach(doItNTimes);
  part1( input );
  part2( input );
});
