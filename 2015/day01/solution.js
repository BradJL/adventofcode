$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

$.get( "input.txt", function( data ) {
  // part 1
  let len = data.length - 1;
  let down = data.replace(/[^\)]/g, "").length;
  let up = len - down;
  $('#input span').text( "(Lenth:" +  len + ")" );
  $('#answer span').text( up + "↑ - " + down + "↓ = " + (up - down) );
  
  // part 2
  let floor = 0;
  let i = 0;
  for( i = 0; i < data.length - 1; ++i ){
    if( data[i] == '(' ){
      ++floor;
    } else {
      --floor;
    }
    console.log( i + ": " + floor );
    if( floor == -1 ){ 
      break;
    }
  }
  $('#answer2 span').text(i);
});
