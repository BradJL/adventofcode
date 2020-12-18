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

function evaluate( line ){
  console.log( "Eval " + line );
  let parenLine = line.match(/\([^()]+\)/)[0];
  //let iterations = 2;
  while( parenLine.length != line.length ){//&& iterations--){
    console.log( "Extraced " + parenLine );
    line = line.replace( parenLine, evaluate( parenLine ) );
    console.log( "Updated line to " + line );
    parenLine = line.match(/\([^()]+\)/)[0];
  }
  console.log( "Line now is just one parenthetical: " + line );
  line = line.replace(/^\(/,'').replace(/\)$/,'');
  console.log( "Removed outside parens " + line );
  let plusOrMult = line.match(/[0-9]+ [+\*] [0-9]+/);
  //iterations = 2;
  while( plusOrMult ){//&& iterations--){
    plusOrMult = plusOrMult[0];
    console.log( "Grabbed " + plusOrMult );
    let lOpR = plusOrMult.split(/ /g);
    switch( lOpR[1] ){
    case '+':
      line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) + parseInt(lOpR[2])) );
      console.log( "Updated for Addition " + line );
      break;
    case '*':
      line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) * parseInt(lOpR[2])) );
      console.log( "Updated for Multiplication " + line );
      break;
    default:
      console.log( "Uh-oh, default hit: " + lOpR );
      break;
    }
    plusOrMult = line.match(/[0-9]+ [+\*] [0-9]+/);
  }
  console.log( "End of line: " + line );
  //line.split(' ').forEach(function(char,index,array)
  return parseInt( line );
}
  
function evaluate2( line ){
  console.log( "Eval " + line );
  let parenLine = line.match(/\([^()]+\)/)[0];
  //let iterations = 2;
  while( parenLine.length != line.length ){//&& iterations--){
    console.log( "Extraced " + parenLine );
    line = line.replace( parenLine, evaluate( parenLine ) );
    console.log( "Updated line to " + line );
    parenLine = line.match(/\([^()]+\)/)[0];
  }
  console.log( "Line now is just one parenthetical: " + line );
  line = line.replace(/^\(/,'').replace(/\)$/,'');
  console.log( "Removed outside parens " + line );
//   let plusOrMult = line.match(/[0-9]+ [+\*] [0-9]+/);
  let plusOrMult = line.match(/[0-9]+ [\+] [0-9]+/);
  //iterations = 2;
  while( plusOrMult ){//&& iterations--){
    plusOrMult = plusOrMult[0];
    console.log( "Grabbed " + plusOrMult );
    let lOpR = plusOrMult.split(/ /g);
    line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) + parseInt(lOpR[2])) );
//       line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) * parseInt(lOpR[2])) );
    plusOrMult = line.match(/[0-9]+ [\+] [0-9]+/);
  }
  plusOrMult = line.match(/[0-9]+ [\*] [0-9]+/);
  //iterations = 2;
  while( plusOrMult ){//&& iterations--){
    plusOrMult = plusOrMult[0];
    console.log( "Grabbed " + plusOrMult );
    let lOpR = plusOrMult.split(/ /g);
    line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) * parseInt(lOpR[2])) );
    plusOrMult = line.match(/[0-9]+ [\*] [0-9]+/);
  }
  console.log( "End of line: " + line );
  //line.split(' ').forEach(function(char,index,array)
  return parseInt( line );
}

function part1( data ){
  data = data.trim().split(/\r?\n/);
  let sum = 0;
  data.forEach(function(line,index,array){
    line = "(" + line + ")";
    console.log( "Changed to " + line );
    sum += evaluate( line );
    console.log( "SUM is now " + sum )
  });
  
  return sum;
}

function part2( data ){
  data = data.trim().split(/\r?\n/);
  let sum = 0;
  data.forEach(function(line,index,array){
    line = "(" + line + ")";
    console.log( "Changed to " + line );
    sum += evaluate2( line );
    console.log( "SUM is now " + sum )
  });
  
  return sum;
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    data = "";
//     data += "1 + (2 * 3) + (4 * (5 + 6))"; // 51
//     data += '\n';
//     data += "2 * 3 + (4 * 5)"; // 46
//     data += '\n';
    data += "5 + (8 * 3 + 9 + 3 * 4 * 3)"; // 1445
    $('#input span').text('(Bytes: ' + (data.length) + ')');
//     let part1Answer = part1( data );
//     $('#answer span').text( part1Answer );
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
