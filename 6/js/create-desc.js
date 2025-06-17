import {getRandomNumber, getRandomItem} from './util.js';

const descriptions = [ 'Я в кафе', 'ловлю мышь', 'Залез на холодильник', 'Катаю шарик', 'Сплю под одеялом'];
const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.' ,
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = ['Андрей', 'Олег', 'Михаил', 'Ксения', 'Мария'];

const getUniqueItem = () => {
  for (let i = messages.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [messages[i], messages[j]] = [messages[j], messages[i]]; // меняем местами элементы
  }
  return messages[0] + messages[1];
};

let currentId = 0;

const getUniqueId = () =>{
  currentId += 1;
  return currentId;
};

const getComments = () =>{
  const limit = getRandomNumber(0,30);
  const comments = [];
  for (let i = 0; i < limit; i += 1) {
    const comment = {
      id : getUniqueId(),
      avatar : `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message : getUniqueItem(),
      name : getRandomItem(names)
    };
    comments.push(comment);
  }
  return comments;
};

const getDesc = (i) =>{
  const Desc = {
    id: i,
    url:`photos/${i}.jpg`,
    description: getRandomItem(descriptions),
    likes: getRandomNumber(15,200),
    comments: getComments()
  };
  return Desc;
};

const getPhotoDesc = () =>{
  const photoListDesc = [];
  for(let i = 1; i <= 25; i += 1) {
    photoListDesc.push(getDesc(i));
  }
  return photoListDesc;
};

export {getPhotoDesc};
