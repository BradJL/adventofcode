$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function intersect(a, b) {
  var setB = new Set(b);
  return [...new Set(a)].filter(x => setB.has(x));
} // Thanks, internet

var sum = 0;
var sum2 = 0;
var debug = "";

function doItNTimes(value, index, array) {
  let tmpstring = value.trim().replace(/[\r\n\t ]/g,"");
  let yesses = /*new Set(*/ tmpstring.split('') //);
  sum += (new Set( yesses )).size;
  
  let individuals = value.trim().split('\n');
//   let allYesses = new Set( value.trim().replace(/[\r\n\t ]/g,"").split('') );
  yesses.sort();
  let i = 0;
  let tmpsum = 0
  while( i < (yesses.length - individuals.length) ){
    if( yesses[ i+individuals.length ] = yesses[i] ){
      i += individuals.length;
      ++tmpsum;
    } else{ 
      ++i;
    }
  }
  debug += (tmpsum + ": " + tmpstring + "<br />" )
  sum2 += tmpsum;
  
  
//   if( individuals.length == 1 ){ sum2 += individuals[0].length; return; }
  
//   let groupYesses = individuals[0].split;
//   for( let i = 1; i < individuals.length; ++i ){
//     groupYesses = _.intersection( groupYesses, individuals[i] );
//   }
//   //let groupYesses = _.intersection( individuals );
//   sum2 += groupYesses.length;
  
  
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\n\n/).forEach(doItNTimes);
  $('#answer span').text( sum );
  $('#answer2 span').text( sum2 );
  $('#bonus span').html( debug );
});
