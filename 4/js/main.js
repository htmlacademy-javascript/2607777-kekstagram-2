const description = [ 'Я в кафе', 'ловлю мышь', 'Залез на холодильник', 'Катаю шарик', 'Сплю под одеялом'];
const message = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.' ,
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const name = ['Андрей', 'Олег', 'Михаил', 'Ксения', 'Мария'];

const getRandomPositiveInteger = (a, b) =>{
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) => elements [getRandomPositiveInteger(0, elements.length - 1)];
const getComments = () =>{
  const limit = getRandomPositiveInteger(0,30);
  const comments = [];
  for (let i = 0; i < limit; i += 1) {
    const comment = {
      commentId : i,
      commentAvatar : `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      commentMessage : getRandomArrayElement(message),
      commentName : getRandomArrayElement(name)
    };
    comments.push(comment);
  }
  return comments;
};

const getDesc = (i) =>{
  const Desc = {
    id: i,
    url:`photos/${i}.jpg`,
    description: getRandomArrayElement(description),
    comments: getComments()
  };
  return Desc;
};

const createPhotoDesc = () =>{
  const photoListDesc = [];
  for(let i = 1; i <= 25; i += 1) {
    photoListDesc.push(getDesc(i));
  }
  return photoListDesc;
};


