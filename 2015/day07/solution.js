$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

// const fs = require('fs').promises;

function log( what ){
  //console.log( what );
}

function recurse( wire, circuit ){
  let retVal = 0;
  let debugString = "You gave me " + wire + ", I ";// + circuit[wire];
  let setWire = true;
  if( typeof( circuit[wire] ) == "number" ){
    debugString += "found NUMBER(" + circuit[wire] +")";
    retVal = circuit[wire];
    setWire = false;
  } else if( circuit[wire] == null ){
    debugString += "realized it's a NUMSTRING(" + wire +")";
    retVal = parseInt(wire);
    setWire = false;
  } else if( circuit[wire].match(/RSHIFT/) ){
    debugString += "found RSHIFT(" + circuit[wire] + ")";
    retVal = recurse( circuit[wire].match(/[a-z]+/), circuit ) >> parseInt(circuit[wire].match(/[0-9]+/));
  } else if( circuit[wire].match(/LSHIFT/) ){
    debugString += "found LSHIFT(" + circuit[wire] + ")";
    retVal = recurse( circuit[wire].match(/[a-z]+/), circuit ) << parseInt(circuit[wire].match(/[0-9]+/));
  } else if( circuit[wire].match(/AND/) ){
    let wires = circuit[wire].match(/[a-z0-9]+/g);
    debugString += "found AND(" + wires[0] + "," + wires[1] + ")";
    retVal = recurse(wires[0], circuit) & recurse(wires[1], circuit);
  } else if( circuit[wire].match(/OR/) ){
    let wires = circuit[wire].match(/[a-z0-9]+/g);
    debugString += "found OR(" + wires[0] + "," + wires[1] + ")";
    retVal = recurse(wires[0], circuit) | recurse(wires[1], circuit);
  } else if( circuit[wire].match(/NOT/) ){
    let wires = circuit[wire].match(/[a-z]+/);
    debugString += "found NOT(" + wires[0] + ")";
    retVal = 0x0000FFFF & (~(recurse( wires[0], circuit )));
  } else if( circuit[wire].match(/[a-z]+/) ){
    debugString += "found WIRE(" + circuit[wire] + ")";
    let wires = circuit[wire].match(/[a-z]+/);
    retVal = recurse( wires[0], circuit );
  } else if( circuit[wire].match(/[0-9]+/) ){  // expected to only be numbers at this point.
    debugString += "found NUMSTRING(" + circuit[wire] +")";
    retVal = parseInt(circuit[wire]);
  }
  if( setWire ){
    circuit[wire] = retVal;
  }
  log( debugString + " and then returned " + retVal );
  return retVal;
}

function initializeCircuit( data ){
  let circuit = [];
  data.forEach(function(value, index, array) {
    let leftAndRight = value.split(/ -> /);
    circuit[leftAndRight[1]] = leftAndRight[0];
  });

  return circuit;
}
  
function part1( data, wire ){
  data = data.toString().trim().split(/\r?\n/);
  let circuit = initializeCircuit( data );
  return recurse(wire, circuit);
}

function part2( data, wire, part1Answer ){
  data = data.toString().replace(/\r?\n[0-9]+ -> b\r?\n/, "\n" + part1Answer + " -> b\n");
  data = data.toString().trim().split(/\r?\n/);

  let circuit = initializeCircuit( data );
  return recurse(wire, circuit);
}

// async function readFile(filePath){
//   try {
//     const constData = await fs.readFile(filePath);
//     let part1Answer = part1( constData, 'a' );
//     console.log( "Part 1 answer: " + part1Answer );

//     let part2Answer = part2( constData, 'a', part1Answer );
//     console.log( "Part 2 answer: " + part2Answer );
//   } catch (error) {
//     console.error(`Got an error trying to read the file: ${error.message}`);
//   }
// }
// readFile('2015-day07-input.txt');

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( constData, 'a' );
    $('#answer span').text( part1Answer );
    let part2Answer = part2( constData, 'a', part1Answer );
    $('#answer2 span').text( part2Answer );
  });
}
readFile('input.txt');

// function log( what ){
//   console.log( what );
// }

// function recurse( wire, circuit ){
//   if( typeof( wire ) == "number" ){
//     log( "You gave me number " + wire + ".  returning " + wire + "." );
//     return wire;
//   }
//   log( "You gave me " + wire + ".  I found " + circuit[wire] );
//   let retVal = 0;
//   if( circuit[wire] == null ){
//     log( "VALUE" );
//     retVal = parseInt(wire);
//     log( "returing " + retVal ); return retVal;
//   }
//   if( circuit[wire].match(/RSHIFT/) ){
//     log( "RSHIFT" );
//     retVal = recurse( circuit[wire].match(/[a-z]+/), circuit ) >> parseInt(circuit[wire].match(/[0-9]+/));
//     log( "returing " + retVal ); return retVal;
//   }
//   if( circuit[wire].match(/LSHIFT/) ){
//     log( "LSHIFT" );
//     retVal = recurse( circuit[wire].match(/[a-z]+/), circuit ) << parseInt(circuit[wire].match(/[0-9]+/));
//     log( "returing " + retVal ); return retVal;
//   }
//   if( circuit[wire].match(/AND/) ){
//     let wires = circuit[wire].match(/[a-z0-9]+/g);
//     log( "AND " + wires[0] + "," + wires[1] );
//     retVal = recurse(wires[0], circuit) & recurse(wires[1], circuit);
//     log( "returing " + retVal ); return retVal;
//   }
//   if( circuit[wire].match(/OR/) ){
//     log( "OR" );
//     let wires = circuit[wire].match(/[a-z0-9]+/g);
//     retVal = recurse(wires[0], circuit) | recurse(wires[1], circuit);
//     log( "returing " + retVal ); return retVal;
//   }
//   if( circuit[wire].match(/NOT/) ){
//     log( "NOT" );
//     let wires = circuit[wire].match(/[a-z]+/);
//     retVal = 0x0000FFFF & (~(recurse( wires[0], circuit )));
//     log( "returing " + retVal ); return retVal;
//   }
//   if( circuit[wire].match(/[a-z]+/) ){
//     log( "wire" );
//     let wires = circuit[wire].match(/[a-z]+/);
//     retVal = recurse( wires[0], circuit );
//     log( "returing " + retVal ); return retVal;
//   }
//   if( circuit[wire].match(/[0-9]+/) ){  // expected to only be numbers at this point.
//     log( "value: " + circuit[wire] );
//     retVal = parseInt(circuit[wire]);
//     log( "returing " + retVal ); return retVal;
//   }
//   if( wire.match(/^[0-9]+$/) ){ // literally a number passed in
//     log( "VALUE: " + wire );
//     retVal = parseInt(wire);
//     log( "returing " + retVal ); return retVal;
// //     log( "You game me a value of " + wire + ".  I'm giving you " + wire + " back." );
// //     return parseInt( wire );
//   }
  
//   return retVal;
// }

// function part1( data, wire ){
//   let circuit = [];
//   data.forEach(function(value, index, array) {
//     let leftAndRight = value.split(/ -> /);
//     circuit[leftAndRight[1]] = leftAndRight[0];
//   });
//   return recurse(wire, circuit);
//   //$('#answer span').text( recurse(wire, circuit) );
//   //$('#bonus span').html(  );
// }
// function part2( data ){
//   data.forEach(function(value, index, array) {
//   });
//   //$('#answer2 span').text(  );
//   //$('#bonus span').html(  );
// }

// function getInputs( outputWire, data ){
//   return (data.match( new RegExp("\n.* -> " + outputWire + "\n", 'g') )[0]).replace(/ -> .*/, '');
// }

// function getWires( circuit ){
//   return circuit.match( /[a-z]+/g );
// }

// $.get( "input.txt", function( data ) {
//   $('#input span').text('(Bytes: ' + (data.length) + ')');
//   data = data.trim().split(/\r?\n/);
// //   data = [ "123 -> x",
// //             "456 -> y",
// //             "x AND y -> d",
// //             "x OR y -> e",
// //             "x LSHIFT 2 -> f",
// //             "y RSHIFT 2 -> g",
// //             "NOT x -> h",
// //             "NOT y -> i" ];
//    $('#answer span').text( part1( data, 'a' ) );
// //    $('#answer2 span').text( "e: " + part1( data, 'e' ) );
// //    $('#bonus span').html(
// //      "d: " + part1( data, 'd' ) + "<br />" +
// //      "e: " + part1( data, 'e' ) + "<br />" +
// //      "f: " + part1( data, 'f' ) + "<br />" +
// //      "g: " + part1( data, 'g' ) + "<br />" +
// //      "h: " + part1( data, 'h' ) + "<br />" +
// //      "i: " + part1( data, 'i' ) + "<br />" +
// //      "x: " + part1( data, 'x' ) + "<br />" +
// //      "y: " + part1( data, 'y' )
// //                         );
//   //   let circuit = '( lx )';
// //   let wiresSet = new Set(getWires( circuit ));
// //   while( wiresSet.size > 0 ){
// //     let a = Array.from(wiresSet)
// //     a.forEach(function(value, index, array) {
// //       circuit = circuit.replace( " " + value + " ", " ( " + getInputs( value, data ) + " ) " );
// //     });
// //     wiresSet = new Set(getWires( circuit ));
// //     log( circuit + "|" + Array.from(wiresSet) + "|" );
// //   }
// //   $('#answer span').text( circuit );
// //   $('#input span').text('(Lines: ' + (data.length) + ')');
// //   part1( data );
// //   part2( data );
  
// //   let input = [];
// //   data.forEach(function(number, index, array) {
// //     input.push(parseInt(number))
// //   });
// //   part1( input );
// //   part2( input );
// });
