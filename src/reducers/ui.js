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
    },
    'MESSAGE_VISIBILITY': {
      messageVisible: action.visible
    },
    'MESSAGE_CONTENT': {
      messageTitle: action.title,
      secondaryMessage: action.secondaryMessage,
    }
  };
  if (state == null) {
    return {
      view: 'ScoreCard',
      servingPlayer: 1,
      servingSide: 'right',
      messageVisible: false,
      messageContent: null
    };
  }
  return Object.assign({}, state, actionTypes[action.type]);
};

export default ui;
