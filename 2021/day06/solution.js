$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var canvas = document.getElementById("visualization");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("visualization2");
var ctx2 = canvas2.getContext("2d");

function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
}

// const fs = require('fs').promises;

let counts = new Array(9).fill(0);

function iterate(){
	let new_counts = new Array(9).fill(0);
	for( let i = 0; i < 8; ++i ){
		new_counts[i] = counts[i+1];
	}
	new_counts[6] = counts[7] + counts[0];
	new_counts[8] = counts[0];

	counts = new_counts;
}
function init_counts( data ){
	data.trim().split(/,/).forEach(function(valStr,index,array){
		counts[parseInt(valStr)]++;
	})
}

function part1( data ){
	//let days_remaining = 18;
	let days_remaining = 80;
	counts = new Array(9).fill(0);
	init_counts( data );
	for( let i = 0; i < days_remaining; ++i ){
		iterate();
	}
	let sum = 0
	counts.forEach(function(val,index,array){
		sum += val;
	})
	//return counts[0] + counts[1] + counts[2] + counts[3] + counts[4] + counts[5] + counts[6] + counts[7] + counts[8];
	return sum;
}
function part2( data ){
	let days_remaining = 256;
	counts = new Array(9).fill(0);
	init_counts( data );
	for( let i = 0; i < days_remaining; ++i ){
		iterate();
	}
	let sum = 0
	counts.forEach(function(val,index,array){
		sum += val;
	})
	//return counts[0] + counts[1] + counts[2] + counts[3] + counts[4] + counts[5] + counts[6] + counts[7] + counts[8];
	return sum;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
	lines = data.trim().split(/\r?\n/);
    $('#input span').text('(' + data.length + ' bytes, ' + lines.length + ' line' + (lines.length == 1 ? '' : 's') + ')');
  
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
//readFile('example_input.txt');
readFile('input.txt');