import React, { Component, PropTypes } from 'react';
import style from './css/Button.css';


export default class Button extends Component {
  render() {
    return (
      <div className={ style.button }>
        { this.props.text }
      </div>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired
};

