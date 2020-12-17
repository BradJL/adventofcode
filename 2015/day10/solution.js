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
  let newData = "";
  data = data.trim().split('');
  console.log( "data Array: " + data );
  let iterations = 40;
  while( iterations-- ){
    let count = 0;
    let lastChar = '';
    data.forEach(function(char,index,array){
      console.log( "next: " + char );
      if( lastChar == '' ){
        ++count;
        lastChar = char;
      } else {
        if( char == lastChar ){
          ++count
        } else {
          newData += count + lastChar;
          lastChar = char;
          count = 1;
        }
      }
      console.log( newData );
    });
    newData += count + lastChar
    console.log( newData );
    data = newData.split('');
    newData = "";
  }
  return data.toString();
}

function part2( data ){
  data = data.trim().split(/\r?\n/);

  return 0;
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
