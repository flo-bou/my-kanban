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
            <div className="row">
                <button className='vignette btn btn-light col' type='button'>
                    Vignette
                </button>
            </div>
        );
    }
}

export default Vignette;