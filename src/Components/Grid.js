import React from 'react';
import Cell from './Cell';
import AddTableForm from './AddTableForm';

const Grid = props => {
    const findTable = (table_id) => {
        return props.data.find( table => table_id === table.id)
    }
    const cellsWithTables = () => {
        return props.data ? props.data.map( table => table.id ) : [];
    }

    const cells = {};
    let cell_id = 1;
    for ( let i = 1; i <= props.rows; i++ ){
        cells[i] = cells[i] !== undefined ? cells[i] :[];
        for (let k = 1; k <= props.columns; k++) {
            const data = cellsWithTables().includes(cell_id) ? findTable(cell_id) : null
            cells[i].push(
            <Cell 
                key={cell_id} 
                id={cell_id} 
                data={ data } 
                editingMode={ props.editingMode }
                onAdd={ props.addData } 
                onEdit={ props.editData }
                
            />)
            cell_id++;
        }
    }
    const cells_arr = [];
    for( let row in cells){
        cells_arr.push( <div className="flex" key={row}>{cells[row]}</div>);
    }
    return <div className="relative">
        
        {
            cells_arr
        }
        { (props.editingMode && props.editingTable) && <AddTableForm id={props.editingTable} table={findTable(props.editingTable)} onCloseModal={props.closeEditingModal}/> }
    </div>
}

export default Grid;