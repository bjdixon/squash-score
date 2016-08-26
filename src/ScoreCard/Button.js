import React, { Component, PropTypes } from 'react';
import style from './css/Button.css';


export default class Button extends Component {
  render() {
    return (
      <div className={ style.button } onClick={ this.props.onClick }>
        { this.props.text }
      </div>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

