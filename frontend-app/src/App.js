import { Component } from "react";
import Input from "./components/Input";
import Button from "./components/Button";

class App extends Component {
  render() {
    return (
      <div>
        <Input type={'email'} placeholder={'username'}></Input>
        <Input type={'email'} placeholder={'password'}></Input>
        <Button />
      </div>
    )
  }
}

export default App;
