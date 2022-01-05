// import './Tableau.css';
import React from 'react';
import Colonne from '../Colonne/Colonne';

class Tableau extends React.Component {
    constructor(props) {
        super(props); // ici on récupère les props des parents
        this.addColumnToState = this.addColumnToState.bind(this);
        this.rmColumnFromState = this.rmColumnFromState.bind(this);
        this.displayColumn = this.displayColumn.bind(this);
        this.state = { columns: [ 'Colonne 1', 'Colonne 2' ] }; // initialisation des données state
    }

    generateKey(){
        let randomKey = (Math.random() + 1).toString(36).substring(7);
        return randomKey; // 5 characters string
    }

    addColumnToState() {
        let temps = this.state.columns;
        let noColum = temps.length + 1;
        temps.push('Colonne ' + noColum);
        this.setState({ columns: temps });
    }

    rmColumnFromState(columnName) {
        let temps = this.state.columns;
        let newColumns = temps.filter((value) => {
            return value!==columnName;
        });
        this.setState({ columns: newColumns });
    }

    displayColumn(columns){
        let elems = columns.map((value) => {
            return <Colonne title={value} key={this.generateKey()} id={this.generateKey()} rmColumn={this.rmColumnFromState}></Colonne>;
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
                        {this.displayColumn(this.state.columns)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tableau;