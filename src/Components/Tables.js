import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Cell from './Cell';
import AddTableForm from './AddTableForm';

const Tables = () => {
    const store_tables = useSelector( state => state.tables.tables );
    const [tables, setTables ] = useState(store_tables);
    const [editingTable, setEditingTable ] = useState(false);
    
    const addTable = (cell_id) => {
        console.log(cell_id);
    }
    const editTable = (table_id, e) => {
        setEditingTable(table_id);
    }
    const closeEditingModal = (e) => {
        e.stopPropagation();
        e.persist();
        
        setEditingTable(false);
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
                table={{id: cell_id}} 
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
        { editingTable && <AddTableForm id={editingTable} onCloseModal={closeEditingModal}/> }
    </div>)
}

export default Tables;