const options = (state, action) => {
  const actionTypes = {
    'PLAYER_NAME_1': {
      player1: action.name
    },
    'PLAYER_NAME_2': {
      player2: action.name
    }
  };
  if (state == null) {
    return {
      player1: 'Name',
      player2: 'Name'
    };
  }
  return Object.assign({}, state, actionTypes[action.type]);
};

export default options;
