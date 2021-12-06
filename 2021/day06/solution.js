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

//const INPUT_ARRAY_SIZE = 1000;
//const EXAMPLE_ARRAY_SIZE = 10;
//var array_size = INPUT_ARRAY_SIZE;

let fish = new Array();

function iterate(){
	fish.forEach(function(val,index,array){
		--val
		if( val == -1 ){
			fish.push( 8 );
			val = 6;
		}
		fish[index] = val;
	})
}

function part1( data ){
	//let days_remaining = 18;
	let days_remaining = 80;
	data.trim().split(/,/).forEach(function(valStr,index,array){
		fish.push( parseInt(valStr) );
	})
	for( let i = 0; i < 18; ++i ){
		iterate();
		console.log( fish );
	}
	return fish.length;
}
function part2( data ){
	//return calculate_vents( data, true, ctx2 );
	return 0;
}

// function calculate_vents( data, allow_diagonals, canvas_context ){
// 	let ocean_floor_vents = new Array(array_size*array_size).fill(0);
// 	let twos = 0;

// 	data.trim().split(/\r?\n/).forEach(function(valStr,index,array){
// 		let vals = new Array();
// 		valStr.replace(/ -> /, ",").split(/,/).forEach(function(valStr1,index1,array1){
// 			vals.push( parseInt(valStr1) );
// 		});

// 		let fromy = vals[ 0 ];
// 		let thruy = vals[ 2 ];
// 		let fromx = vals[ 1 ];
// 		let thrux = vals[ 3 ];

// 		let ydelta = 1;
// 		if( fromy > thruy){
// 			ydelta = -1;
// 		} else if( fromy == thruy ){
// 			ydelta = 0;
// 		}

// 		let xdelta = 1;
// 		if( fromx > thrux ){
// 			xdelta = -1;
// 		} else if( fromx == thrux ){
// 			xdelta = 0;
// 		}

// 		if( allow_diagonals || (!(xdelta && ydelta)) ){
// 			canvas_context.strokeStyle = "#FF0000";
// 			canvas_context.beginPath();
// 			canvas_context.moveTo(fromx, fromy);
// 			canvas_context.lineTo(thrux, thruy);
// 			canvas_context.stroke();
		
// 			while( ( fromy != thruy + ydelta ) || ( fromx != thrux + xdelta ) ){
// 				ocean_floor_vents[ fromy + array_size*fromx ] += 1;
// 				if( ocean_floor_vents[ fromy + array_size*fromx ] == 2 ){ ++twos }
// 				fromy += ydelta;
// 				fromx += xdelta;
// 			}
// 		}
// 		// Debug output
// //		let str = "";
// //		ocean_floor_vents.forEach(function(val,index,array){
// //			if( (index % ARRAY_SIZE) == 0 ){
// //				console.log(str);
// //				str = index + ": ";
// //			}
// //			if( val == 0 ){ val = "." }
// //			str += val
// //		});
// //		console.log(str);

// 	});

// 	//console.log( ocean_floor_vents );
// 	return twos;
// }

function readFile(filePath){
  $.get( filePath, function( data ) {
	lines = data.trim().split(/\r?\n/);
    $('#input span').text('(' + data.length + ' bytes, ' + lines.length + ' lines)');
  
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
readFile('example_input.txt'); //array_size = EXAMPLE_ARRAY_SIZE;
//readFile('input.txt');