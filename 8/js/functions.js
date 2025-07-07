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
const getTimeInMinutes = (time) => {
  const timelist = time.split(':');
  const timeInMinutes = Number(timelist[0]) * 60 + Number(timelist[1]);
  return timeInMinutes;
};
//console.log(getTimeConv('00:01'));

const isWorkTime = (startTime, endTime, startMeet, durationMeet) =>{
  const endMeetInMinutes = durationMeet + getTimeInMinutes(startMeet);
  return getTimeInMinutes(startTime) <= endMeetInMinutes && endMeetInMinutes <= getTimeInMinutes(endTime);
};
