$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1( data ) {
  let curVal = 25;
  
  while( curVal < data.length ){    
    let sortData = data.slice(curVal-25,curVal);
    sortData.sort(function(a, b){return a-b});
    let i = 0;
    let j = 24;
    while( i != j ){
      if( parseInt(sortData[i]) + parseInt(sortData[j]) == parseInt(data[curVal]) ){
        console.log( "Found " + curVal );
        ++curVal;
        break;
      } else if( parseInt(sortData[i]) + parseInt(sortData[j]) > parseInt(data[curVal]) ){
        console.log( sortData[i] + " + " + sortData[j] + " > " + data[curVal] );
        --j;
      } else {
        console.log( sortData[i] + " + " + sortData[j] + " <= " + data[curVal] );
        ++i;
      }
    }
    if( i == j ){
      console.log( "Didn't find " + curVal );
      break;
    }
  }
  $('#answer span').text( data[curVal] );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  
  part1( data );
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
});
