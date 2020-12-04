$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function calculateArea(value, index, array) {
  if( value == null || value == "" || value == undefined ) return;

  let values = value.split(/x/).sort(function(a, b){return a-b});
  let areas = [ values[0] * values[1], values[1] * values[2], values[0] * values[2] ]
  //console.log( values );
  total += (3*areas[0] + 2*areas[1] + 2*areas[2]);
}

var total = 0;

$.get( "input.txt", function( data ) {
  // part 1
  data.split(/\r?\n/).forEach(calculateArea);
  let len = data.length - 1;
  $('#input span').text( "(Bytes:" +  len + ")" );
  $('#answer span').text( total );
  
  //$('#answer2 span').text();
});
