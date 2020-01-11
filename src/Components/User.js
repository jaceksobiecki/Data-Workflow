import React, {Component} from "react"
import InputField from "./InputField";
import Field from "./Field"
import {Link} from "react-router-dom";
import LogIn from "./LogIn"
import Home from "./Home"
import './../App.css';
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';


class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            username: ""
        }
        this.logOut = this.logOut.bind(this)
    }

    componentDidMount() {
    }

    logOut(){
        this.setState({
            isLoggedIn : false,
            username : ""
        })
    }


    render() {
        const responseGoogle = (googleUser) => {
            var profile = googleUser.getBasicProfile();
            this.setState({
                isLoggedIn : true,
                username: profile.getEmail()
            })
        }

        if (this.state.isLoggedIn) {
            return (
                <main className="App-header">
                    <ul>
                        <li>
                            User: {this.state.username}
                        </li>
                        <li>
                            <GoogleLogout
                                clientId="1088144058164-1cdr7941b9c304sin9el52qnv116b8ck.apps.googleusercontent.com"
                                buttonText="Logout"
                                onLogoutSuccess={this.logOut}
                            />
                        </li>
                    </ul>
                    <div>
                        <Home username={this.state.username}/>
                    </div>
                </main>
            )
        } else {
            return (
                <main className="App-header">
                    <GoogleLogin
                        clientId="1088144058164-1cdr7941b9c304sin9el52qnv116b8ck.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                </main>
            )
        }
    }
}

export default User