$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function calculateArea(value, index, array) {
  if( value == null || value == "" || value == undefined ) return;

  let values = value.split(/x/);
  total += 3*values[0] + 2*values[1] + 2*values[2];
}

var total = 0;

$.get( "input.txt", function( data ) {
  // part 1
  data.sort(function(a, b){return a-b}).split(/\r?\n/).forEach(calculateArea);
  let len = data.length - 1;
  $('#input span').text( "(Bytes:" +  len + ")" );
  $('#answer span').text( total );
  
  $('#answer2 span').text(i+1);
});
