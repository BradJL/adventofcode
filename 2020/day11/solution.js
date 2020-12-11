$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1( data ){
  //data.forEach(function(value, index, array) {
  //});
  
  let newData = [];
  for( let i = 0; i < data.length; ++i ){
    for( let j = 0; j < data[i].length; ++j ){
      let count = 0;
      if( i > 0 && j > 0 && data[i-1].charAt(j - 1) == "#" ) ++count;
      if( i > 0 && data[i-1].charAt(j) == "#" ) ++count;
      if( i > 0 && j < data.length - 1 && data[i-1].charAt(j + 1) == "#" ) ++count;
      if( j > 0 && data[i].charAt(j - 1) == "#" ) ++count;
      if( j < data.length - 1 && data[i].charAt(j + 1) == "#" ) ++count;
      if( i < data.length - 1 && j > 0 && data[i+1].charAt(j - 1) == "#" ) ++count;
      if( i < data.length - 1 && data[i+1].charAt(j) == "#" ) ++count;
      if( i < data.length - 1 && j < data.length - 1 && data[i+1].charAt(j + 1) == "#" ) ++count;
      if( count <= 1 ){
        newData[i] = newData[i] + '#';
      }
    }
  }
  
  $('#answer span').text( newData );
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
  part1( data );
//   part2( data );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});
