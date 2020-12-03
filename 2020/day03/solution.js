$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');
var row = 0;
var column = 0; // column3_1
var column1_1 = 0;
var column5_1 = 0;
var column7_1 = 0;
var column1_2 = 0;

var encounteredTrees = 0;
var encounteredTrees1_1 = 0;
var encounteredTrees5_1 = 0;
var encounteredTrees7_1 = 0;
var encounteredTrees1_2 = 0;

function countEncounteredTrees(value, index, array) {
  if( value == null || value == "" || value == undefined ) return;

  if( value[column] == "#" ){ ++encounteredTrees; }
  if( value[column1_1] == "#" ){ ++encounteredTrees1_1; }
  if( value[column5_1] == "#" ){ ++encounteredTrees5_1; }
  if( value[column7_1] == "#" ){ ++encounteredTrees7_1; }
  if( row % 2 == 0 ){
    if( value[column1_2] == "#" ){ ++encounteredTrees1_2; }
    column1_2 = (column1_2 + 1) % value.length;
  }

  column = (column + 3) % value.length;
  column1_1 = (column1_1 + 1) % value.length;
  column5_1 = (column5_1 + 5) % value.length;
  column7_1 = (column7_1 + 7) % value.length;
  ++row;
}

$.get( "input.txt", function( data ) {
  var t0 = performance.now();
  data.split(/\r?\n/).forEach(countEncounteredTrees);
  let t1 = performance.now();
  let ms = (t1 - t0);
  $('#solution span').text( "(" + Math.floor(ms*10)/10 + " ms)" );
  $('#answer span').text(encounteredTrees);
  $('#answer2 span').text(encounteredTrees1_1 + " * "
                        + encounteredTrees + " * "
                        + encounteredTrees5_1 + " * "
                        + encounteredTrees7_1 + " * "
                        + encounteredTrees1_2 + " = "
                        + (encounteredTrees1_1 * encounteredTrees * encounteredTrees5_1 * encounteredTrees7_1 * encounteredTrees1_2)
                        );
});
