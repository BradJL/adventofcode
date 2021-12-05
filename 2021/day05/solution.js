$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

$.get( "input.txt", function( data ) {
//   $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Lines: ' + (data.length) + ')');
//   part1( data );
//   part2( data );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});

// OR this:
function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
  
  // var canvas = document.getElementById("visualization");
  // var ctx = canvas.getContext("2d");
  var canvas2 = document.getElementById("visualization2");
  var ctx2 = canvas2.getContext("2d");  
}

// const fs = require('fs').promises;

function log( what ){
  //console.log( what );
}

const ARRAY_SIZE = 1000;
//const ARRAY_SIZE = 10;

function part1( data ){
	let ocean_floor_vents = new Array(ARRAY_SIZE*ARRAY_SIZE).fill(0);
	let twos = 0;
	//let bingo_cards = {};

	data.trim().split(/\r?\n/).forEach(function(valStr,index,array){
		let vals = new Array();
		valStr.replace(/ -> /, ",").split(/,/).forEach(function(valStr1,index1,array1){
			vals.push( parseInt(valStr1) );
		});

		// vals: [[ x1,y1,x2,y2 ], ...]
		//console.log( vals );
		if( vals[ 0 ] == vals[ 2 ] ){
			// horizontal line
			let from = vals[ 1 ];
			let thru = vals[ 3 ];
			if( from > thru ){
				from = thru;
				thru = vals[ 1 ];
			}
			while( from <= thru ){
				ocean_floor_vents[ vals[0] + ARRAY_SIZE*from ] += 1;
				//console.log( ocean_floor_vents[ vals[0] + ARRAY_SIZE*from ] )
				if( ocean_floor_vents[ vals[0] + ARRAY_SIZE*from ] == 2 ){ ++twos }
				++from;
			}
		} else if( vals[ 1 ] == vals[ 3 ] ){
			// vertical line
			let from = vals[ 0 ];
			let thru = vals[ 2 ];
			if( from > thru ){
				from = thru;
				thru = vals[ 0 ];
			}
			while( from <= thru ){
				ocean_floor_vents[ from + ARRAY_SIZE*vals[1] ] += 1;
				//console.log( ocean_floor_vents[ from + ARRAY_SIZE*vals[0] ] )
				if( ocean_floor_vents[ from + ARRAY_SIZE*vals[1] ] == 2 ){ ++twos }
				++from;
			}
		}
	});

	//console.log( ocean_floor_vents );
	return twos;
}

function part2( data ){
	let ocean_floor_vents = new Array(ARRAY_SIZE*ARRAY_SIZE).fill(0);
	let twos = 0;

	data.trim().split(/\r?\n/).forEach(function(valStr,index,array){
		let vals = new Array();
		valStr.replace(/ -> /, ",").split(/,/).forEach(function(valStr1,index1,array1){
			vals.push( parseInt(valStr1) );
		});

		// vals: [[ x1,y1,x2,y2 ], ...]
		//console.log( vals );
//		if( vals[ 0 ] == vals[ 2 ] ){
//			// horizontal line
//			let from = vals[ 1 ];
//			let thru = vals[ 3 ];
//			if( from > thru ){
//				from = thru;
//				thru = vals[ 1 ];
//			}
//			while( from <= thru ){
//				ocean_floor_vents[ vals[0] + ARRAY_SIZE*from ] += 1;
//				//console.log( ocean_floor_vents[ vals[0] + ARRAY_SIZE*from ] )
//				if( ocean_floor_vents[ vals[0] + ARRAY_SIZE*from ] == 2 ){ ++twos }
//				++from;
//			}
//		} else if( vals[ 1 ] == vals[ 3 ] ){
//			// vertical line
//			let from = vals[ 0 ];
//			let thru = vals[ 2 ];
//			if( from > thru ){
//				from = thru;
//				thru = vals[ 0 ];
//			}
//			while( from <= thru ){
//				ocean_floor_vents[ from + ARRAY_SIZE*vals[1] ] += 1;
//				//console.log( ocean_floor_vents[ from + ARRAY_SIZE*vals[0] ] )
//				if( ocean_floor_vents[ from + ARRAY_SIZE*vals[1] ] == 2 ){ ++twos }
//				++from;
//			}
//		} else {
			// diagonal line
			let fromy = vals[ 0 ];
			let thruy = vals[ 2 ];
			let fromx = vals[ 1 ];
			let thrux = vals[ 3 ];
//			if( fromy > thruy ){
//				fromy = thruy;
//				thruy = vals[ 0 ];
//				fromx = vals[ 3 ];
//				thrux = vals[ 1 ];
//			}

ctx2.strokeStyle = "#FF0000";
ctx2.beginPath();
ctx2.moveTo(fromx, fromy);
ctx2.lineTo(thrux, thruy);
ctx2.stroke();

			let ydelta = 1;
			if( fromy > thruy){
				ydelta = -1;
			} else if( fromy == thruy ){
				ydelta = 0;
			}

			let xdelta = 1;
			if( fromx > thrux ){
				xdelta = -1;
			} else if( fromx == thrux ){
				xdelta = 0;
			}

			while( ( fromy != thruy + ydelta ) || ( fromx != thrux + xdelta ) ){
				ocean_floor_vents[ fromy + ARRAY_SIZE*fromx ] += 1;
				if( ocean_floor_vents[ fromy + ARRAY_SIZE*fromx ] == 2 ){ ++twos }
				fromy += ydelta;
				fromx += xdelta;
			}
//		}

		// Debug output
//		let str = "";
//		ocean_floor_vents.forEach(function(val,index,array){
//			if( (index % ARRAY_SIZE) == 0 ){
//				console.log(str);
//				str = index + ": ";
//			}
//			if( val == 0 ){ val = "." }
//			str += val
//		});
//		console.log(str);

	});

	//console.log( ocean_floor_vents );
	return twos;
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
//readFile('example_input.txt');
readFile('input.txt');
