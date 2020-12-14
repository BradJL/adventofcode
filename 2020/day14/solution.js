$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function applyMask( mask, number ){
  number = number.toString(2);
  while( number.length < 36 ){
    number = "0" + number;
  }
  outputNumber = "";
  for( let i = 0; i < mask.length; ++i ){
    if( mask.charAt(i) == 0 ){
//       console.log( "found a 0" );
      outputNumber += '0'
    } else if( mask.charAt(i) == 1 ){
//       console.log( "found a 1" );
      outputNumber += '1';
    } else {
//       console.log( "found an X" );
      outputNumber += number.charAt(i);
    }
  }
  console.log( outputNumber + " : " + number );
  return( parseInt(outputNumber, 2) );
}

function part1( data ){
  let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  let memory = [];
  let sum = 0;
  data.forEach(function(value, index, array) {
    let leftRight = value.split(/ = /);
    if( leftRight[0] == "mask" ){
      mask = leftRight[1];
    } else {
      let numbers = value.match(/[0-9]+/g);
      memory[parseInt( numbers[0] )] = applyMask( mask, parseInt( numbers[1] ) );
      console.log( memory[parseInt( numbers[0] )] );
    }
  });
  
  memory.forEach(function(value, index, array) {
    sum += value;
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
  data = "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\nmem[8] = 11\nmem[7] = 101\nmem[8] = 0";
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( data );
//   part2( data );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});
