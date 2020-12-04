$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function callback(value, index, array) {
  if( value == null || value == "" || value == undefined ) return;

  // part 1
  
  //part 2
}

$.get( "input.txt", function( data ) {
  data.split(/\r?\n/).forEach(callback);
  $('#input span').text( "(Bytes:" +  len + ")" );
  $('#answer span').text( totalArea );
  
  $('#answer2 span').text( linearFeet );
});
