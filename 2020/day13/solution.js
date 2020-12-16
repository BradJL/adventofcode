$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var MULTIPLIER = 11;

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

function addNumber( array, config ){
  let index = config[0];
  let number = config[1];
  let offset = config[2];
  let newCount = config[3] + 1;
  
  array[index] = ( newCount * number - offset );
  config[3] = newCount;
}

function part3(){
  let bonus = "";
  //let nextNumToCheck = 0;
  let number = 1;
  let seventeenConfig = [0, // index of array
                         17, // increment/mod value
                         0, // offset/subtract value
                         0]; // count added
  let fourtyOneConfig = [1, // index of array
                         41, // increment/mod value
                         7, // offset/subtract value
                         0]; // count added
  let fiveTwentyThreesConfig = [2, // index of array
                                523, // increment/mod value
                                17, // offset/subtract value
                                0]; // count added
  let thirteensConfig = [3, // index of array
                         13, // increment/mod value
                         35, // offset/subtract value
                         0]; // count added
  let nineteensConfig = [4, // index of array
                         19, // increment/mod value
                         36, // offset/subtract value
                         0]; // count added
  let twentyThreesConfig = [5, // index of array
                            23, // increment/mod value
                            40, // offset/subtract value
                            0]; // count added
  let sevenEightySevensConfig = [6, // index of array
                                787, // increment/mod value
                                48, // offset/subtract value
                                0]; // count added
  let thirtySevensConfig = [7, // index of array
                            37, // increment/mod value
                            54, // offset/subtract value
                            0]; // count added
  let twentyNinesConfig = [8, // index of array
                            29, // increment/mod value
                            77, // offset/subtract value
                            0]; // count added
  let configs = [ seventeenConfig,
                  fourtyOneConfig,
                  fiveTwentyThreesConfig,
                  thirteensConfig,
                  nineteensConfig,
                  twentyThreesConfig,
                  sevenEightySevensConfig,
                  thirtySevensConfig,
                  twentyNinesConfig
                ];
//   let configs = [ [ 0,17,0,2314705859 - 1 ],
// [ 1,41,7,959756088 - 1 ],
// [ 2,523,17,75239005 - 1 ],
// [ 3,13,35,3026923049 - 1 ],
// [ 4,19,36,2071052613 - 1 ],
// [ 5,23,40,1710869550 - 1 ],
// [ 6,787,48,50000000 - 1 ]
// ]
// let configs = [ [ 0,17,0,4629411688 - 1 ],
// [ 1,41,7,1919512164 - 1 ],
// [ 2,523,17,150478009 - 1 ],
// [ 3,13,35,6053846056 - 1 ],
// [ 4,19,36,4142105197 - 1 ],
// [ 5,23,40,3421739076 - 1 ],
// [ 6,787,48,99999999 - 1 ],
// ]
// let configs = [ [ 0,17,0,6944117517 - 1 ],
// [ 1,41,7,2879268239 - 1 ],
// [ 2,523,17,225717013 - 1 ],
// [ 3,13,35,9080769063 - 1 ],
// [ 4,19,36,6213157780 - 1 ],
// [ 5,23,40,5132608601 - 1 ],
// [ 6,787,48,149999998 - 1 ],
// ]
// let configs = [ [ 0,17,0,9258823346 - 1 ],
// [ 1,41,7,3839024315 - 1 ],
// [ 2,523,17,300956017 - 1 ],
// [ 3,13,35,12107692070 - 1 ],
// [ 4,19,36,8284210364 - 1 ],
// [ 5,23,40,6843478127 - 1 ],
// [ 6,787,48,199999997 - 1 ],
// ];
  let values = [];
  let data;
  for( let i = 0; i < configs.length; ++i ){
    addNumber( values, configs[i] );
  }
  let iterationsRemaining = 99999999;
//   data = [...values];
//   data = values.map((x) => x);
//   data.sort(function(a, b){return a-b});
  let max = 0;
  let min = Number.MAX_VALUE;
  values.forEach(function(contents, index, array) {
    if( contents < min ){ min = contents; }
    if( contents > max ){ max = contents; }
  });
  while( min != max /*&& --iterationsRemaining*/ ){
//     data = Array.from( data ).sort(function(a, b){return a-b});
//     nextNumToCheck = data.pop();
//     nextNumToCheck = max;
    for( let i = 0; i < values.length; ++i ){
      while( values[i] < max ){
        addNumber( values, configs[i] );
      }
    }
//     data = new Set( values );
//     data = [...values];
//     data = values.map((x) => x);
//     data.sort(function(a, b){return a-b});
    max = 0;
    min = Number.MAX_VALUE;
    values.forEach(function(contents, index, array) {
      if( contents < min ){ min = contents; }
      if( contents > max ){ max = contents; }
    });
//     if( iterationsRemaining == 3 ){
//       bonus = JSON.stringify( configs );
//     }
  }
//   $('#answer2 span').text( bonus );
//   bonus = "iterationsRemaining: " + iterationsRemaining + "<br />  let configs = [";
//   configs.forEach(function(contents, index, array) {
//     bonus += " [ " + contents + " - 1 ], <br />";
//   });
//   bonus += "          ]";
  
//  $('#answer2 span').text( values );
//   $('#bonus span').html( bonus );
  $('#answer2 span').text( min == max ? max : min + ", " + max );
  $('#bonus span').text( "iterationsRemaining: " + iterationsRemaining );
  return( min == max ? max : min + ", " + max );
}
function part2( data ){
  let bonus = "";
  let ids = [];
  let offsets = [];
  data.split(/,/).forEach(function(value, index, array) {
    if( value != "x" ){
//       bonus += value + " @ t+" + index + "<br />";
      bonus += "(t + " + index + ") % " + value + "<br />"
      ids.push( parseInt(value) );
      offsets.push( parseInt(index) );
    }
  });
  //let timestamp = Math.floor(100 000 000 000 000/ids[0])*ids[0]-ids[0];
  let timestamp = 0;//739 + 787*500000000*MULTIPLIER; //Math.floor(750000/ids[0])*ids[0]-ids[0];
  
  let found = false;
  let iterations = 0;
  console.log( iterations + ": " + timestamp );
  while( !found && iterations < 10){//500000000){
    timestamp += ids[0];//787//ids[0];
    //console.log( iterations + ": " + timestamp );
    found = true;
    ids.forEach(function(id, index, array) {
      if( (timestamp + offsets[index]) % id == 0 ){
         //bonus += value + " @ t+" + index + "<br />";
      } else {
        found = false;
      }
    });
    ++iterations;
  }
  if( !found ){ timestamp = -timestamp; }
  $('#answer2 span').text( timestamp );
  $('#bonus span').html( bonus );
}

$.get( "input.txt", function( data ) {
//   $('#input span').text('(Bytes: ' + (data.length) + ')');
  data = data.trim().split(/\r?\n/);
  $('#input span').text('(Lines: ' + (data.length) + ')');
  part1( data );
  //part2( "7,13,x,x,59,x,31,19" );
  //part2( "17,x,13,19" );
  //part2( "67,7,59" ); // 6901
  //part2( "67,7,59,61" ); // 754018
  //part2( "67,x,7,59,61" );
//   part2( data[1] );
//   part2( "17,x,x,x,x,x,x,41" ); //34
//   part2( "17,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523" ); //106675
//   part2( "17,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13" ); //1200268
//   part2( "17,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19" ); //81761619
//   part2( "17,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,23,x,x,x,x,x,x,x,787" );
//  part2( "17,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,23,x,x,x,x,x,x,x,787,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,29" );
  let performanceString = "";
  var t0 = performance.now();
  //part3();
  var t1 = performance.now();
  performanceString += "part3() took " + (t1 - t0) + " ms.<br />";
  $('#bonus span').html( performanceString );
});
