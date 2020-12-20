function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
  
  // var canvas = document.getElementById("visualization");
  // var ctx = canvas.getContext("2d");
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
}

// const fs = require('fs').promises;

const ADD = 1;
const MULTIPLY = 2;
const INPUT = 3;
const OUTPUT = 4;
const HALT = 99;

function intcode( numbers, input, output ){
  function getOpcode( number ){
    let opcode = number % 100;
    let modes = ("000" + Math.floor(numbers[0] / 100).toString()).split('').reverse();
    return [opcode, modes[0]=='0', modes[1]=='0', modes[2]=='0'];
  }
//  console.log( numbers );
  let i = 0;
  let stop = false;
  
  while( !stop ){
    let opcode = getOpcode( numbers[i] );
    console.log( "opcode: " + opcode );
    let outputIndex;
    let debugString = "";
    switch( opcode[0] ){
    case ADD:
//       console.log( "modes: " + modes );
      debugString = "Add(" + numbers[i] + "): " + numbers[i+1] + "(" + numbers[numbers[i+1]] + ") + " + numbers[i+2] + "(" + numbers[numbers[i+2]] + ") --> " + numbers[i+3] + "(" + numbers[numbers[i+3]] + ") : ";
      outputIndex = opcode[3] ? /*position mode*/ numbers[i+3] : /*immediate mode*/ i+3;
      numbers[outputIndex] =
        (opcode[1] ? /*position mode*/ numbers[numbers[i+1]] : /*immediate mode*/ numbers[i+1]) +
        (opcode[2] ? /*position mode*/ numbers[numbers[i+2]] : /*immediate mode*/ numbers[i+2]);
      console.log( debugString + numbers + " : " + numbers[outputIndex] );
      i += 4;
      break;
    case MULTIPLY:
      debugString = "Mult(" + numbers[i] + "): " + numbers[i+1] + " * " + numbers[i+2] + " --> " + numbers[i+3] + " : ";
      outputIndex = modes[2] == '0' ? /*position mode*/ numbers[i+3] : /*immediate mode*/ i+3;
      numbers[outputIndex] =
        (opcode[1] ? /*position mode*/ numbers[numbers[i+1]] : /*immediate mode*/ numbers[i+1]) *
        (opcode[2] ? /*position mode*/ numbers[numbers[i+2]] : /*immediate mode*/ numbers[i+2]);
      console.log( debugString + numbers + " : " + numbers[outputIndex] );
      i += 4;
      break;
    case INPUT:
      debugString = "Input(" + numbers[i] + ") " + input + " --> " + numbers[i+1] + "(" + numbers[numbers[i+1]] + ") : ";
//       if( modes[0] == '0' ){
//         console.log( "position mode" );
        outputIndex = numbers[i+1];
//       } else {
//         console.log( "immediate mode" );
//         outputIndex = i+1;
//       }
//       outputIndex = (modes[0] == '0' ? /*position mode*/ numbers[i+1] : /*immediate mode*/ i+1);
//       console.log( "modes[0]: " + modes[0] + " outputIndex: " + outputIndex );
      numbers[outputIndex] = input;
      console.log( debugString + numbers );
      i += 2;
      break;
    case OUTPUT:
//       output.push( modes[0] == '0' ? /*position mode*/ numbers[numbers[i+1]] : /*immediate mode*/ numbers[i+1] );
      output.push( numbers[numbers[i+1]] );
      console.log( "Output(" + numbers[i] + "):" + numbers[i+1] + " : " + output[output.length-1] );
      i += 2;
      break;
    case HALT:
      stop = true;
      break;
    default:
      console.log( "Oops, got opcode: " + numbers[i] );
      stop = true;
      break;
    }
  }
    
  return numbers;
}

function part1( data ){
  data = data.trim().split(/,/);
  let numbers = [];
  data.forEach(function(num,index,array){
    numbers.push( parseInt( num ) );
  });
  console.log( numbers );
  let output = [];
  console.log( intcode( numbers, 1, output ) );
  return output;
}

// function part2( data ){
//   data = data.trim().split(/,/);
//   let iterations = 100000;
//   let answer = 0;
//   let i = 0;
//   for( i = 0; answer != 19690720 && --iterations; ++i ){
//     let numbers = [];
//     data.forEach(function(num,index,array){
//       numbers.push( parseInt( num ) );
//     });
//     answer = intcode( numbers, Math.floor(i/100), i%100 )[0];
//   }
//   return i-1;
// }

function test( code, input, expectedOutput, expectedMemory ){
  code = code.trim().split(/,/);
  let numbers = [];
  code.forEach(function(num,index,array){
    numbers.push( parseInt( num ) );
  });
  let output = [];
  let memory = intcode( numbers, input, output );
  if( memory == expectedMemory && output == expectedOutput ){
    return true;
  }
  console.log( "Test Failed: " + code + " (" + input + ") != (" + output + ":" + expectedOutput + ") " + memory + ":" + expectedMemory );
  return false;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
//     let part1Answer = part1( data ); // 
//     $('#answer span').text( part1Answer );
//     let part2Answer = part2( data ); // 
//     $('#answer2 span').text( part2Answer );
    let testsPass = true;
    testsPass = testsPass && test( "1,9,10,3,2,3,11,0,99,30,40,50", 0, "", "3500,9,10,70,2,3,11,0,99,30,40,50" );
    testsPass = testsPass && test( "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,6,23,2,6,23,27,2,27,9,31,1,5,31,35,1,35,10,39,2,39,9,43,1,5,43,47,2,47,10,51,1,51,6,55,1,5,55,59,2,6,59,63,2,63,6,67,1,5,67,71,1,71,9,75,2,75,10,79,1,79,5,83,1,10,83,87,1,5,87,91,2,13,91,95,1,95,10,99,2,99,13,103,1,103,5,107,1,107,13,111,2,111,9,115,1,6,115,119,2,119,6,123,1,123,6,127,1,127,9,131,1,6,131,135,1,135,2,139,1,139,10,0,99,2,0,14,0",
                                   0,
                                   "",
                                   "" ); // Day2
    testsPass = testsPass && test( "3,0,4,0,99", 1, 1, "1,0,4,0,99" );
    $('#bonus span').text( "tests: " + testsPass );
  });
}
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
readFile('input.txt');
