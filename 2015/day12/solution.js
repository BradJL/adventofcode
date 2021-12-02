$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function part1( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer span').text(  );
  //$('#bonus span').html(  );
}
function part2( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
}

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
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
}

// const fs = require('fs').promises;

function log( what ){
  //console.log( what );
}
  
function part1( data ){
	let tmp = 0;
	let sum = 0;
	const regex = /[^0-9,-]/g;
	//console.log(data.replace(regex, ''));

	data = data.replace(regex, '').trim().split(/,/).forEach(function(valStr,index,array){
		temp = parseInt(valStr);
		if( temp ){
			sum += temp;
		}
		//console.log( sum );
	});

	return sum;
}

function part2( data ){
	const regex = /{[^{}]*":"red"[^{}]*}/g;
	const regex2 = /{[^{}]*":"red"[^{}]*{[^{}]*}[^{}]*}/g;
	const regex3 = /{[^{}]*{[^{}]*}[^{}]*":"red"[^{}]*}/g;
	const regex4 = /{[^{}]*{[^{}]*}[^{}]*{[^{}]*{[^{}]*}[^{}]*}[^{}]*":"red"[^{}]*{[^{}]*}[^{}]*}/g;

	data = data.replace(regex, '')
	data = data.replace(regex2, '')
	data = data.replace(regex3, '')
	data = data.replace(regex4, '')

	data = data.replace(regex, '')
	data = data.replace(regex2, '')
	data = data.replace(regex3, '')
	data = data.replace(regex4, '')

	data = data.replace(regex, '')
	data = data.replace(regex2, '')
	data = data.replace(regex3, '')
	data = data.replace(regex4, '')

	console.log( data );
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
