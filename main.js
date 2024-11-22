const prompt = require('prompt-sync')({sigint: true});

console.log('Try to find the hat (^) while staying within the field and not falling into the hole(s)!');
console.log('Your character: *');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(array) {
    this._array = array;
  }
  get array() {
    return this._array;
  }
  print() {
    for (let i = 0; i < this.array.length; i++) {
        console.log(this.array[i].join(''));
    }
  }
  static generateField(height, width, percentage) {
    let fieldArray = [];
    let fieldArrayRow = [];
    for (let i = 0; i < height; i++) {
      fieldArray[i] = [];
      for (let j = 0; j < width; j++) {
        fieldArray[i].push(fieldCharacter);
      }
    }
    let hatWidthPosition = Math.floor(Math.random() * width);
    let hatHeightPosition = Math.floor(Math.random() * height);
    fieldArray[hatHeightPosition][hatWidthPosition] = hat;
    let numberOfHoles =  Math.floor(((height * width) / (100 / percentage)));
    //console.log(numberOfHoles);
    let numberOfHolesImplemented = 0;
    for (let i = 1; i < height; i++) {
      for (let j = 0; j < width; j++) {
          let randomFieldOrHatCharacter = Math.floor(Math.random() * 2);
          if (fieldArray[i][j] !== hat) {
            if (randomFieldOrHatCharacter === 0) {
              if (numberOfHolesImplemented === numberOfHoles) {
                break;
              } else {
                fieldArray[i][j] = hole;
                numberOfHolesImplemented++;
              }
            } 
          }
      }
    }
    if (numberOfHolesImplemented < numberOfHoles) {
      for (let k = 0; k < (numberOfHoles - numberOfHolesImplemented); k++) {
        for (let i = 1; i < height; i++) {
          for (let j = 0; j < width; j++) {
            if (fieldArray[i][j] === fieldCharacter) {
              if (numberOfHolesImplemented === numberOfHoles) {
                break;
              } else {
                fieldArray[i][j] = hole;
                numberOfHolesImplemented++;
              }
            }
          }
        }
      }
    }
    let pathCharacterWidthPosition = Math.floor(Math.random() * width);
    //console.log('Path character width position ' + pathCharacterWidthPosition);
    let pathCharacterHeightPosition = Math.floor(Math.random() * height);
    //console.log('Path character height position: ' + pathCharacterHeightPosition);
    if (fieldArray[pathCharacterHeightPosition][pathCharacterWidthPosition] !== hole && fieldArray[pathCharacterHeightPosition][pathCharacterWidthPosition] !== hat) {
      fieldArray[pathCharacterHeightPosition][pathCharacterWidthPosition] = pathCharacter;
    } else {
      pathCharacterHeightPosition += 1;
      fieldArray[pathCharacterHeightPosition][pathCharacterWidthPosition] = pathCharacter;
    }
    return [pathCharacterWidthPosition, pathCharacterHeightPosition, fieldArray];
  }
}

let rows = prompt('How many rows to a field do You want ? ');
let columns = prompt('How many columns to a field do You want ? ');
let percentageOfHoles = prompt('How much of the field do You want to be covered in holes (in percentages) ? ');

const generateFieldValues = Field.generateField(rows, columns, percentageOfHoles);
const field1 = new Field([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]);
const field = new Field(generateFieldValues[2]);

let i = generateFieldValues[1];
let j = generateFieldValues[0];
do {
  console.log('Current field:');
  field.print();
  //console.log('Field array length: ' + field.array.length);
  let userInput = prompt('Play your next move (u - up, d - down, l - left, r - right): ');
  if (userInput === 'd' && i+1 < field.array.length) {
    if (field.array[i+1][j] === hole) {
      console.log('You have lost the game!');
      break;
    } else if (field.array[i+1][j] === hat) {
      console.log('Congratulations! You have won the game');
      break; 
    } else {
      field.array[i+1][j] = pathCharacter;
      field.array[i][j] = fieldCharacter;
      i++;
    }
    //console.log('Current i: ' + i);
    } else if (userInput === 'd' && i+1 === field.array.length) {
      console.log('You have moved outside the field of play');
      break;
    } else if (userInput === 'u' && i-1 >= 0) {
      if (field.array[i-1][j] === hole) {
        console.log('You have lost the game!');
        break;
      } else if (field.array[i-1][j] === hat) {
        console.log('Congratulations! You have won the game');
        break;
      } else {
        field.array[i-1][j] = pathCharacter;
        field.array[i][j] = fieldCharacter;
        i--;
      }
      //console.log('Current i: ' + i);
    } else if (userInput === 'u' && i-1 < 0) {
      console.log('You have moved outside the field of play');
      break;
    } else if (userInput === 'r' && j+1 < field.array[0].length) {
      if (field.array[i][j+1] === hole) {
        console.log('You have lost the game!');
        break;
      } else if (field.array[i][j+1] === hat) {
        console.log('Congratulations! You have won the game');
        break;
      } else {
        field.array[i][j+1] = pathCharacter;
        field.array[i][j] = fieldCharacter;
        j++;
      }
      //console.log('Current j: ' + j);
    } else if (userInput === 'r' && j+1 === field.array[i].length) {
      console.log('You have moved outside the field of play');
      break;
    } else if (userInput === 'l' && j-1 >= 0) {
      if (field.array[i][j-1] === hole) {
        console.log('You have lost the game!');
        break;
      } else if (field.array[i][j-1] === hat) {
        console.log('Congratulations! You have won the game');
        break;
      } else {
        field.array[i][j-1] = pathCharacter;
        field.array[i][j] = fieldCharacter;
        j--;
      }
      //console.log('Current j: ' + j);
    } else if (userInput === 'l' && j-1 < 0) {
      console.log('You have moved outside the field of play');
      break;
    }
} while (pathCharacter !== hat || pathCharacter !== hole)