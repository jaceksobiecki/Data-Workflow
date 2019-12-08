import React, {Component} from "react"
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import Header from "./Components/Header";
import NewForm from "./Components/NewForm";
import User from "./Components/User";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {apiResponse: ""};
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}));
    }
    sendData(){
        fetch('http://localhost:9000/testAPI', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'Taka',
                secondParam: 'Wiadomosc',
            })
        })
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}));
    }

    componentWillMount() {
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
