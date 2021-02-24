var ideas = [];
var starredIdeas = [];
var createIdeaParentElement = document.querySelector('.create-inputs');
var savedIdeaParentElement = document.querySelector('.saved');

createIdeaParentElement.addEventListener('click', createIdea);

function createIdea() {
  var title = document.getElementById('titleInput');
  var body = document.getElementById('bodyInput');
  var ideaCardHTML = `
      <output class="idea">
        <header class="idea-header">
          <button class="favorite-button" id="favorite-button">
            <img src="assets/icons/star-active.svg" alt="favorite-star">
          </button>
          <button class="close-button">
            <img src="assets/icons/menu-close.svg" alt="menu-close">
          </button>
        </header>
        <div class="idea-body">
          <h4>${title.value}</h4>
          <p>${body.value}</p>
        </div>
        <div class="comment-button-wrapper">
          <button id="comment-button">
            <img src="assets/icons/comment.svg" alt="">
          </button>
          <p>Comment</p>
        </div>
      </output>`
  var childNode = document.createRange().createContextualFragment(ideaCardHTML)
  if (event.target.className === 'save-button') {
    var idea = new Idea(title.value, body.value);
    savedIdeaParentElement.appendChild(childNode);
    idea.nodeValue = childNode;
  };
};
