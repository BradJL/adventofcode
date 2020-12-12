$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function makeArray(w, h, val) {
    var arr = [];
    for(let i = 0; i < h; i++) {
        arr[i] = [];
        for(let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
} // thanks, internet!

function part1( data ){
  let lights = makeArray( 1000, 1000, false );
  
  data.forEach(function(value, index, array) {
    let args = value.replace("turn ", '').replace(',', ' ').replace("through ", '').split(' ');
    console.log( args );
    let action = args[0];
    let startX = parseInt(args[1]);
    let startY = parseInt(args[2]);
    let endX = parseInt(args[3]);
    let endY = parseInt(args[4]);

    let lit = 0;
    switch( action ){
    case "on":
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(startX, startY, endX-startX+1, endY-startY+1);
      for( x = startX; x <= endX; ++x ){
        for( y = startY; y <= endY; ++y ){
          if( lights[x][y] == false ){
            lights[x][y] = true;
            ++lit;
          }
        }
      }
      break;
    case "off":
      ctx.fillStyle = "#000000";
      ctx.fillRect(startX, startY, endX-startX+1, endY-startY+1);
      for( x = startX; x <= endX; ++x ){
        for( y = startY; y <= endY; ++y ){
          if( lights[x][y] == true ){
            lights[x][y] = false;
            --lit;
          }
        }
      }
      break;
    case "toggle":
      for( x = startX; x <= endX; ++x ){
        for( y = startY; y <= endY; ++y ){
          if( lights[x][y] == true ){
            lights[x][y] = false;
            --lit;
            ctx.fillStyle = "#000000";
            ctx.fillRect(x, y, 1, 1);
          } else {
            lights[x][y] = true;
            ++lit;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
      break;
    }
  });
  $('#answer span').text( lit );
  //$('#bonus span').html(  );
}
function part2( data ){
  data.forEach(function(value, index, array) {
  });
  //$('#answer2 span').text(  );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {;
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
//   part1( data );
//   part2( data );
  
  let input = [];
  data.forEach(function(number, index, array) {
    input.push(parseInt(number))
  });
  part1( input );
  part2( input );
});
