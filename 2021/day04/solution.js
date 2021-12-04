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
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
}

// const fs = require('fs').promises;

function log( what ){
  //console.log( what );
}

class BingoCard {
	constructor() {
	  this.numbers = {};
	}
	add_numbers( nums ){
		nums.split(/ /).forEach(function(valStr,index,array){
			numbers.push( valStr );
		});
	}
	print(){
		console.log(this.numbers);
	}
}

function part1( data ){
	let bingo_number_positions = new Array(100).fill(0);
	let bingo_cards = {};

	data = data.trim().split(/\r?\n/);
	let bingo_numbers = data.shift().split(/,/)
	bingo_numbers.forEach(function(valStr,index,array){
		bingo_number_positions[valStr] = index;
	});

	row = 0;
	let bingo_card = null;
	data.forEach(function(valStr,index,array){
		if( valStr == "" ){
			if( bingo_card ){
				bingo_cards.push( bingo_card );
			}
			bingo_card = new BingoCard();
		} else {
			//valStr.split(/ /).forEach(function(cardSquareVal,column,carray){
			//});
			bingo_card.add_numbers( valStr );
			++row;
		}
	});

	//return bingo_numbers;
	//return bingo_number_positions;
	return bingo_cards;
}

function part2( data ){
	data = data.trim().split(/\r?\n/);
	numbers = data.shift();

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
