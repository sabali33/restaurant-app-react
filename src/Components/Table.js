import React from 'react'
import { Draggable } from 'react-drag-and-drop'
const Table = props =>{
    return <Draggable>
        <div className="cursor-pointer" onClick={props.onEditTable.bind(this, props.id)}>
            Table {props.data.id}
        </div>
    </Draggable>
    
}

export default Table;