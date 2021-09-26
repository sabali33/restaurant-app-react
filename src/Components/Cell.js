import React, { useState } from 'react';
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { createTableAction, deleteTableAction } from '../Actions/Table';
import Spinner from './Spinner';

import Table from './Table';

const Cell = props => {
    const dispatch = useDispatch();
    const [processing, setProcessing ] = useState(false);
    const [error, setError ] = useState(false);
    const [, drop] = useDrop(() => ({
        accept: 'Table',
        drop: async (source) => {
            setProcessing(true)
            try{
                await dispatch(deleteTableAction(source.id.id));
                
                await dispatch(createTableAction(props.id, source.id.number_of_seats));
            }catch( err ){
                console.log(err)
                setError(err.message);
            }
            setProcessing(false); 
            
            
        }
      }));
      let ref = {};
      if(props.editingMode) {
        ref = {ref: drop }
      }
      let Main = '';
      if(props.data && props.editingMode){
          Main = <Table {...props }/> 
      }else if(props.data && !props.editingMode ){
          Main = <span className="text-grey-400 hidden group-hover:inline-flex w-full h-full" onClick={props.onAdd.bind(this, props.id, props.data)}> 
          {props.editingMode ? <i className="icon-plus before:text-green-500"></i> : 'View' } </span>
      } else if( !props.data && props.editingMode ) {
          Main = <span className="text-grey-400 hidden group-hover:inline-flex w-full h-full" onClick={props.onAdd.bind(this, props.id, props.data)}> 
          <i className="icon-plus before:text-green-500"></i>   </span>
      }else{
        Main = <span className="text-grey-400 hidden group-hover:inline-flex w-full h-full" onClick={props.onAdd.bind(this, props.id, props.data)}> 
        No table setup  </span>
      }
    return <div  className="cursor-pointer p-2 text-gray-500 border border-b-0 border-r-0 last:border-b last:border-r border-gray-300  group w-40 h-20 relative" {...ref} >
            {
                processing && <Spinner customClass="text-yellow-200" />
            }
            {
                error && <span className="text-red-400">{error}</span>
            }
            { Main }
            
            {
                !props.editingMode && <span className="absolute left-1 bottom-0 group-hover:left-1">{ props.id }</span>
            }
        </div>
    
    
}

export default Cell