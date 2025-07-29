const getData = () => fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  })
  .then((data) => ({
    hasError: false,
    data,
  }))
  .catch((error) => ({
    hasError: true,
    error,
  }));
/*
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
*/
const sendData = (body) => fetch('https://31.javascript.htmlacademy.pro/kekstagram',
  {
    method: 'POST',
    body
  }
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  })
  .then((data) => ({
    hasError: false,
    data,
  }))
  .catch((error) => ({
    hasError: true,
    error,
  }));


export { getData, sendData };
