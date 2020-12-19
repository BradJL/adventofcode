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
  
function part1( data ){
  let sum = 0;
  data = data.trim().split(/\r?\n/);
  data.forEach(function(module,index,array){
    sum += Math.floor( parseInt(module)/3 ) - 2;
  });
  return sum;
}

function part2( data ){
  let sum = 0;
  data = data.trim().split(/\r?\n/);
  data.forEach(function(module,index,array){
    module = Math.floor( parseInt(module)/3 ) - 2;
    while( module > 0 ({
      sum += module;
      module = Math.floor( parseInt(module)/3 ) - 2;
    }
  });
  return sum;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( data );
    $('#answer span').text( part1Answer );
    let part2Answer = part2( data );
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
