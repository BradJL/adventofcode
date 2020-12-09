$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1() {
  let curVal = 25;
  
  while( curVal < data.length ){
    let i = curVal - 25
    let j = curVal - 1;
    while( i != j ){
      if( input[i] + input[j] == curVal ){
        ++curVal;
        break;
      } else if( input[i] + input[j] > 2020 ){
        --j;
      } else {
        ++i;
      }
    }
  }
  $('#answer span').text( data[curVal] );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  
  part1();
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
});
