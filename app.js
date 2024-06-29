const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
const $n = document.querySelector('.name');  // se coloco el . para el selector sea correcto
const $b = document.querySelector('#blog');
const $l = document.querySelector('.location');

async function displayUser(username) {
  try {
    $n.textContent = 'cargando...';  // Indica que se está cargando la información
    const response = await fetch(`${usersEndpoint}/${username}`);  // Corrige la concatenación del URL
    if (!response.ok) {
      throw new Error('Network response was not ok');  //se agrego if para especificar en caso de error
    }
    const data = await response.json();  // la respuesta se convierta en JSON
    console.log(data);
    // Actualiza el contenido del DOM con los datos obtenidos de la API, usando valores predeterminados si no están disponibles
    $n.textContent = data.name || 'No name provided';
    $b.textContent = data.blog || 'No blog provided';
    $l.textContent = data.location || 'No location provided';
  } catch (err) {
    handleError(err);  // Llama a la función de manejo de errores si ocurre un error
  } 
}

function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  $n.textContent = `Algo salió mal: ${err.message}`;  // se agrego message para mostrar mensaje 
}

// Llama a la función displayUser con el nombre de usuario deseado
displayUser('stolinski').catch(handleError);
