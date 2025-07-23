import { isEscapeKey } from './util.js';
//import {showAlert} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplateSend = document.querySelector('#error').content.querySelector('.error');
const errorTemplateGet = document.querySelector('#data-error').content.querySelector('.data-error');

export const showSuccess = () => {
  const successFragment = document.createDocumentFragment();
  const successElement = successTemplate.cloneNode(true);
  successFragment.append(successElement);
  document.body.append(successFragment);
  const closeButton = successElement.querySelector('.success__button');
  const onSuccessEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successElement.remove();
    }
  };
  closeButton.addEventListener('click', () => {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessEscKeydown);
  });

  document.addEventListener('keydown', onSuccessEscKeydown, { once: true });

  successElement.addEventListener('click', (evt) => {
    if(evt.target.className === 'success' && evt.currentTarget.className === 'success') {
      successElement.remove();
    }
  });

};

export const showErrorSend = () => {
  const errorFragment = document.createDocumentFragment();
  const errorElement = errorTemplateSend.cloneNode(true);

  errorFragment.append(errorElement);
  document.body.append(errorFragment);
  const closeButton = errorElement.querySelector('.error__button');
  const onErrorEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorElement.remove();
    }
  };
  closeButton.addEventListener('click', () => {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
  });

  document.addEventListener('keydown', onErrorEscKeydown, { once: true });

  errorElement.addEventListener('click', (evt) => {
    if(evt.target.className === 'error' && evt.currentTarget.className === 'error') {
      errorElement.remove();
    }
  });

};

const TIMEOUT = 5000;

export const showErrorGet = () => {
  const errorElement = errorTemplateGet.cloneNode(true);
  const errorArea = errorElement.querySelector('.data-error__title').textContent;

  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = errorArea;

  document.body.append(alertContainer);

  setTimeout(() =>{
    alertContainer.remove();
  }, TIMEOUT);
};
