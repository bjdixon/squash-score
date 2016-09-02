const score = (state, action) => {
  if (state == null) {
    return {
      rallies: [
        {
          score1: 0,
          score2: 0,
          challenge: null
        }
      ]
    };
  }
  const previousRally = rallies => rallies[rallies.length -1];
  const actionTypes = {
    'SCORE_FOR_PLAYER_1': {
      rallies: [
        ...state.rallies,
        {
          score1: action.score,
          score2: previousRally(state.rallies).score2,
          challenge: null
        }
      ]
    },
    'SCORE_FOR_PLAYER_2': {
      rallies: [
        ...state.rallies,
        {
          score1: previousRally(state.rallies).score1,
          score2: action.score,
          challenge: null
        }
      ]
    },
    'UNDO': {
      rallies: state.rallies.length > 1 ? state.rallies.slice(0, state.rallies.length -1) : state.rallies
    }
  };
  return Object.assign({}, state, actionTypes[action.type]);
};

export default score;
