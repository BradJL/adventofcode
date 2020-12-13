$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

// var canvas = document.getElementById("visualization");
// var ctx = canvas.getContext("2d");
// var canvas2 = document.getElementById("visualization2");
// var ctx2 = canvas2.getContext("2d");

function part1( data ){
  let timestamp = parseInt( data[0] );
  let ids = [];
  data[1].trim().split(/,/).forEach(function(number, index, array) {
    ids.push(parseInt(number))
  });
  
  let bonus = "";
  let smallestWait = 9999999;
  let smallWaitId = 0;
  ids.forEach(function(id, index, array) {
    let wait = (id - (timestamp % id));
    if( wait < smallestWait ){
      smallestWait = wait;
      smallWaitId = id;
    }
    //bonus += id + ": " + (id - (timestamp % id)) + "<br />";
  });
  $('#answer span').text( smallestWait * smallWaitId );
  //$('#bonus span').html( bonus );
}
function part2( data ){
  //let bonus = "";
  let ids = [];
  let offsets = [];
  data.split(/,/).forEach(function(value, index, array) {
    if( value != "x" ){
//       bonus += value + " @ t+" + index + "<br />";
      ids.push( parseInt(value) );
      offsets.push( parseInt(index) );
    }
  });
  let timestamp = 100000000000000;
  let found = false;
  while( !found ){
    timestamp += 1//ids[0];
    found = true;
    ids.forEach(function(id, index, array) {
      if( (timestamp + offsets[index]) % id == 0 ){
//         bonus += value + " @ t+" + index + "<br />";
      } else {
        found = false;
      }
    });
  }
  $('#answer2 span').text( timestamp );
  //$('#bonus span').html( bonus );
}
;
$.get( "input.txt", function( data ) {
//   $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( data );
  //part2( "7,13,x,x,59,x,31,19" );
  //part2( "17,x,13,19" );
  //part2( "67,7,59,61" );
  part2( data[1] );
  
//   let input = [];
//   data.forEach(function(number, index, array) {
//     input.push(parseInt(number))
//   });
//   part1( input );
//   part2( input );
});
