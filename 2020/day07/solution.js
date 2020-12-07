$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function doItNTimes(value, index, array) {

}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  //data.trim().split(/\r?\n/).forEach(doItNTimes);
  let bags = data.match( /contain.*shiny gold bag/g );
  
  $('#answer span').text( bags.length );
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
});
