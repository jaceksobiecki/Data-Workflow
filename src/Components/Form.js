import React, {Component} from "react"
import InputField from "./InputField";
import StateField from "./StateField";
import Field from "./Field"
import State from "./State"
import FillField from "./FillField";


function Form(props) {
    const fieldsList =
        props.form.inputFields.map((item, index) =>
            <FillField id={index} field={item} handleChange={props.handleChange}/>)
    return (
        <main className="App-header">
            <p>Wypełnij formularz</p>
            <p>Stan formularza: {props.form.currentState.name}</p>
            {fieldsList}
            <button onClick={props.saveForm}>Zapisz</button>
            <button onClick={props.updateState}>Zatwierdź</button>
            <button onClick={props.revertState}>Cofnij stan</button>
            <button onClick={props.deleteForm}>Usuń formularz</button>
        </main>
    )
}

export default Form