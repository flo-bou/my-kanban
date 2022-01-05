// import './Tableau.css';
import React from 'react';
import Colonne from '../Colonne/Colonne';

class Tableau extends React.Component {
    constructor(props) {
        super(props); // ici on récupère les props des parents
        this.addColumnToState = this.addColumnToState.bind(this);
        this.rmColumnFromState = this.rmColumnFromState.bind(this);
        this.displayColumn = this.displayColumn.bind(this);
        this.state = this.props.dataTableau; // array of colonne objects

        // use this.state to store then display datas from this.props.dataTableau
        // modify them using setSate
        // send state containing every relevent data to children
    }

    generateKey(){
        let randomKey = (Math.random() + 1).toString(36).substring(7);
        return randomKey; // 5 characters string
    }

    addColumnToState() {
        let temps = this.state;
        // console.log('temps : ', temps);
        // define strucure of column object
        let newColumnName = 'Colonne ' + (temps.length + 1).toString();
        let newColumn = {};
        newColumn[newColumnName] = [];
        // console.log('newColumn : ', newColumn);
        temps.push(newColumn);
        // put new column object in state
        this.setState(temps);
    }

    rmColumnFromState(columnName) {
        // let temps = this.state;
        // let newColumns = temps.filter((value) => {
        //     return value!==columnName;
        // });
        // this.setState(newColumns);
    }

    displayColumn(columns){
        let elems = columns.map((value, index) => {
            return <Colonne key={this.generateKey()} id={this.generateKey()} rmColumn={this.rmColumnFromState} dataColonne={value}></Colonne>;
        });
        return elems;
    }

    render() {
        return (
            <div className='tableau'>
                <p>
                    Mon tableau kanban &nbsp;
                    {/* <button type='button' onClick={() => {this.rmColumnFromState('Colonne 2')}} className='btn btn-light rounded border-secondary'>Retirer colonne 1</button> */}
                    <button type='button' onClick={() => {this.addColumnToState()}} className='btn btn-light rounded border-secondary'>Ajouter une colonne</button>
                </p>
                <div className="container border rounded border-secondary">
                    <div className="row">
                        {this.displayColumn(this.state)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tableau;