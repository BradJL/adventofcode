$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');
var numValid = 0;
var numValid2 = 0;
function countValid(value, index, array) {
  if( value == null || value == "" || value == undefined ) return;
    //console.log( "[" + value + "]" );
    let items = value.split(' ');
    let nums = items[0].split('-');
    let min = parseInt(nums[0]);
    let max = parseInt(nums[1]);
    let letter = items[1][0];
    let password = items[2];
    let passLetters ="";

    let re = new RegExp('[^' + letter + ']', 'g');
    passLetters = password.replace( re, '' );
    //console.log( value + " | " + min + letter + max + password + " | " + passLetters + passLetters.length );
    if( passLetters.length >= min && passLetters.length <= max ){
     ++numValid;
     //console.log( "found one! " + numValid );
    }
//    $('#answer span').text(numValid);
    if( (password[min-1] == letter && password[max-1] != letter) || (password[min-1] != letter && password[max-1] == letter) ){
     ++numValid2;
     //console.log( "found one! " + numValid );
  }
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Passwords: ' + (input.length-1) + ')');
  data.split(/\r?\n/).forEach(countValid);
  $('#answer span').text(numValid);
  $('#answer2 span').text(numValid2);
});
