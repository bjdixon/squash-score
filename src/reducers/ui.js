const ui = (state, action) => {
  const actionTypes = {
    'CURRENT_VIEW': {
      view: action.currentView
    }
  };
  if (state == null) {
    return {
      view: 'ScoreCard'
    };
  }
  return Object.assign({}, state, actionTypes[action.type]);
};

export default ui;
