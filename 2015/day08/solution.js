$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function part1( data ){
  let codeChars = data.replace(/\r?\n/g,'').length;
  let stringChars = data.trim().replace(/\\["\\]/g,'_').replace(/\\x[0-9a-fA-F][0-9a-fA-F]/g,'_').replace(/"\r?\n"/g,'').replace(/^"/,'').replace(/"$/,'');
  $('#answer span').text( codeChars + " - " + stringChars.length + " = " + (codeChars - stringChars.length) );
  $('#bonus span').text( stringChars );
}
function part2( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
//   data = data.trim().split(/\r?\n/);
  part1( data );
//   part2( data );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});
