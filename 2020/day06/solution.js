$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function intersect(a, b) {
  var setB = new Set(b);
  return [...new Set(a)].filter(x => setB.has(x));
} // Thanks, internet

var sum = 0;
var sum2 = 0;

function doItNTimes(value, index, array) {
  let yesses = new Set( value.trim().replace(/[\r\n\t ]/g,"").split('') );
  sum += yesses.size;
  
  let individuals = value.trim().split('\n');
//   let groupYesses = individuals[0].split;
//   for( let i = 1; i < individuals.length; ++i ){
//     groupYesses = intersect( groupYesses, individuals[i] );
//   }
  let groupYesses = _.intersection( individuals );
  sum2 += groupYesses.length;
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\n\n/).forEach(doItNTimes);
  $('#answer span').text( sum );
  $('#answer2 span').text( sum2 );
  //$('#bonus span').html(  );
});
