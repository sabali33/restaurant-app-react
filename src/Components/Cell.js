import React from 'react';
import { Droppable } from 'react-drag-and-drop'
import Table from './Table';


const Cell = (props) => {
    return <div className="cursor-pointer p-2 text-gray-500 border border-b-0 border-r-0 last:border-b last:border-r border-gray-300  group w-40 h-20">
            <Droppable className="w-full h-full">
            { props.table ? <Table data={props.table} {...props }/> : 
                <span className="text-grey-400 hidden group-hover:inline-flex w-full h-full" onClick={props.onAddTable.bind(this, props.id)}> Add </span>
            }
            </Droppable>
        </div>
    
    
}

export default Cell