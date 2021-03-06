$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function getMemoryLocations( mask, number ){
//   console.log( "called getMemoryLocations( mask: " + mask + ", number: " + number + " )" );
  number = number.toString(2);
  while( number.length < 36 ){
    number = "0" + number;
  }
//   console.log( "binary address: " + number );
  
  let outputNumbers = [ "" ];
  for( let i = 0; i < mask.length; ++i ){
    if( mask.charAt(i) == 0 ){
      outputNumbers.forEach(function(value, index, array) {
        outputNumbers[index] = value + number.charAt(i);
      });
    } else if( mask.charAt(i) == 1 ){
      outputNumbers.forEach(function(value, index, array) {
        outputNumbers[index] = value + '1';
      });
    } else {
      outputNumbers.forEach(function(value, index, array) {
        outputNumbers.push( value + '0' );
        outputNumbers[index] = value + '1';
      });
    }
  }
//   console.log( "getMemoryLocations temp: " + outputNumbers );
  for( let i = 0; i < outputNumbers.length; ++i ){
    outputNumbers[i] = parseInt(outputNumbers[i], 2)
  }
//   console.log( "getMemoryLocations returned: " + outputNumbers );
  return outputNumbers;
}

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
//   console.log( outputNumber + " : " + number );
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
//       console.log( memory[parseInt( numbers[0] )] );
    }
  });
  
  memory.forEach(function(value, index, array) {
    sum += value;
  });
  $('#answer span').text( sum );
  //$('#bonus span').html(  );
}

function part2( data ){
  let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  let memory = [];
  let sum = 0;
//   let lastVal = 0;
  let indicies = new Set();
  data.forEach(function(value, index, array) {
    let leftRight = value.split(/ = /);
    if( leftRight[0] == "mask" ){
      mask = leftRight[1];
    } else {
      let numbers = value.match(/[0-9]+/g);
      
      getMemoryLocations( mask, parseInt( numbers[0] ) ).forEach(function(value, index, array) {
//         lastVal = value;
        memory[value] = parseInt( numbers[1] );
        indicies.add( value );
//         console.log( "Wrote " + parseInt( numbers[1] ) + " to " + value + " | " + memory[value] );
      });
//       console.log( "memory[LastVal] = memory[" + lastVal + "] = " + memory[lastVal] );
    }
  });
  
//   console.log( "memory[11379077079] = " + memory[11379077079] );
//   console.log( "summing up the memory[" + memory.length + "]..." );
  indicies.forEach(function(value, index, array) {
//     console.log( "Sum: " + sum + " + " + memory[value] + " = " + (sum + memory[value]) );
    sum += memory[value];
  });
  $('#answer2 span').text( sum );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {
//   $('#input span').text('(Bytes: ' + (data.length) + ')');
//   data = "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\nmem[8] = 11\nmem[7] = 101\nmem[8] = 0";
//   data = "mask = 000000000000000000000000000000X1001X\nmem[42] = 100\nmask = 00000000000000000000000000000000X0XX\nmem[26] = 1";
//   data = data + "\n" + data;
//   data = "mask = 00101X10011X0X111110010X010011X10101" + "\n" +
//          "mem[41248] = 4595332" + "\n" +
//          "mem[26450] = 60" + "\n" +
//          "mem[32210] = 982366" + "\n" +
//          "mem[1060] = 234632920" + "\n" +
//          "mem[20694] = 38159" + "\n" +
//          "mem[45046] = 58906955";
  data = data.trim().split(/\r?\n/);
//   data = [
//     "mask = 00101X10011X0X111110010X010011X10101",
//     "mem[41248] = 4595332",
//     "mem[26450] = 60",
//     "mem[32210] = 982366",
//     "mem[1060] = 234632920",
//     "mem[20694] = 38159",
//     "mem[45046] = 58906955"
//   ];
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( data );
  part2( data );
});
