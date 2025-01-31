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

    generateKey(): string {
        return 'ID' + (Math.random() + 1).toString(36).substring(6);
    }

    changeBoardTitle(): void {
        // this.setState({ "boardTitle": newTitle });
        this.props.sendUpdate( this.state.boardId, "boardTitle", document.getElementById(this.state.boardId + 'Input').value );
    }

    getColumnElems(): JSX.Element[] {
        const elems = this.state.boardContent.map((value) =>
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

    addColumnToState(): void {
        const columns = this.state.boardContent;
        const newColumnNumber = columns.length + 1;
        const newColumn = {"colTitle": 'Colonne ' + newColumnNumber.toString(), "colId": this.generateKey(), "colOrder": newColumnNumber, "colContent": []};
        columns.push(newColumn);
        this.setState({"boardContent": columns});
    }

    rmColumnFromState(columnID): void {
        const newColumns = this.state.boardContent.filter((value) => {
            return value.colId!==columnID;
        });
        this.setState({ "boardContent": newColumns });
    }

    changeColumnsOrder(colId, isLeft): void {
        const columns = this.state.boardContent;
        const oldIndex = columns.findIndex((entry) => {
            return entry['colId']===colId;
        })
        const columnToMove = columns[oldIndex];

        if(isLeft && oldIndex!==0){ // moving to left
            columns.splice(oldIndex, 1);
            columns.splice(oldIndex - 1, 0, columnToMove);
        } else if(!isLeft && columns.length!==oldIndex-1){ // moving to right
            columns.splice(oldIndex, 1);
            columns.splice(oldIndex + 1, 0, columnToMove);
        }
        this.setState({'boardContent': columns});
    }

    render(): JSX.Element {
        return (
            <div className={'tableau tab-pane fade ' + ( this.props.isFirst ? "show active" : "")} id={this.state.boardId}  role="tabpanel">
                <div className='my-3 container'>
                    <input
                        type='text'
                        className='form-control border-0'
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
                                className="btn btn-outline-danger"
                            >
                                Delete board
                            </button>
                        </div>
                        <div className="col-6 p-0 text-end">
                            <button
                                type='button'
                                onClick={ () => this.addColumnToState() }
                                className='btn btn-outline-secondary'
                            >
                                Add column
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tableau;
