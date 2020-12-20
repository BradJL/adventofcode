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
//  console.log( numbers );
  let i = 0;
  let stop = false;
  
  while( !stop ){
    let opcode = numbers[i] % 100;
    let modes = (/*"000" +*/ Math.floor(numbers[1] / 100).toString()).split('').reverse();
    switch( opcode ){
    case ADD: // add
      console.log( "modes: " + modes );
      let outputIndex = modes[2] == '0' ? /*position mode*/ numbers[i+3] : /*immediate mode*/ i+3;
       numbers[outputIndex] =
        (modes[0] == '0' ? /*position mode*/ numbers[numbers[i+1]] : /*immediate mode*/ numbers[i+1]) +
        (modes[1] == '0' ? /*position mode*/ numbers[numbers[i+2]] : /*immediate mode*/ numbers[i+2]);
//      console.log( "add " + numbers[i+1] + "(" + numbers[numbers[i+1]] + ") + " + numbers[i+2] + "(" + numbers[numbers[i+2]] + ") --> " + numbers[i+3] + "(" + numbers[numbers[i+3]] + ")" );
      i += 4;
      break;
    case MULTIPLY: // multiply
      numbers[numbers[i+3]] = numbers[numbers[i+1]] * numbers[numbers[i+2]];
//      console.log( "mul " + numbers[i+1] + "(" + numbers[numbers[i+1]] + ") * " + numbers[i+2] + "(" + numbers[numbers[i+2]] + ") --> " + numbers[i+3] + "(" + numbers[numbers[i+3]] + ")" );
      i += 4;
      break;
    case INPUT:
      numbers[numbers[i+1]] = input;
      i += 2;
      break;
    case OUTPUT:
      output.push( numbers[numbers[i+1]] );
      i += 2;
      break;
    case HALT: // end
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
    data = "3,0,4,0,99"
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( data ); // 
    $('#answer span').text( part1Answer );
//     let part2Answer = part2( data ); // 
//     $('#answer2 span').text( part2Answer );
    let testsPass = true;
    testsPass = testsPass && test( "1,9,10,3,2,3,11,0,99,30,40,50", 0, "", "3500,9,10,70,2,3,11,0,99,30,40,50" );
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
