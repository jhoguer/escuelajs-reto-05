const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
//const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters'

if(localStorage.getItem('next_fetch')) {
  //localStorage.removeItem('next_fetch');
  localStorage.clear();
}

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      localStorage.setItem('next_fetch', response.info.next);
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
    })
    .catch(error => console.log(error));
}

const loadData = (nextPage = API) => {
  if(!nextPage) {
    alert('Primer llamdo API')
    getData(API);
  } else {
    alert(nextPage)
    getData(nextPage)
  }
  //localStorage.removeItem('next_fetch');
}

const intersectionObserver = new IntersectionObserver(entries => {  
  const nextPage = localStorage.getItem('next_fetch');

  if (entries[0].isIntersecting) {
    loadData(nextPage);    
  }
  if(nextPage === "") {
    return
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
