function initialize(){
  $('#answer span').text('Calculating...');
  $('#answer2 span').text('Calculating...');
  
  // var canvas = document.getElementById("visualization");
  // var ctx = canvas.getContext("2d");
  // var canvas2 = document.getElementById("visualization2");
  // var ctx2 = canvas2.getContext("2d");  
}

// const fs = require('fs').promises;

function clone( obj ){
  return JSON.parse(JSON.stringify(obj));
}

function score( player1, player2 ){
  let score = 0;
  while( player1.length ){
    score += player1.length * player1.shift();
  }
  while( player2.length ){
    score += player2.length * player2.shift();
  }
  return score;
}

function combat( player1, player2 ){
  let card1, card2;
  let round = 1;
  while( player1.length > 0 && player2.length > 0 ){
    console.log( "-- Round " + round + " --" );
    console.log( "Player 1's deck: " + player1 );
    console.log( "Player 2's deck: " + player2 );
    card1 = player1.shift();
    card2 = player2.shift();
    console.log( "Player 1 plays: " + card1 );
    console.log( "Player 2 plays: " + card2 );
    if( card1 > card2 ){
      console.log( "Player 1 wins the round!" );
      player1.push( card1 );
      player1.push( card2 );
    } else {
      console.log( "Player 2 wins the round!" );
      player2.push( card2 );
      player2.push( card1 );
    }
    ++round;
  }
  console.log( "== Post-game results ==" );
  console.log( "Player 1's deck: " + player1 )
  console.log( "Player 2's deck: " + player2 );
  return [ player1, player2 ];
}

function recursiveCombat( player1, player2 ){
  let configurations = [];
  let round = 1;
  let card1, card2;
  while( player1.length > 0 && player2.length > 0 ){
    console.log( "-- Round " + round + " --" );
    console.log( "Player 1's deck: " + player1 );
    console.log( "Player 2's deck: " + player2 );
    if( configurations[ score( clone(player1), [] ) * 100000 + score( [], clone(player2) ) ] ){
      console.log( "ending game early..." );
      return [[1],[]];
    } else {
      configurations[ score(clone(player1), clone(player2)) ] = true;
    }
    card1 = player1.shift();
    card2 = player2.shift();
    console.log( "Player 1 plays: " + card1 + "(" + player1.length + ")" );
    console.log( "Player 2 plays: " + card2 + "(" + player2.length + ")" );
    if( player1.length >= card1 && player2.length >= card2 ){
      console.log( "Recursive combat!!!");
      let result = recursiveCombat( player1.slice(0,card1), player2.slice(0,card2) );
      if( result[0].length ){
        console.log( "Player 1 wins the recursive round!" );
        player1.push( card1 );
        player2.push( card2 );
      } else {
        console.log( "Player 2 wins the recursive round!" );
        player2.push( card2 );
        player2.push( card1 );
      }
    } else {
      if( card1 > card2 ){
        console.log( "Player 1 wins the round!" );
        player1.push( card1 );
        player1.push( card2 );
      } else {
        console.log( "Player 2 wins the round!" );
        player2.push( card2 );
        player2.push( card1 );
      }
    }
    ++round;
  }
  console.log( "== Post-game results ==" );
  console.log( "Player 1's deck: " + player1 )
  console.log( "Player 2's deck: " + player2 );
  return [ player1, player2 ];
}

function part1( data ){
  let player1 = [];
  let player2 = [];
  let decks = data.trim().split(/\r?\n\r?\n/);
  decks[0].split(/\r?\n/).slice(1).forEach(function(card,index,array){
    player1.push( parseInt( card ) );
  });
  decks[1].split(/\r?\n/).slice(1).forEach(function(card,index,array){
    player2.push( parseInt( card ) );
  });
  
  let result = combat( player1, player2 );
  player1 = result[0];
  player2 = result[1];

  return score( player1, player2 );
}

function part2( data ){
  let player1 = [];
  let player2 = [];
  let card1, card2;
  let decks = data.trim().split(/\r?\n\r?\n/);
  decks[0].split(/\r?\n/).slice(1).forEach(function(card,index,array){
    player1.push( parseInt( card ) );
  });
  decks[1].split(/\r?\n/).slice(1).forEach(function(card,index,array){
    player2.push( parseInt( card ) );
  });
  
  let result = recursiveCombat( player1, player2 );
  player1 = result[0];
  player2 = result[1];

  return score( player1, player2 );
}

function readFile(filePath){
  $.get( filePath, function( data ) {
    $('#input span').text('(Bytes: ' + (data.length) + ')');
//     let part1Answer = part1( data );
//     $('#answer span').text( part1Answer );
    let part2Answer = part2( data );
    $('#answer2 span').text( part2Answer );
  });
}
// async function readFile(filePath){
//   try {
//     const constData = await fs.readFile(filePath);
//     let part1Answer = part1( constData.toString() );
//     console.log( "Part 1 answer: " + part1Answer );

//     let part2Answer = part2( constData.toString() );
//     console.log( "Part 2 answer: " + part2Answer );
//   } catch (error) {
//     console.error(`Got an error trying to read the file: ${error.message}`);
//   }
// }

initialize();
readFile('input.txt');
