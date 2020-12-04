$('#answer span').text('Calculating...');
$('#answer2 span').text('Calculating...');

var valid = 0;
var moreValid = 0;

function parseportList(value, index, array) {
  if( value == null || value == "" || value == undefined ) return;
  let items = value.replace(/cid:[0-9]*/,"").replace(/[^:]/g,"");
  if( items.length == 7 ){
    // part 1
    ++valid;
    
    // part 2
    items = value.trim().split(/[ \n\t]/);//.replace(/[ \n\t]/g," ");
    let tmp;
    let cont = true;
    for( let i = 0; i < items.length && cont == true; ++i ){
      tmp = items[i].split(":");
      switch( tmp[0] ){
        case "byr":
          if( tmp[1].length != 4 || 1920 > tmp[1] || tmp[1] > 2002 ){ cont = "byr"; }
          break;
        case "iyr":
          if( tmp[1].length != 4 || 2010 > tmp[1] || tmp[1] > 2020 ){ cont = "iyr"; }
          break;
        case "eyr":
          if( tmp[1].length != 4 || 2020 > tmp[1] || tmp[1] > 2030 ){ cont = "eyr"; }
          break;
        case "hgt":
          let tmpUnit = tmp[1].slice(-2);
          let tmpNum = tmp[1].replace(/[^0-9]/,"");
          switch( tmpUnit ){
            case "cm":
              if( 150 > tmp[1] || tmp[1] > 193 ){ cont = "hgt-cm"; }
              break;
            case "in":
              if( 59 > tmp[1] || tmp[1] > 76 ){ cont = "hgt-in"; }
              break;
            default:
              cont = "hgt not cm|in";
              break;
          }
          break;
        case "hcl":
          if( tmp[1].length != 7 || tmp[1].slice(0,1) != '#' || tmp[1].replace(/[0-9]/g,"").length != 1 ){ cont = false; }
          break;
        case "ecl":
          switch( tmp[1] ){
            case "amb":
            case "blu":
            case "brn":
            case "gry":
            case "grn":
            case "hzl":
            case "oth":
              break;
            default:
              cont = false;
              break;
          }
          break;
        case "pid":
          if( tmp[1].length != 9 || tmp[1].replace(/[0-9]/g, "").length != 0 ){ cont = false; }
          break;
        case "cid":
          break;
        default:
          1/0;
          break;
      }
    }
//     let byr = items.match(/byr:[0-9]*[ \n\t]/g)[0].trim().split(":");
//     let iyr = items.match(/iyr:[0-9]*[ \n\t]/g)[0].trim().split(":");
//     let eyr = items.match(/eyr:[0-9]*[ \n\t]/g)[0].trim().split(":");
//     let hgt = items.match(/hgt:[0-9]*(cm|in)[ \n\t]/g)[0].trim().split(":");
//     let hgtNum = hgt[1].replace(/[^0-9]/,"");
//     let hcl = items.match(/hcl:\#[0-9a-f]{6}[ \n\t]/g)[0].trim().split(":");
//     let ecl = items.match(/ecl:(amb|blu|brn|gry|grn|hxl|oth)[ \n\t]/g)[0].trim().split(":");
//     let pid = items.match(/pid:[0-9]{9}[ \n\t]/g)[0].trim().split(":");
//     if( ( byr[1].length == 4 && 1920 <= byr[1] && byr[1] <= 2002 ) &&
//         ( iyr[1].length == 4 && 2010 <= iyr[1] && iyr[1] <= 2020 ) &&
//         ( eyr[1].length == 4 && 2020 <= eyr[1] && iyr[1] <= 2030 ) &&
//         ( ( hgt[1].slice[1](-2) == "cm" && 150 <= hgtNum && hgtNum <= 193 ) ||
//           ( hgt[1].slice[1](-2) == "in" && 59 <= hgtNum && hgtNum <= 76 ) ) &&
//         ( hcl[1].length == 7 ) &&
//         ( ecl.length == 2 ) &&
//         ( pid.length == 9 ) ){
    if( cont == true ){
      ++moreValid;
      items.push( "valid" );
      console.log( items );
    } else {
      items.push( cont );
      console.log( items );
    }
  }
  
}

$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');
  data.split(/\n\n/).forEach(parseportList);
  $('#answer span').text(valid);
  $('#answer2 span').text(moreValid);
});
