function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
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
  char = incrementChar( char );
  string = string.substring(0, string.length - 1)
  if( char == 'a' ){
    string = incrementString( string );
  }
  return string + char;
}

function checkPassword( password ){
  if( password.replace(/[iol]/g,'').length != password.length ){
    return false;
  }
  if( !password.match(/(.)\1.*(.)\2/) ){
    return false;
  }
  if( !password.match(/(abc|bcd|cde|def|efg|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/) ){
    return false;
  }
  console.log( password + " is valid!" );
  return true;
}
  
function findNextValidPassword( data ){
  data = data.trim();
  data = incrementString( data );
  while( !checkPassword( data ) ){
    data = incrementString( data );
  }
  return data;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
    let part1Answer = findNextValidPassword( data );
    $('#answer span').text( part1Answer );
    let part2Answer = findNextValidPassword( part1Answer );
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
