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

  const changeDefaults = function (fn) {
    return function () {
      if (!this.classList.contains('active')) {
        game.push(fn(currentRally()));
        emitter.emit('stateUpdated');
      }
    };
  };

  // UI Events

  doc.getElementById('handOut').onclick = () => {
    game.push(rally.handOut(currentRally()));
    emitter.emit('stateUpdated');
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

  doc.getElementById('serveLeft').onclick = changeDefaults(rally.switchServingSide);

  doc.getElementById('serveRight').onclick = changeDefaults(rally.switchServingSide);

  doc.getElementById('player1').onclick = changeDefaults(rally.changeServer);

  doc.getElementById('player2').onclick = changeDefaults(rally.changeServer);

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
  });

  player2ColorPicker.on('update', (color) => {
    doc.getElementById('player2colorOutput').style.backgroundColor = color;
    doc.getElementById('player2nameDisplay').style.backgroundColor = color;
    doc.getElementById('player2nameDisplay').style.color = player2ColorPicker.isDark() ? '#fff' : '#000';
  });

})();
