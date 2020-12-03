$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

let input = [];
let calculations = "";
function stringsToInts(value, index, array) {
  input.push( parseInt(value) );
}
$.get( "input.txt", function( data ) {
  data.split(/\r?\n/).forEach(stringsToInts);
  input.sort(function(a, b){return a-b});
  //console.log( input );
  $('#input span').text("Entries: " + (input.length-1));

  // Part 1
  let i = 0;
  let j = input.length-2;
  while( i != j ){
    calculations = calculations + input[i] + " + " + input[j] + " = " + (input[i] + input[j]) + "\n";
    if( input[i] + input[j] == 2020 ){
      $('#answer span').text(input[i]*input[j]);
      break;
    } else if( input[i] + input[j] > 2020 ){
      --j;
    } else {
      ++i;
    }
  }
  $('#calculations span').text( calculations );

  // Part 2
  i = 0;
  j = i + 1;
  let keepGoing = true;
  let k = input.length-2;

  console.log( i + " " + j + " " + k );
  console.log( input[i] + " " + input[j] + " " + input[k] );

  for( i = 0; i < input.length-3 && keepGoing; ++i ){
    for( j = i+1; j < input.length-2; ++j ){
      //console.log( input[i] + " " + input[j] + " : " + (2020-input[i]-input[j]) );
      if( 2020-input[i]-input[j] < 0 ){
        break;
      }
      if( input.includes( 2020-input[i]-input[j], j+1 ) ){
        $('#answer2 span').text(input[i] * input[j] * (2020-input[i]-input[j]) );
        keepGoing = false;
        break;
      }
    }
  }
  <!--$('#answer2 span').text(input[i] * input[j] * (2020-input[i]-input[j]) );-->
});
