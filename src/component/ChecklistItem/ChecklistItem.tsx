import React from 'react';

class ChecklistItem extends React.Component {
    constructor(props) {
        super(props);
        this.changeItemName = this.changeItemName.bind(this);
        this.changeState = this.changeState.bind(this);
        this.state = this.props.stickerChecklist;
        // stickerChecklist is an array of objects with 3 properties :
        // "ChecklistName": string,
        // ChecklistId: string
        // "ChecklistChecked": bool
    }

    changeState(stateProperty, newValue): void {
        this.setState({ [stateProperty]: newValue });
    }

    changeItemName(): void {
        const newItemName = document.getElementById(this.state.checklistId + 'Name').value;
        // this.props.updateVignetteModalState("checklistName", newItemName);
        this.setState({ "checklistName": newItemName });
    }

    render(): JSX.Element {
        return (
            <div className="input-group my-1">
                <div className="input-group-text">
                    <input
                        type="checkbox"
                        className="form-check-input mt-0" 
                        checked={this.state.checklistChecked} 
                        aria-label="Checkbox for following text input" 
                        id={this.state.checklistId + 'Checkbox'} 
                        onChange={ () => {this.changeState( "checklistChecked", document.getElementById(this.state.checklistId + 'Checkbox').checked)} }
                    />
                </div>
                <input
                    type="text" 
                    className="form-control" 
                    defaultValue={this.state.checklistName} 
                    id={this.state.checklistId + 'Name'} 
                    onBlur={ () => {this.changeState( "checklistName", document.getElementById(this.state.checklistId + 'Name').value)} }
                />
                <button className="btn btn-outline-dark" title="Supprimer cet élément" onClick={ () => {this.props.rmChecklistItem(this.state.checklistId)}}>
                    ×
                </button>
            </div>
        );
    }
}

export default ChecklistItem;
