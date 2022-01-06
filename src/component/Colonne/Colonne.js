// import './Colonne.css';
import React from 'react';
import Vignette from '../Vignette/Vignette';

class Colonne extends React.Component {
    constructor(props) {
        super(props);
        this.getStickerElems = this.getStickerElems.bind(this);
        this.addStickerToState = this.addStickerToState.bind(this);
        this.changeColumnName = this.changeColumnName.bind(this);
        this.state = this.props.dataColonne; // column object
    }

    generateKey(){
        let randomKey = (Math.random() + 1).toString(36).substring(6);
        return randomKey;
    }

    getStickerElems(){
        let stickers = this.state.colContent;
        // console.log('stickers data in getStickerElems (Colonne component) : ', stickers);
        let elems = stickers.map((value) => <Vignette key={value.stickerId} rmVignette={this.rmVignetteFromState} dataVignette={value}></Vignette>);
        return elems;
    }

    addStickerToState() {
        let stickers = this.state.colContent;
        let newStickerNumber = stickers.length + 1;
        let newStickerTitle = 'Nouvelle vignette ' + newStickerNumber.toString();
        let newSticker = { "stickerTitle": newStickerTitle, "stickerDescription": "", "stickerId": this.generateKey(), "stickerOrder": newStickerNumber, "stickerStart": "", "stickerEnd": "", "stickerChecklist": [] };
        stickers.push(newSticker);
        // console.log('stickers data in addSticker func (Colonne component) : ', stickers);
        this.setState({ "colContent": stickers });
    }

    changeColumnName(){
        // select input elem and read its value prop
        let newName = document.getElementById(this.state.colId + 'Input').value;
        this.setState({ "colTitle": newName }, function(){
            console.log('Column object after changeColumnName (Colonne component) : ', this.state);
        });
    }

    // rmSticker(){

    // }

    render() {
        let stickers = this.getStickerElems()

        return (
            <div className='colonne col'>
                <div className="container border rounded border-secondary">
                    <div className='row'>
                        <input type='text' className='col' id={this.state.colId + 'Input'} defaultValue={this.state.colTitle} onChange={() =>{this.changeColumnName()}} maxLength="40" />
                        <button type='button' onClick={() => {this.props.rmCol(this.state.colId)}} className='col btn btn-sm rounded  border-secondary' title='Suprimer cette colonne'>
                            &times;
                        </button>
                    </div>
                        {stickers}
                    <div className="row">
                        <button type='button' onClick={() => {this.addStickerToState()}} className='col btn btn-sm rounded border-secondary' title='Ajouter une vignette'>Ajouter</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Colonne;