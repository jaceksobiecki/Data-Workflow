import React, {Component} from "react"
import FillField from "./FillField";


function Form(props) {
    let prevState = null
    if (props.form.stateFields[props.form.currentState].prevState !== -2) {
        prevState =
            <div className="App-block">
                <label>Cofnij: </label>
                <button onClick={props.revertState}>Cofnij stan</button>
            </div>
    }

    const nextStates = props.form.stateFields[props.form.currentState].nextState.map((item, index) =>
        <button id={item.value} onClick={props.updateState}>{props.form.stateFields[item.value].name}</button>
    )
    const fieldsList =
        props.form.inputFields.map((item, index) =>
            <FillField id={index} field={item} edit={props.form.stateFields[props.form.currentState].edit===true &&
            props.form.stateFields[props.form.currentState].assignedTo===props.user}
                       handleChange={props.handleChange}/>)

    const historyList = props.form.history.map((item, index) =>
        <li>
            <label>{item.prevState} -> {item.nextState} | {item.username} </label>
            <label>{item.comment}</label>
        </li>
    )
    if (props.form.stateFields[props.form.currentState].assignedTo===props.user) {
        return (
            <main className="App-form">
                <p className="Document-header">Podgląd dokumentu</p>
                <p className="Def-doc-header">Stan formularza: {props.form.stateFields[props.form.currentState].name}</p>
                <ol>
                    {fieldsList}
                </ol>
                <button onClick={props.saveForm} hidden={props.form.stateFields[props.form.currentState].edit}>Zapisz</button>
                <textarea value={props.comment} onChange={props.handleCommentChange}
                          placeholder="Dodaj komentarz przed zatwierdzeniem" rows="4" cols="50">
                    </textarea>
                <div className="App-block">
                    <label hidden={props.form.stateFields[props.form.currentState].nextState.length===0}>
                        Zatwierdź:
                    </label>
                    {nextStates}
                </div>
                {prevState}
                <div className="App-history">
                    <p className="Def-doc-header">Historia zmian:</p>
                    <ol>
                        {historyList}
                    </ol>
                </div>
                <button onClick={props.deleteForm} hidden={props.form.owner!==props.user}>Usuń formularz</button>
            </main>
        )
    } else {
        return (
            <main className="App-form">
                <p>Wypełnij formularz</p>
                <p>Stan formularza: {props.form.stateFields[props.form.currentState].name}</p>
                <ol>
                    {fieldsList}
                </ol>
                <button onClick={props.deleteForm} hidden={props.form.owner!==props.user}>Usuń formularz</button>
                <div className="App-history">
                    <ol>
                        {historyList}
                    </ol>
                </div>
            </main>
        )
    }
}

export default Form