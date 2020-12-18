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
  console.log( what );
}

function incrementChar( char ){
  char = String.fromCharCode(char.charCodeAt(0) + 1);
  if( char == "{" ){
    char = "a";
  }
  return char;
}

function incrementString( string ){
  let char = string.charAt(string.length - 1);
  log( "grabbed " + char );
  char = incrementChar( char );
  log( "incremented to " + char );
  string = string.substring(0, string.length - 1)
  if( char == 'a' ){
    string = incrementString( string );
  }
  return string + char;
}

function checkPassword( password ){
  if( password.replace(/[iol]/g,'').length != password.length ){
    console.log( "invalid: has [iol]" );
    return false;
  }
  if( !password.match(/(.)\1.*(.)\2/) ){
    console.log( "invalid: needs 2 matches" );
    return false;
  }
  if( !password.match(/(abc|bcd|cde|def|efg|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/) ){
    console.log( "invalid: needs straight of 3" );
    return false;
  }
  console.log( password + " is valid!" );
  return true;
}
  
function part1( data ){
  data = data.trim();
//   data += "zz";
  checkPassword( "hijklmmn" );
  checkPassword( "abbceffg" );
  checkPassword( "abbcegjk" );
  checkPassword( "abcdffaa" );
  checkPassword( "ghjaabcc" );
  return data + " --> " + incrementString( data );
}

function part2( data ){
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
readFile('input.txt');
