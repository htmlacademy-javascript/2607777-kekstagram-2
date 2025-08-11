const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/';

const getData = () => fetch(`${BASE_URL}data`)
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
  .catch((err) => ({
    hasError: true,
    err,
  }));

const sendData = (body) => fetch(BASE_URL,
  {
    method: 'POST',
    body
  }
)
  .then((response) => {
    if (response.ok) {
      return null;
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  })
  .catch((error) => error);


export { getData, sendData };
