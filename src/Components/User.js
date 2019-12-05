import React, {Component} from "react"
import InputField from "./InputField";
import Field from "./Field"
import {Link} from "react-router-dom";
import LogIn from "./LogIn"
import Home from "./Home"
import './../App.css';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            username: ""
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.submitUser = this.submitUser.bind(this)
        this.logOut = this.logOut.bind(this)
    }

    componentDidMount() {
    }

    changeUsername(event) {
        const {value} = event.target
        this.setState({
            username: value
        })
    }

    submitUser(){
        this.setState({
            isLoggedIn : true
        })
    }

    logOut(){
        this.setState({
            isLoggedIn : false,
            username : ""
        })
    }


    render() {
        if (this.state.isLoggedIn) {
            return (
                <main className="App-header">
                    <ul>
                        <li>
                            User: {this.state.username}
                        </li>
                        <li>
                            <button onClick={this.logOut}>Log out</button>
                        </li>
                    </ul>
                    <div>
                        <Home/>
                    </div>
                </main>
            )
        } else {
            return (
                <main className="App-header">
                    <input type="text"
                           value={this.state.username}
                           name="username"
                           placeholder="Username"
                           onChange={this.changeUsername}
                    />
                    <button onClick={this.submitUser}>Submit</button>
                </main>
            )
        }
    }
}

export default User