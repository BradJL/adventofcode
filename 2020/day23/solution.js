function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
  
  // var canvas = document.getElementById("visualization");
  // var ctx = canvas.getContext("2d");
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
}

// const fs = require('fs').promises;

function log( what ){
  //console.log( what );
}
  
function part1( data, iterations ){
  let cups = [];
  let pickups = [];
  let current = null;
  let max = -1;
  let min = Number.MAX_SAFE_INTEGER;
  
  data.trim().split('').forEach(function(valStr, index, array){
    let val = parseInt(valStr);
    if( val < min ){ min = val; }
    if( val > max ){ max = val; }
    cups.push( val );
  });
  
  while( iterations ){
    current = cups.shift();
    pickups.push( cups.shift() );
    pickups.push( cups.shift() );
    pickups.push( cups.shift() );
  
    let destination = current - 1;
    if( destination < min ){ destination = max; }
    let cupsToDest = [];
    cupsToDest.push( cups.shift() );
    while( cupsToDest[ cupsToDest.length -1 ] != destination ){
      if( cups.length == 0 ){
        --destination;
        if( destination < min ){ destination = max; }
        cups = cupsToDest;
        cupsToDest = [];
      }
      cupsToDest.push( cups.shift() );
    }
    console.log( '(' + current + ") [" + pickups + '] ' + cupsToDest + "* " + cups );
    cups = cupsToDest.concat( pickups ).concat( cups ).concat( current );
    current = null;
    pickups = [];
    cupsToDest = [];
    --iterations;
  }
  console.log( "Final: " + cups );
  current = cups.shift();
  while( current != 1 ){
    cups.push( current );
    current = cups.shift();
  }
  console.log( "Fixed: " + cups.join('') );
  return cups.join('');
}

function part2( data, iterations ){
  let cups = [];
  let pickups = [];
  let current = null;
  let max = -1;
  let min = Number.MAX_SAFE_INTEGER;
  
  data.trim().split('').forEach(function(valStr, index, array){
    let val = parseInt(valStr);
    if( val < min ){ min = val; }
    if( val > max ){ max = val; }
    cups.push( val );
  });
  /* Added for Part2 */
  while( max < 1000000 ){
    ++max;
    cups.push( max );
  }
  console.log( "Adding cups for part2 complete: " + max + " == " + cups[cups.length-1] + " == " + cups.length );
  /**/
  
  while( iterations ){
    current = cups.shift();
    pickups.push( cups.shift() );
    pickups.push( cups.shift() );
    pickups.push( cups.shift() );
  
    let destination = current - 1;
    if( destination < min ){ destination = max; }
    let cupsToDest = [];
    cupsToDest.push( cups.shift() );
    while( cupsToDest[ cupsToDest.length -1 ] != destination ){
      if( cups.length == 0 ){
        --destination;
        if( destination < min ){ destination = max; }
        cups = cupsToDest;
        cupsToDest = [];
      }
      cupsToDest.push( cups.shift() );
    }
    //console.log( '(' + current + ") [" + pickups + '] ' + cupsToDest + "* " + cups );
    cups = cupsToDest.concat( pickups ).concat( cups ).concat( current );
    current = null;
    pickups = [];
    cupsToDest = [];
    --iterations;
//     switch( iterations ){
//     case 1000000:
//     case 2000000:
//     case 3000000:
//     case 4000000:
//     case 5000000:
//     case 6000000:
//     case 7000000:
//     case 8000000:
//     case 9000000:
      console.log( "iterations: " + iterations );
//       break;
//     }
  }
  //console.log( "Final: " + cups );
  current = cups.shift();
  while( current != 1 ){
    cups.push( current );
    current = cups.shift();
  }
//   console.log( "Fixed: " + cups.join() );
  console.log( "Fixed: " + current + " " + cups[0] + " " + cups[1] );
  return cups[0] * cups[1];
}

// function readFile(filePath){
//   $.get( filePath, function( data ) {
//     $('#input span').text('(Bytes: ' + (data.length) + ')');
//     let part1Answer = part1( data );
//     $('#answer span').text( part1Answer );
//     let part2Answer = part2( data );
//     $('#answer2 span').text( part2Answer );
//   });
// }
// async function readFile(filePath){
//   try {
//     const constData = await fs.readFile(filePath);
//     let part1Answer = part1( constData.toString() );
//     console.log( "Part 1 answer: " + part1Answer );

//     let part2Answer = part2( constData.toString() );
//     console.log( "Part 2 answer: " + part2Answer );
//   } catch (error) {
//     console.error(`Got an error trying to read the file: ${error.message}`);
//   }
// }

initialize();
// readFile('input.txt');
// let data = "389125467";
let data = "784235916";
let moves = 100;
let part1Answer = part1( data, moves );
$('#answer span').text( part1Answer );
data = "389125467";
moves = 10000000;
let part2Answer = part2( data, moves );
$('#answer2 span').text( part2Answer );
