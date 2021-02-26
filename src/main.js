var ideas = [];
var favoriteIdeas = [];

var createIdeaContainer = document.querySelector('.create');
var savedIdeaContainer = document.querySelector('.saved');
var titleInput = document.getElementById('titleInput');
var bodyInput = document.getElementById('bodyInput');
var saveButton = document.getElementById('saveButton')

createIdeaContainer.addEventListener('click', saveIdea);
window.addEventListener('load', checkTextInputs);
createIdeaContainer.addEventListener('keyup', checkTextInputs);

function saveIdea() {
  var titleText = titleInput.value;
  var bodyText = bodyInput.value;
  if (event.target.id === 'saveButton') {
    var idea = new Idea(titleText, bodyText);
    idea.saveToStorage();
    savedIdeaContainer.innerHTML = '';
    for (var i = 0; i < ideas.length; i++) {
      savedIdeaContainer.innerHTML +=
        `<output id="${ideas[i].id}" class="idea">
    <header class="idea-header">
      <button class="favorite-button" id="favoriteButton">
        <img src="assets/icons/star-active.svg" alt="favorite-star">
      </button>
      <button class="close-button">
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
    }
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
