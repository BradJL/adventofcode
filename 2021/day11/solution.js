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
	data.trim().split(/\r?\n/).forEach(function(valStr,index,array){
		valStr.trim().split('').forEach(function(valStr2,index2,array2){
			values.push( parseInt(valStr2) );
		})
	})
}

var part1_fuel_calc = function (moves) { return moves }
var part2_fuel_calc = function (moves) { return moves*(moves+1)/2 }

function step(){
	new_values = new Array();
	values.forEach(function(val,index,array){
		new_values.push( val + 1 );
	})
	values = new_values;
}

function part1(){
	step();
	return values;
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
    //$('#bonus span').html( "<img src='day09.png'/>" );
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
readFile('example_input.txt');
//readFile('input.txt');
