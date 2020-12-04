$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var valid = 0;

function parseport(value, index, array) {
  if( value == null || value == "" || value == undefined ) return;
  let items = value.replace(/cid:[0-9]*/).split(/[ \t\n]/);
  if( items.length == 8 ){
    ++valid;
  }
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.split(/\n\n/).forEach(parseport);
  $('#answer span').text(valid);
  //$('#answer2 span').text();
});
