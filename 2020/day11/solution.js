$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function getNextSeat( data, row, column, direction, mode ){
  let keepGoing = (mode == "visible" ? true : false);
  let i = row;
  let j = column;
  switch( direction ){
  case "up":
    if( row == 0 ) return ".";
    switch( data[i-1].charAt(j) ){
    case ".":
      if( keepGoing ) return getNextSeat( data, row-1, column, direction );
    case "#":
    case "L":
      return data[i-1].charAt(j);
      break;
    }
    break;
  case "down":
    if( row == data.length - 1 ) return ".";
    switch( data[i+1].charAt(j) ){
    case ".":
      if( keepGoing ) return getNextSeat( data, row+1, column, direction );
    case "#":
    case "L":
      return data[i+1].charAt(j);
      break;
    }
    break;
  case "left":
    if( column == 0 ) return ".";
    switch( data[i].charAt(j-1) ){
    case ".":
      if( keepGoing ) return getNextSeat( data, row, column-1, direction );
    case "#":
    case "L":
      return data[i].charAt(j-1);
      break;
    }
    break;
  case "right":
    if( column == data[i].length - 1 ) return ".";
    switch( data[i].charAt(j+1) ){
    case ".":
      if( keepGoing ) return getNextSeat( data, row, column+1, direction );
    case "#":
    case "L":
      return data[i].charAt(j+1);
      break;
    }
    break;
  case "upLeft":
    if( row == 0 || column == 0 ) return ".";
    switch( data[i-1].charAt(j-1) ){
    case ".":
      if( keepGoing ) return getNextSeat( data, row-1, column-1, direction );
    case "#":
    case "L":
      return data[i-1].charAt(j-1);
      break;
    }
    break;
  case "upRight":
    if( row == 0 || column == data[i].length - 1 ) return ".";
    switch( data[i-1].charAt(j+1) ){
    case ".":
      if( keepGoing ) return getNextSeat( data, row-1, column+1, direction );
    case "#":
    case "L":
      return data[i-1].charAt(j+1);
      break;
    }
    break;
  case "downLeft":
    if( row == data.length - 1 || column == 0 ) return ".";
    switch( data[i+1].charAt(j-1) ){
    case ".":
      if( keepGoing ) return getNextSeat( data, row+1, column-1, direction );
    case "#":
    case "L":
      return data[i+1].charAt(j-1);
      break;
    }
    break;
  case "downRight":
    if( row == data.length - 1 || column == data[i].length - 1 ) return ".";
    switch( data[i+1].charAt(j+1) ){
    case ".":
      if( keepGoing ) return getNextSeat( data, row+1, column+1, direction );
    case "#":
    case "L":
      return data[i+1].charAt(j+1);
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
          if( getNextSeat( data, i, j, "upLeft", "visible" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "up", "visible" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "upRight", "visible" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "left", "visible" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "right", "visible" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "downLeft", "visible" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "down", "visible" ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "downRight", "visible" ) == "#" ) ++count;
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
            if( count >= 5 ){
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
    console.log(data);
  }  
  $('#answer2 span').text( occupiedSeats );
//   let bonus = "";
//   for( let i = 0; i < data.length; ++i ){
//     bonus += data[i] + "<br />";
//   }
//   $('#bonus span').html( bonus );
}

$.get( "input.txt", function( data ) {
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( data );
  part2( data );
});
