const ui = (state, action) => {
  const actionTypes = {
    'CURRENT_VIEW': {
      view: action.currentView
    },
    'SERVER': {
      servingPlayer: action.servingPlayerNumber
    },
    'SERVING_SIDE': {
      servingSide: action.servingSide
    }
  };
  if (state == null) {
    return {
      view: 'ScoreCard',
      servingPlayer: 1,
      servingSide: 'right'
    };
  }
  return Object.assign({}, state, actionTypes[action.type]);
};

export default ui;
