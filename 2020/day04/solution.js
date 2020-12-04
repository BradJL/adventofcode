$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var valid = 0;
var moreValid = 0;

function parseport(value, index, array) {
  if( value == null || value == "" || value == undefined ) return;
  let items = value.replace(/cid:[0-9]*/,"").replace(/[^:]/g,"");
  console.log( items.length );
  if( items.length == 7 ){
    // part 1
    ++valid;
    
    // part 2
    items = value.replace(/cid:[0-9]*[ \n\t]/g,"");
    let byr = items.match(/byr:[0-9]*[ \n\t]/g).replace(/[ \n\t]/).split(":");
    let iyr = items.match(/iyr:[0-9]*[ \n\t]/g).replace(/[ \n\t]/).split(":");
    let eyr = items.match(/eyr:[0-9]*[ \n\t]/g).replace(/[ \n\t]/).split(":");
    let hgt = items.match(/hgt:[0-9]*(cm|in)[ \n\t]/g).replace(/[ \n\t]/).split(":");
    let hgtNum = hgt[1].replace(/[^0-9]/,"");
    let hcl = items.match(/hcl:#[0-9a-f]{6}[ \n\t]/g).replace(/[ \n\t]/).split(":");
    let ecl = items.match(/ecl:(amb|blu|brn|gry|grn|hxl|oth)[ \n\t]/g).replace(/[ \n\t]/).split(":");
    let pid = items.match(/pid:[0-9]{9}[ \n\t]/g).replace(/[ \n\t]/).split(":");
  }
  
  if( ( byr[1].length == 4 && 1920 <= byr[1] && byr[1] <= 2002 ) &&
      ( iyr[1].length == 4 && 2010 <= iyr[1] && iyr[1] <= 2020 ) &&
      ( eyr[1].length == 4 && 2020 <= eyr[1] && iyr[1] <= 2030 ) &&
      ( ( hgt[1].slice[1](-2) == "cm" && 150 <= hgtNum && hgtNum <= 193 ) ||
        ( hgt[1].slice[1](-2) == "in" && 59 <= hgtNum && hgtNum <= 76 ) ) &&
      ( hcl[1].length == 7 ) &&
      ( ecl.length == 2 ) &&
      ( pid.length == 9 ) ){
    ++moreValid;
  }
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.split(/\n\n/).forEach(parseport);
  $('#answer span').text(valid);
  $('#answer2 span').text(moreValid);
});
