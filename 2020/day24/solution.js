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
  const NW = 'A';
  const NE = 'B';
  const SW = 'C';
  const SE = 'D';
  const W = 'w';
  const E = 'e';
  let tiles = [];
  let sum = 0;
  data = data.trim().replace(/nw/g,NW).replace(/ne/g,NE).replace(/sw/g,SW).replace(/se/g,SE).split(/\r?\n/);
  data.forEach(function(line,index,array){
    let x = 0;
    let y = 0;
    line.split('').forEach(function(direction,dindex,darray){
      switch( direction ){
      case NE:
        x += 1;
        y += 1;
        break;
      case NW:
        x += -1;
        y += 1;
        break;
      case SE:
        x += 1;
        y += -1;
        break;
      case SW:
        x += -1;
        y += -1;
        break;
      case E:
        x += 2
        break;
      case W:
        x += -2
        break;
      }
    });
    if( tiles[ x * 10000 + y ] ){
      --sum;
      tiles[ x * 10000 + y ] = false;
    } else {
      ++sum;
      tiles[ x * 10000 + y ] = true;
    }
    console.log( sum );
  });
  
  return sum;
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
