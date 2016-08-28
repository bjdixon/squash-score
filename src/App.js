import React, { Component } from 'react';
import ReactDom from 'react-dom';
import ScoreCard from './ScoreCard/Container';
import OptionsMenu from './OptionsMenu/Container';
import style from './App.css';
import simpleSwipeEvents from 'simple-swipe-events';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import squashApp from './reducers';
import { setCurrentView } from './actions';


let store = createStore(squashApp);


class Content extends Component {
  constructor(props) {
    super(props);
    this.swipeRight = this.show.bind(this, 'OptionsMenu');
    this.swipeLeft = this.show.bind(this, 'ScoreCard');
  }
  componentDidMount() {
    window.addEventListener('swipe-right', this.swipeRight, true);
    window.addEventListener('swipe-left', this.swipeLeft, true);
  }
  componentWillUnmount() {
    window.removeEventListener('swipe-right', this.swipeRight);
    window.removeEventListener('swipe-left', this.swipeLeft);
  }
  show(view) {
    store.dispatch(setCurrentView(view));
  }
  render() {
    return (
      <Provider store={ store }>
        <div>
          <ScoreCard />
          <OptionsMenu />
        </div>
      </Provider>
    );
  }
}

ReactDom.render(<Content />, document.getElementById('content'));
