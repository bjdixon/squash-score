import React, { Component, PropTypes } from 'react';
import style from './css/Button.css';


export default class Button extends Component {
  render() {
    const colors = {
      backgroundColor: this.props.color,
      color: this.props.textColor
    };
    return (
      <div className={ style.button } onClick={ this.props.onClick } style={ this.props.color ? colors : null }>
        { this.props.text }
      </div>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

