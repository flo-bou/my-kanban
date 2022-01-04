// import './Tableau.css';
import React from 'react';
import Colonne from '../Colonne/Colonne';

class Tableau extends React.Component {
    constructor(props) {
        super(props); // ici on récupère les props des parents
        this.handleChange = this.handleChange.bind(this);
        this.state = {  }; // initialisation des données state
    }

    handleChange() {
        // this.setState({comment: 'Bonjour'}); // change state data
    }

    render() {
        return (
            <div className='tableau'>
                <p>Mon tableau kanban</p>
                <div className="container border rounded border-secondary">
                    <div className="row border rounded border-secondary">
                        <Colonne></Colonne>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tableau;