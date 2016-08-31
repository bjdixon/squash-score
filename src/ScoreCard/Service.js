import React, { Component, PropTypes } from 'react';
import style from './css/Service.css';


export default class Service extends Component {
  render() {
    return (
      <div className={ style.serviceContainer } onClick={ this.props.onClick }>
        <div className={ style.service }>
          <div className={ this.props.isActive && style.active }> </div>
        </div>
      </div>
    );
  }
}

Service.propTypes = {
  onClick: PropTypes.func.isRequired
};

