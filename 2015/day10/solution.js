function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
  
  // var canvas = document.getElementById("visualization");
  // var ctx = canvas.getContext("2d");
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
}

// const fs = require('fs').promises;
  
function lookAndSay( data, iterations ){
  let newData = "";
  data = data.trim().split('');
  while( iterations-- ){
    let count = 0;
    let lastChar = '';
    data.forEach(function(char,index,array){
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
    });
    newData += count + lastChar
    data = newData.split('');
    newData = "";
  }
  return data.toString().replace(/,/g,'');
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = lookAndSay( data, 40 );
    $('#answer span').text( part1Answer.length );
    let part2Answer = lookAndSay( part1Answer, 10 );
    $('#answer2 span').text( part2Answer.length );
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
