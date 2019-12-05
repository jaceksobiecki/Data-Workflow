import React, {Component} from "react"
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import NewForm from "./NewForm";
import Forms from "./Forms";
import './../App.css';


function Home (props) {
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
                <Route exact path="/newForm" component={NewForm}/>
                <Route exact path="/forms" component={Forms}/>
            </ul>
        </div>
        </Router>

)
}

export default Home