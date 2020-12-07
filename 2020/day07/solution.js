$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

function add( value, bagsSet, bagsArray ) {
  let bag = value.replace(/s* contain.*/,"");
  let tmpSize = bagsSet.size;
  bagsSet.add( bag );
  if( bagsSet.size > tmpSize ){
    bagsArray.push( bag );
  }
}

function outerBags( data ){
  let bagsArray = [ "shiny gold bag" ];
  let bagsSet = new Set( bagsArray );
  while( bagsArray.length ){
    let bag = bagsArray.pop();
    //console.log( bag );
    let newBags = data.match( new RegExp( ".*contain.*" + bag, 'g' ) )
    if( newBags ){
      newBags.forEach(function(item) {
        add(item, bagsSet, bagsArray);
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

function innerBags( bag, data ){
  let total = 0;
  let newBags = data.match( new RegExp( bag + "s contain.*", 'g' ) );
  newBags[0].replace( bag + "s contain ", '' ).replace( '\.', '' ).split(/,/).forEach(function(item) {
    //console.log( item );
      let num;
      let newBag;
      let add;
    try{
      num = parseInt((item.match(/[0-9]+/))[0]);
      newBag = (item.match(/[a-z]+ [a-z ]*bag/))[0];
      console.log( num " + " + x " + newBag );
      add = num * innerBags(newBag, data);
      //console.log( num + " x " + newBag )
    } catch(e){
      add = 1;
      //console.log( 1 )
    }
    //console.log( "num: " + num );
    //console.log( "newBag: " + newBag );
    //console.log( "add: " + add );
    total += add;
  });
  console.log( total );
  return total;
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  outerBags( data );
  $('#answer2 span').text( innerBags( "shiny gold bag", data ) );
});
