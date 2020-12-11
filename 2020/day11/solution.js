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
      if( keepGoing ) return getNextSeat( data, row-1, column, direction, mode );
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
      if( keepGoing ) return getNextSeat( data, row+1, column, direction, mode );
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
      if( keepGoing ) return getNextSeat( data, row, column-1, direction, mode );
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
      if( keepGoing ) return getNextSeat( data, row, column+1, direction, mode );
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
      if( keepGoing ) return getNextSeat( data, row-1, column-1, direction, mode );
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
      if( keepGoing ) return getNextSeat( data, row-1, column+1, direction, mode );
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
      if( keepGoing ) return getNextSeat( data, row+1, column-1, direction, mode );
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
      if( keepGoing ) return getNextSeat( data, row+1, column+1, direction, mode );
    case "#":
    case "L":
      return data[i+1].charAt(j+1);
      break;
    }
    break;
  }
}

// data = input data
// mode "adjacent": the next spot (part 1)
//      or "visible": the next non-floor spot (part 2)
// occupiedNum = threshold # for when a person will abandon their seat
function modelSeating( data, mode, occupiedNum ){
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
          if( getNextSeat( data, i, j, "upLeft", mode ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "up", mode ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "upRight", mode ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "left", mode ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "right", mode ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "downLeft", mode ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "down", mode ) == "#" ) ++count;
          if( getNextSeat( data, i, j, "downRight", mode ) == "#" ) ++count;
          
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
            if( count >= occupiedNum ){
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
//   let bonus = "";
//   for( let i = 0; i < data.length; ++i ){
//     bonus += data[i] + "<br />";
//   }
//   $('#bonus span').html( bonus );
  return occupiedSeats;
}

$.get( "input.txt", function( data ) {
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Lines: ' + (data.length) + ')');
  $('#answer span').text( modelSeating( data, "adjacent", 4 ) );
  $('#answer2 span').text( modelSeating( data, "visible", 5 ) );
});
