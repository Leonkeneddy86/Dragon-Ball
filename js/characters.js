const requestURL = '."https://dragonball-api.com/api/characters?limit=58",';

async function fetchCharactersJson(){
    const response = await fetch(requestURL);
    try{
        if (!response.ok) {
            throw new Error(`Error en la petición al Json ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error('Error al obetener los personajes de la Api : ', error);
        return null;
    }
   
}

function createCarsCard ({name, ki, maxKi, gender, affiliation, race, image}){
    return `
        <div class="card" style="width: 550px;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${race} - ${gender}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${maxKi}</li>
                <li class="list-group-item">${affiliation}</li>
                <li class="list-group-item">${ki}</li>
            </ul>
        </div>
`;
}

async function displayCars() {
    const charactersSection = document.getElementById('carSection');
    const charactersData = await fetchCharactersJson();

    if (charactersData && charactersData.cars){
        const charactersCards = charactersData.cars.map(createCarsCard).join('');
        charactersSection.innerHTML = charactersCards;
    }
    else
    {
        charactersSection.innerHTML = `<p>No se ha podido cargar el Json de los personajes</p>`;    
    }
}


displaycharacters();