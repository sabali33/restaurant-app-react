import React from 'react'
import { useDrag } from 'react-dnd'
const Table = props =>{
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: 'Table',
        item: { id: props.table }
      }));
    return collected.isDragging ? (<div ref={dragPreview}/>)  : 
        <div className="cursor-pointer" onClick={props.onEditTable.bind(this, props.id)} ref={drag} {...collected}>
            {props.data.number_of_seats} seats
        </div>
    
}

export default Table;