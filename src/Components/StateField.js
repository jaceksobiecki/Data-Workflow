import React from "react"

function StateField (props) {
    return (
        <li>
            <input type="text"
                   value={props.field.name}
                   id={props.id}
                   name="name"
                   placeholder="Nazwa"
                   onChange={props.handleChange}
            />
            <input type="text"
                   value={props.field.assignedTo}
                   id={props.id}
                   name="assignedTo"
                   placeholder={"Assign to"}
                   onChange={props.handleChange}
            />
            <button id={props.id} onClick={props.deleteState}>Delete state</button>
        </li>
    )
}

export default StateField