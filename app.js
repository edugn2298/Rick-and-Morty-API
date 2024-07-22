//Paginación
const url = 'https://rickandmortyapi.com/api/character/?page=';
const paginacion = document.querySelector('#paginas');
const charactersContainer = document.getElementById('charactersContainer');
function paginas(){
  for(let i=1; i<=42; i++){
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    paginacion.appendChild(option);
  }
}
paginas();
function Inicial(e){
  try{
    fetchCharacters(url+e.target.value);
  } catch (error){
    console.error('Error al cargar los personajes:', error);
  }
};

paginacion.addEventListener('change', Inicial);
window.addEventListener('load', Inicial);

// Obtén datos de la API de Rick and Morty
async function fetchCharacters(url) {
  try {
      const response = await fetch(url);
      const data = await response.json();
      displayCharacters(data.results);
  } catch (error) {
    charactersContainer.innerHTML =`
      <div class="bg-red-100 text-red-600 p-4">
      No se encontraron personajes. Inténtalo de nuevo.
    </div>
    `;
    console.error('Error al obtener datos:', error);
    return [];
  }
}

// Muestra los personajes en la vista
function displayCharacters(characters) {
  charactersContainer.innerHTML = '';
  characters.forEach(character => {
      const card = document.createElement('div');
      card.innerHTML = `
      <div class="bg-purple-900 rounded-lg shadow-lg p-4">
        <!-- Foto del personaje -->
        <img src="${character.image}" alt="Foto del personaje" class="w-full h-auto mb-2">

        <!-- Nombre del personaje -->
        <h2 class="text-white text-xl font-semibold mb-2">${character.name}</h2>

        <!-- Detalles del personaje -->
        <div class="text-gray-300">
          <p>Estado: <span class="text-green-400">${character.status}</span></p>
          <p>Raza: ${character.species}</p>
        </div>
      </div>
      `;
      charactersContainer.appendChild(card);
  });
}

//Busqueda por nombre
const barraBusqueda = document.querySelector("#searchInput");
barraBusqueda.addEventListener('input' ,(e)=> {
  try {
    fetchCharacters(`https://rickandmortyapi.com/api/character/?name=${e.target.value}`);
  } catch (error){
    charactersContainer.innerHTML =`
      <div class="bg-red-100 text-red-600 p-4">
      No se encontraron personajes. Inténtalo de nuevo.
    </div>
    `;
  }

});
