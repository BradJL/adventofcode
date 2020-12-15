$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function recurse( wire, circuit ){
  return circuit[wire];
}

function part1( data ){
  let circuit = [];
  data.forEach(function(value, index, array) {
    let leftAndRight = value.split(/ -> /);
    circuit[leftAndRight[1]] = leftAndRight[0];
  });
  $('#answer span').text( recurse('a') );
  //$('#bonus span').html(  );
}
function part2( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
}

function getInputs( outputWire, data ){
  return (data.match( new RegExp("\n.* -> " + outputWire + "\n", 'g') )[0]).replace(/ -> .*/, '');
}

function getWires( circuit ){
  return circuit.match( /[a-z]+/g );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  part1( data );
//   let circuit = '( lx )';
//   let wiresSet = new Set(getWires( circuit ));
//   while( wiresSet.size > 0 ){
//     let a = Array.from(wiresSet)
//     a.forEach(function(value, index, array) {
//       circuit = circuit.replace( " " + value + " ", " ( " + getInputs( value, data ) + " ) " );
//     });
//     wiresSet = new Set(getWires( circuit ));
//     console.log( circuit + "|" + Array.from(wiresSet) + "|" );
//   }
  $('#answer span').text( circuit );
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
