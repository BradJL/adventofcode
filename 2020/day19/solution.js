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

function getRule( rules, number ){
  let rule = rules[number].replace(/^[0-9]+: /,'');
  if( rule.charAt(0) == '"' ){
    rule = rule.replace(/"/g,'');
  } else {
    rule = "( " + rule + " )";
  }
  return rule;
}
  
function part1( data ){
  data = data.trim().split(/\r?\n\r?\n/);
  let rules = data[0].split(/\r?\n/).sort(function(a, b){return parseInt(a.match(/^[0-9]+/)[0])-parseInt(b.match(/^[0-9]+/)[0])});
  
  let iterations = 1000;
  let rule = getRule( rules, 0 );
  let numberStr = rule.match(/[0-9]+/);
  while( numberStr && iterations--){
    numberStr = rule.match(/[0-9]+/)[0];
    rule = rule.replace( numberStr, getRule(rules, parseInt(numberStr)) );
    numberStr = rule.match(/[0-9]+/);
  }
  rule = "^" + rule.replace(/ /g,'') + "$";
  let regEx = new RegExp( rule, '' );
  
  let validMessages = 0;
  data[1].split(/\r?\n/).forEach(function(message,index,array){
    if( message.match( regEx ) ){
      ++validMessages;
      console.log( "Valid:" + message );
    } else {
      console.log( "Invalid:" + message );
    }
  });
  console.log( "rule: " + rule );
  
//   console.log( getRule( rules, 0 ) );
//   console.log( getRule( rules, 8 ) );
//   console.log( getRule( rules, 11 ) );
//   console.log( getRule( rules, 36 ) );
//   console.log( getRule( rules, 24 ) );
  return validMessages;
}

function part2( data ){
  data = data.trim().split(/\r?\n\r?\n/);
  let rules = data[0].split(/\r?\n/).sort(function(a, b){return parseInt(a.match(/^[0-9]+/)[0])-parseInt(b.match(/^[0-9]+/)[0])});
  
  let iterations = 1000;
  let rule = getRule( rules, 0 );
  let numberStr = rule.match(/[0-9]+/);
  while( numberStr && iterations--){
    numberStr = rule.match(/[0-9]+/)[0];
    rule = rule.replace( numberStr, getRule(rules, parseInt(numberStr)) );
    numberStr = rule.match(/[0-9]+/);
  }
  rule = "^" + rule.replace(/ /g,'') + "$";
  let regEx = new RegExp( rule, '' );
  
  let validMessages = 0;
  data[1].split(/\r?\n/).forEach(function(message,index,array){
    if( message.match( regEx ) ){
      ++validMessages;
      console.log( "Valid:" + message );
    } else {
      console.log( "Invalid:" + message );
    }
  });
  console.log( "rule: " + rule );
  
//   console.log( getRule( rules, 0 ) );
//   console.log( getRule( rules, 8 ) );
//   console.log( getRule( rules, 11 ) );
//   console.log( getRule( rules, 36 ) );
//   console.log( getRule( rules, 24 ) );
  return validMessages;
  data = data.trim().split(/\r?\n/);
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
readFile('input1.txt');
