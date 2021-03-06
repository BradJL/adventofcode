$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var canvas = document.getElementById("visualization");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("visualization2");
var ctx2 = canvas2.getContext("2d");

function part1( data ){
  ctx.strokeStyle = "#FF0000";
  let direction = 'E';
  let degrees = 0;
  let n = 0;
  let e = 0;
  let prevN = 0;
  let prevE = 0;
  data.forEach(function(value, index, array) {
    let inst = value.charAt(0);
    let num = parseInt(value.substring(1));
    switch( inst ){
    case 'N':
      n += num;
      console.log( "N" + num + " N" + n + "E" + e );
      break;
    case 'S':
      n -= num;
      console.log( "S" + num + " N" + n + "E" + e );
      break;
    case 'E':
      e += num;
      console.log( "E" + num + " N" + n + "E" + e );
      break;
    case 'W':
      e -= num;
      console.log( "W" + num + " N" + n + "E" + e );
      break;
    case 'L':
      degrees = (degrees + 360 - num) % 360;
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
      console.log( "L" + num + ": " + direction );
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
      console.log( "R" + num + ": " + direction );
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
      console.log( "F-" + direction + num + " N" + n + "E" + e );
      break;
    }
    ctx.beginPath();
    ctx.moveTo(400 - prevE/2, 70 - prevN/2);
    ctx.lineTo(400 - e/2, 70 - n/2);
    ctx.stroke();
    prevN = n;
    prevE = e;
  });
  $('#answer span').text( Math.abs(n) + Math.abs(e) );
  //$('#bonus span').html(  );
}
function part2( data ){
  let wE = 10;
  let wN = 1;
  let n = 0;
  let e = 0;
  let prevN = 0;
  let prevE = 0;
  let oldWN;
  data.forEach(function(value, index, array) {
    let inst = value.charAt(0);
    let num = parseInt(value.substring(1));
    switch( inst ){
    case 'N':
      wN += num;
      console.log( "N" + num + " wN" + wN + "wE" + wE );
      break;
    case 'S':
      wN -= num;
      console.log( "S" + num + " wN" + wN + "wE" + wE );
      break;
    case 'E':
      wE += num;
      console.log( "E" + num + " wN" + wN + "wE" + wE );
      break;
    case 'W':
      wE -= num;
      console.log( "W" + num + " wN" + wN + "wE" + wE );
      break;
    case 'L':
      switch( num ){
      case 0:
        break;
      case 90:
        oldWN = wN;
        wN = wE;
        wE = -oldWN;
        break;
      case 180:
        wN = -wN;
        wE = -wE;
        break;
      case 270:
        oldWN = wN;
        wN = -wE;
        wE = oldWN;
        break;
      }
      console.log( "L" + num + ": wN" + wN + "wE" + wE );
      break;
    case 'R':
      switch( num ){
      case 0:
        break;
      case 90:
        oldWN = wN;
        wN = -wE;
        wE = oldWN;
        break;
      case 180:
        wN = -wN;
        wE = -wE;
        break;
      case 270:
        oldWN = wN;
        wN = wE;
        wE = -oldWN;
        break;
      }
      console.log( "R" + num + ": wN" + wN + "wE" + wE );
      break;
    case 'F':
      n += num * wN;
      e += num * wE;
      console.log( "F" + num + " N" + n + "E" + e );
      break;
    }
    ctx2.strokeStyle = "#FF0000";
    ctx2.beginPath();
    ctx2.moveTo(420 - prevE/75, 180 - prevN/75);
    ctx2.lineTo(420 - e/75, 180 - n/75);
    ctx2.stroke();
    prevN = n;
    prevE = e;
  });
  $('#answer2 span').text( Math.abs(n) + Math.abs(e) );
}

$.get( "input.txt", function( data ) {
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Nav Instructions: ' + (data.length) + ')');
  part1( data );
  part2( data );
});
