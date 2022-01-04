// import './Tableau.css';
import React from 'react';
import Colonne from '../Colonne/Colonne';

class Tableau extends React.Component {
    constructor(props) {
        super(props); // ici on récupère les props des parents
        this.addColumnToDb = this.addColumnToDb.bind(this);
        this.displayColumn = this.displayColumn.bind(this);
        this.state = { columns: [ 'Colonne 1' ] }; // initialisation des données state
    }

    addColumnToDb() {
        let temps = this.state.columns;
        temps.push('Une colonne');
        this.setState({ columns: temps });
    }

    displayColumn(columns){
        let elems = columns.map((value) => {
            return <Colonne></Colonne>;
        });
        return elems;
    }

    render() {
        return (
            <div className='tableau'>
                <p>
                    Mon tableau kanban
                    <button type='button' onClick={this.addColumnToDb} className='btn btn-light rounded border-secondary'>Ajouter une colonne</button>
                </p>
                <div className="container border rounded border-secondary">
                    <div className="row border rounded border-secondary">
                        {this.displayColumn(this.state.columns)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tableau;