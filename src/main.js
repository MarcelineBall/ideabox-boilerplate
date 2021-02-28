var ideas = [];
var favoriteIdeas = [];

var createIdeaContainer = document.querySelector('.create');
var savedIdeaContainer = document.querySelector('.saved');
var titleInput = document.getElementById('titleInput');
var bodyInput = document.getElementById('bodyInput');
var saveButton = document.getElementById('saveButton')

createIdeaContainer.addEventListener('click', saveIdea);
window.addEventListener('load', pullIdeasFromStorage);
createIdeaContainer.addEventListener('keyup', checkTextInputs);
savedIdeaContainer.addEventListener('click', cardManagement);

function saveIdea() {
  var titleText = titleInput.value;
  var bodyText = bodyInput.value;
  if (event.target.id === 'saveButton') {
    var idea = new Idea(titleText, bodyText);
    idea.saveToStorage();
    localStorage.setItem(`${idea.id}`, JSON.stringify(idea));
    renderIdeaCards();
    document.getElementById('titleInput').value = '';
    document.getElementById('bodyInput').value = '';
  };
  checkTextInputs();
};

function checkTextInputs() {
  if (!titleInput.value ||
    !bodyInput.value) {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  };
};

function pullIdeasFromStorage() {
  var keys = Object.keys(localStorage)
  for (var i = 0; i < keys.length; i++) {
      var ideaData = JSON.parse(localStorage.getItem(keys[i]));
      var idea = new Idea(ideaData.title, ideaData.body, ideaData.id)
      ideas.push(idea)
    };
    renderIdeaCards();
};

function renderIdeaCards() {
  savedIdeaContainer.innerHTML = '';
  for (var i = 0; i < ideas.length; i++) {
    savedIdeaContainer.innerHTML +=
      `<output id="${ideas[i].id}" class="idea">
  <header class="idea-header">
    <button class="favorite-button" id="favoriteButton">
      <img id="favoriteStar" src="assets/icons/star.svg" alt="favorite-star">
      <img class="active-star hidden" id="favoriteStarActive" src="assets/icons/star-active.svg" alt="favorite-star-active">
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

function cardManagement() {
  deleteCard();
  favoriteIdea();
}

function deleteCard() {
  if (event.target.id === 'closeButton' ||
    event.target.id === 'menuClose') {
    var cardId = event.target.closest('output').id;
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id.toString() === cardId) {
        // console.log(ideas[i])
        ideas[i].deleteFromStorage();
        // ideas.splice(i, 1);
      };
      renderIdeaCards();
    };
  };
};

function changeStarColor() {
event.target.closest('output').children[0].children[0].children[1].classList.toggle('hidden');
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
      };
    };
  };
};
