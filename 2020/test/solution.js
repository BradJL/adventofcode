let row = 0;
let column = 0; // column3_1
let column1_1 = 0;
let column5_1 = 0;
let column7_1 = 0;
let column1_2 = 0;

let encounteredTrees = 0;
let encounteredTrees1_1 = 0;
let encounteredTrees5_1 = 0;
let encounteredTrees7_1 = 0;
let encounteredTrees1_2 = 0;

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

$('#answer span').text('Calculating...');
$.get( "input.txt", function( data ) {
  data.split(/\r?\n/).forEach(countEncounteredTrees);
  $('#answer span').text(encounteredTrees);
  $('#answer2 span').text(encounteredTrees1_1 + " * " + encounteredTrees + " * " + encounteredTrees5_1 + " * " + encounteredTrees7_1 + " * " + encounteredTrees1_2 + " = " + (encounteredTrees1_1 * encounteredTrees * encounteredTrees5_1 * encounteredTrees7_1 * encounteredTrees1_2));
});
