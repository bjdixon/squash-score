const ui = (state, action) => {
  if (state == null) {
    return {
      view: 'ScoreCard'
    };
  }
  return {
    view: action.currentView
  };
};

export default ui;
