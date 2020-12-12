$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

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

function getInputs( outputWire, data ){
  return (data.match( new RegExp("\n.* -> " + wire + "\n", 'g') )[0]).replace(/ -> .*/, '');
}

function getWires( circuit ){
  return data.match( /[a-z]+/g );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
//   data = data.trim().split(/\r?\n/);
  let circuit = 'a';
  let wiresSet = new Set(getWires( circuit ));
  let a = Array.from(a, e => getInputs( e, data ));
  
  $('#answer span').text( a );
//   $('#input span').text('(Lines: ' + (data.length) + ')');
//   part1( data );
//   part2( data );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});
