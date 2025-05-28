
const isLessOrEqual = (testString, amountSymbols) =>
  testString.length <= amountSymbols;
console.log(isLessOrEqual('опа', 2));

const isPalindrome = (text) => {
  const normalizedText = text
    .replaceAll(' ', '')
    .toUpperCase();
  let reversedText = '';
  for (let i = normalizedText.length - 1; i >= 0 ; i -= 1) {
    reversedText += normalizedText.at(i);
  }
  return normalizedText === reversedText;
};

