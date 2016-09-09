const score = (state, action) => {
  const firstRally = {
    score1: 0,
    score2: 0,
    challenge: null
  };
  if (state == null) {
    return {
      rallies: [],
      previousRally: firstRally
    };
  }
  const actionTypes = {
    'SCORE_FOR_PLAYER_1': {
      rallies: [
        ...state.rallies,
        state.previousRally
      ],
      previousRally: {
        score1: action.score,
        score2: state.previousRally.score2,
        challenge: null
      }
    },
    'SCORE_FOR_PLAYER_2': {
      rallies: [
        ...state.rallies,
        state.previousRally
      ],
      previousRally: {
        score1: state.previousRally.score1,
        score2: action.score,
        challenge: null
      }
    },
    'UNDO': {
      rallies: state.rallies.length > 0 ? state.rallies.slice(0, state.rallies.length -1) : [],
      previousRally: state.rallies.length > 0 ? state.rallies[state.rallies.length -1] : firstRally 
    },
    'CHALLENGE': {
      rallies: [
        ...state.rallies,
        state.previousRally
      ],
      previousRally: {
        score1: state.previousRally.score1,
        score2: state.previousRally.score2,
        challenge: action.challengeType
      }
    }
  };
  return Object.assign({}, state, actionTypes[action.type]);
};

export default score;
