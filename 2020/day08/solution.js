$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function process(data, changeNum) {
  let acc = 0;
  let line = 0;
  let visitedLines = new Set();
  let increment = 0;
  let jmpsAndNops = 0;
  while( !visitedLines.has( line ) && line < data.length ){
    visitedLines.add( line );
    let command = data[line].replace(/ .*$/,'');
    if( changeNum == jmpsAndNops + 1 && (command == "jmp" || command == "nop" ) ){
      if( command == "jmp" ){
        command = "nop";
      } else {
        command = "jmp";
      }
    }
    switch( command ){
    case "acc":
      acc += parseInt(data[line].replace(/[a-z +]/g,''));
      increment = 1;
      break;
    case "nop":
      ++jmpsAndNops;
      increment = 1;
      break;
    case "jmp":
      ++jmpsAndNops;
      increment = parseInt(data[line].replace(/[a-z +]/g,''));
      break;
    }
    line += increment;
  }
  return [ line, acc ];
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  let part1Data = process( data, 0 );
  $('#answer span').text( part1Data[1] );
  
  let i = 1;
  let part2Data;
  do {
    console.log("Trying: " + i);
    part2Data = process( data, i );
    if( part2Data[0] >= data.length ){ console.log("Terminated Normally! " + part2Data[0]); }
    ++i;
  } while( part2Data[0] < data.length );
  $('#answer2 span').text( part2Data[1] );
});
