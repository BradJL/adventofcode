$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var filteredArray = array1.filter(function(n) {
    return array2.indexOf(n) !== -1;
}); // Thanks, internet!

var sum = 0;
var sum2 = 0;

function doItNTimes(value, index, array) {
  let yesses = new Set( value.trim().replace(/[\r\n\t ]/g,"").split('') );
  sum += yesses.size;
  
  let individuals = value.trim().split('\n');
  let groupYesses = individuals[0].split;
  for( let i = 1; i < individuals.length; ++i ){
    groupYesses =  groupYesses.filter(value => individuals[i].includes(value));
  }
  sum2 = groupYesses.length;
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\n\n/).forEach(doItNTimes);
  $('#answer span').text( sum );
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
});
