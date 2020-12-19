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
  data = data.trim().split(/,/);
//   data.forEach(function(module,index,array){
//   });
  let i = 0;
  let stop = false;
  
  while( !stop ){
    let add = true;
    switch( parseInt(data[i]) ){
    case 1: // add
      add = true;
      break;
    case 2: // multiply
      add = false;
      break;
    case 99: // end
      stop = true;
      break;
    }
    if( !stop ){
      if( add ){
        data[parseInt( data[i+3] )] = parseInt(data[parseInt( data[i+1] )]) + parseInt(data[parseInt( data[i+2] )]);
      } else {
        data[parseInt( data[i+3] )] = parseInt(data[parseInt( data[i+1] )]) * parseInt(data[parseInt( data[i+2] )]);
      }
      i += 4;
    }
  }
    
  return data;
}

function part2( data ){
  data = data.trim().split(/,/);
  data.forEach(function(module,index,array){
  });
  return 0;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
//     data = "1,9,10,3,2,3,11,0,99,30,40,50"
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
