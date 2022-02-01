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
        let randomKey = 'ID' + (Math.random() + 1).toString(36).substring(6);
        return randomKey;
    }

    changeBoardTitle(){
        let newTitle = document.getElementById(this.state.boardId + 'Input').value;
        // this.setState({ "boardTitle": newTitle });
        this.props.sendUpdate( this.state.boardId, "boardTitle", newTitle );
    }

    getColumnElems(){
        let columns = this.state.boardContent;
        let elems = columns.map((value) =>
            <Colonne
                key={value.colId}
                rmColumn={this.rmColumnFromState}
                changeColName={this.changeColumnName}
                changeColumnsOrder={this.changeColumnsOrder}
                dataColonne={value}>
            </Colonne>
        );
        return elems;
    }

    addColumnToState() {
        let columns = this.state.boardContent;
        let newColumnNumber = columns.length + 1;
        let newColumnTitle = 'Column ' + newColumnNumber.toString();
        let newColumn = {"colTitle": newColumnTitle, "colId": this.generateKey(), "colOrder": newColumnNumber, "colContent": []};
        columns.push(newColumn);
        this.setState({"boardContent": columns});
    }

    rmColumnFromState(columnID) {
        let columns = this.state.boardContent;
        let newColumns = columns.filter((value) => {
            return value.colId!==columnID;
        });
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
    }

    render() {
        return (
            <div className={'tableau tab-pane fade ' + ( this.props.isFirst ? "show active" : "")} id={this.state.boardId}  role="tabpanel">
                <div className='my-3 container'>
                    <input
                        type='text'
                        className='form-control border-0 fs-4'
                        id={this.state.boardId + 'Input'}
                        defaultValue={this.state.boardTitle}
                        onBlur={ () => this.changeBoardTitle() }
                        maxLength="40"
                    />
                </div>
                <div className="target container border rounded border-secondary my-4">
                    <div>
                        {this.getColumnElems()}
                    </div>
                </div>
                <div className="container my-4">
                    <div className="row">
                        <div className="col-6 p-0">
                            <button
                                type='button'
                                onClick={ () => this.props.rmTableau(this.state.boardId) }
                                className="btn btn-outline-danger border-0"
                            >
                                Delete board
                            </button>
                        </div>
                        <div className="col-6 p-0 text-end">
                            <button
                                type='button'
                                onClick={ () => this.addColumnToState() }
                                className='btn btn-outline-secondary border-0'
                            >
                                Add a column
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tableau;