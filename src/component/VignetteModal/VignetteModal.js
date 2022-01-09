import './VignetteModal.css';
import VignetteModalDescription from '../VignetteModalDescription/VignetteModalDescription.js'
import VignetteModalCheckliste from '../VignetteModalCheckliste/VignetteModalCheckliste.js'
import React from 'react';

class VignetteModal extends React.Component {
    constructor(props) {
        super(props);
        this.changeStickerTitle = this.changeStickerTitle.bind(this);
        this.updateVignetteModalState = this.updateVignetteModalState.bind(this);
        this.state = this.props.dataVignette; // sticker object
    }

    generateKey(){
        let randomKey = 'ID' + (Math.random() + 1).toString(36).substring(6);
        return randomKey;
    }

    changeStickerTitle(){
        // select input elem and read its value prop
        let newTitle = document.getElementById(this.state.stickerId + 'Title').value;
        this.setState({ "stickerTitle": newTitle });
        this.props.updateVignetteState("stickerTitle", newTitle);
        // this.setState({ "stickerTitle": newTitle }, function(){
        //     // console.log('Sticker object after changeStickerTitle (Sticker component) : ', this.state);
        // });
    }

    // displayStickerDescription(isClicked){
    //     let elem = [];
    //     if(this.state.stickerDescription  && !isClicked) { // tester si des données state && pas de clic
    //         elem = <VignetteModalDescription vignetteDescription={this.state.stickerDescription} vignetteID={this.state.stickerId}></VignetteModalDescription>;
    //     }else if(!this.state.stickerDescription && isClicked) { // tester si il n'y a pas de données state && il y a eu clic
    //         elem = <VignetteModalDescription vignetteDescription=" My description" vignetteID={this.state.stickerId}></VignetteModalDescription>;
    //     }
    //     // pour refaire un rendu, il faut appeler setState
    //     // appel à set state quand cést cliqué, faire un test
    //     this.setState({descriptionElem: elem})
    // }

    // displayDescription(){
    //     let isDisplayable = (!this.state.stickerDescription || )
    // }

    updateVignetteModalState(stickerPropertyName, value){
        this.setState({ [stickerPropertyName]: value })
    }

    render() {
        return (
            <div className="modal fade" id={this.state.stickerId + 'Modal'} aria-labelledby={this.state.stickerId + 'Modal'} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    id={this.state.stickerId + 'Title'} 
                                    defaultValue={this.state.stickerTitle} 
                                    onBlur={() =>{this.changeStickerTitle()}} 
                                    maxLength="40" 
                                />
                            </h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <VignetteModalDescription 
                                vignetteDescription={this.state.stickerDescription} 
                                vignetteID={this.state.stickerId} 
                                updateVignetteModalState={this.updateVignetteModalState}>
                            </VignetteModalDescription>
                            <VignetteModalCheckliste
                                stickerChecklist={this.state.stickerChecklist}
                                vignetteID={this.state.stickerId}
                                updateVignetteModalState={this.updateVignetteModalState}>
                            </VignetteModalCheckliste>
                        </div>

                        {/* <div className="modal-footer">
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

// le modal est toujours présent dans la page, mais il est caché, il n'est jamais recréé

export default VignetteModal;