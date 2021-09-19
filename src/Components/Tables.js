import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Cell from './Cell';
import AddTableForm from './AddTableForm';
import { getTablesAction } from '../Actions/Table';

const Tables = () => {
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
        console.log(table_id)
        setEditingTable(table_id);
    }
    const closeEditingModal = () => {
        setEditingTable(false);
    }
    const cellsWithTables = () => {
        return store_tables ? store_tables.map( table => table.id ) : [];
    }
    const findTable = (table_id) => {
        return store_tables.find( table => table_id === table.id)
    }
    const cells = {};
    let cell_id = 1;
    for ( let i = 1; i <= 10; i++ ){
        cells[i] = cells[i] !== undefined ? cells[i] :[];
        for (let k = 1; k <= 15; k++) {
            cells[i].push(
            <Cell 
                key={cell_id} 
                id={cell_id} 
                table={cellsWithTables().includes(cell_id) ? findTable(cell_id) : null } 
                onAddTable={addTable} 
                onEditTable={editTable}
                
            />)
            cell_id++;
        }
    }
    const cells_arr = [];
    for( let row in cells){
        cells_arr.push( <div className="flex" key={row}>{cells[row]}</div>);
    }
    
    return (<div className="relative">
        
        {
            cells_arr
        }
        { editingTable && <AddTableForm id={editingTable} table={findTable(editingTable)} onCloseModal={closeEditingModal}/> }
    </div>)
}

export default Tables;