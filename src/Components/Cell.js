import React from 'react';
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { createTableAction, deleteTableAction } from '../Actions/Table';

import Table from './Table';

const Cell = (props) => {
    const dispatch = useDispatch();
    const [, drop] = useDrop(() => ({
        accept: 'Table',
        drop: async (source) => {
            try{
                await dispatch(deleteTableAction(source.id.id));
                await dispatch(createTableAction(props.id, source.id.number_of_seats));
            }catch( err ){
                console.log(err)
            }
            
        }
      }))
    return <div  className="cursor-pointer p-2 text-gray-500 border border-b-0 border-r-0 last:border-b last:border-r border-gray-300  group w-40 h-20" ref={drop} >
            
            { props.table ? <Table data={props.table} {...props }/> : 
                <span className="text-grey-400 hidden group-hover:inline-flex w-full h-full" onClick={props.onAddTable.bind(this, props.id)}> Add </span>
            }
        </div>
    
    
}

export default Cell