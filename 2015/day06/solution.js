$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var canvas = document.getElementById("visualization");
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
  let lights2 = makeArray( 1000, 1000, 0 );
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,999,999);
    
  let lit = 0;
  let brightness = 0;
    
  data.forEach(function(value, index, array) {
    //console.log( value );
    let args = value.replace("turn ", '').replace(/,/g, ' ').replace("through ", '').split(' ');
    //console.log( args );
    let action = args[0];
    let startX = parseInt(args[1]);
    let startY = parseInt(args[2]);
    let endX = parseInt(args[3]);
    let endY = parseInt(args[4]);

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
          ++(lights2[x][y]);
          ++brightness;
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
            --(lights2[x][y]);
          }
          if( lights2[x][y] == -1 ){
            lights2[x][y] = 0;
          } else {
            --brightness;
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
          lights2[x][y] += 2;
          brightness += 2;
        }
      }
      break;
    }
  });
  $('#answer span').text( lit );
  $('#answer2 span').text( brightness );
  //$('#bonus span').html(  );
}

$.get( "input.txt", function( data ) {;
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  part1( data );
});
