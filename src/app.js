(() => {

  const doc = window.document;
  const ColorPicker = require('simple-color-picker');
  const rally = require('./rally');
  const EventEmitter = require('events');
  const emitter = new EventEmitter();
  const simpleSwipeEvents = require('simple-swipe-events');

  // init and helpers

  const player1ColorPicker = new ColorPicker({
    color: '#0000FF',
    el: doc.getElementById('player1color'),
    widthUnits: 'vw',
    width: 50,
    heightUnits: 'vw',
    height: 40
  });

  const player2ColorPicker = new ColorPicker({
    color: '#FF0000',
    el: doc.getElementById('player2color'),
    widthUnits: 'vw',
    width: 50,
    heightUnits: 'vw',
    height: 40
  });

  let game = [rally.rallyContainer];

  const currentRally = () => game[game.length -1];

  const showMessage = (messageTitle, messageDetail) => {
    doc.getElementById('message').innerHTML = `<strong>${messageTitle}</strong><br>${messageDetail || ''}`;
    doc.getElementById('message').classList.add('active');
  };

  const removeMessage = (time) => {
    setTimeout(() => doc.getElementById('message').classList.remove('active'), time);
  };

  const switchColors = () => {
    const previousHandOutBackgroundColor = doc.getElementById('handOut').style.backgroundColor;
    const previousHandOutColor = doc.getElementById('handOut').style.color;
    doc.getElementById('handOut').style.backgroundColor = doc.getElementById('pointWon').style.backgroundColor;
    doc.getElementById('handOut').style.color = doc.getElementById('pointWon').style.color;
    doc.getElementById('pointWon').style.backgroundColor = previousHandOutBackgroundColor;
    doc.getElementById('pointWon').style.color = previousHandOutColor;
  }

  const changeDefaults = function (fn) {
    const _this = this;
    return function () {
      if (!_this.classList.contains('active')) {
        game.push(fn(currentRally()));
        emitter.emit('stateUpdated');
      }
    };
  };

  const switchSides = function () {
    const _this = this;
    changeDefaults.call(_this, rally.switchServingSide)();
  };

  const switchServers = function () {
    const _this = this;
    changeDefaults.call(_this, rally.changeServer)();
    switchColors();
  };

  // UI Events

  // game events

  doc.getElementById('handOut').onclick = () => {
    game.push(rally.handOut(currentRally()));
    emitter.emit('stateUpdated');
    switchColors();
  };
 
  doc.getElementById('pointWon').onclick = () => {
    game.push(rally.pointWon(currentRally()));
    emitter.emit('stateUpdated');
  };

  doc.getElementById('let').onclick = () => {
    game.push(rally.challengeDecision('let')(currentRally()));
    showMessage('Yes Let');
    removeMessage(2000);
  };

  doc.getElementById('noLet').onclick = () => {
    game.push(rally.challengeDecision('no let')(currentRally()));
    showMessage('No Let', 'Award point or handout');
  };

  doc.getElementById('stroke').onclick = () => {
    game.push(rally.challengeDecision('stroke')(currentRally()));
    showMessage('Stroke', 'Award point or handout');
  };

  doc.getElementById('undo').onclick = () => {
    if (game.length > 1 && (currentRally().get('challenge') || currentRally().get('player1') || currentRally().get('player2'))) {
      const removedRally = game.pop();
      if (removedRally.get('player1') !== currentRally().get('player1') || removedRally.get('player2') !== currentRally().get('player2')) {
        emitter.emit('stateUpdated');
      } else {
        showMessage('Decision undone', `(${removedRally.get('challenge')})`);
        removeMessage(1500);
      }
    }
  };

  doc.getElementById('serveLeft').onclick = switchSides;

  doc.getElementById('serveRight').onclick = switchSides;

  doc.getElementById('player1').onclick = switchServers;

  doc.getElementById('player2').onclick = switchServers;

  emitter.on('stateUpdated', () => {
    const servingSide = currentRally().get('servingSide');
    const servingPlayer = currentRally().get('servingPlayer');
    Array.prototype.slice.call(doc.getElementsByClassName('active')).forEach((el) => el.classList.remove('active'));
    const player1Score = doc.getElementById('score1').innerHTML = currentRally().get('player1');
    const player2Score = doc.getElementById('score2').innerHTML = currentRally().get('player2');
    const pointsThreshold = doc.getElementById('pointsThreshold').value;
    if (Math.abs(player1Score - player2Score) > 1 && (player1Score >= pointsThreshold || player2Score >= pointsThreshold)) {
      showMessage('Winner!', doc.getElementById(player1Score > player2Score ? 'player1name' : 'player2name').value);
    }
    doc.getElementById(servingSide === 'right' ? 'serveRight' : 'serveLeft').classList.add('active');
    doc.getElementById(servingPlayer === 'player1' ? 'player1' : 'player2').classList.add('active');
  });

  const pushRight = () => {
    doc.getElementById('leftMenu').classList.add('active')
    doc.getElementById('container').classList.add('pushedRight')
  }

  const pushLeft = () => {
    doc.getElementById('leftMenu').classList.remove('active')
    doc.getElementById('container').classList.remove('pushedRight')
  }

  doc.getElementById('container').addEventListener('swipe-right', () => {
    pushRight();
  }, true);

  doc.getElementById('leftMenu').addEventListener('swipe-left', () => {
    pushLeft();
  }, true);

  // options menu events

  doc.getElementById('player1name').addEventListener('input', (e) => {
    doc.getElementById('player1nameDisplay').innerHTML = e.target.value;
  });

  doc.getElementById('player2name').addEventListener('input', (e) => {
    doc.getElementById('player2nameDisplay').innerHTML = e.target.value;
  });

  player1ColorPicker.on('update', (color) => {
    doc.getElementById('player1colorOutput').style.backgroundColor = color;
    doc.getElementById('player1nameDisplay').style.backgroundColor = color;
    doc.getElementById('player1nameDisplay').style.color = player1ColorPicker.isDark() ? '#fff' : '#000';
    doc.getElementById(currentRally().get('servingPlayer') === 'player1' ? 'pointWon' : 'handOut').style.backgroundColor = color;
    doc.getElementById(currentRally().get('servingPlayer') === 'player1' ? 'pointWon' : 'handOut').style.color = player1ColorPicker.isDark() ? '#fff' : '#000';
  });

  player2ColorPicker.on('update', (color) => {
    doc.getElementById('player2colorOutput').style.backgroundColor = color;
    doc.getElementById('player2nameDisplay').style.backgroundColor = color;
    doc.getElementById('player2nameDisplay').style.color = player2ColorPicker.isDark() ? '#fff' : '#000';
    doc.getElementById(currentRally().get('servingPlayer') === 'player2' ? 'pointWon' : 'handOut').style.backgroundColor = color;
    doc.getElementById(currentRally().get('servingPlayer') === 'player2' ? 'pointWon' : 'handOut').style.color = player2ColorPicker.isDark() ? '#fff' : '#000';
  });

})();
