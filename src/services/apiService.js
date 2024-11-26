// src/api.js
import axios from 'axios';

axios.get('http://localhost:3000/v1/callme/usuarios')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Failed to fetch clients:', error);
  });

  api.get('/v1/callme/usuarios')
  .then(response => console.log(response))
  .catch(error => console.error('Failed to fetch:', error));


export default api;