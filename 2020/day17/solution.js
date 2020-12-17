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

function coords( x, y, z ){
  return (x + 100*y + 10000*z);
}
function coordsW( x, y, z, w ){
  return (x + 100*y + 10000*z + 1000000*w);
}
function revCoords( index ){
  let x = index % 100;
  let y = ((index - x) % 10000)/100;
  let z = (index - x - 100*y)/10000;
  return [x,y,z]
}

function getActiveNeighbors( activeCubes, x, y, z ){
  let sum = 0;
  for( let i = x-1; i <= x+1; ++i ){
    for( let j = y-1; j <= y+1; ++j ){
      for( let k = z-1; k <= z+1; ++k ){
        if( (activeCubes[coords(i,j,k)] == true) && !(i==x && j==y && k==z)){
          ++sum;
        }
      }
    }
  }
  return sum;
}
function getActiveNeighborsW( activeCubes, x, y, z, w ){
    let sum = 0;
    for( let i = x-1; i <= x+1; ++i ){
      for( let j = y-1; j <= y+1; ++j ){
        for( let k = z-1; k <= z+1; ++k ){
          for( let l = w-1; l <= w+1; ++l ){
            if( (activeCubes[coordsW(i,j,k,l)] == true) && !(i==x && j==y && k==z && l==w)){
              ++sum;
            }
          }
        }
      }
    }
    return sum;
  }
  
function printCubes( activeCubes ){
  activeCubes.forEach(function(value,index,array){
    console.log( revCoords( index ));
  });
}
function activeCubeCount( activeCubes ){
  let count = 0
  activeCubes.forEach(function(value,index,array){
    ++count;
  });
  return count;
}

function cycle( activeCubes, startX, lastX, startY, lastY, startZ, lastZ ){
  nextActiveCubes = [];
  for( let i = startX; i <= lastX; ++i ){
    for( let j = startY; j <= lastY; ++j ){
      for( let k = startZ; k <= lastZ; ++k ){
        let activeNeighbors = getActiveNeighbors( activeCubes, i,j,k );
        if( activeCubes[coords(i,j,k)] == true ){
          if( activeNeighbors == 2 || activeNeighbors == 3 ){
            nextActiveCubes[coords(i,j,k)] = true;
          }
        } else {
          if( activeNeighbors == 3 ){
            nextActiveCubes[coords(i,j,k)] = true;
          }
        }
      }
    }
  }
  return nextActiveCubes;
}
function cycleW( activeCubes, startX, lastX, startY, lastY, startZ, lastZ, startW, lastW ){
    nextActiveCubes = [];
    for( let i = startX; i <= lastX; ++i ){
      for( let j = startY; j <= lastY; ++j ){
        for( let k = startZ; k <= lastZ; ++k ){
          for( let l = startW; l <= lastW; ++l ){
            let activeNeighbors = getActiveNeighborsW( activeCubes, i,j,k,l );
            if( activeCubes[coordsW(i,j,k,l)] == true ){
              if( activeNeighbors == 2 || activeNeighbors == 3 ){
                nextActiveCubes[coordsW(i,j,k,l)] = true;
              }
            } else {
              if( activeNeighbors == 3 ){
                nextActiveCubes[coordsW(i,j,k,l)] = true;
              }
            }
          }
        }
      }
    }
    return nextActiveCubes;
  }
      
function part1( data ){
//  let coord = coords(1,2,3);
//   console.log( coord ); // expects 30201
//   console.log( revCoords( coord ) ); // expects [1,2,3]

  let startX = 6;
  let startY = 6;
  let startZ = 6;
  let x = startX;
  let y = startY;
  let z = startZ;
  let activeCubes = [];
  data = data.trim().split(/\r?\n/);
  data.forEach(function(value,index,array){
      x = startX;
      value.split('').forEach(function(char,cindex,carray){
      if( char == '#' ){
        activeCubes[coords(x,y,z)] = true;
      }
      ++x;
    });
    ++y;
  });
  let nextX = x;
  let nextY = y;
  let nextZ = z + 1;

//   printCubes( activeCubes ); //expects [7,6,6],[8,7,6],[6,8,6],[7,8,6],[8,8,6]
//   console.log( "active cubes: " + activeCubeCount( activeCubes ) ); // expects 5
//   console.log( "activeCubes[8,7,6](true): " + activeCubes[coords(8,7,6)] );
//   console.log( "ActiveNeighbors(3): " + getActiveNeighbors(activeCubes,6,7,6));
//   console.log( "ActiveNeighbors(5): " + getActiveNeighbors(activeCubes,7,7,6));
//   console.log( "ActiveNeighbors(3): " + getActiveNeighbors(activeCubes,8,7,6));

  startX--;
  startY--;
  startZ--;

//   console.log( "x(" + startX + "-" + nextX + ") y(" + startY + "-" + nextY + ") z(" + startZ + "-" + nextZ + ")" );

  let iterations = 6;
  while( iterations-- ){
    activeCubes = cycle( activeCubes, startX, nextX, startY, nextY, startZ, nextZ );
    console.log( "activeCubes: " + activeCubeCount( activeCubes ) );
    //   printCubes( activeCubes );
    --startX;
    --startY;
    --startZ;
    ++nextX;
    ++nextY;
    ++nextZ;
  }

  return activeCubeCount( activeCubes );
}

function part2( data ){
//   let coord = coords(1,2,3);
//   console.log( coord ); // expects 30201
//   console.log( revCoords( coord ) ); // expects [1,2,3]

  let startX = 6;
  let startY = 6;
  let startZ = 6;
  let startW = 6;
  let x = startX;
  let y = startY;
  let z = startZ;
  let w = startW;
  let activeCubes = [];
  data = data.trim().split(/\r?\n/);
  data.forEach(function(value,index,array){
      x = startX;
      value.split('').forEach(function(char,cindex,carray){
      if( char == '#' ){
        activeCubes[coordsW(x,y,z,w)] = true;
      }
      ++x;
    });
    ++y;
  });
  let nextX = x;
  let nextY = y;
  let nextZ = z + 1;
  let nextW = w + 1;

//   printCubes( activeCubes ); //expects [7,6,6],[8,7,6],[6,8,6],[7,8,6],[8,8,6]
//   console.log( "active cubes: " + activeCubeCount( activeCubes ) ); // expects 5
//   console.log( "activeCubes[8,7,6](true): " + activeCubes[coords(8,7,6)] );
//   console.log( "ActiveNeighbors(3): " + getActiveNeighbors(activeCubes,6,7,6));
//   console.log( "ActiveNeighbors(5): " + getActiveNeighbors(activeCubes,7,7,6));
//   console.log( "ActiveNeighbors(3): " + getActiveNeighbors(activeCubes,8,7,6));

  startX--;
  startY--;
  startZ--;
  startW--;

//   console.log( "x(" + startX + "-" + nextX + ") y(" + startY + "-" + nextY + ") z(" + startZ + "-" + nextZ + ")" );

  let iterations = 6;
  while( iterations-- ){
    activeCubes = cycleW( activeCubes, startX, nextX, startY, nextY, startZ, nextZ, startW, nextW );
    console.log( "activeCubes: " + activeCubeCount( activeCubes ) );
    //   printCubes( activeCubes );
    --startX;
    --startY;
    --startZ;
    --startW;
    ++nextX;
    ++nextY;
    ++nextZ;
    ++nextW;
  }

  return activeCubeCount( activeCubes );
}

// async function readFile(filePath){
//     try {
//       const constData = await fs.readFile(filePath);
//       let part1Answer = part1( constData.toString() );
//       console.log( "Part 1 answer: " + part1Answer );
  
//       let part2Answer = part2( constData.toString() );
//       console.log( "Part 2 answer: " + part2Answer );
//     } catch (error) {
//       console.error(`Got an error trying to read the file: ${error.message}`);
//     }
//   }
function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( data );
    $('#answer span').text( part1Answer );
    let part2Answer = part2( data );
    $('#answer2 span').text( part2Answer );
  });
}

// initialize();
readFile('input.txt');
