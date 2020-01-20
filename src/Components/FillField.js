import React from "react"

function FillField (props) {
    return (
        <li>
            <label>{props.field.name}</label>
            <input type="text"
                   value={props.field.content}
                   id={props.id}
                   name="content"
                   onChange={props.handleChange}
                   disabled={(props.edit===true)? "" : "disabled"}
            />
        </li>
    )
}

export default FillField