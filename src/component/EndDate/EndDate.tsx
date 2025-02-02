import React from 'react';

class EndDate extends React.Component {
    constructor(props) {
        super(props);
        this.changeStickerEndDate = this.changeStickerEndDate.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.deleteEndDate = this.deleteEndDate.bind(this);
        this.state = { stickerEndDate: this.props.stickerEndDate };
        // stickerEndDate is a string in format 2022-01-07 (yyyy-mm-dd)
    }

    changeStickerEndDate(): void {
        // select input elem and read its value property
        const newEndDate = document.getElementById('EndDateInput' + this.props.vignetteID).value;
        this.props.updateVignetteModalState("stickerEndDate", newEndDate);
        this.setState({ "stickerEndDate": newEndDate }, function(){
            // console.log('Sticker object after changeStickerEndDate (Sticker component) : ', this.state);
        });
    }

    toggleVisibility(): void {
        // si add a hide ? rmove from add and put into Content : rmove from Content and add to add
        document.getElementById('AddEndDate' + this.props.vignetteID).classList.toggle('hide');
        document.getElementById('EndDateContent' + this.props.vignetteID).classList.toggle('hide');
        // ajouter focus auto sur le textarea ?
    }

    deleteEndDate(): void{
        document.getElementById('EndDateInput' + this.props.vignetteID).value = "";
        this.toggleVisibility();
        this.changeStickerEndDate();
    }

    render(): JSX.Element {
        // for 1st render
        const hideWhenEndDateEmpty = this.state.stickerEndDate==="" ? "hide" : "";
        const hideWhenEndDateNotEmpty = !(this.state.stickerEndDate==="") ? "hide" : "";

        return (
            <div className="endDate container-fluid my-4">
                <div className={"row " + hideWhenEndDateNotEmpty} id={'AddEndDate' + this.props.vignetteID}>
                    <button
                        type="button"
                        className={"btn btn-sm btn-outline-secondary border-0 "}
                        onClick={() => {this.toggleVisibility()} }
                    >
                        Add end date.
                    </button>
                </div>
                <div className={hideWhenEndDateEmpty} id={'EndDateContent' + this.props.vignetteID}>
                    <div className="input-group">
                        <span className="input-group-text">
                            <label htmlFor={'EndDateInput' + this.props.vignetteID} className="">
                                End date
                            </label>
                        </span>
                        <input
                            type="date"
                            className='form-control'
                            id={'EndDateInput' + this.props.vignetteID}
                            defaultValue={this.state.stickerEndDate}
                            onBlur={ () => this.changeStickerEndDate() }
                        ></input>
                    </div>
                    <div className="my-3 text-end">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={ () => {this.deleteEndDate()} }
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

// Cette partie du modal est toujours dans la page, quel que soit le context, il est simplement affiché ou pas.

export default EndDate;
