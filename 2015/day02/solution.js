$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var totalArea = 0;
var linearFeet = 0;

function calculateArea(value, index, array) {
  if( value == null || value == "" || value == undefined ) return;

  // part 1
  let values = value.split(/x/).sort(function(a, b){return a-b});
  let areas = [ values[0] * values[1], values[1] * values[2], values[0] * values[2] ]
  //console.log( values );
  totalArea += (3*areas[0] + 2*areas[1] + 2*areas[2]);
  
  //part 2
  let volume = values[0] * values[1] * values[2];
  let perimeter = 2* values[0] + 2 * values[1];
  
  linearFeet += (perimeter + volume);
}

$.get( "input.txt", function( data ) {
  data.split(/\r?\n/).forEach(calculateArea);
  let len = data.length - 1;
  $('#input span').text( "(Bytes:" +  len + ")" );
  $('#answer span').text( totalArea );
  
  $('#answer2 span').text( linearFeet );
});
