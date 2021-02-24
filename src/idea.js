class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.isFavorite = false;
    ideas.push(this)
  };
  deleteFromStorage() {
    for (var i = 0; i < starredIdeas.length; i++) {
      if (starredIdeas[i] === this) {
        starredIdeas.splice(i, 1);
      };
    };
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i] === this) {
        ideas.splice(i, 1);
      };
    };
  };
  // may need this for future
  updateTitle(title) {
    this.title = title;
  };
  updateBody(body) {
    this.body = body
  };
  updateFavoriteStatus(boolean) {
    this.isFavorite = boolean;
    if (!starredIdeas.includes(this) &&
      this.isFavorite) {
      starredIdeas.push(this)
    } else if (!this.isFavorite) {
      for (var i = 0; i < starredIdeas.length; i++) {
        if (starredIdeas[i] === this) {
          starredIdeas.splice(i, 1);
        };
      };
    };
  };
};
