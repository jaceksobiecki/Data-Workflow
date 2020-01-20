import React from "react"

function FormListElem (props) {
    if(props.form.currentState===-1 && props.form.owner===props.username){
        return(
            <li>
                <div className="Doc-list-elem">
                    <label>{props.form.formName}</label>
                </div>
                <label> |   stan: Utworzony</label>
                <button id={props.id} onClick={props.editForm}>Podgląd</button>
            </li>
        )
    } else if(props.form.currentState===-1){
        return(<div></div>)
    } else {
        return(
            <li>
                <div className="Doc-list-elem">
                    <label>{props.form.formName}</label>
                </div>
                <label> |   stan: {props.form.stateFields[props.form.currentState].name}</label>
                <button id={props.id} onClick={props.editForm}>Podgląd</button>
            </li>
        )
    }
}

export default FormListElem