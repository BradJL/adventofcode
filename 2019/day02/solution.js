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

function intcode( numbers, noun, verb ){
  numbers[1] = noun;
  numbers[2] = verb;
  console.log( numbers );
  let i = 0;
  let stop = false;
  
  while( !stop ){
    switch( parseInt(numbers[i]) ){
    case ADD: // add
      numbers[numbers[i+3]] = numbers[numbers[i+1]] + numbers[numbers[i+2]];
//      console.log( "add " + numbers[i+1] + "(" + numbers[numbers[i+1]] + ") + " + numbers[i+2] + "(" + numbers[numbers[i+2]] + ") --> " + numbers[i+3] + "(" + numbers[numbers[i+3]] + ")" );
      i += 4;
      break;
    case MULTIPLY: // multiply
      add = false;
      numbers[numbers[i+3]] = numbers[numbers[i+1]] * numbers[numbers[i+2]];
//      console.log( "mul " + numbers[i+1] + "(" + numbers[numbers[i+1]] + ") * " + numbers[i+2] + "(" + numbers[numbers[i+2]] + ") --> " + numbers[i+3] + "(" + numbers[numbers[i+3]] + ")" );
      i += 4;
      break;
    case 99: // end
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
  return intcode( numbers, 12, 2 )[0];
}

function part2( data ){
  data = data.trim().split(/,/);
  let iterations = 100000;
  let answer = 0;
  let i = 0;
  for( i = 0; answer != 19690720 && --iterations; ++i ){
    let numbers = [];
    data.forEach(function(num,index,array){
      numbers.push( parseInt( num ) );
    });
    answer = intcode( numbers, Math.floor(i/100), i%100 )[0];
  }
  return i-1;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    //data = "1,9,10,3,2,3,11,0,99,30,40,50"
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( data ); // 6730673
    $('#answer span').text( part1Answer );
    let part2Answer = part2( data ); // 3749
    $('#answer2 span').text( part2Answer );
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
