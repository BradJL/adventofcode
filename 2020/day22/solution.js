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
  let player1 = [];
  let player2 = [];
  let decks = data.trim().split(/\r?\n\r?\n/);
  decks[0].split(/\r?\n/).slice(1).forEach(function(card,index,array){
    player1.push( parseInt( card ) );
  });
  decks[1].split(/\r?\n/).slice(1).forEach(function(card,index,array){
    player2.push( parseInt( card ) );
  });
    
  console.log( "Player 1's deck: " + player1 );
  console.log( "Player 2's deck: " + player2 );
  return 0;
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
readFile('input1.txt');
