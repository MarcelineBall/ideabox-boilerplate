class Idea {
  constructor(title, body) {
    this.id = Date.now()
    this.title = title;
    this.body = body;
    this.isFavorite = false;
  }
  saveToStorage() {
    if (!ideas.includes(this)) {
      ideas.push(this);
    }
  }
  deleteFromStorage() {
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i] === this) {
        ideas.splice(i, 1);
      }
    }
    for (var i = 0; i < favoriteIdeas.length; i++) {
      if (favoriteIdeas[i] === this) {
        favoriteIdeas.splice(i, 1)
      }
    }
  }
  updateTitle(title) {
    this.title = title;
  }
  updateBody(body) {
    this.body = body;
  }
  updateIsFavorite() {
    if (!favoriteIdeas.includes(this)) {
      favoriteIdeas.push(this);
      this.isFavorite = true
    } else if (favoriteIdeas.includes(this)) {
      for (var i = 0; i < favoriteIdeas.length; i++) {
        this.isFavorite = false;
        favoriteIdeas.splice(i, 1);
      }
    }
  }
  updateIdea(title, body) {
    this.updateTitle(title);
    this.updateBody(body);
    this.updateIsFavorite();
  }
};
