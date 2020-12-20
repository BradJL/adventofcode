function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
  
  // var canvas = document.getElementById("visualization");
  // var ctx = canvas.getContext("2d");
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
}

// const fs = require('fs').promises;

function reverseString(str) {
  return str.split("").reverse().join("");
}

function getBinaryString(str){
  return str.replace(/\#/g,'1').replace(/\./g,'0');
}

function part1( data ){
  data = data.trim().split(/\r?\n\r?\n/);
  data.forEach(function(tile,index,array){
    let name = tile[0].match(/[0-9]+/);
    console.log( name );
    let edges = [];

    let edge = getBinaryString( tile[1] );
    edges.push( parseInt( edge, 2 ) );
    edges.push( parseInt( reverseString(edge), 2 ) );

    edge = getBinaryString( tile[tile.length-1] );
    edges.push( parseInt( edge, 2 ) );
    edges.push( parseInt( reverseString(edge), 2 ) );

    let edgeL = "";
    let edgeR = "";
    for( let i = 1; i < tile.length; ++i ){
      edgeL += tile[i].charAt(0);
      edgeR += tile[i].charAt(9);
    }
    edgeL = getBinaryString( edgeL );
    edgeR = getBinaryString( edgeR );
    edges.push( parseInt( edgeL, 2 ) );
    edges.push( parseInt( reverseString(edgeL), 2 ) );
    edges.push( parseInt( edgeR, 2 ) );
    edges.push( parseInt( reverseString(edgeR), 2 ) );
  });
  console.log( name + ": " + edges );
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
readFile('input.txt');
