$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var canvas = document.getElementById("visualization");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("visualization2");
var ctx2 = canvas2.getContext("2d");

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
  let drawIt = true;
  let lights = makeArray( 1000, 1000, false );
  let lights2 = makeArray( 1000, 1000, 0 );
  if( drawIt ){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,999,999);
    ctx2.fillStyle = "#000000";
    ctx2.fillRect(0,0,999,999);
  }

  let lit = 0;
  let brightness = 0;
  let maxBrightness = 0;
    
  data.forEach(function(value, index, array) {
    let args = value.replace("turn ", '').replace(/,/g, ' ').replace("through ", '').split(' ');
    let action = args[0];
    let startX = parseInt(args[1]);
    let startY = parseInt(args[2]);
    let endX = parseInt(args[3]);
    let endY = parseInt(args[4]);

    switch( action ){
    case "on":
      if( drawIt ){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(startX, startY, endX-startX+1, endY-startY+1);
      }
      for( x = startX; x <= endX; ++x ){
        for( y = startY; y <= endY; ++y ){
          if( lights[x][y] == false ){
            lights[x][y] = true;
            ++lit;
          }
          ++(lights2[x][y]);
          ++brightness;
//           ctx2.fillStyle = "#"+(3 + 6 * lights2[x][y]).toString(16)+(3 + 6 * lights2[x][y]).toString(16)+(3 + 6 * lights2[x][y]).toString(16);
//           ctx2.fillRect(x, y, 1, 1);

          if( lights2[x][y] > maxBrightness ){
            maxBrightness = lights2[x][y];
          }
        }
      }
      break;
    case "off":
      if( drawIt ){
        ctx.fillStyle = "#000000";
        ctx.fillRect(startX, startY, endX-startX+1, endY-startY+1);
      }
      for( x = startX; x <= endX; ++x ){
        for( y = startY; y <= endY; ++y ){
          if( lights[x][y] == true ){
            lights[x][y] = false;
            --lit;
          }
          --(lights2[x][y]);
          if( lights2[x][y] == -1 ){
            lights2[x][y] = 0;
          } else {
            --brightness;
          }
//           ctx2.fillStyle = "#"+(3 + 6 * lights2[x][y]).toString(16)+(3 + 6 * lights2[x][y]).toString(16)+(3 + 6 * lights2[x][y]).toString(16);
//           ctx2.fillRect(x, y, 1, 1);
        }
      }
      break;
    case "toggle":
      for( x = startX; x <= endX; ++x ){
        for( y = startY; y <= endY; ++y ){
          if( lights[x][y] == true ){
            lights[x][y] = false;
            --lit;
            if( drawIt ){
              ctx.fillStyle = "#000000";
              ctx.fillRect(x, y, 1, 1);
            }
          } else {
            lights[x][y] = true;
            ++lit;
            if( drawIt ){
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(x, y, 1, 1);
            }
          }
          lights2[x][y] += 2;
          brightness += 2;
//           ctx2.fillStyle = "#"+(3 + 6 * lights2[x][y]).toString(16)+(3 + 6 * lights2[x][y]).toString(16)+(3 + 6 * lights2[x][y]).toString(16);
//           ctx2.fillRect(x, y, 1, 1);

          if( lights2[x][y] > maxBrightness ){
            maxBrightness = lights2[x][y];
          }
        }
      }
      break;
    }
  });
  $('#answer span').text( lit );
  $('#answer2 span').text( brightness );
  //$('#bonus span').html( maxBrightness );
}

$.get( "input.txt", function( data ) {;
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  part1( data );
});
