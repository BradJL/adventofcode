$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1(data) {
  let acc = 0;
  let line = 0;
  let visitedLines = new Set();
  let increment = 0;
  
  while( !visitedLines.has( line ) ){
    console.log(line);
    visitedLines.add( line );
    switch( data[line].replace(/ .*$/,'') ){
    case "acc":
      acc += parseInt(data[line].replace(/[a-z +]/g,''));
    case "nop":
      increment = 1;
      break;
    case "jmp":
      increment = parseInt(data[line].replace(/[a-z +]/g,''));
      break;
    }
    line += increment;
    console.log( "Next line: " + line + ", Increment was: " + increment );
  }
  $('#answer span').text( acc );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\r?\n/);//.forEach(doItNTimes);
  part1( data );
  //$('#answer span').text(  );
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
});
