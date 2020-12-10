$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function doItNTimes(value, index, array) {
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
  let val = 0;
  data.sort(function(a, b){return a-b});
  console.log( data );
//   data.forEach(function(value, index, array) {
//   });
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
//   data.forEach(doItNTimes);
  //part1( data );
  part2( data );
});
