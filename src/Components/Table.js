import React from 'react'
import { Draggable } from 'react-drag-and-drop'
const Table = props =>{

    return <Draggable>
        <div className="cursor-pointer" onClick={props.onEditTable.bind(this, props.id)}>
            {props.data.number_of_seats} seats
        </div>
    </Draggable>
    
}

export default Table;