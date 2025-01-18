import ChecklistItem from '../ChecklistItem/ChecklistItem';
import React from 'react';

class Checklist extends React.Component {
    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.deleteChecklist = this.deleteChecklist.bind(this);
        this.getChecklistItemElems = this.getChecklistItemElems.bind(this);
        this.addChecklistItemToState = this.addChecklistItemToState.bind(this);
        this.rmChecklistItem = this.rmChecklistItem.bind(this);
        this.state = { stickerChecklist: this.props.stickerChecklist };
        // stickerChecklist is an array of objects with 3 properties :
        // checklistName: string,
        // checklistId: string
        // checklistChecked: bool
    }

    toggleVisibility(): void {
        document.getElementById('ClBtn' + this.props.vignetteID).classList.toggle('hide');
        document.getElementById('Checklist' + this.props.vignetteID).classList.toggle('hide');
    }

    deleteChecklist(): void {
        this.toggleVisibility();
        this.setState( {stickerChecklist: []} );
    }

    generateKey(): string {
        return 'ID' + (Math.random() + 1).toString(36).substring(6);
    }

    getChecklistItemElems(): JSX.Element[] {
        const checklistItems = this.state.stickerChecklist;
        // console.log('colonnes data in getChecklistItemElems func (Tableau component) : ', checklistItems);
        const elems: JSX.Element[] = checklistItems.map((value) =>
            <ChecklistItem
                key={value.checklistId}
                stickerChecklist={value}
                updateVignetteModalState={this.props.updateVignetteModalState}
                rmChecklistItem={this.rmChecklistItem}
                // changeColName={this.changeChecklistItemName}
                // changeChecklistItemsOrder={this.changeChecklistItemsOrder}
                // dataColonne={value}
            ></ChecklistItem>
        );
        return elems;
    }

    addChecklistItemToState(): void {
        const checklistItems = this.state.stickerChecklist;
        const newChecklistItemName = 'Tâche ' + (checklistItems.length + 1).toString();
        const newChecklistItem = {"checklistName": newChecklistItemName, "checklistId": this.generateKey(), "checklistChecked": false};
        checklistItems.push(newChecklistItem);
        // console.log('colonnes data in addChecklist func (Tableau component) : ', checklists);
        this.setState({"stickerChecklist": checklistItems});
    }

    rmChecklistItem(checklistItemID): void {
        const checklistItems = this.state.stickerChecklist;
        const newChecklistItems = checklistItems.filter((value) => {
            return value.checklistId!==checklistItemID;
        });
        this.setState({ "stickerChecklist": newChecklistItems });
    }

    render(): JSX.Element {
        const hideWhenClEmpty = this.state.stickerChecklist.length===0 ? "hide" : "";
        const hideWhenClNotEmpty = this.state.stickerChecklist.length!==0 ? "hide" : "";

        return (
            <div className="vignetteModalChecklist container-fluid my-4">
                <div className={hideWhenClNotEmpty} id={'ClBtn' + this.props.vignetteID}>
                    <div className="row">
                        <button type="button" className='btn btn-sm btn-outline-secondary border-0' onClick={() => {this.toggleVisibility()} }> Ajouter une check-list. </button>
                    </div>
                </div>
                <div className={hideWhenClEmpty} id={'Checklist' + this.props.vignetteID}>
                    <label htmlFor={this.props.vignetteID} className="form-label">
                        Check-list
                    </label>

                    {this.getChecklistItemElems()}

                    <div className="row my-3">
                        <div className="col">
                            <button type="button" className='btn btn-sm btn-outline-secondary' onClick={ () => {this.addChecklistItemToState()} }>
                                Ajouter une tâche
                            </button>
                        </div>
                        <div className="col text-end">
                            <button type="button" className='btn btn-sm btn-outline-danger me-0 ms-auto' onClick={ () => {this.deleteChecklist()} }>
                                Del
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

// Cette partie du modal est toujours dans la page, quel que soit le context, elle est simplement affiché ou pas.

export default Checklist;
