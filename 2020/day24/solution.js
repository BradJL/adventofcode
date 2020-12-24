function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
  
  // var canvas = document.getElementById("visualization");
  // var ctx = canvas.getContext("2d");
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
}

// const fs = require('fs').promises;

var maxX = 0;
var minX = Number.MAX_SAFE_INTEGER;
var maxY = 0;
var minY = Number.MAX_SAFE_INTEGER;
function coord( x, y ){
  if( x > maxX ){ maxX = x };
  if( y > maxY ){ maxY = y };
  if( x < minX ){ minX = x };
  if( y < minY ){ minY = y };
  return 1000*(x+100) + (y + 100);
}

function getXY( coord ){
  let y = coord % 1000;
  coord = coord - y;
  y = y-100;
  let x = (coord/1000)-100;
  return [x,y];
}

function flipTile( tiles, x, y, sum ){
  if( tiles[ coord( x, y ) ] ){
    --sum;
    tiles[ coord( x, y ) ] = false;
  } else {
    ++sum;
    tiles[ coord( x, y ) ] = true;
  }
  initializeNeighbors( tiles, x, y );
  return sum;
}

function initializeNeighbors( tiles, x, y ){
  if( !tiles[ coord( x+1, y+1 ) ] ){ tiles[ coord( x+1, y+1 ) ] = false; }
  if( !tiles[ coord( x+1, y-1 ) ] ){ tiles[ coord( x+1, y-1 ) ] = false; }
  if( !tiles[ coord( x-1, y+1 ) ] ){ tiles[ coord( x-1, y+1 ) ] = false; }
  if( !tiles[ coord( x-1, y-1 ) ] ){ tiles[ coord( x-1, y-1 ) ] = false; }
  if( !tiles[ coord( x+2, y ) ] ){ tiles[ coord( x+2, y ) ] = false; }
  if( !tiles[ coord( x-2, y ) ] ){ tiles[ coord( x-2, y ) ] = false; }
}

function getNeighbors( tiles, x, y ){
  let retVal = 0;
  if( tiles[ coord( x+1, y+1 ) ] ){ ++retVal; }
  if( tiles[ coord( x+1, y-1 ) ] ){ ++retVal; }
  if( tiles[ coord( x-1, y+1 ) ] ){ ++retVal; }
  if( tiles[ coord( x-1, y-1 ) ] ){ ++retVal; }
  if( tiles[ coord( x+2, y ) ] ){ ++retVal; }
  if( tiles[ coord( x-2, y ) ] ){ ++retVal; }
  return retVal;
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
    sum = flipTile( tiles, x, y, sum );
//     console.log( sum );
  });
//   console.log( "tiles.length: " + tiles.length );
  console.log( "x[" + minX + "," + maxX + "] y[" + minY + "," + maxY + "]" );
  return [sum, tiles];
}

function part2( sum, tiles ){
  let iteration = 0;
  const iterations = 100;
  let newTiles = []
  while( iteration < iterations){
    tiles.forEach(function(flip, index, array){
      newTiles[index] = flip;
      let xY = getXY( index );
      let neighbors = getNeighbors( tiles, xY[0], xY[1] );
      switch( flip ){
      case true:
        if( neighbors == 0 || neighbors > 2 ){
          sum = flipTile( newTiles, xY[0], xY[1], sum );
        }
        break;
      case false:
        if( neighbors == 2 ){
          sum = flipTile( newTiles, xY[0], xY[1], sum );
        }
        break;
      }
    });
    tiles = newTiles;
    newTiles = [];
    ++iteration;
    console.log( "Day " + iteration + ": " +  sum );
  }
  
  return sum;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( data );
    $('#answer span').text( part1Answer[0] );
    let part2Answer = part2( part1Answer[0], part1Answer[1] );
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
readFile('input1.txt');
