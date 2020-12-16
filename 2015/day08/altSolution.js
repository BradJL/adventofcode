function getTotalNumberOfCharacter(line){
    return line.length;
}

function getNumberOfCharacterInMemory(line){
    let size = 0;
    for(let index = 0; index < line.length; ++index){
        ++size;
        if(index == line.length - 1){
            continue;
        }
        if(line[index] == '\\' && line[index + 1] == '\\'){
            ++index;
        } else if(line[index] == '\\' && line[index + 1] == '"'){
            ++index;
        } else if(line[index] == '\\' && line[index + 1] == 'x'){
            index += 3;
        }
    }
    return size - 2; // Subtracts the two " around the word
}

//assert(argc == 3);

//std::ifstream file(argv[1]);
//assert (file.is_open());

//const auto expectedResult = atoi (argv[2]);

//std::string fileContent((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
$.get( "input.txt", function( data ) {
  $('#input span').text('(Bytes: ' + (data.length) + ')');

  let totalNumberOfCharacter = 0;
  let inMemoryNumberOfCharacter = 0;

  data = data.trim().split(/\r?\n/).forEach(function(line, index, array) {
    totalNumberOfCharacter += getTotalNumberOfCharacter(line);
    inMemoryNumberOfCharacter += getNumberOfCharacterInMemory(line);
  });
  
  let result = totalNumberOfCharacter - inMemoryNumberOfCharacter;
  console.log( "The result found is " + result );
});