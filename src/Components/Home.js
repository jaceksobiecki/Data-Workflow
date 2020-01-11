import React, {Component} from "react"
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import NewForm from "./NewForm";
import Forms from "./Forms";
import './../App.css';


function Home(props) {
    let username = props.username
    return (
        <Router>
            <div>
                <ul className="App-list">
                    <li>
                        <Link to="/forms">Forms</Link>

                    </li>
                    <li>
                        <Link to="/newForm">New Form</Link>
                    </li>
                    <Route exact path="/newForm"
                           render={(props) => <NewForm {...props} username={username} edit={false}/>}/>
                    <Route exact path="/forms" render={(props) => <Forms {...props} username={username}/>}/>
                </ul>
            </div>
        </Router>

    )
}

export default Home