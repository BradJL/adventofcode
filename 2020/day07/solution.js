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

function outerBags( data ){
  while( bagsArray.length ){
    let bag = bagsArray.pop();
    console.log( bag );
    let newBags = data.match( new RegExp( ".*contain.*" + bag, 'g' ) )
    if( newBags ){
      newBags.forEach(function(item) {
        add(item);
      });
    }
  let bonusTxt = "";
//   bagsSet.forEach(function(item) {
//     bonusTxt += (item + "<br />");
//   });
  //$('#bonus span').html( bonusTxt );
  }
  $('#answer span').text( bagsSet.size - 1);
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  outerBags( data );
  //$('#answer2 span').text(  );
  //bagsSet.sort();
});
