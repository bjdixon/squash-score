const ui = (state, action) => {
  const actionTypes = {
    'CURRENT_VIEW': {
      view: action.currentView
    },
    'SERVER': {
      servingPlayer: action.servingPlayerNumber
    }
  };
  if (state == null) {
    return {
      view: 'ScoreCard',
      servingPlayer: 1
    };
  }
  return Object.assign({}, state, actionTypes[action.type]);
};

export default ui;
