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
        //this.sendData();
        //this.callAPI();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <p className="App-intro">;{this.state.apiResponse}</p>

                    <Header/>
                    <User/>

                    <ul>
                        <li>
                            <Link to="/form">New Form</Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/user">Log in</Link>
                        </li>
                    </ul>

                    <Route exact path="/form" component={NewForm}/>
                    <Route exact path="/user" component={User}/>
                    <Route path="/about" component={NewForm}/>
                </div>
            </Router>
        );
    }

}

export default App;
