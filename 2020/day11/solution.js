$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function getNextSeat( data, row, column, direction ){
  let i = row;
  let j = column;
  switch( direction ){
  case "up":
    if( row == 0 ) return "L";
    switch( data[i-1].charAt(j) ){
    case "#":
    case "L":
      return data[i-1].charAt(j);
      break;
    case ".":
      return getNextSeat( data, row-1, column, direction );
      break;
    }
    break;
  case "down":
    if( row == data.length - 1 ) return "L";
    switch( data[i+1].charAt(j) ){
    case "#":
    case "L":
      return data[i+1].charAt(j);
      break;
    case ".":
      return getNextSeat( data, row+1, column, direction );
      break;
    }
    break;
  case "left":
    if( column == 0 ) return "L";
    switch( data[i].charAt(j-1) ){
    case "#":
    case "L":
      return data[i].charAt(j-1);
      break;
    case ".":
      return getNextSeat( data, row, column-1, direction );
      break;
    }
    break;
  case "right":
    if( column == data[i].length - 1 ) return "L";
    switch( data[i].charAt(j+1) ){
    case "#":
    case "L":
      return data[i].charAt(j+1);
      break;
    case ".":
      return getNextSeat( data, row, column+1, direction );
      break;
    }
    break;
  case "upLeft":
    if( row == 0 || column == 0 ) return "L";
    switch( data[i-1].charAt(j-1) ){
    case "#":
    case "L":
      return data[i-1].charAt(j-1);
      break;
    case ".":
      return getNextSeat( data, row-1, column-1, direction );
      break;
    }
    break;
  case "upRight":
    if( row == 0 || data[i].length - 1 ) return "L";
    switch( data[i-1].charAt(j+1) ){
    case "#":
    case "L":
      return data[i-1].charAt(j+1);
      break;
    case ".":
      return getNextSeat( data, row-1, column+1, direction );
      break;
    }
    break;
  case "downLeft":
    if( row == data.length - 1 || column == 0 ) return "L";
    switch( data[i+1].charAt(j-1) ){
    case "#":
    case "L":
      return data[i+1].charAt(j-1);
      break;
    case ".":
      return getNextSeat( data, row+1, column-1, direction );
      break;
    }
    break;
  case "downRight":
    if( row == data.length - 1 || data[i].length - 1 ) return "L";
    switch( data[i+1].charAt(j+1) ){
    case "#":
    case "L":
      return data[i+1].charAt(j+1);
      break;
    case ".":
      return getNextSeat( data, row+1, column+1, direction );
      break;
    }
    break;
  }
}

function part1( data ){
  let newData = [];
  let changed = true;
  let openSeats = 0;
  let occupiedSeats = 0;
  while( changed ){
    openSeats = 0;
    occupiedSeats = 0;
    changed = false;
    newData = [];
    for( let i = 0; i < data.length; ++i ){
      newData.push( "" );
      for( let j = 0; j < data[i].length; ++j ){
        let count = 0;
        if( data[i].charAt(j) == 'L' || data[i].charAt(j) == '#' ){
          if( i > 0 && j > 0 && data[i-1].charAt(j - 1) == "#" ) ++count;
          if( i > 0 && data[i-1].charAt(j) == "#" ) ++count;
          if( i > 0 && j < data.length - 1 && data[i-1].charAt(j + 1) == "#" ) ++count;
          if( j > 0 && data[i].charAt(j - 1) == "#" ) ++count;
          if( j < data.length - 1 && data[i].charAt(j + 1) == "#" ) ++count;
          if( i < data.length - 1 && j > 0 && data[i+1].charAt(j - 1) == "#" ) ++count;
          if( i < data.length - 1 && data[i+1].charAt(j) == "#" ) ++count;
          if( i < data.length - 1 && j < data.length - 1 && data[i+1].charAt(j + 1) == "#" ) ++count;
          if( data[i].charAt(j) == 'L' ) {
            if( count == 0 ){
              newData[i] = newData[i] + '#';
              ++occupiedSeats;
              changed = true;
            } else {
              newData[i] = newData[i] + 'L';
              ++openSeats;
            }
          } else {
            if( count >= 4 ){
              newData[i] = newData[i] + 'L';
              changed = true;
              ++openSeats;
            } else {
              newData[i] = newData[i] + '#';
              ++occupiedSeats;
            }
          }
        } else {
          newData[i] = newData[i] + '.';
        }
      }
    }
    data = newData;
  }  
  $('#answer span').text( occupiedSeats );
  //$('#bonus span').html( data );
}
function part2( data ){
  let newData = [];
  let changed = true;
  let openSeats = 0;
  let occupiedSeats = 0;
  while( changed ){
    openSeats = 0;
    occupiedSeats = 0;
    changed = false;
    newData = [];
    for( let i = 0; i < data.length; ++i ){
      newData.push( "" );
      for( let j = 0; j < data[i].length; ++j ){
        let count = 0;
        if( data[i].charAt(j) == 'L' || data[i].charAt(j) == '#' ){
          if( getNextSeat( data, i, j, "upLeft" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "up" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "upRight" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "left" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "right" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "downLeft" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "down" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "downRight" ) == "#" ) ++count;
          if( data[i].charAt(j) == 'L' ) {
            if( count == 0 ){
              newData[i] = newData[i] + '#';
              ++occupiedSeats;
              changed = true;
            } else {
              newData[i] = newData[i] + 'L';
              ++openSeats;
            }
          } else {
            if( count >= 4 ){
              newData[i] = newData[i] + 'L';
              changed = true;
              ++openSeats;
            } else {
              newData[i] = newData[i] + '#';
              ++occupiedSeats;
            }
          }
        } else {
          newData[i] = newData[i] + '.';
        }
      }
    }
    data = newData;
  }  
  $('#answer2 span').text( occupiedSeats );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( data );
  part2( data );
});
