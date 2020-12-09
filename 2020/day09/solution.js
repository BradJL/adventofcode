$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function parts1and2( data ) {
  let curVal = 25;
  
  while( curVal < data.length ){    
    let sortData = data.slice(curVal-25,curVal);
    sortData.sort(function(a, b){return a-b});
    let i = 0;
    let j = 24;
    while( i != j ){
      if( sortData[i] + sortData[j] == data[curVal] ){
        console.log( "Found " + curVal );
        ++curVal;
        break;
      } else if( sortData[i] + sortData[j] > data[curVal] ){
        console.log( sortData[i] + " + " + sortData[j] + " > " + data[curVal] );
        --j;
      } else {
        console.log( sortData[i] + " + " + sortData[j] + " <= " + data[curVal] );
        ++i;
      }
    }
    if( i == j ){
      console.log( "Didn't find " + curVal );
      for( i = 0; i < data.length; ++i ){
        let sum = data[i];
        for( j = i+1; sum < data[curVal]; ++j ){
          sum += data[j];
        }
        if( sum == data[curVal] ){
          sortData = data.slice( i, j+1 );
          sortData.sort();
          $('#answer2 span').text( sortData[0] + sortData[sortData.length-1] );
          break;
        }
      }
      break;
    }
  }
  $('#answer span').text( data[curVal] );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  let input = []
  data.trim().split(/\r?\n/).forEach(function(number) {
    input.push( parseInt(number) )
  });
  
  parts1and2( input );
});
