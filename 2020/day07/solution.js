$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

let bagArray = [ "shiny gold bag" ];
let bagSet = new Set( bagArray );
var input = "";

function add( value ) {
  value = value.replace(/s* contain/);
  let tmpSize = bagSet.size;
  bagSet.add( value );
  if( bagSet.size > tmpSize ){
    bagArray.push( value );
  }
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  input = data;
});

while( bayArray.size() ){
  input.match( new RegEx( ".*contain.*shiny gold bag", 'g' ) ).forEach(function(item) {
    add(item);
  });
}
$('#answer span').text( bagSet.size );
//$('#answer2 span').text(  );
$('#bonus span').html( bagSet );
