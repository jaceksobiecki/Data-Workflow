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
            />
        </li>
    )
}

export default FillField