// const fs = require('fs').promises;

function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
}

function part1( data, wire ){
  data = data.trim().split(/\r?\n\r?\n/);
  let validRanges = data[0].match(/[0-9]+-[0-9]+/g);
  let validNumbers = [];
  let tickets = data[2].replace(/nearby tickets:\r?\n/,'').split(/\r?\n/);
  console.log( "Total tickets: " + tickets.length );
  let validTickets = [];
  
  validRanges.forEach(function(value,index,array){
    let nums = value.split(/-/);
    for( i = parseInt( nums[0] ); i <= parseInt( nums[1] ); ++i ){
      validNumbers[i] = true;
    }
  });

  let invalidSum = 0;
  tickets.forEach(function(value,index,array){
    let values = value.split(/,/);
    let valid = true;
    values.forEach(function(number,index,array){
      let val = parseInt( number );
      if( !validNumbers[val] ){
          invalidSum += val;
          valid = false;
        } else {
      }
    });
    if( valid == true ){
      validTickets.push( value );
    }
  });
  console.log( "Valid tickets: " + validTickets.length );
  return [invalidSum, validTickets]; // sum of invalid, array of valid tix, your ticket string
}

function part2( data, validTickets ){
  console.log( "validTickets: " );
  validTickets.forEach(function(ticket,index,array){
    console.log(ticket);
  })
  return 2843534243843;
}

// async function readFile(filePath){
//   try {
//     const constData = await fs.readFile(filePath);
//     let part1Answer = part1( constData.toString() );
//     console.log( "Part 1 answer: " + part1Answer[0] );

//     let part2Answer = part2( constData.toString(), part1Answer[1] );
//     console.log( "Part 2 answer: " + part2Answer );
//   } catch (error) {
//     console.error(`Got an error trying to read the file: ${error.message}`);
//   }
// }

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( data );
    $('#answer span').text( part1Answer[0] );
    let part2Answer = part2( data, part1Answer[1] );
    $('#answer2 span').text( part2Answer );
  });
}

initialize();
readFile('input.txt');
