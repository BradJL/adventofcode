$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1( data ){
  let codeChars = data.replace(/\r?\n/g,'').length;
  let stringChars = data.trim().replace(/\\["\\]/g,'_').replace(/\\x[0-9a-fA-F][0-9a-fA-F]/g,'_').replace(/"\r?\n"/g,'').replace(/^"/,'').replace(/"$/,'');
  $('#answer span').text( codeChars + " - " + stringChars.length + " = " + (codeChars - stringChars.length) );
}
function part2( data ){
  let codeChars = data.replace(/\r?\n/g,'').length;
  data = data.trim().split(/\r?\n/);
  let stringChars = 0;
  data.forEach(function(line, index, array) {
    let chars = line.replace(/\\/g,"\\").replace(/"/g,'\"');
    console.log( (chars.length + 2) + ": " + chars );
    stringChars += (chars.length + 2);
  });
  $('#answer2 span').text( stringChars + " - " + codeChars + " = " + (stringChars - codeChars) );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  part1( data );
  part2( data );
});
