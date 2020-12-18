function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
}

// const fs = require('fs').promises;

function evaluate( line, part ){
  let parenLine = line.match(/\([^()]+\)/)[0];
  while( parenLine.length != line.length ){//&& iterations--){
    line = line.replace( parenLine, evaluate( parenLine, part ) );
    parenLine = line.match(/\([^()]+\)/)[0];
  }
  line = line.replace(/^\(/,'').replace(/\)$/,'');
  let plusOrMult;
  if( part == 1 ){
    plusOrMult = line.match(/[0-9]+ [+\*] [0-9]+/);
    while( plusOrMult ){//&& iterations--){
      plusOrMult = plusOrMult[0];
      let lOpR = plusOrMult.split(/ /g);
      switch( lOpR[1] ){
      case '+':
        line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) + parseInt(lOpR[2])) );
        break;
      case '*':
        line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) * parseInt(lOpR[2])) );
        break;
      default:
        console.log( "Uh-oh, default hit: " + lOpR );
        break;
      }
      plusOrMult = line.match(/[0-9]+ [+\*] [0-9]+/);
    }
  } else if( part == 2 ){
    plusOrMult = line.match(/[0-9]+ [\+] [0-9]+/);
    while( plusOrMult ){//&& iterations--){
      plusOrMult = plusOrMult[0];
      let lOpR = plusOrMult.split(/ /g);
      line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) + parseInt(lOpR[2])) );
      plusOrMult = line.match(/[0-9]+ [\+] [0-9]+/);
    }
    plusOrMult = line.match(/[0-9]+ [\*] [0-9]+/);
    while( plusOrMult ){//&& iterations--){
      plusOrMult = plusOrMult[0];
      let lOpR = plusOrMult.split(/ /g);
      line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) * parseInt(lOpR[2])) );
      plusOrMult = line.match(/[0-9]+ [\*] [0-9]+/);
    }
  }
  return parseInt( line );
}
  
function evaluate2( line ){
  let parenLine = line.match(/\([^()]+\)/)[0];
  while( parenLine.length != line.length ){//&& iterations--){
    line = line.replace( parenLine, evaluate2( parenLine ) );
    parenLine = line.match(/\([^()]+\)/)[0];
  }
  line = line.replace(/^\(/,'').replace(/\)$/,'');
  let plusOrMult = line.match(/[0-9]+ [\+] [0-9]+/);
  while( plusOrMult ){//&& iterations--){
    plusOrMult = plusOrMult[0];
    let lOpR = plusOrMult.split(/ /g);
    line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) + parseInt(lOpR[2])) );
    plusOrMult = line.match(/[0-9]+ [\+] [0-9]+/);
  }
  plusOrMult = line.match(/[0-9]+ [\*] [0-9]+/);
  while( plusOrMult ){//&& iterations--){
    plusOrMult = plusOrMult[0];
    let lOpR = plusOrMult.split(/ /g);
    line = line.replace( plusOrMult, ""+(parseInt(lOpR[0]) * parseInt(lOpR[2])) );
    plusOrMult = line.match(/[0-9]+ [\*] [0-9]+/);
  }
  return parseInt( line );
}

function part1( data ){
  data = data.trim().split(/\r?\n/);
  let sum = 0;
  data.forEach(function(line,index,array){
    line = "(" + line + ")";
    sum += evaluate( line, 1 );
  });
  
  return sum;
}

function part2( data ){
  data = data.trim().split(/\r?\n/);
  let sum = 0;
  data.forEach(function(line,index,array){
    line = "(" + line + ")";
    sum += evaluate( line, 2 );
  });
  
  return sum;
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
