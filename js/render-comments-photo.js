const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPictureForm = document.querySelector('.big-picture');
const bigPictureSocialComments = bigPictureForm.querySelector('.social__comments');
const socialCommentTemplate = bigPictureSocialComments.querySelector('.social__comment');
const bigPictureCommentsCount = bigPictureForm.querySelector('.social__comment-count');
const bigPictureCommentsLoaderButton = bigPictureForm.querySelector('.social__comments-loader');

bigPictureSocialComments.innerHTML = '';

const renderNextComments = () =>{
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentNode);
  });

  bigPictureSocialComments.appendChild(socialCommentsFragment);
  bigPictureCommentsCount.firstChild.textContent = `${renderedCommentsLength}`;
  bigPictureCommentsCount.querySelector('.social__comment-total-count').textContent = comments.length;

  if(renderedCommentsLength >= comments.length) {
    bigPictureCommentsLoaderButton.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

export const clearComments = () => {
  currentCount = 0;
  bigPictureSocialComments.innerHTML = '';
  bigPictureCommentsLoaderButton.classList.remove('hidden');
  bigPictureCommentsLoaderButton.removeEventListener('click', renderNextComments);
};

export const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();

  bigPictureCommentsLoaderButton.addEventListener('click', renderNextComments);
};
