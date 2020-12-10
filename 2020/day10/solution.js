$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function doItNTimes(value, index, array) {
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
  console.log( data );
  let one = 0;
  let two = 0;
  let three = 0;
  let i = 0
  while( i < data.length ){
    if( parseInt(data[i]) + 3 >= parseInt(data[i+3]) ){
      ++three;
      val *= 4;
      console.log( data[i] + ":" + val );
      i+=3;
    } else if( parseInt(data[i]) + 3 >= parseInt(data[i+2]) ){
      ++two;
      val *= 2;
      console.log( data[i] + ":" + val );
      i+=1;
    } else {
      ++one;
      console.log( data[i] + ":" + val );
      i+=1;
    }
  }
  $('#answer2 span').text( val );
  //$('#bonus span').html(  );
}

$.get( "input1.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
//   data.forEach(doItNTimes);
  //part1( data );
  part2( data );
});
