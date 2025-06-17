
const isLessOrEqual = (testString, amountSymbols) =>
  testString.length <= amountSymbols;

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
const getTimeConv = (time) => {
  const timelist = time.split(':');
  const finalResult = Number(timelist[0]) * 60 + Number(timelist[1]);
  return finalResult;
};
//console.log(getTimeConv('00:01'));

const isWorkTime = (startDate, endDate, startMeet, durationMeet) =>{
  const duration = durationMeet + getTimeConv(startMeet);
  if(getTimeConv(startDate) <= duration && duration <= getTimeConv(endDate)){
    return true;
  }else {
    return false;
  }
};

