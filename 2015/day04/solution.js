$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function doItNTimes(value, index, array) {
}

$.get( "input.txt", function( data ) {
  data.trim().split('').forEach(doItNTimes);
  $('#input span').text( "(Bytes:" +  data.length + ")" );
  //$('#answer span').text(  );  
  //$('#answer2 span').text(  );
});
