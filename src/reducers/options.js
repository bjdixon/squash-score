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
    }
  };
  if (state == null) {
    return {
      player1: 'Name',
      player2: 'Name',
      threshold: 11
    };
  }
  return Object.assign({}, state, actionTypes[action.type]);
};

export default options;
