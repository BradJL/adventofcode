$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function part1( data ){
  let timestamp = parseInt( data[0] );
  let ids = [];
  data[1].trim().split(/,/).forEach(function(number, index, array) {
    ids.push(parseInt(number))
  });
  
  let bonus = "";
  ids.forEach(function(number, index, array) {
    bonus += number + ": " + (timestamp % number) + "<br />";
  });
  $('#answer span').text( timestamp );
  $('#bonus span').html( bonus );
}
function part2( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
}
;
$.get( "input.txt", function( data ) {
//   $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( data );
//   part2( data );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});
