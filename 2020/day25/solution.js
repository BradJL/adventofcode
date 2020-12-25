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

function getLoops( key ){
  let val = 1;
  let subject = 7;
  let divisor = 20201227;
  let loops = 0;
  
  while( val != key ){
    val = ( val * subject ) % divisor;
    ++loops;
  }
  return loops;
}
  
function part1( data ){
  data = data.trim().split(/\r?\n/);
  let cardLoops = getLoops( 5764801 );//parseInt(data[2]) );
  let doorLoops = getLoops( 17807724 );//parseInt(data[1]) );
  return cardLoops + "," + doorLoops;
}

function part2( data ){
  data = data.trim().split(/\r?\n/);

  return 0;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    data = "5764801\n17807724";
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
