// import './VignetteModal.css';
import Description from '../Description/Description.js'
import Checklist from '../Checklist/Checklist.js'
import EndDate from '../EndDate/EndDate.js'
import React from 'react';

class VignetteModal extends React.Component {
    constructor(props) {
        super(props);
        this.changeStickerTitle = this.changeStickerTitle.bind(this);
        this.updateVignetteModalState = this.updateVignetteModalState.bind(this);
        this.state = this.props.dataVignette; // sticker object
    }

    generateKey(): string{
        return 'ID' + (Math.random() + 1).toString(36).substring(6);;
    }

    changeStickerTitle(): void {
        // select input elem and read its value prop
        const newTitle = document.getElementById(this.state.stickerId + 'Title').value;
        this.setState({ "stickerTitle": newTitle });
        this.props.updateVignetteState("stickerTitle", newTitle);
    }

    updateVignetteModalState(stickerPropertyName, value): void {
        this.setState({ [stickerPropertyName]: value })
    }

    render(): JSX.Element {
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
                            <EndDate
                                stickerEndDate={this.state.stickerEndDate}
                                vignetteID={this.state.stickerId}
                                updateVignetteModalState={this.updateVignetteModalState}>
                            </EndDate>
                            <Description
                                vignetteDescription={this.state.stickerDescription}
                                vignetteID={this.state.stickerId}
                                updateVignetteModalState={this.updateVignetteModalState}>
                            </Description>
                            <Checklist
                                stickerChecklist={this.state.stickerChecklist}
                                vignetteID={this.state.stickerId}
                                updateVignetteModalState={this.updateVignetteModalState}>
                            </Checklist>
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
