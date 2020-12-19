function initialize(){
    $('#answer span').text('Calculating...');
    $('#answer2 span').text('Calculating...');
    
    // var canvas = document.getElementById("visualization");
    // var ctx = canvas.getContext("2d");
    // var canvas2 = document.getElementById("visualization2");
    // var ctx2 = canvas2.getContext("2d");  
  }
  
// const fs = require('fs').promises;

function coord( x, y ){
  return x * 100000000 + y;
}
  
function crossWires( data ){
  data = data.trim().split(/\r?\n/);
  let grid = [];
  let startX = 10000;
  let startY = 10000;
  let collisionDistance = Number.MAX_SAFE_INTEGER;
  let collisionSteps = Number.MAX_SAFE_INTEGER;

  let x = startX;
  let y = startY;
  let steps = 0;
  wire1 = data[0].split(',');
  wire1.forEach(function(route,index,array){
    let dist = parseInt(route.match(/[0-9]+/)[0]);
    switch( route.charAt(0) ){
    case 'R':
      for( let i = 0; i < dist; ++i ){
        ++x;
        ++steps;
        grid[ coord( x, y )] = steps;
      }
      break;
    case 'L':
      for( let i = 0; i < dist; ++i ){
        --x;
        ++steps;
        grid[ coord( x, y )] = steps;
      }
      break;
    case 'U':
      for( let i = 0; i < dist; ++i ){
        ++y;
        ++steps;
        grid[ coord( x, y )] = steps;
      }
      break;
    case 'D':
      for( let i = 0; i < dist; ++i ){
        --y;
        ++steps;
        grid[ coord( x, y )] = steps;
      }
      break;
    }
  });
  
  x = startX;
  y = startY;
  steps = 0;
  wire2 = data[1].split(',');
  wire2.forEach(function(route,index,array){
    let dist = parseInt(route.match(/[0-9]+/)[0]);
    switch( route.charAt(0) ){
    case 'R':
      for( let i = 0; i < dist; ++i ){
        ++x;
        ++steps;
        if( grid[ coord( x, y )] ){
          if( Math.abs(x - startX) + Math.abs(y - startY) < collisionDistance ){
            collisionDistance = Math.abs(x - startX) + Math.abs(y - startY);
          }
          if( grid[ coord( x, y )] + steps < collisionSteps ){
            collisionSteps = grid[ coord( x, y )] + steps;
          }
        }
      }
      break;
    case 'L':
      for( let i = 0; i < dist; ++i ){
        --x;
        ++steps;
        if( grid[ coord( x, y )] ){
          if( Math.abs(x - startX) + Math.abs(y - startY) < collisionDistance ){
            collisionDistance = Math.abs(x - startX) + Math.abs(y - startY);
          }
          if( grid[ coord( x, y )] + steps < collisionSteps ){
            collisionSteps = grid[ coord( x, y )] + steps;
          }
        }
      }
      break;
    case 'U':
      for( let i = 0; i < dist; ++i ){
        ++y;
        ++steps;
        if( grid[ coord( x, y )] ){
          if( Math.abs(x - startX) + Math.abs(y - startY) < collisionDistance ){
            collisionDistance = Math.abs(x - startX) + Math.abs(y - startY);
          }
          if( grid[ coord( x, y )] + steps < collisionSteps ){
            collisionSteps = grid[ coord( x, y )] + steps;
          }
        }
      }
      break;
    case 'D':
      for( let i = 0; i < dist; ++i ){
        --y;
        ++steps;
        if( grid[ coord( x, y )] ){
          if( Math.abs(x - startX) + Math.abs(y - startY) < collisionDistance ){
            collisionDistance = Math.abs(x - startX) + Math.abs(y - startY);
          }
          if( grid[ coord( x, y )] + steps < collisionSteps ){
            collisionSteps = grid[ coord( x, y )] + steps;
          }
        }
      }
      break;
    }
  });
  // data = data.trim().split(/\r?\n/);

  return [collisionDistance, collisionSteps];
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( data );
    $('#answer2 span').text( part1Answer );
  });
}
// async function readFile(filePath){
//   try {
//     const constData = await fs.readFile(filePath);
//     let answers = crossWires( constData.toString() );
//     console.log( "Part 1 answer: " + answers[0] );
//     console.log( "Part 2 answer: " + answers[1] );
//   } catch (error) {
//     console.error(`Got an error trying to read the file: ${error.message}`);
//   }
// }
  
//   initialize();
readFile('input.txt');
