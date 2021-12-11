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
let flashes = 0;

function initialize( data ){
	data.trim().split(/\r?\n/).forEach(function(valStr,index,array){
		valStr.trim().split('').forEach(function(valStr2,index2,array2){
			values.push( parseInt(valStr2) );
		})
	})
}

var part1_fuel_calc = function (moves) { return moves }
var part2_fuel_calc = function (moves) { return moves*(moves+1)/2 }

function values_to_string(){
	let output = "";
	values.forEach(function(val,index,array){
		if( index % 10 == 0 ){
			output += "<br>";
		}
		output += val;
	})
	return output;
}
function step(){
	new_values = new Array();
	values.forEach(function(val,index,array){
		new_values.push( val + 1 );
	})

	let changed = 1;

	while( changed ){
		changed = 0;
		values = new_values;
		values.forEach(function(val,index,array){
			if( (val >= 10) && (val < 100) ){
				changed = 1;
				++flashes;
				new_values[index] = 100;
				if( index % 10 != 0 ) new_values[index-1]++
				if( (index+1) % 10 != 0 ) new_values[index+1]++
				if( ((index/10) >= 1) && (index % 10 != 0) ) new_values[index-11]++
				if( (index/10) >= 1 ) new_values[index-10]++
				if( ((index/10) >= 1) && ((index+1) % 10 != 0) ) new_values[index-9]++
				if( ((index/10) < 9) && (index % 10 != 0) ) new_values[index+9]++
				if( (index/10) < 9 ) new_values[index+10]++
				if( ((index/10) < 9) && ((index+1) % 10 != 0) ) new_values[index+11]++
			}
		})
	}
	//values = new_values;
	values = new Array();
	new_values.forEach(function(val,index,array){
		if(val < 10){
			values.push(val);
		} else {
			values.push(0);
		}
	})
}

function part1(){
	for( let i = 0; i < 100; ++i ) step();
	return flashes;
}

function part2(){
	//return compute( part2_fuel_calc );
	return 0;
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
    $('#bonus span').html( values_to_string() );
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
