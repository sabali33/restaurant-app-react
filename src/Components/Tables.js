import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { getTablesAction } from '../Actions/Table';
import Grid from './Grid';

const Tables = (props) => {
    
    const store_tables = useSelector( state => state.tables.tables );
    
    const [editingTable, setEditingTable ] = useState(false);
    const dispatch = useDispatch();
    const getTables = useCallback(async () =>{
        try{
            await dispatch(getTablesAction());
        }catch( err) {
            console.log(err.message)
        }
    },[dispatch]);
    useEffect( () => {
        getTables()
    },[getTables])

    const addTable = (cell_id) => {
        setEditingTable(cell_id);
    }
    const editTable = (table_id) => {
        setEditingTable(table_id);
    }
    const closeEditingModal = () => {
        setEditingTable(false);
    }
    
    return (<DndProvider backend={HTML5Backend}>
        <div className="relative">
            <Grid 
                data={store_tables} 
                addData={addTable} 
                editData={editTable} 
                editingMode={true} 
                editingTable={editingTable}
                closeEditingModal={closeEditingModal}
                columns={15} 
                rows={10} 
            />
    </div>
    </DndProvider>)
}

export default Tables;