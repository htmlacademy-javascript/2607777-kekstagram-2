const getData = (onSuccess, onError) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch(() => onError());
};

const sendData = (onSuccess, onError, body) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onError();
    })
    .catch(() => {
      onError();
    });
};

export { getData, sendData };
