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
              if( 150 > parseInt(tmp[1]) || parseInt(tmp[1]) > 193 ){ cont = "hgt-cm"; }
              break;
            case "in":
              if( 59 > tmp[1] || tmp[1] > 76 ){ cont = "hgt-in"; }
              break;
            default:
              cont = "hgt-not-cm|in";
              break;
          }
          break;
        case "hcl":
          //if( tmp[1].length != 7 || tmp[1].slice(0,1) != '#' || tmp[1].replace(/[0-9]/g,"").length != 1 ){ cont = "hcl"; }
          if( tmp[1].length != 7 ){ cont = "hclLen7-" + tmp[1].length; }
          if( tmp[1].slice(0,1) != '#' ){ cont = "hcl#-" + tmp[1].slice(0,1) }
          if( tmp[1].replace(/[0-9a-f]/g,"").length != 1 ){ cont = "hclLen1-" + tmp[1].replace(/[0-9]/g,""); }
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
              cont = "ecl";
              break;
          }
          break;
        case "pid":
          if( tmp[1].length != 9 || tmp[1].replace(/[0-9]/g, "").length != 0 ){ cont = "pid"; }
          break;
        case "cid":
          break;
        default:
          1/0;
          break;
      }
    }
    if( cont == true ){
      ++moreValid;
      items.push( "valid" );
      console.log( items );
    } else {
      items.push( "xError:" + cont );
      console.log( items );
    }
  }
}

$.get( "input.txt", function( data ) {
  let passports = data.split(/\n\n/);
  passports.forEach(parseportList);
  
  $('#input span').text('(Passports: ' + (passports.length) + ')');
  $('#answer span').text(valid);
  $('#answer2 span').text(moreValid);
});
