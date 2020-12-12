$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function part1( data ){
  let direction = 'E';
  let degrees = 0;
  let n = 0;
  let e = 0;
  data.forEach(function(value, index, array) {
    let inst = value.charAt(0);
    let num = parseInt(value.substring(1));
    switch( inst ){
    case 'N':
      n += num;
      break;
    case 'S':
      n -= num;
      break;
    case 'E':
      e += num;
      break;
    case 'W':
      e -= num;
      break;
    case 'L':
      degrees = (degrees - num) % 360;
      switch( degrees ){
      case 0:
        direction = 'E';
        break;
      case 90:
        direction = 'S';
        break;
      case 180:
        direction = 'W';
        break;
      case 270:
        direction = 'N';
        break;
      }
      break;
    case 'R':
      degrees = (degrees + num) % 360;
      switch( degrees ){
      case 0:
        direction = 'E';
        break;
      case 90:
        direction = 'S';
        break;
      case 180:
        direction = 'W';
        break;
      case 270:
        direction = 'N';
        break;
      }
      break;
    case 'F':
      switch( direction ){
      case 'N':
        n += num;
        break;
      case 'S':
        n -= num;
        break;
      case 'E':
        e += num;
        break;
      case 'W':
        e -= num;
        break;
      }
      break;
    }
  });
  $('#answer span').text( n + e );
  //$('#bonus span').html(  );
}
function part2( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {
//   $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( data );
//   part2( data );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});
