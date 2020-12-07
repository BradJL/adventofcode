$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var bagsArray = [ "shiny gold bag" ];
var bagsSet = new Set( bagsArray );

function add( value ) {
  let bag = value.replace(/s* contain.*/,"");
  let tmpSize = bagsSet.size;
  bagsSet.add( bag );
  if( bagsSet.size > tmpSize ){
    bagsArray.push( bag );
  }
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  while( bagsArray.length ){
    let bag = bagsArray.pop();
    console.log( bag );
    data.match( new RegExp( ".*contain.*" + bag, 'g' ) ).forEach(function(item) {
      add(item);
    });
  }
  $('#answer span').text( bagsSet.size );
  //$('#answer2 span').text(  );
  $('#bonus span').html( bagsSet );
});
