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
        this.changeStickerOrder = this.changeStickerOrder.bind(this);
        this.state = this.props.dataColonne; // column object
    }

    generateKey(): string {
        return 'ID' + (Math.random() + 1).toString(36).substring(6);
    }

    getStickerElems(): JSX.Element[] {
        // const stickers = this.state.colContent;
        // console.log('stickers data in getStickerElems (Colonne component) : ', stickers);
        const elems = this.state.colContent.map((value) =>
            <Vignette
                key={value.stickerId}
                rmSticker={this.rmStickerFromState}
                changeStickerOrder={this.changeStickerOrder}
                dataVignette={value}>
            </Vignette>
        );
        return elems;
    }

    addStickerToState(): void {
        const stickers = this.state.colContent;
        const newStickerNumber = stickers.length + 1;
        const newSticker = { 
            "stickerTitle": 'Vignette '+newStickerNumber.toString(), 
            "stickerDescription": "", 
            "stickerId": this.generateKey(), 
            "stickerOrder": newStickerNumber, 
            "stickerTag": "", 
            "stickerEndDate": "", 
            "stickerChecklist": [] 
        };
        stickers.push(newSticker);
        // console.log('stickers data in addSticker func (Colonne component) : ', stickers);
        this.setState({ "colContent": stickers });
    }

    changeColumnTitle(): void {
        // select input elem and read its value prop
        this.setState({ "colTitle": document.getElementById(this.state.colId + 'Input').value }, function(){
            // console.log('Column object after changeColumnTitle (Colonne component) : ', this.state);
        });
    }

    rmStickerFromState(stickerID): void {
        const stickers = this.state.colContent;
        const newStickers = stickers.filter((value) => {
            return value.stickerId!==stickerID;
        });
        // console.log('newStickers data in rmStickerFromState func (Colonne component) : ', newStickers);
        this.setState({ "colContent": newStickers });
    }

    changeStickerOrder(stickerId, isUp): void {
        const stickers = this.state.colContent;
        const oldIndex = stickers.findIndex((entry) => {
            return entry['stickerId']===stickerId;
        })
        const stickerToMove = stickers[oldIndex];

        if(isUp && oldIndex!==0){ // moving to left
            stickers.splice(oldIndex, 1);
            stickers.splice(oldIndex - 1, 0, stickerToMove);
        } else if(!isUp && stickers.length!==oldIndex-1){ // moving to right
            stickers.splice(oldIndex, 1);
            stickers.splice(oldIndex + 1, 0, stickerToMove);
        }
        this.setState({'colContent': stickers});
        // je renvoie le nouveau tableau dans state (vais-je perdre des données ? surement : il va falloir faire remonter toutes les données dans tableau)
    }

    render(): JSX.Element {
        return (
            <div className='colonne'>
                <div className="container border rounded border-secondary">
                    <div className="row mb-1">
                        <button type='button' onClick={() => {this.props.changeColumnsOrder(this.state.colId, true)}} className='btn btn-sm btn-outline-secondary border-0 col-5' title='Déplacer à gauche'>
                            ◁
                        </button>
                        <button type='button' onClick={() => {this.props.changeColumnsOrder(this.state.colId, false)}} className='btn btn-sm btn-outline-secondary border-0 col-5' title='Déplacer à droite'>
                            ▷
                        </button>
                        <button type='button' onClick={() => {this.props.rmColumn(this.state.colId)}} className='btn btn-sm btn-outline-dark col-2' title='Suprimer cette colonne'>
                            &times;
                        </button>
                    </div>
                    <div className="row mb-1">
                        <input type='text' className='form-control border-0' id={this.state.colId + 'Input'} defaultValue={this.state.colTitle} onBlur={() =>{this.changeColumnTitle()}} maxLength="40" />
                    </div>

                    {this.getStickerElems()}

                    <div className="row">
                        <button type='button' onClick={() => {this.addStickerToState()}} className='col btn btn-sm btn-outline-secondary' title='Add a sticker'>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Colonne;
