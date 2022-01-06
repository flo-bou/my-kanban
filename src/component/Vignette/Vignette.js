// import './Vignette.css';
import React from 'react';

class Vignette extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = this.props.dataVignette; // sticker object
    }

    handleChange() {
        // this.setState({comment: 'Bonjour'}); // change state data
    }

    render() {
        return (
            <div className="row">
                <button className='vignette btn btn-light col gy-1' type='button'>
                    {this.state.stickerTitle}
                </button>
            </div>
        );
    }
}

export default Vignette;