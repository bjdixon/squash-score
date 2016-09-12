const options = (state, action) => {
  const actionTypes = {
    'PLAYER_NAME_1': {
      player1: action.name
    },
    'PLAYER_NAME_2': {
      player2: action.name
    },
    'THRESHOLD': {
      threshold: action.threshold
    },
    'PLAYER_COLOR_1': {
      color1: action.color
    },
    'PLAYER_COLOR_2': {
      color2: action.color
    }
  };
  if (state == null) {
    return {
      player1: 'Name',
      color1: '#0000FF',
      player2: 'Name',
      color2: '#FF0000',
      threshold: 11
    };
  }
  return Object.assign({}, state, actionTypes[action.type]);
};

export default options;
