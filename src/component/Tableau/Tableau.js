import './Tableau.css';
import React from 'react';
import Colonne from '../Colonne/Colonne';

class Tableau extends React.Component {
    constructor(props) {
        super(props);
        this.getColumnElems = this.getColumnElems.bind(this);
        this.addColumnToState = this.addColumnToState.bind(this);
        this.rmColumnFromState = this.rmColumnFromState.bind(this);
        this.changeColumnsOrder = this.changeColumnsOrder.bind(this);
        this.state = this.props.dataTableau; // board object
    }

    generateKey(){
        let randomKey = (Math.random() + 1).toString(36).substring(6);
        return randomKey;
    }

    getColumnElems(){
        let columns = this.state.boardContent;
        // console.log('colonnes data in getColumnElems func (Tableau component) : ', columns);
        let elems = columns.map((value) => <Colonne key={value.colId} id={value.colId} rmColumn={this.rmColumnFromState} changeColName={this.changeColumnName} changeColumnsOrder={this.changeColumnsOrder} dataColonne={value}></Colonne>);
        return elems;
    }

    addColumnToState() {
        let columns = this.state.boardContent;
        let newColumnNumber = columns.length + 1;
        let newColumnTitle = 'Colonne ' + newColumnNumber.toString();
        let newColumn = {"colTitle": newColumnTitle, "colId": this.generateKey(), "colOrder": newColumnNumber, "colContent": []};
        columns.push(newColumn);
        // console.log('colonnes data in addColumn func (Tableau component) : ', columns);
        this.setState({"boardContent": columns});
    }

    rmColumnFromState(columnID) {
        let columns = this.state.boardContent;
        let newColumns = columns.filter((value) => {
            return value.colId!==columnID;
        });
        // console.log('newColumns data in rmColumnFromState func (Tableau component) : ', newColumns);
        this.setState({ "boardContent": newColumns });
    }

    changeColumnsOrder(colId, isLeft){
        let columns = this.state.boardContent;
        let oldIndex = columns.findIndex((entry) => {
            return entry['colId']===colId;
        })
        let columnToMove = columns[oldIndex];

        if(isLeft && oldIndex!==0){ // moving to left
            columns.splice(oldIndex, 1);
            columns.splice(oldIndex - 1, 0, columnToMove);
        } else if(!isLeft && columns.length!==oldIndex-1){ // moving to right
            columns.splice(oldIndex, 1);
            columns.splice(oldIndex + 1, 0, columnToMove);
        }
        this.setState({'boardContent': columns});
        // je renvoie le nouveau tableau dans state (vais-je perdre des données ? surement : il va falloir faire remonter toutes les données dans tableau)
    }

    render() {
        let columns = this.getColumnElems();

        return (
            <div className='tableau'>
                <p>
                    {this.state.boardTitle}
                    &nbsp;
                    <button type='button' onClick={() => {this.addColumnToState()}} className='btn btn-light rounded border-secondary float-end'>Ajouter une colonne</button>
                </p>
                <div className="container border rounded border-secondary">
                    <div>
                        {columns}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tableau;