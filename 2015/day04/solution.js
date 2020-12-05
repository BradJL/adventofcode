$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

$.get( "input.txt", function( data ) {
  data.trim();
  $('#input span').text( "(Bytes:" +  data.length + ")" );
  //$('#answer span').text(  );  
  //$('#answer2 span').text(  );
});
