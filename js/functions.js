const isLessOrEqual = (testString, amountSymbols) =>{
  if (testString.length <= amountSymbols){
    return true;
  }else {
    return false;
  }
};

const isPalindrom = (text) =>{
  const unspacedText = text.replaceAll(' ', '');
  const normalizedText = unspacedText.toUpperCase();
  let reversedText = '';
  for (let lastIndex = normalizedText.length - 1; lastIndex >= 0 ; lastIndex --) {
    reversedText += normalizedText.at(lastIndex);
  }
  if(normalizedText === reversedText){
    return true;
  } else {
    return false;
  }
};

