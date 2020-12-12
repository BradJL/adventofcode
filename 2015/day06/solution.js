$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var canvas = document.getElementById("visualization");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("visualization2");
var ctx2 = canvas2.getContext("2d");

lastLog = "";
function log( txt ){
  if( txt != lastLog ){
    lastLog = txt;
    console.log( txt );
  }
}

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

function makeGreyRGB( value ){
  value = value.toString(16);
  if( value.length == 1 ){ value = "0" + value; }
  return "#" + value.repeat(3);
}

function draw( lights, ctx ){
  for( let x = 0; x < lights.length; ++x ){
    for( let y = 0; y < lights[x].length; ++y ){
      if( lights[x][y] === true ){
        ctx.fillStyle = makeGreyRGB(255);
      } else {
        ctx.fillStyle = makeGreyRGB((lights[x][y]) * 6 + 3);
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function lightShow( data ){
  let drawIt = true;
  let lights = makeArray( 1000, 1000, false );
  let lights2 = makeArray( 1000, 1000, 0 );

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
      for( let x = startX; x <= endX; ++x ){
        for(let y = startY; y <= endY; ++y ){
          if( lights[x][y] == false ){
            lights[x][y] = true;
            ++lit;
          }
          ++(lights2[x][y]);
          ++brightness;
          if( lights2[x][y] > maxBrightness ){
            maxBrightness = lights2[x][y];
            //console.log(makeGreyRGB((lights2[x][y]) * 6 + 3));
          }
        }
      }
      break;
    case "off":
      for( let x = startX; x <= endX; ++x ){
        for( let y = startY; y <= endY; ++y ){
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
        }
      }
      break;
    case "toggle":
      for( let x = startX; x <= endX; ++x ){
        for( let y = startY; y <= endY; ++y ){
          if( lights[x][y] == true ){
            lights[x][y] = false;
            --lit;
          } else {
            lights[x][y] = true;
            ++lit;
          }
          lights2[x][y] += 2;
          brightness += 2;
          if( lights2[x][y] > maxBrightness ){
            maxBrightness = lights2[x][y];
            //console.log(makeGreyRGB((lights2[x][y]) * 6 + 3));
          }
        }
      }
      break;
    }
  });
  $('#answer span').text( lit );
  $('#answer2 span').text( brightness );
  //$('#bonus span').html( maxBrightness );
  
  if( drawIt ){
    draw( lights, ctx );
    draw( lights2, ctx2 );
  }
}

$.get( "input.txt", function( data ) {;
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Instructions: ' + (data.length) + ')');
  lightShow( data );
});
