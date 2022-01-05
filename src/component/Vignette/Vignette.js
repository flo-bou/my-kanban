// import './Vignette.css';
// import ProductList from '../ProductList/ProductList.js';
import React from 'react';

class Vignette extends React.Component {
    constructor(props) {
        super(props); // ici on récupère les props des parents
        this.handleChange = this.handleChange.bind(this);
        this.state = this.props.dataVignette; // object (title, description ...)
    }

    handleChange() {
        // this.setState({comment: 'Bonjour'}); // change state data
    }

    render() {
        return (
            <div className="row">
                <button className='vignette btn btn-light col gy-1' type='button'>
                    {/* {this.props.title} */}
                    {this.props.dataVignette.title}
                </button>
            </div>
        );
    }
}

export default Vignette;