// import './Vignette.css';
import React from 'react';

class Vignette extends React.Component {
    constructor(props) {
        super(props);
        this.changeStickerTitle = this.changeStickerTitle.bind(this);
        this.changeStickerDescription = this.changeStickerDescription.bind(this);
        this.state = this.props.dataVignette; // sticker object
    }

    changeStickerTitle(){
        // select input elem and read its value prop
        let newTitle = document.getElementById(this.state.stickerId + 'Title').value;
        this.setState({ "stickerTitle": newTitle }, function(){
            console.log('Sticker object after changeStickerTitle (Sticker component) : ', this.state);
        });
    }

    changeStickerDescription(){
        // select input elem and read its value prop
        let newDescription = document.getElementById(this.state.stickerId + 'Description').value;
        this.setState({ "stickerDescription": newDescription }, function(){
            console.log('Sticker object after changeStickerDescription (Sticker component) : ', this.state);
        });
    }

    render() {
        return (
            <div className="row">
                <button className='vignette btn btn-light col gy-1' type='button' data-bs-toggle="modal" data-bs-target={'#' + this.state.stickerId + 'Modal'}>
                    {this.state.stickerTitle}
                </button>

                {/* Modal */}
                <div className="modal fade" id={this.state.stickerId + 'Modal'} aria-labelledby={this.state.stickerId + 'Modal'} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">
                                    <input type='text' className='form-control' id={this.state.stickerId + 'Title'} defaultValue={this.state.stickerTitle} onBlur={() =>{this.changeStickerTitle()}} maxLength="40" />
                                </h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <label htmlFor={this.state.stickerId + 'Description'} className="form-label">
                                    Description
                                </label>
                                <textarea className="form-control" id={this.state.stickerId + 'Description'} defaultValue={this.state.stickerDescription} onBlur={() =>{this.changeStickerDescription()}} rows="3"></textarea>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger float-start" onClick={() => {this.props.rmSticker(this.state.stickerId)}} data-bs-dismiss="modal">
                                    Delete
                                </button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Vignette;