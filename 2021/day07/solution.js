// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function initialize_website(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
}

// const fs = require('fs').promises;

let values = new Array();

function initialize( data ){
	data.trim().split(/,/).forEach(function(valStr,index,array){
		values.push( parseInt(valStr) );
	})
}

var part1_fuel_calc = function (moves) { return moves }
var part2_fuel_calc = function (moves) { return moves*(moves+1)/2 }

function part1(){
	let position = 0;
	let lowest_sum = Number.MAX_SAFE_INTEGER;
	let sum = lowest_sum;

	while( sum == lowest_sum ){
		sum = 0;
		values.forEach(function(value,index,array){
			//sum += Math.abs( position - value );
			let moves = Math.abs( position - value )
			sum += part1_fuel_calc(moves);
		})
		if( sum < lowest_sum ){
			lowest_sum = sum;
		}
		++position
	}
	return lowest_sum
}

function part2(){
	let position = 0;
	let lowest_sum = Number.MAX_SAFE_INTEGER;
	let sum = lowest_sum;

	while( sum == lowest_sum ){
		sum = 0;
		values.forEach(function(value,index,array){
			let moves = Math.abs( position - value )
//			sum += moves*(moves+1)/2;
			sum += part2_fuel_calc(moves);
		})
		if( sum < lowest_sum ){
			lowest_sum = sum;
		}
		++position
	}
	return lowest_sum
}

function readFile(filePath){
  $.get( filePath, function( data ) {
	lines = data.trim().split(/\r?\n/);
    $('#input span').text('(' + data.length + ' bytes, ' + lines.length + ' line' + (lines.length == 1 ? '' : 's') + ')');
  
	initialize( data );
	let part1Answer = part1();
    $('#answer span').text( part1Answer );
    let part2Answer = part2();
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

initialize_website();
//readFile('example_input.txt');
readFile('input.txt');