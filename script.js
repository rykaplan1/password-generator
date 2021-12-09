// Assignment Code
const generateBtn = document.querySelector("#generate");

// Shuffle an array using Fisher-Yates shuffle algorithm (adapted from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  // While there are still elements left to shuffle...
  while (currentIndex != 0) {
    // Pick a remaaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // ...and swap it with the current element
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]] 
  }
}

// Generate password with user specifications
function generatePassword(length, allowedCharacters) {
  const LOWERCASE = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  const UPPERCASE = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const SPECIAL = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "{", "]", "}", "\\", "|", ";", ":", "\'", "\"", ",", "<", ".", ">", "/", "?"];

  let characterPool = [];

  // Add specified character families to characterPool
  if (allowedCharacters.useLowercase) {
    characterPool = characterPool.concat(LOWERCASE);
  }
  if (allowedCharacters.useUppercase) {
    characterPool = characterPool.concat(UPPERCASE);
  }
  if (allowedCharacters.useNumbers) {
    characterPool = characterPool.concat(NUMBERS);
  }
  if (allowedCharacters.useSpecial) {
    characterPool = characterPool.concat(SPECIAL);
  }

  // Shuffle characterPool
  shuffleArray(characterPool);
  // Select random characters and add them to password
  let password = "";
  while (password.length < length) {
    const randIndex = Math.floor(Math.random() * characterPool.length);
    const randChar = characterPool[randIndex];
    password += randChar;
  }
  return password;
}
  
function getLength() {
  // Get length from user
  let lengthInput = prompt("How many characters do you want the password to be?");
  let length = parseInt(lengthInput);
  // Validate input only if OK was clicked, otherwise let input remain null
  if (lengthInput !== null) {
    // Boolean function, returns true if any criteria for the length input are not met
    const notValidInput = () => (isNaN(length) || lengthInput.includes('.') ||length < 8 || length > 128);
    while (notValidInput()) {
      if (isNaN(length)) {
        alert("Please enter a number.")
      } else {
        if (lengthInput.includes('.')) {
          alert("Please enter a whole number, not a decimal");
        } else if (length < 8) {
          alert("Length must be at least 8 characters");
        } else if (length > 128) {
          alert("Length must be no more than 128 characters");
        }
      }
      lengthInput = prompt("How many characters do you want the password to be?");
      if (lengthInput === null) {
        length = null;
        break;
      }
      length = parseInt(lengthInput);
    }
  } else {
    length = null;
  }
  return length;
}

function getCharacterFamilies() {
  // Object that holds booleans determining what character families should be used
  let allowedCharacters = {
    useLowercase: false,
    useUppercase: false,
    useNumbers: false,
    useSpecial: false
  };

  // Boolean function, returns true if all properties in allowedCharacters have values of false
  const noSpecifiedCharacters = () => (!allowedCharacters.useLowercase && !allowedCharacters.useUppercase && !allowedCharacters.useNumbers && !allowedCharacters.useSpecial);
  

  // Prompt user to specifiy character families while none are specified
  while (noSpecifiedCharacters()) {
    allowedCharacters.useLowercase = confirm("Press OK to use lowercase letters, otherwise press cancel.");
    allowedCharacters.useUppercase = confirm("Press OK to use uppercase letters, otherwise press cancel.");
    allowedCharacters.useNumbers = confirm("Press OK to use numeric characters, otherwise press cancel.");
    allowedCharacters.useSpecial = confirm("Press OK to use special characters, otherwise press cancel.");

    // Alert user if no character families have been specified
    if (noSpecifiedCharacters()) {
      const abortPrompt = confirm("Please choose at least one character type. If you wish to abort, press cancel.");

      if (!abortPrompt) {
        allowedCharacters = null;
        break;
      }
    }
  }
  return allowedCharacters;
}

// Write password to the #password input
function writePassword() {
  const length = getLength();
  if (length !== null) {
    const allowedCharacters = getCharacterFamilies();
    if (allowedCharacters !== null) {
      const password = generatePassword(length, allowedCharacters);
      let passwordText = document.querySelector("#password");
    
      passwordText.value = password;
    }
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);