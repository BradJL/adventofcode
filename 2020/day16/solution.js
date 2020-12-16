// const fs = require('fs').promises;

function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
  
  // var canvas = document.getElementById("visualization");
  // var ctx = canvas.getContext("2d");
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
}

function log( what ){
  //console.log( what );
}
  
function part1( data, wire ){
  data = data.trim().split(/\r?\n\r?\n/);
  let validRanges = data[0].match(/[0-9]+-[0-9]+/g);
  let validNumbers = [];//.fill(false, 0, 1000);
  // let numbers = data[2].match(/[0-9]+/g);
  let tickets = data[2].replace(/nearby tickets:\r?\n/,'').split(/\r?\n/);
  console.log( "Total tickets: " + tickets.length );
  let validTickets = [];
  // log( "validRanges: " + validRanges );
  // log( "numbers: " + numbers );

  validRanges.forEach(function(value,index,array){
    let nums = value.split(/-/);
    for( i = parseInt( nums[0] ); i <= parseInt( nums[1] ); ++i ){
      validNumbers[i] = true;
    }
  });
  // console.log( "validNumbers: " + validNumbers );

  // let invalidNumbers = new Set();
  let invalidSum = 0;
  // numbers.forEach(function(value,index,array){
  tickets.forEach(function(value,index,array){
    // console.log( "ticket: " + value );
    let values = value.split(/,/);
    let valid = true;
    values.forEach(function(number,index,array){
      let val = parseInt( number );
      // console.log("val: " + val);
      if( !validNumbers[val] ){
          invalidSum += val;
          valid = false;
          // console.log( val + " is invalid")
        } else {
        // log( val + " is valid")
      }
    });
    if( valid == true ){
      validTickets.push( value );
      // console.log( "Valid ticket: " + value );
    }
    // if( val < 28 || val > 971 ){
    //   invalidSum += val;
    //   console.log( val );
    // }
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
    $('#answer span').text( part1Answer );
    let part2Answer = part2( data );
    $('#answer2 span').text( part2Answer );
  });
}

initialize();
readFile('input.txt');
