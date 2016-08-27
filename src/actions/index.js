 setThreshold 

export const setScore = (playerNumber, score) => {
  return {
    type: 'SCORE_FOR_PLAYER_' + playerNumber,
    score
  };
};

export const setServingPlayer = (servingPlayerNumber) => {
  return {
    type: 'SERVER',
    servingPlayerNumber
  };
};

export const setServingSide  = (servingSide) => {
  return {
    type: 'SERVING_SIDE',
    servingSide
  };
};

export const setChallenge = (challengeType) => {
  return {
    type: 'CHALLENGE',
    challengeType
  };
};

export const setWinner = (playerNumber) => {
  return {
    type: 'WINNER',
    playerNumber
  };
};

export const setColor = (playerNumber, color) => {
  return {
    type: 'PLAYER_COLOR_' + playerNumber,
    color
  };
};

export const setName = (playerNumber, name) => {
  return {
    type: 'PLAYER_NAME_' + playerNumber,
    name
  };
};

export const setThreshold = (threshold) => {
  return {
    type: 'THRESHOLD',
    threshold
  };
};

