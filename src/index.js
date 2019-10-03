const $app = document.getElementById('app');
const $final = document.getElementById('final')
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
//const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters'
let flag = 0
if(localStorage.getItem('next_fetch')) {
  //localStorage.removeItem('next_fetch');
  localStorage.clear();
  alert('limpia Storage')
}

const getData = async api => {
  try{
    const response = await fetch(api)
    const result = await response.json()
    const characters = result.results
    localStorage.setItem('next_fetch', result.info.next);
    let output = characters.map(character => {
      return `
    <article class="Card">
      <img src="${character.image}" />
      <h2>${character.name}<span>${character.species}</span></h2>
    </article>
  `
    }).join('');
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } catch(error) {
    console.log(`Algo salio mal ${error}`)
  }
};

const finishApi = () => {
  intersectionObserver.unobserve($observe);

  let final = `<h1>No hay mas personajes!!!</h1>`
  let newItem = document.createElement('section');
  newItem.classList.add('final');
  newItem.innerHTML = final;
  $final.appendChild(newItem);
}


const loadData = () => {

  const nextPage = localStorage.getItem('next_fetch');
  if(!nextPage) {
    if(flag === 0) {
      getData(API)
      flag = 1
    } else {
      finishApi()
    }     
  } else {    
    getData(nextPage)
  }
}

const intersectionObserver = new IntersectionObserver(entries => {  
  

  if (entries[0].isIntersecting) {
    loadData();    
  }

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
