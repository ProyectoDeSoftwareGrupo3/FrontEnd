const apiUrl = 'https://localhost:7052/api/Animal';
let currentPage = 1;
const itemsPerPage = 6;
let allAnimals = [];
let displayedAnimals = [];

document.addEventListener('DOMContentLoaded', () => {
  loadAnimals();

  document.getElementById('load-more-btn').addEventListener('click', () => {
    loadMoreAnimals();
  });

  document.getElementById('show-less-btn').addEventListener('click', () => {
    showLessAnimals();
  });


  document.getElementById('search-box').addEventListener('input', debounce(() => {
    loadAnimals();
  }, 50));
});

function loadAnimals() {
  const searchQuery = document.getElementById('search-box').value;
  const url = `${apiUrl}?nombre=${searchQuery}`;
  const loader = document.getElementById('loader');
  const noResults = document.getElementById('no-results');
  
  loader.style.display = 'block'; 
  noResults.style.display = 'none'; 

  fetch(url)
    .then(response => response.json())
    .then(data => {
      allAnimals = data;
      currentPage = 1;
      displayedAnimals = allAnimals.slice(0, itemsPerPage);
      renderAnimals(displayedAnimals);
      loader.style.display = 'none';

      if (allAnimals.length === 0) {
        noResults.style.display = 'block';
      }

      document.getElementById('load-more-btn').style.display = allAnimals.length > itemsPerPage ? 'inline-block' : 'none';
      document.getElementById('show-less-btn').style.display = 'none';
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      loader.style.display = 'none'; 
    });
}

function loadMoreAnimals() {
  const nextPageAnimals = allAnimals.slice(displayedAnimals.length, displayedAnimals.length + itemsPerPage);
  displayedAnimals = [...displayedAnimals, ...nextPageAnimals];
  renderAnimals(displayedAnimals);

  if (displayedAnimals.length >= allAnimals.length) {
    document.getElementById('load-more-btn').style.display = 'none';
  }
  document.getElementById('show-less-btn').style.display = 'inline-block';
}

function showLessAnimals() {
  displayedAnimals = allAnimals.slice(0, itemsPerPage);
  renderAnimals(displayedAnimals);
  scrollUp();

  document.getElementById('load-more-btn').style.display = 'inline-block';
  document.getElementById('show-less-btn').style.display = 'none';
}

function renderAnimals(animals) {
  const container = document.getElementById('animal-cards-container');
  container.innerHTML = '';
  animals.forEach(animal => {
    const card = document.createElement('div');
    card.classList.add('col-lg-4', 'mb-4', 'd-flex', 'fade-in'); // Add fade-in class for animation
    card.innerHTML = `
      <div class="card border-0 flex-fill d-flex flex-column">
        <div class="card-header position-relative border-0 p-0 mb-4 image-container">
          <img src="${animal.media[0]?.url || 'default-image.jpg'}" class="animal-image" alt="${animal.nombre}" />
          <div class="position-absolute d-flex flex-column align-items-center justify-content-center w-100 h-100"></div>
        </div>
        <div class="card-body text-center p-0 flex-fill d-flex flex-column">
          <ul class="list-group list-group-flush mb-4">
            <li class="list-group-item p-2">
              <i class="fa fa-heart text-secondary mr-2"></i> ${animal.nombre.toUpperCase()}
            </li>
            <li class="list-group-item p-2">
              <i class="text-secondary mr-2"></i> ${animal.edad} años
            </li>
            <li class="list-group-item p-2">
              <i class="text-secondary mr-2"></i> ${animal.historia}
            </li>
          </ul>
          <button class="btn btn-outline-primary mt-auto">Ver detalles</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function scrollUp() {
  window.scrollBy({
    top: -1500, 
    behavior: 'smooth'
  });
}
