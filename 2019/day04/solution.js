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
  data = data.trim().split(/-/);
  data[0] = parseInt( data[0] );
  data[1] = parseInt( data[1] );
  
  let count = 0;
  for( let i = data[0]; i <= data[1]; ++i ){
    if( i.toString().match(/^1*2*3*4*5*6*7*8*9*$/) && i.toString().match(/(.)\1/) ){
      ++count;
    }
  }
  return count;
}

function part2( data ){
  data = data.trim().split(/-/);
  data[0] = parseInt( data[0] );
  data[1] = parseInt( data[1] );
  
  let count = 0;
  for( let i = data[0]; i <= data[1]; ++i ){
    if( i.toString().match(/^1*2*3*4*5*6*7*8*9*$/) && i.toString().replace(/(.){3,}/g,'').match(/(.)\1/) ){
      ++count;
    }
  }
  return count;
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
