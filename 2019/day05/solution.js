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
//     console.log( "opcode: " + opcode );
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
      outputIndex = opcode[3] ? /*position mode*/ numbers[i+3] : /*immediate mode*/ i+3;
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
  console.log( "Test Failed: " + code + " (" + input + ") != ( output: " + output + " expOutput: " + expectedOutput + ") memory: " + memory + " expMemory: " + expectedMemory );
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
    testsPass = testsPass && test( "1,9,10,3,2,3,11,0,99,30,40,50", 0, "", "3500,9,10,70,2,3,11,0,99,30,40,50" ); // Day2 part 1 example
    testsPass = testsPass && test( "1,0,0,0,99", 0, "", "2,0,0,0,99" ); // Day2 part 1 example
    testsPass = testsPass && test( "2,3,0,3,99", 0, "", "2,3,0,6,99" ); // Day2 part 1 example
    testsPass = testsPass && test( "2,4,4,5,99,0", 0, "", "2,4,4,5,99,9801" ); // Day2 part 1 example
    testsPass = testsPass && test( "1,1,1,4,99,5,6,0,99", 0, "", "30,1,1,4,2,5,6,0,99" ); // Day2 part 1 example
//     testsPass = testsPass && test( "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,6,23,2,6,23,27,2,27,9,31,1,5,31,35,1,35,10,39,2,39,9,43,1,5,43,47,2,47,10,51,1,51,6,55,1,5,55,59,2,6,59,63,2,63,6,67,1,5,67,71,1,71,9,75,2,75,10,79,1,79,5,83,1,10,83,87,1,5,87,91,2,13,91,95,1,95,10,99,2,99,13,103,1,103,5,107,1,107,13,111,2,111,9,115,1,6,115,119,2,119,6,123,1,123,6,127,1,127,9,131,1,6,131,135,1,135,2,139,1,139,10,0,99,2,0,14,0",
//                                    0,
//                                    "",
//                                    "" ); // Day2 part 1
    testsPass = testsPass && test( "1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,6,23,2,6,23,27,2,27,9,31,1,5,31,35,1,35,10,39,2,39,9,43,1,5,43,47,2,47,10,51,1,51,6,55,1,5,55,59,2,6,59,63,2,63,6,67,1,5,67,71,1,71,9,75,2,75,10,79,1,79,5,83,1,10,83,87,1,5,87,91,2,13,91,95,1,95,10,99,2,99,13,103,1,103,5,107,1,107,13,111,2,111,9,115,1,6,115,119,2,119,6,123,1,123,6,127,1,127,9,131,1,6,131,135,1,135,2,139,1,139,10,0,99,2,0,14,0",
                                   0,
                                   "",
                                   "6730673,12,2,2,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,36,1,19,6,38,2,6,23,76,2,27,9,228,1,5,31,229,1,35,10,233,2,39,9,699,1,5,43,700,2,47,10,2800,1,51,6,2802,1,5,55,2803,2,6,59,5606,2,63,6,11212,1,5,67,11213,1,71,9,11216,2,75,10,44864,1,79,5,44865,1,10,83,44869,1,5,87,44870,2,13,91,224350,1,95,10,224354,2,99,13,1121770,1,103,5,1121771,1,107,13,1121776,2,111,9,3365328,1,6,115,3365330,2,119,6,6730660,1,123,6,6730662,1,127,9,6730665,1,6,131,6730667,1,135,2,6730669,1,139,10,0,99,2,0,14,0" ); // Day2 part 1  6730673
    testsPass = testsPass && test( "1,37,49,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,6,23,2,6,23,27,2,27,9,31,1,5,31,35,1,35,10,39,2,39,9,43,1,5,43,47,2,47,10,51,1,51,6,55,1,5,55,59,2,6,59,63,2,63,6,67,1,5,67,71,1,71,9,75,2,75,10,79,1,79,5,83,1,10,83,87,1,5,87,91,2,13,91,95,1,95,10,99,2,99,13,103,1,103,5,107,1,107,13,111,2,111,9,115,1,6,115,119,2,119,6,123,1,123,6,127,1,127,9,131,1,6,131,135,1,135,2,139,1,139,10,0,99,2,0,14,0",
                                   0,
                                   "",
                                   "19690720,37,49,2,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,111,1,19,6,113,2,6,23,226,2,27,9,678,1,5,31,679,1,35,10,683,2,39,9,2049,1,5,43,2050,2,47,10,8200,1,51,6,8202,1,5,55,8203,2,6,59,16406,2,63,6,32812,1,5,67,32813,1,71,9,32816,2,75,10,131264,1,79,5,131265,1,10,83,131269,1,5,87,131270,2,13,91,656350,1,95,10,656354,2,99,13,3281770,1,103,5,3281771,1,107,13,3281776,2,111,9,9845328,1,6,115,9845330,2,119,6,19690660,1,123,6,19690662,1,127,9,19690665,1,6,131,19690667,1,135,2,19690716,1,139,10,0,99,2,0,14,0" ); // Day2 part 2  19690720
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
