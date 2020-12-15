$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function recurse( wire, circuit ){
  console.log( circuit[wire] );
  if( circuit[wire].match(/RSHIFT/) ){
    console.log( "RSHIFT" );
    return recurse( (circuit[wire].match(/[a-z]+/)) >> parseInt(circuit[wire].match(/[0-9]+/)) );
  }
  if( circuit[wire].match(/LSHIFT/) ){
    console.log( "LSHIFT" );
    return recurse( (circuit[wire].match(/[a-z]+/)) << parseInt(circuit[wire].match(/[0-9]+/)) );
  }
  if( circuit[wire].match(/AND/) ){
    let wires = circuit[wire].match(/[a-z0-9]+/g);
    console.log( "AND: " + wires );
    return recurse( (wires[0]) & (wires[1]) );
  }
  if( circuit[wire].match(/OR/) ){
    console.log( "OR" );
    let wires = circuit[wire].match(/[a-z0-9]+/g);
    return recurse( (wires[0]) | (wires[1]) );
  }
  if( circuit[wire].match(/NOT/) ){
    console.log( "NOT" );
    let wires = circuit[wire].match(/[0-9]+/);
    return( ~(recurse( wires[0])) );
  }
  if( circuit[wire].match(/[a-z]+/) ){
    console.log( "wire" );
    let wires = circuit[wire].match(/[a-z]+/);
    return( recurse( wires[0]) );
  }
  if( circuit[wire].match(/[0-9]+/) ){
    console.log( "value" );
    return parseInt(wire);  // expected to only be numbers at this point.
  }
  return ;
}

function part1( data, wire ){
  let circuit = [];
  data.forEach(function(value, index, array) {
    let leftAndRight = value.split(/ -> /);
    circuit[leftAndRight[1]] = leftAndRight[0];
  });
  $('#answer span').text( recurse(wire, circuit) );
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
  data = [ "123 -> x",
            "456 -> y",
            "x AND y -> d",
            "x OR y -> e",
            "x LSHIFT 2 -> f",
            "y RSHIFT 2 -> g",
            "NOT x -> h",
            "NOT y -> i" ];
  part1( data, 'd' );
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
//   $('#answer span').text( circuit );
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
