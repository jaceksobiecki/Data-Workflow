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
                <ul className="unordered">
                    <li>
                        <Link to="/forms">Dokumenty</Link>
                    </li>
                    <li>
                        <Link to="/newForm">Utwórz dokument</Link>
                    </li>
                    <Route exact path="/newForm"
                           render={(props) => <NewForm {...props} username={username} edit={""}/>}/>
                    <Route exact path="/forms" render={(props) => <Forms {...props} username={username} mode={""}/>}/>
                </ul>
            </div>
        </Router>

    )
}

export default Home