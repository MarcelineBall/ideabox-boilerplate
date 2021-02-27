var ideas = [];
var favoriteIdeas = [];

var createIdeaContainer = document.querySelector('.create');
var savedIdeaContainer = document.querySelector('.saved');
var titleInput = document.getElementById('titleInput');
var bodyInput = document.getElementById('bodyInput');
var saveButton = document.getElementById('saveButton')

createIdeaContainer.addEventListener('click', saveIdea);
window.addEventListener('load', checkTextInputs);
// window.addEventListener('click', deleteCard);
createIdeaContainer.addEventListener('keyup', checkTextInputs);
savedIdeaContainer.addEventListener('click', deleteCard);

function saveIdea() {
  var titleText = titleInput.value;
  var bodyText = bodyInput.value;
  if (event.target.id === 'saveButton') {
    var idea = new Idea(titleText, bodyText);
    idea.saveToStorage();
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

function renderIdeaCards() {
  savedIdeaContainer.innerHTML = '';
  for (var i = 0; i < ideas.length; i++) {
    savedIdeaContainer.innerHTML +=
      `<output id="${ideas[i].id}" class="idea">
  <header class="idea-header">
    <button class="favorite-button" id="favoriteButton">
      <img src="assets/icons/star.svg" alt="favorite-star">
    </button>
    <button id="closeButton" class="close-button">
      <img src="assets/icons/menu-close.svg" alt="menu-close">
    </button>
  </header>
  <div class="idea-body">
    <h4>${ideas[i].title}</h4>
    <p>${ideas[i].body}</p>
  </div>
  <div class="comment-button-wrapper">
    <button id="commentButton">
      <img src="assets/icons/comment.svg" alt="">
    </button>
    <p>Comment</p>
  </div>
 </output>`;
  };
};
// 1. target the delete button with event.target === delete button
// 2. access the <output> element's id and match it to the ideas array
// 3. run some type of function/method to remove that from the ideas array
// 4. re-render the cards

function deleteCard() {
  if (event.target.id === 'closeButton') {
    console.log(event.currentTarget.querySelector('output').id);
    var cardId = event.currentTarget.querySelector('output').id;
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id.toString() === cardId) {
        console.log('true');
        ideas.splice(i, 1);
      }
      renderIdeaCards();
    }
  }
}
