import React, {Component} from "react"
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
        this.logIn = this.logIn.bind(this)
    }

    logOut(){
        this.setState({
            isLoggedIn : false,
            username : ""
        })
    }

    logIn(googleUser){
        var profile = googleUser.getBasicProfile();
        this.setState({
            isLoggedIn : true,
            username: profile.getEmail()
        })
    }


    render() {
        if (this.state.isLoggedIn) {
            return (
                <main>
                    <div className="App-user">
                        <ul>
                            <li>
                                {this.state.username}
                            </li>
                            <li>
                                <GoogleLogout
                                    clientId="1088144058164-1cdr7941b9c304sin9el52qnv116b8ck.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    onLogoutSuccess={this.logOut}
                                />
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Home username={this.state.username}/>
                    </div>
                </main>
            )
        } else {
            return (
                <main className="App-welcome">
                    <GoogleLogin
                        clientId="1088144058164-1cdr7941b9c304sin9el52qnv116b8ck.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={this.logIn}
                        onFailure={this.logIn}
                    />
                </main>
            )
        }
    }
}

export default User