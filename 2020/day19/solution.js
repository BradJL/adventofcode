function initialize(){
  $('#answer1 span').text('Calculating...');
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

function getRule( rules, number, part ){
  if( part == 2 ){
    if( number == 8 ) return "( 42+ )";
  //   if( number == 11 ) return "( 42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 | 42 42 42 42 42 31 31 31 31 31 | 42 42 42 42 42 42 31 31 31 31 31 31 | 42 42 42 42 42 42 42 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 | 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 )";
    if( number == 11 ) return "( 42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 )";
  }

  let rule = rules[number].replace(/^[0-9]+: /,'');
  if( rule.charAt(0) == '"' ){
    rule = rule.replace(/"/g,'');
  } else {
    rule = "( " + rule + " )";
  }
  return rule;
}
  
// function part1( data ){
//   data = data.trim().split(/\r?\n\r?\n/);
//   let rules = data[0].split(/\r?\n/).sort(function(a, b){return parseInt(a.match(/^[0-9]+/)[0])-parseInt(b.match(/^[0-9]+/)[0])});
  
//   let iterations = 1000;
//   let rule = getRule( rules, 0 );
//   let numberStr = rule.match(/[0-9]+/);
//   while( numberStr && iterations--){
//     numberStr = rule.match(/[0-9]+/)[0];
//     rule = rule.replace( numberStr, getRule(rules, parseInt(numberStr)) );
//     numberStr = rule.match(/[0-9]+/);
//   }
//   rule = "^" + rule.replace(/ /g,'') + "$";
//   let regEx = new RegExp( rule, '' );
  
//   let validMessages = 0;
//   data[1].split(/\r?\n/).forEach(function(message,index,array){
//     if( message.match( regEx ) ){
//       ++validMessages;
//       console.log( "Valid:" + message );
//     } else {
//       console.log( "Invalid:" + message );
//     }
//   });
//   console.log( "rule: " + rule );
  
// //   console.log( getRule( rules, 0 ) );
// //   console.log( getRule( rules, 8 ) );
// //   console.log( getRule( rules, 11 ) );
// //   console.log( getRule( rules, 36 ) );
// //   console.log( getRule( rules, 24 ) );
//   return validMessages;
// }

function part1( data, part ){
  data = data.trim().split(/\r?\n\r?\n/);
  let rules = data[0].split(/\r?\n/).sort(function(a, b){return parseInt(a.match(/^[0-9]+/)[0])-parseInt(b.match(/^[0-9]+/)[0])});
  
  //let iterations = 1000;
  let rule = getRule( rules, 0, part );
  let numberStr = rule.match(/[0-9]+/);
  while( numberStr ){// && iterations--){
    numberStr = rule.match(/[0-9]+/)[0];
//     let pattern = new RegExp(numberStr, "g");
//     rule = rule.replace( pattern, getRule(rules, parseInt(numberStr)) );
    rule = rule.replace( numberStr, getRule(rules, parseInt(numberStr), part) );
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
//   console.log( "babbbbabaabbbababbbbaabaabaabbaaaaabaabaaaaababbbabaaabaababbaaabaaabbaaaabbbbaaaaabbbabbbaaaaba".length + ": babbbbabaabbbababbbbaabaabaabbaaaaabaabaaaaababbbabaaabaababbaaabaaabbaaaabbbbaaaaabbbabbbaaaaba" );
//   let string = "("
//   for( let i = 1; i < 31 ; ++i ){
//     string += " 42".repeat(i) + " 31".repeat(i) + " |"
//   }
//   string += ")";
//   console.log( string );
  return validMessages;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = part1( data, 1 );
    let part2Answer = part1( data, 2 );
    $('#answer1 span').text( part1Answer );
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
