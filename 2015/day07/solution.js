$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function recurse( wire, circuit ){
  console.log( circuit[wire] );
  let retVal = 0;
  if( circuit[wire].match(/RSHIFT/) ){
    console.log( "RSHIFT" );
    retVal = recurse( circuit[wire].match(/[a-z]+/), circuit ) >> parseInt(circuit[wire].match(/[0-9]+/));
    console.log( "returing " + retVal ); return retVal;
  }
  if( circuit[wire].match(/LSHIFT/) ){
    console.log( "LSHIFT" );
    retVal = recurse( circuit[wire].match(/[a-z]+/), circuit ) << parseInt(circuit[wire].match(/[0-9]+/));
    console.log( "returing " + retVal ); return retVal;
  }
  if( circuit[wire].match(/AND/) ){
    let wires = circuit[wire].match(/[a-z0-9]+/g);
    console.log( "AND " + wires[0] + "," + wires[1] );
    retVal = recurse(wires[0], circuit) & recurse(wires[1], circuit);
    console.log( "returing " + retVal ); return retVal;
  }
  if( circuit[wire].match(/OR/) ){
    console.log( "OR" );
    let wires = circuit[wire].match(/[a-z0-9]+/g);
    retVal = recurse(wires[0], circuit) | recurse(wires[1], circuit);
    console.log( "returing " + retVal ); return retVal;
  }
  if( circuit[wire].match(/NOT/) ){
    console.log( "NOT" );
    let wires = circuit[wire].match(/[0-9]+/);
    retVal = ~(recurse( wires[0], circuit ));
    console.log( "returing " + retVal ); return retVal;
  }
  if( circuit[wire].match(/[a-z]+/) ){
    console.log( "wire" );
    let wires = circuit[wire].match(/[a-z]+/);
    retVal = recurse( wires[0], circuit );
    console.log( "returing " + retVal ); return retVal;
  }
  if( circuit[wire].match(/[0-9]+/) ){  // expected to only be numbers at this point.
    console.log( "value: " + circuit[wire] );
    retVal = parseInt(circuit[wire]);
    console.log( "returing " + retVal ); return retVal;
  }
  return retVal;
}

function part1( data, wire ){
  let circuit = [];
  data.forEach(function(value, index, array) {
    let leftAndRight = value.split(/ -> /);
    circuit[leftAndRight[1]] = leftAndRight[0];
  });
  return recurse(wire, circuit);
  //$('#answer span').text( recurse(wire, circuit) );
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
   $('#answer span').text( "h: " + part1( data, 'h' ) );
//    $('#answer2 span').text( "e: " + part1( data, 'e' ) );
//    $('#bonus span').html(
//      "d: " + part1( data, 'f' ) + "<br />" +
//      "e: " + part1( data, 'f' ) + "<br />" +
//      "f: " + part1( data, 'f' ) + "<br />" +
//      "g: " + part1( data, 'g' ) + "<br />" +
// //      "h: " + part1( data, 'h' ) + "<br />" +
// //      "i: " + part1( data, 'i' ) + "<br />" +
//      "x: " + part1( data, 'x' ) + "<br />" +
//      "y: " + part1( data, 'y' )
//                         );
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
