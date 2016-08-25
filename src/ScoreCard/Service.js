import React, { Component } from 'react';
import style from './css/Service.css';


export default class Service extends Component {
  render() {
    return (
      <div className={ style.serviceContainer } onClick={ () => this.props.onClick(this) }>
        <div className={ style.service }> </div>
      </div>
    );
  }
}

Service.propTypes = {
  onClick: React.PropTypes.function
};

