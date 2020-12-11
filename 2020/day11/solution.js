$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1( data ){
  //data.forEach(function(value, index, array) {
  //});
  
  let newData = [];
  let changed = true;
  let openSeats = 0;
  let occupiedSeats = 0;
  while( changed ){
    openSeats = 0;
    occupiedSeats = 0;
    changed = false;
    newData = [];
    for( let i = 0; i < data.length; ++i ){
      newData.push( "" );
      //console.log( "data.length: " + data.length + " string pushed: " + newData );
      for( let j = 0; j < data[i].length; ++j ){
        let count = 0;
        if( data[i].charAt(j) == 'L' || data[i].charAt(j) == '#' ){
          if( i > 0 && j > 0 && data[i-1].charAt(j - 1) == "#" ) ++count;
          if( i > 0 && data[i-1].charAt(j) == "#" ) ++count;
          if( i > 0 && j < data.length - 1 && data[i-1].charAt(j + 1) == "#" ) ++count;
          if( j > 0 && data[i].charAt(j - 1) == "#" ) ++count;
          if( j < data.length - 1 && data[i].charAt(j + 1) == "#" ) ++count;
          if( i < data.length - 1 && j > 0 && data[i+1].charAt(j - 1) == "#" ) ++count;
          if( i < data.length - 1 && data[i+1].charAt(j) == "#" ) ++count;
          if( i < data.length - 1 && j < data.length - 1 && data[i+1].charAt(j + 1) == "#" ) ++count;
          if( data[i].charAt(j) == 'L' ) {
            if( count == 0 ){
              newData[i] = newData[i] + '#';
              ++occupiedSeats;
              changed = true;
            } else {
              newData[i] = newData[i] + 'L';
              ++openSeats;
            }
          } else {
            if( count >= 4 ){
              newData[i] = newData[i] + 'L';
              changed = true;
              ++openSeats;
            } else {
              newData[i] = newData[i] + '#';
              ++occupiedSeats;
            }
          }
        } else {
          newData[i] = newData[i] + '.';
        }
        //console.log( "i should be 1: " + i + " data.length should be 10: " + data.length );
      }
    }
    //console.log( newData );
    data = newData;
  }  
  $('#answer span').text( occupiedSeats );
  $('#bonus span').html( data );
}
function part2( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( data );
//   part2( data );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});
