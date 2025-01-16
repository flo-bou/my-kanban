import React from 'react';

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.changeStickerDescription = this.changeStickerDescription.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.deleteDescription = this.deleteDescription.bind(this);
        this.state = { stickerDescription: this.props.vignetteDescription };
    }

    changeStickerDescription(){
        // select input elem and read its value property
        let newDescription = document.getElementById(this.props.vignetteID + 'Description').value;
        this.props.updateVignetteModalState("stickerDescription", newDescription);
        this.setState({ "stickerDescription": newDescription }, function(){
            // console.log('Sticker object after changeStickerDescription (Sticker component) : ', this.state);
        });
    }

    toggleVisibility(){
        document.getElementById('DescBtn' + this.props.vignetteID).classList.toggle('hide');
        document.getElementById('Desc' + this.props.vignetteID).classList.toggle('hide');
        // ajouter focus auto sur le textarea ?
    }

    deleteDescription(){
        document.getElementById(this.props.vignetteID + 'Description').value = "";
        this.toggleVisibility();
        this.changeStickerDescription();
    }

    render() {
        // for 1st render
        let hideWhenDescEmpty = this.state.stickerDescription==="" ? "hide" : "";
        let hideWhenDescNotEmpty = !(this.state.stickerDescription==="") ? "hide" : "";

        return (
            <div className="vignetteModalDescription container-fluid my-4">
                <div className={hideWhenDescNotEmpty} id={'DescBtn' + this.props.vignetteID}>
                    <div className="row">
                        <button type="button" className='btn btn-sm btn-outline-secondary border-0' onClick={() => {this.toggleVisibility()} }>
                            Ajouter une description.
                        </button>
                    </div>
                </div>
                <div className={hideWhenDescEmpty}  id={'Desc' + this.props.vignetteID}>
                    <label htmlFor={this.props.vignetteID} className="form-label">
                        Description
                    </label>
                    <textarea 
                        className="form-control" 
                        id={this.props.vignetteID + 'Description'} 
                        defaultValue={this.state.stickerDescription} 
                        onBlur={() =>{this.changeStickerDescription()}} 
                        rows="3"
                    ></textarea>
                    <div className="my-3 text-end">
                        <button 
                            type="button" 
                            className='btn btn-sm btn-outline-danger'
                            onClick={() => {this.deleteDescription()} }
                        >
                            Del
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

// Cette partie du modal est toujours dans la page, quel que soit le context, il est simplement affiché ou pas.

export default Description;