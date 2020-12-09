$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function part1( data ) {
  let curVal = 25;
  
//   while( curVal < data.length ){    
    let sortData = data.slice(curVal-25,curVal);
    sortData.sort();
    let i = 0;
    let j = 24;
    while( i != j ){
      if( sortData[i] + sortData[j] == data[curVal] ){
        console.log( "Found " + curVal );
        ++curVal;
        break;
      } else if( sortData[i] + sortData[j] > data[curVal] ){
        --j;
      } else {
        ++i;
      }
    }
    if( i == j ){
      console.log( "Didn't find " + curVal );
    }
//   }
  $('#answer span').text( data[curVal] );
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  
  part1( data );
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
});
