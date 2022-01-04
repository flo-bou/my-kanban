// import './Colonne.css';
// import ProductList from '../ProductList/ProductList.js';
import React from 'react';
import Vignette from '../Vignette/Vignette';

class Colonne extends React.Component {
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
            <div className='colonne d-grid gap-2'>
                <div>
                    Ma colonne.
                </div>
                <Vignette></Vignette>
            </div>
        );
    }
}

export default Colonne;