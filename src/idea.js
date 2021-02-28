class Idea {
  constructor(title, body, id, isFavorite) {
    this.id = id || Math.floor(Date.now() * Math.random());
    this.title = title;
    this.body = body;
    this.isFavorite = isFavorite || false;
  };

  saveToStorage() {
    if (!ideas.includes(this)) {
      ideas.push(this);
    };
  };

  deleteFromStorage() {
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i] === this) {
        ideas.splice(i, 1);
      };
    };
    for (var i = 0; i < favoriteIdeas.length; i++) {
      if (favoriteIdeas[i] === this) {
        favoriteIdeas.splice(i, 1)
      };
    };
  };

  updateTitle(title) {
    this.title = title;
  };

  updateBody(body) {
    this.body = body;
  };

  updateIsFavorite() {
    if (!this.isFavorite) {
      favoriteIdeas.push(this);
      this.isFavorite = true
    } else {
      this.isFavorite = false;
      for (var i = 0; i < favoriteIdeas.length; i++) {
        if (favoriteIdeas[i] === this) {
          favoriteIdeas.splice(i, 1);
        };
      };
    };
  };

  updateIdea(title, body) {
    this.updateTitle(title);
    this.updateBody(body);
    this.updateIsFavorite();
  };
};
