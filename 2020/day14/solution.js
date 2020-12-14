$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function applyMask( mask, number ){
  number = number.toString(2);
  for( let i = 0; i < mask.length; ++i ){
    if( mask[i] == 0 ){
      number = number.substring(0, i); + '0' + number.substring(i);
    } else if( mask[i] == 1 ){
      number = number.substring(0, i); + '1' + number.substring(i);
    }
  }
  return( parseInt(number, 2) );
}

function part1( data ){
  let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  let memory = [];
  data.forEach(function(value, index, array) {
    let leftRight = value.split(/ = /);
    if( leftRight[0] == "mask" ){
      mask = leftRight[1];
    } else {
      let numbers = value.match(/[0-9]+/g);
      memory[parseInt( numbers[0] )] = applyMask( mask, parseInt( numbers[1] ) );
      console.log( memory[parseInt( numbers[0] )];
    }
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
  data = "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\nmem[8] = 11\nmem[7] = 101\nmem[8] = 0";
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( data );
  part2( data );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});
