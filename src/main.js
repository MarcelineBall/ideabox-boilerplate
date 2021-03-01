var ideas = [];
var favoriteIdeas = [];

var createIdeaContainer = document.querySelector('.create');
var savedIdeaContainer = document.querySelector('.saved');
var titleInput = document.getElementById('titleInput');
var bodyInput = document.getElementById('bodyInput');
var saveButton = document.getElementById('saveButton');
var navBar = document.querySelector('.sidebar');

window.addEventListener('load', loadManagement);
createIdeaContainer.addEventListener('click', createIdeaManagement);
createIdeaContainer.addEventListener('keyup', createIdeaManagement);
savedIdeaContainer.addEventListener('click', cardManagement);
navBar.addEventListener('click', filterFavoriteIdeas);

function loadManagement() {
  checkTextInputs();
  pullIdeasFromStorage();
};

function createIdeaManagement() {
  saveIdea();
  checkTextInputs();
  filterSearch();
};

function cardManagement() {
  deleteCard();
  favoriteIdea();
};

function checkTextInputs() {
  if (!titleInput.value ||
    !bodyInput.value) {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  };
};

function saveIdea() {
  if (event.target.id === 'saveButton') {
    var titleText = titleInput.value;
    var bodyText = bodyInput.value;
    var idea = new Idea(titleText, bodyText);
    idea.saveToStorage();
    localStorage.setItem(`${idea.id}`, JSON.stringify(idea));
    renderIdeaCards();
    titleInput.value = '';
    bodyInput.value = '';
  };
};

function pullIdeasFromStorage() {
  var keys = Object.keys(localStorage)
  for (var i = 0; i < keys.length; i++) {
    var ideaData = JSON.parse(localStorage.getItem(keys[i]));
    var idea = new Idea(ideaData.title, ideaData.body, parseInt(keys[i]), ideaData.isFavorite);
    idea.saveToStorage();
    if (idea.isFavorite) {
      favoriteIdeas.push(idea);
    };
  };
  renderIdeaCards();
};

function renderIdeaCards() {
  var redStarShowOrNo;
  savedIdeaContainer.innerHTML = '';
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].isFavorite) {
      redStarShowOrNo = ''
    } else {
      redStarShowOrNo = 'hidden'
    };
    savedIdeaContainer.innerHTML +=
      `<output id="${ideas[i].id}" class="idea">
  <header class="idea-header">
    <button class="favorite-button" id="favoriteButton">
      <div class="star-container">
      <img class="empty-star" id="favoriteStar" src="assets/icons/star.svg" alt="favorite-star">
      <img class="active-star ${redStarShowOrNo}" id="favoriteStarActive" src="assets/icons/star-active.svg" alt="favorite-star-active">
      </div>
    </button>
    <button id="closeButton" class="close-button">
      <img id="menuClose" src="assets/icons/menu-close.svg" alt="menu-close">
    </button>
  </header>
  <div class="idea-body">
    <h4>${ideas[i].title}</h4>
    <p>${ideas[i].body}</p>
  </div>
  <div class="comment-button-wrapper">
    <button id="commentButton">
      <img src="assets/icons/comment.svg" alt="comment-button">
    </button>
    <p>Comment</p>
  </div>
 </output>`;
  };
};

function deleteCard() {
  if (event.target.id === 'closeButton' ||
    event.target.id === 'menuClose') {
    var cardId = event.target.closest('output').id;
    console.log(cardId)
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id.toString() === cardId) {
        localStorage.removeItem(cardId);
        ideas[i].deleteFromStorage();
      };
      renderIdeaCards();
    };
  };
};

function changeStarColor() {
  var imgElement = event.target.closest('output').children[0].children[0].children[0].children[1];
  imgElement.classList.toggle('hidden')
};

function favoriteIdea() {
  if (event.target.id === 'favoriteButton' ||
    event.target.id === 'favoriteStar' ||
    event.target.id === 'favoriteStarActive') {
    changeStarColor()
    var elements = event.composedPath();
    var id;
    for (var value of elements.values()) {
      if (value.className === 'idea') {
        id = value.id
      };
    };
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id.toString() === id) {
        ideas[i].updateIsFavorite();
        localStorage.setItem(`${id}`, JSON.stringify(ideas[i]));
      };
    };
  };
};

function filterFavoriteIdeas() {
  if (event.target.id === 'showStarredIdeasButton') {
    if (event.target.innerText === 'Show Starred Ideas') {
      event.target.innerText = 'Show All Ideas';
      var redStarShowOrNo;
      savedIdeaContainer.innerHTML = '';
      for (var i = 0; i < favoriteIdeas.length; i++) {
        if (favoriteIdeas[i].isFavorite) {
          redStarShowOrNo = ''
        } else {
          redStarShowOrNo = 'hidden'
        };
        savedIdeaContainer.innerHTML +=
          `<output id="${favoriteIdeas[i].id}" class="idea">
    <header class="idea-header">
      <button class="favorite-button" id="favoriteButton">
        <div class="star-container">
        <img class="empty-star" id="favoriteStar" src="assets/icons/star.svg" alt="favorite-star">
        <img class="active-star ${redStarShowOrNo}" id="favoriteStarActive" src="assets/icons/star-active.svg" alt="favorite-star-active">
        </div>
      </button>
      <button id="closeButton" class="close-button">
        <img id="menuClose" src="assets/icons/menu-close.svg" alt="menu-close">
      </button>
    </header>
    <div class="idea-body">
      <h4>${favoriteIdeas[i].title}</h4>
      <p>${favoriteIdeas[i].body}</p>
    </div>
    <div class="comment-button-wrapper">
      <button id="commentButton">
        <img src="assets/icons/comment.svg" alt="comment-button">
      </button>
      <p>Comment</p>
    </div>
   </output>`;
      };
    } else if (event.target.innerText === 'Show All Ideas') {
      event.target.innerText = 'Show Starred Ideas';
      renderIdeaCards();
    };
  };
};

function filterSearch() {
  var searchInput = document.getElementById('searchInput');
  if (event.target.id === 'searchInput') {
    var searchInputText = searchInput.value.toUpperCase();
    var cards = document.querySelectorAll('.idea');
    var cardTextContainer = document.querySelectorAll('.idea-body');
    for (var i = 0; i < cardTextContainer.length; i++) {
      var title = cardTextContainer[i].querySelector('h4');
      var body = cardTextContainer[i].querySelector('p');
      var textValue = title.innerText || body.innerText;
      if (textValue.toUpperCase().indexOf(searchInputText) > -1) {
        cards[i].style.display = '';
      } else {
        cards[i].style.display = 'none';
      };
    };
  };
};
