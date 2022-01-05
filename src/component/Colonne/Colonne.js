// import './Colonne.css';
// import ProductList from '../ProductList/ProductList.js';
import React from 'react';
import Vignette from '../Vignette/Vignette';

class Colonne extends React.Component {
    constructor(props) {
        super(props); // ici on récupère les props des parents
        this.addVignetteToState = this.addVignetteToState.bind(this);
        this.displayVignette = this.displayVignette.bind(this);
        this.updateName = this.updateName.bind(this);
        this.state = this.props.dataColonne; // array of vignette objects
    }

    generateKey(){
        let randomKey = (Math.random() + 1).toString(36).substring(7);
        return randomKey; // 5 characters string
    }

    addVignetteToState() {
        // let temps = this.state.vignettes;
        // temps.push('Une autre vignette');
        // this.setState({ vignettes: temps });
    }

    displayVignette(vignettes){
        console.log('vignettes : ', vignettes);
        let elems = vignettes.map((value) => {
            return <Vignette key={this.generateKey()} id={this.generateKey()} dataVignette={value}></Vignette>;
        });
        return elems;
    }

    updateName(){
        // // select input elem and read its value prop
        // let newName = document.getElementById(this.props.id + 'Input').value;
        // // send value to this.state
        // this.setState({ titre: newName });
        // console.log(this.state)
    }

    render() {
        console.log(this.state);
        return (
            <div className='colonne col'>
                <div className="container border rounded border-secondary">
                    {/* <div className='row'>
                        <input type='text' className='col' id={this.props.id + 'Input'} defaultValue={this.state.titre} onChange={() =>{this.updateName()}} maxLength="40" />
                        <button type='button' onInput={() => {this.props.rmColumn(this.state.titre)}} className='col btn btn-sm rounded  border-secondary' title='Suprimer cette colonne'>&times;</button>
                    </div> */}
                    {this.displayVignette(this.state)}
                    <div className="row">
                        <button type='button' onClick={() => {this.addVignetteToState()}} className='col btn btn-sm rounded border-secondary' title='Ajouter une vignette'>Ajouter</button>
                    </div>
                </div>
            </div>
        );
    }
}

// La position des colonnes et des vignettes corresponds à leur place dans ces arrays seed.

export default Colonne;