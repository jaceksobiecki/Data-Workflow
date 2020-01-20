import React from "react"
import Select from 'react-select';


function StateField(props) {
    const options = []
    for (let i = 0; i < props.fieldsCount; i++) {
        options.push({value: i, label: i + 1})
    }

    const customStyles = {
        control: (base, state) => ({
            ...base,
            width: '30em',
            minWidth: '30em',
            height: '2em',
            minHeight: '2em',
            fontSize: '1em',
        }),
        menu: base => ({
            ...base,
            fontSize: '1em',
            width: '30em',
            minWidth: '30em',
            minHeight: 'fit-content',
        }),

    };
    return (
        <li>
            <input type="text"
                   value={props.field.name}
                   id={props.id}
                   name="name"
                   placeholder="Nazwa stanu"
                   onChange={props.handleChange}
            />
            <input type="text"
                   value={props.field.assignedTo}
                   id={props.id}
                   name="assignedTo"
                   placeholder="Przydzielona osoba"
                   onChange={props.handleChange}
            />
            <select value={props.field.edit}
                    name="edit"
                    id={props.id}
                    onChange={props.handleChange}
            >
                <option value={false}>Edycja niedozwolona</option>
                <option value={true}>Edycja dozwolona</option>
            </select>
            <div className="App-block">
                <Select
                    name={props.id}
                    options={options}
                    isMulti={true}
                    styles={customStyles}
                    placeholder="Następny stan"
                    value={props.field.nextState}
                    onChange={props.handleNextChange}
                />
            </div>
            <button id={props.id} onClick={props.deleteState}>Usuń stan</button>
        </li>
    )
}

export default StateField