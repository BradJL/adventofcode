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
    let part1Answer = part1( data, 'a' );
    $('#answer span').text( part1Answer );
    let part2Answer = part2( data, 'a', part1Answer );
    $('#answer2 span').text( part2Answer );
  });
}
readFile('input.txt');
