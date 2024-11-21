//const link = 'http://localhost:8080'
// const link = 'https://acme-filmes-back.onrender.com'
// const link = 'https://teste20241002-esh7gjgfc2hygtf0.brazilsouth-01.azurewebsites.net'
const url = 'http://localhost:3000'
const versao = 'v1'
const link = `${url}/${versao}/callme`

export async function getUsuarios() {

  const url = `${link}/usuarios`
  const response = await fetch(url)
  const data = await response.json()

  return data.dados
}
export async function getUsuario(id) {

  const url = `${link}/usuario/${id}`
  const response = await fetch(url)
  const data = await response.json()

  return data.dados
}
export async function getAvatares() {

  const url = `${link}/avatares`
  const response = await fetch(url)
  const data = await response.json()

  return data.dados
}

export async function getNotas(params) {

  let url = `${link}/notas?`
  if (params.excluidas) {
    url += `&excluidas=${params.excluidas}`
  }
  if (params.quantity) {
    url += `&quantity=${params.quantity}`
  }
  const response = await fetch(url)
  const data = await response.json()

  return data.dados
}

export async function postResposta(noteId) {
  const url = `${link}/notasresposta/nota/${noteId}`;

  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
  };

  try {
      const res = await fetch(url, options);
      const data = await res.json();

      if (!res.ok) {
          throw new Error(data.message || 'Erro ao enviar resposta');
      }

      return { success: true, data };
  } catch (error) {
      console.error('Erro ao enviar resposta: ', error);
      return { success: false, data: null, error: error.message };
  }
}

export async function postCliente(dados) {
  const url = `${link}/cliente`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('Erro ao enviar dados: ', error);
    return { success: false, data: null };
  }
}
export async function editCliente(dados,id) {
  const url = `${link}/cliente/usuario/${id}`
  const options = {
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try {
      const response = await fetch(url,options)
      const data = await response.json();
      return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar dados: ', error);
      return { success: false, data: null }; 
  }
}

export async function postEstudante(dados) {
  const url = `${link}/estudante`;
  
  const options = {
    method: 'POST',
    body: dados,
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return { success: response.ok, data };
  } catch (error) {
    console.error('Erro ao enviar dados: ', error);
    return { success: false, data: null };
  }
}

export async function postProfissional(dados) {
  const url = `${link}/profissional`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('Erro ao enviar dados: ', error);
    return { success: false, data: null };
  }
}

export async function getAutoajuda() {
  const url = `${link}/autoajudas`
  const response = await fetch(url)
  const data = await response.json()
  return data.dados
}
export async function deleteAutoajuda(id) {
  try{
    await fetch(`${link}/autoajuda/${id}`, {
      method: 'DELETE',
    });
    return true
  } catch (error) {
    console.error('Erro ao excluir autoajuda: ', error);
    return false
  }
}
export async function editAutoajuda(dados,id) {
  const url = `${link}/autoajuda/${id}`
  const options = {
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  try {
      const response = await fetch(url,options)
      const data = await response.json();
      return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar dados: ', error);
      return { success: false, data: null }; 
  }
}
export async function validateLogin(dados) {
  const url = `${link}/login`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('Erro ao enviar dados: ', error);
    return { success: false, data: null };
  }
}



export async function enviarPasswordRecovery(dados) {
  const url = `${link}/recuperacaosenha/enviaremail`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('Erro ao enviar dados: ', error);
    return { success: false, data: null };
  }
}

export function validarSenha(value) {

  const detalhesJSON = {
    minCharacter: (value.length >= 8),
    maxCharacter: (value.length <= 64),
    number: (/\d/.test(value)),
    lowerCase: (/[a-z]/.test(value)),
    upperCase: (/[A-Z]/.test(value)),
    specialCharacter: (/[^A-Za-z0-9]/.test(value))
  }

  let result = true

  for (let chave in detalhesJSON) {
    if (detalhesJSON[chave] === false) {
      result = false
      break;
    }
  }

  return {
    detalhes: detalhesJSON,
    result
  }
}

export function validarEmail(email) {  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  return regex.test(email);
}

// const http = require('http');
// const setupWebSocketServer = require('./websocketServer');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('WebSocket server is running.\n');
// });

// const wss = setupWebSocketServer(server);

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });