import React, { Component } from 'react';

class Field extends Component {
  render() {
    return(
      <div>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          placeholder={this.props.placeholder}
          id={this.props.name}
          name={this.props.name}
          onChange={(e) => this.props.onChange(e)}
          type={this.props.type}
          value={this.props.value} />
      </div>
    )
  }
}

export default Field
