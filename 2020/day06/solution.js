$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var sum = 0;
var sum2 = 0;
var debug = "";

function doItNTimes(value, index, array) {
  let yesses = value.trim().replace(/[\r\n\t ]/g,"").split(''); yesses.sort();
  let yessesString = yesses.join().replace(/,/g,'');
  let yessesSet = new Set( yesses );
  
  // part 1
  sum += yessesSet.size;
  
  let individuals = value.trim().split('\n');
  let union = individuals
  let tmpsum = 0;
  
  // part 2
  yessesSet.forEach(yes => {
    if( yessesString.match(new RegExp(yes, "g")).length == individuals.length ){
      ++tmpsum;
    }
  });

  //debug += (tmpsum + "(" + individuals.length + ")" + ": " + yesses.join().replace(/,/g,"") + "<br />" )
  sum2 += tmpsum;
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.trim().split(/\n\n/).forEach(doItNTimes);
  $('#answer span').text( sum );
  $('#answer2 span').text( sum2 );
  $('#bonus span').html( debug );
});
