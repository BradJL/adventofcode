var createBox = function( x, y, z, visibility, scene ){
  let box =  BABYLON.MeshBuilder.CreateBox("x"+x+"y"+y+"z"+z, {height: .1, width: .1, depth: .1, wrap: true}, scene);
  box.position = new BABYLON.Vector3(x,y,z);
  box.visibility = visibility;
  return box;
}
    
const createScene =  (engine, canvas1, canvas2) => {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.0, 0.7, 0.0);
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
  const camera2 = new BABYLON.ArcRotateCamera("camera2", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(-1, -1, -1));
  camera.attachControl(canvas1, true);
  //camera2.attachControl(canvas2, true);
  engine.registerView(canvas1);
  engine.registerView(canvas2, camera2);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
  light.intensity = 0.25;
  //     const box = BABYLON.MeshBuilder.CreateBox("box", {});
  return scene;
}

function visualize( objects ){
  var canvas = document.createElement("canvas");
  canvas.height = 600;
  canvas.width = 600;
  var canvas1 = document.getElementById("visualization");
  var canvas2 = document.getElementById("visualization2");
  // var ctx = canvas.getContext("2d");
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
  var engine = new BABYLON.Engine(canvas, true);
  engine.inputElement = canvas1;
  
  var scene = createScene(engine, canvas1, canvas2);
  var box;
  let redMat = new BABYLON.StandardMaterial("redMat", scene);
  redMat.backFaceCulling = true;
  redMat.emissiveColor = new BABYLON.Color3(0.6, 0.0, 0.0);
  redMat.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  redMat.ambientColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  let greenMat = new BABYLON.StandardMaterial("redMat", scene);
  greenMat.backFaceCulling = true;
  greenMat.emissiveColor = new BABYLON.Color3(0.0, 0.0, 0.0);
  greenMat.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  greenMat.ambientColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  objects.forEach( function(value,index,array){
    box = createBox( (value[0]-10)/15, (value[1]-10)/15, value[2]/15, 0.6, scene );
    box.material = redMat;
  });
//   objects.forEach( function(value,index,array){
//     box = createBox( 10+(value[0]-10)/15, 10+(value[1]-10)/15, value[2]/15, 1.0, scene );
//     box.material = greenMat;
//   });
  
  let box2 = createBox( 1, 1, 1, 1.0, scene );
  box2.material = greenMat;
  box2 = createBox( 2, 2, 2, 1.0, scene );
  box2 = createBox( -1, -1, -1, 1.0, scene );
  box2.material = greenMat;
  
  engine.runRenderLoop(function () {
    scene.render();
  });
  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
    engine.resize();
  });
}

function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
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
  
function getCubeCoords( activeCubes ){
  let cubes = [];
  activeCubes.forEach(function(value,index,array){
    cubes.push( revCoords( index ) );
  });
  return cubes;
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
//     console.log( "activeCubes: " + activeCubeCount( activeCubes ) );
    //   printCubes( activeCubes );
    --startX;
    --startY;
    --startZ;
    ++nextX;
    ++nextY;
    ++nextZ;
  }

//   let objects = [ [ 6, 7, 5 ],
//                 [ 8, 8, 5 ],
//                 [ 7, 9, 5 ],
//                 [ 6, 7, 6 ],
//                 [ 8, 7, 6 ],
//                 [ 7, 8, 6 ],
//                 [ 8, 8, 6 ],
//                 [ 7, 9, 6 ],
//                 [ 6, 7, 7 ],
//                 [ 8, 8, 7 ],
//                 [ 7, 9, 7 ]
//               ];
  return activeCubes;
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
//     console.log( "activeCubes: " + activeCubeCount( activeCubes ) );
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

//   return activeCubeCount( activeCubes );
  return activeCubes;
}

// async function readFile(filePath){
//     try {
//       const constData = await fs.readFile(filePath);
//       let part1Answer = part1( constData.toString() );
//       console.log( "Part 1 answer: " + part1Answer );
  
//       let part2Answer = part2( constData.toString() );
//       console.log( "Part 2 answer: " + part2Answer );
//     } catch (error)
//       console.error(`Got an error trying to read the file: ${error.message}`);
//     }
//   }
function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( data );
    $('#answer span').text( activeCubeCount( part1Answer ) );
    let part2Answer = part2( data );
    $('#answer2 span').text( activeCubeCount( part2Answer ) );
    
    visualize( getCubeCoords( part1Answer ) );
  });
}

initialize();
readFile('input.txt');
