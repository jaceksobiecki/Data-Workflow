import React from "react"

function InputField (props) {
    return (
        <li>
            <input type="text"
                   value={props.field.name}
                   id={props.id}
                   name="name"
                   placeholder="Nazwa"
                   onChange={props.handleChange}
            />
            <select value={props.field.type}
                    name="type"
                    id={props.id}
                    onChange={props.handleChange}
            >
                <option value="Tekst">Tekst</option>
                <option value="Liczba">Liczba</option>
            </select>
            <button id={props.id} onClick={props.deleteField}>Delete field</button>
        </li>
    )
}

export default InputField