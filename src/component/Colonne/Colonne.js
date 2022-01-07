import './Colonne.css';
import React from 'react';
import Vignette from '../Vignette/Vignette';

class Colonne extends React.Component {
    constructor(props) {
        super(props);
        this.getStickerElems = this.getStickerElems.bind(this);
        this.addStickerToState = this.addStickerToState.bind(this);
        this.changeColumnTitle = this.changeColumnTitle.bind(this);
        this.rmStickerFromState = this.rmStickerFromState.bind(this);
        this.state = this.props.dataColonne; // column object
    }

    generateKey(){
        let randomKey = (Math.random() + 1).toString(36).substring(6);
        return randomKey;
    }

    getStickerElems(){
        let stickers = this.state.colContent;
        // console.log('stickers data in getStickerElems (Colonne component) : ', stickers);
        let elems = stickers.map((value) => <Vignette key={value.stickerId} id={value.stickerId} rmSticker={this.rmStickerFromState} dataVignette={value}></Vignette>);
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

    changeColumnTitle(){
        // select input elem and read its value prop
        let newTitle = document.getElementById(this.state.colId + 'Input').value;
        this.setState({ "colTitle": newTitle }, function(){
            // console.log('Column object after changeColumnTitle (Colonne component) : ', this.state);
        });
    }

    rmStickerFromState(stickerID) {
        let stickers = this.state.colContent;
        let newStickers = stickers.filter((value) => {
            return value.stickerId!==stickerID;
        });
        // console.log('newStickers data in rmStickerFromState func (Colonne component) : ', newStickers);
        this.setState({ "colContent": newStickers });
    }

    render() {
        let stickers = this.getStickerElems()

        return (
            <div className='colonne'>
                <div className="container border rounded border-secondary">
                    <div className="row">
                        <button type='button' onClick={() => {this.props.changeColumnsOrder(this.state.colId, true)}} className='btn text-secondary col' title='Déplacer à gauche'>
                            🡄
                        </button>
                        <button type='button' onClick={() => {this.props.changeColumnsOrder(this.state.colId, false)}} className='btn text-secondary col' title='Déplacer à droite'>
                            🡆
                        </button>
                        <button type='button' onClick={() => {this.props.rmColumn(this.state.colId)}} className='btn rounded bg-light text-secondary border-secondary col' title='Suprimer cette colonne'>
                            &times;
                        </button>
                    </div>
                    <div>
                        <input type='text' className='form-control' id={this.state.colId + 'Input'} defaultValue={this.state.colTitle} onBlur={() =>{this.changeColumnTitle()}} maxLength="40" />
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