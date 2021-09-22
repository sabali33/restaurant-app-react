import React from 'react'
import { useDrag } from 'react-dnd'
const Table = props =>{
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: 'Table',
        item: { id: props.data }
      }));
      const ref = {}
      const collectedAttr = {}
      if( props.editingMode ){
        ref.ref = drag
        collectedAttr.collected = collected
      }
    return collected.isDragging ? (<div ref={dragPreview}/>)  : 
        <div className="cursor-pointer" onClick={props.onEdit.bind(this, props.id)} {...ref } {...collectedAttr}>
            {props.data.number_of_seats} seats
        </div>
    
}

export default Table;