import { Component } from "react";

class Input extends Component {
  render() {
    const {type, placeholder, name} = this.props;
    return (
      <input type={type} placeholder={placeholder} name={`username-${name}`} />
    )
  }
}

export default Input;