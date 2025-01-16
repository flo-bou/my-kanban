// import './Vignette.css';
import React from 'react';
import VignetteModal from '../VignetteModal/VignetteModal';

class Vignette extends React.Component {
    constructor(props) {
        super(props);
        this.updateVignetteState = this.updateVignetteState.bind(this);
        this.state = this.props.dataVignette; // sticker object
    }

    updateVignetteState(stickerPropertyName, value){
        // read id of sticker passed as param
        // find index of stiker
        // replace object at the specified index of stickers
        this.setState({ [stickerPropertyName]: value })
    }

    render() {
        return (
            <div className="row my-1">
                <div className="input-group">
                    <button className='vignette btn btn-light col gy-1' type='button' data-bs-toggle="modal" data-bs-target={'#' + this.state.stickerId + 'Modal'}>
                        {this.state.stickerTitle}
                    </button>
                    <span className="d-grid">
                        <button type="button" className="btn btn-sm btn-outline-secondary border-0" onClick={ () => {this.props.changeStickerOrder(this.state.stickerId, true)} }>△</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary border-0" onClick={ () => {this.props.changeStickerOrder(this.state.stickerId, false)} }>▽</button>
                    </span>
                </div>

                <VignetteModal
                    dataVignette={this.state}
                    rmSticker={this.props.rmSticker}
                    updateVignetteState={this.updateVignetteState}>
                </VignetteModal>
            </div>
        );
    }
}

export default Vignette;