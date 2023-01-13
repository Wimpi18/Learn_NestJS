import { Component } from "react";
import Axios from "axios";

const conectarAPI = async () => {
    return await (await Axios.get('http://localhost:2000/user')).data;
}

class Input extends Component {
    render() {
        return (
            <button
                onClick={() => { console.log(conectarAPI()) }}
                type="submit">
                Enviar
            </button>
        )
    }
}

export default Input;