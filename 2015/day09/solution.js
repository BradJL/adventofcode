function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
  
  // var canvas = document.getElementById("visualization");
  // var ctx = canvas.getContext("2d");
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
}

//const fs = require('fs').promises;

function log( what ){
  //console.log( what );
}

function clone( obj ){
  return JSON.parse(JSON.stringify(obj));
}

function getPlaces( data ){
  let inputLocs = data.match(/[A-Z][a-zA-Z]+/g);
  let locationsSet = new Set();
  inputLocs.forEach(function(loc,index,array){
    locationsSet.add( loc );
  });
  let locations = [];

  Array.from(locationsSet).forEach(function(name,index,array){
    locations[name] = index;
  });
  return locations;
}

function initializeDistances( length ){
  let distances = new Array( length );
  for( let i = 0; i < length; ++i ){
    // console.log( new Array( length ).fill( 0, 0, length ) );
    distances[i] = new Array( length ).fill( 0, 0, length );
  }
  return distances;
}
  
function part1( data, wire ){
  let places = getPlaces(data);
  console.log( places );

  let distances = initializeDistances( Object.keys(places).length );
//   console.log( distances );

  data = data.trim().split(/\r?\n/);
  data.forEach(function(line,index,array){
    let jumpAndDistance = line.split(" = ");
    let distance = parseInt(jumpAndDistance[1]);
    let twoPlaces = jumpAndDistance[0].split(" to ");
    distances[ places[twoPlaces[0]] ][ places[twoPlaces[1]] ] = distance;
    distances[ places[twoPlaces[1]] ][ places[twoPlaces[0]] ] = distance;
  });

  console.log( distances );
  let path = {used:[], available:[0,1,2,3,4,5,6,7], sum:0};
  let paths = [path];

  console.log( "paths.length: " + paths.length );

  let sumsSet = new Set();
  let min = 9999999;
  //let iterations = 8
  while( paths.length /*&& iterations--*/ ){
    path = paths.shift();
    //console.log( path );
    if( path.available.length == 0 ){
      if( path.sum < min ){
        min = path.sum;
        console.log( path );
      }
      sumsSet.add( path.sum );
    } else {
      path.available.forEach(function(avail,index,array){
        let newPath = clone( path );
        if( newPath.used.length ){
        //   console.log( "sum was: " + newPath.sum );
        //   console.log( "indicies: " + (newPath.used[newPath.used.length-1]) + "," + avail );
        //   console.log( "distance: " + distances[newPath.used[newPath.used.length-1]][avail] );
          newPath.sum += distances[newPath.used[newPath.used.length-1]][avail];
        //   console.log( "sum is: " + newPath.sum );
        }
        newPath.used.push( newPath.available.splice(index, 1)[0] );
        paths.push( newPath );
      });
      //console.log( paths );
    }
  }

  sumsSet = (Array.from(sumsSet)).sort(function(a, b){return a-b});
  console.log( sumsSet );

  return [ sumsSet[0]. sumsSet[ sumsSet.length - 1 ] ];
}


// async function readFile(filePath){
//   try {
//     const constData = await fs.readFile(filePath);
//     let part1Answer = part1( constData.toString() );
//     console.log( "Part 1 answer: " + part1Answer );

//     // let part2Answer = part2( constData.toString(), part1Answer[1] );
//     // console.log( "Part 2 answer: " + part2Answer );
//   } catch (error) {
//     console.error(`Got an error trying to read the file: ${error.message}`);
//   }
// }

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( data );
    $('#answer span').text( part1Answer[0] );
    $('#answer2 span').text( part1Answer[1] );
  });
}

initialize();
readFile('input.txt');
