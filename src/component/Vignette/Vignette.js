// import './Vignette.css';
// import ProductList from '../ProductList/ProductList.js';
import React from 'react';

class Vignette extends React.Component {
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
            <button className='vignette btn btn-light' type='button'>
                Vignette
            </button>
        );
    }
}

export default Vignette;