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
  
function getBiodiversityRating( grid ){
  return parseInt(grid.split("").reverse().join(""), 2);
}

function getAdjacentBugs( grid, pos ){ // pos: 0 - 24
  let adjacent = 0;
  if( pos >= 5 && parseInt(grid.charAt(pos-5)) ){
    ++adjacent;
  }
  if( pos < 20 && parseInt(grid.charAt(pos+5)) ){
    ++adjacent;
  }
  if( pos % 5 && parseInt(grid.charAt(pos-1)) ){
    ++adjacent;
  }
  if( (pos+1) % 5 && parseInt(grid.charAt(pos+1)) ){
    ++adjacent;
  }
  console.log( adjacent );
  return adjacent;
}

function setUpGrid( data ){
  data = data.trim().replace(/[\r\n]/g,'').replace(/\./g,'0').replace(/#/g,'1');
  //data = data.split("").reverse().join("");
  return data;
}

function simulate( grid ){
  let newGrid = "";
  for( let i = 0; i < grid.length; ++i ){
    switch( grid.charAt(i) ){
    case '0':
      switch( getAdjacentBugs( i ) ){
        case 1:
        case 2:
          newGrid.push('1');
          break;
        default:
          newGrid.push('0');
          break;
      }
      break;
    case '1':
      if( getAdjacentBugs( i ) == 1 ){
        newGrid.push('1');
      } else {
        newGrid.push('0');
      }
      break;
    }
  }
  return newGrid;
}

function part2( data ){
  data = data.trim().split(/\r?\n/);

  return 0;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let grid = setUpGrid( data );
    let part1Answer = simulate( grid );
    $('#answer span').text( part1Answer );
    data = ".....\n.....\n.....\n#....\n.#...";
    let part2Answer = getBiodiversityRating( setUpGrid( data ) );
    for( let i = 0; i < 25; ++i ){
      getAdjacentBugs( grid, i );
    }
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
