// $('#answer span').text('Calculating...');
// $('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
}

// const fs = require('fs').promises;

// function init_counts( data ){
// 	let counts = new Array(9).fill(0);
// 	data.trim().split(/,/).forEach(function(valStr,index,array){
// 		counts[parseInt(valStr)]++;
// 	})

// 	return counts;
// }

// function iterate( counts ){
// 	let new_counts = new Array(9).fill(0);
// 	for( let i = 0; i < 8; ++i ){
// 		new_counts[i] = counts[i+1];
// 	}
// 	new_counts[6] = counts[7] + counts[0];
// 	new_counts[8] = counts[0];

// 	return new_counts;
// }

// function get_sum( counts ){
// 	let sum = 0
// 	counts.forEach(function(val,index,array){
// 		sum += val;
// 	})

// 	return sum;
// }

function part1( data ){
	let position = 0;
	let sum = 0;
	let last_sum = 999999999999999999999;

	let values = new Array();

	data.trim().split(/,/).forEach(function(valStr,index,array){
		values.push( parseInt(valStr) );
	})

	while( sum < last_sum ){
		sum = 0;
		values.forEach(function(value,index,array){
			sum += Math.abs( position - value );
		})
	}
	return last_sum
}
function part2( data ){
	// let days_remaining = 256;
	// let counts = init_counts( data );
	// while( days_remaining ){
	// 	counts = iterate( counts );
	// 	--days_remaining;
	// }
	// return get_sum( counts );
	return 0;
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