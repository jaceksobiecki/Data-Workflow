import React from "react"

function FormListElem (props) {
    return (
        <li>
            {props.form.formName}
            <label> |   stan: {props.form.currentState.name}</label>
            <button id={props.id} onClick={props.editForm}>Edit</button>
        </li>
    )
}

export default FormListElem