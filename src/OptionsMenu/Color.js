import React, { Component } from 'react';
import ColorPicker from 'react-color-picker';
import 'react-color-picker/index.css';
import style from './css/Color.css';


export default class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 400,
      width: 400
    }
  }
  componentDidMount() {
    let { clientHeight, clientWidth } = this.refs.colorPicker;
    this.setState({
      height: clientHeight,
      width: clientWidth - 40
    });
  }
  render() {
    return (
      <div className={ style.field }>
        <div ref="colorPicker" className={ style.colorPicker }>
          <ColorPicker defaultValue={ this.props.color } saturationHeight={ this.state.height } saturationWidth={ this.state.width } onDrag={ this.props.update }/>
        </div>
        <div className={ style.colorOutput } style={ { backgroundColor: this.props.color } }></div>
      </div>
    );
  }
}

