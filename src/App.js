import React, {Component} from "react"
import './App.css';
import Header from "./Components/Header";
import User from "./Components/User";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="App">
                    <Header/>
                    <User/>
                </div>
        );
    }

}

export default App;
