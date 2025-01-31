import React from 'react';
import Tableau from './component/Tableau/Tableau';
import seed from './seed.json'; // array of tableau objects
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.getTableauElems = this.getTableauElems.bind(this);
        this.addTableauToState = this.addTableauToState.bind(this);
        this.getUpdate = this.getUpdate.bind(this);
        this.rmTableauFromState = this.rmTableauFromState.bind(this);
        this.getTabElems = this.getTabElems.bind(this);
        this.state = { tableaus: seed } ;  // array of tableau objects
    }

    generateKey(): string {
        return 'ID' + (Math.random() + 1).toString(36).substring(6);;
    }

    getTableauElems(): JSX.Element[] {
        // console.log('tableaus data in getTableauElems (Colonne component) : ', tableaus);
        const elems = this.state.tableaus.map((value, index) =>
            <Tableau
                key={value.boardId}
                rmTableau={this.rmTableauFromState}
				sendUpdate={this.getUpdate}
                dataTableau={value}
				isFirst={index===0}>
            </Tableau>
        );
        return elems;
    }

    addTableauToState(): void {
        const tableaus = this.state.tableaus;
        const newTableauNumber = tableaus.length + 1;
        const newTableau = { "boardTitle": 'Tableau ' + newTableauNumber.toString(), "boardId": this.generateKey(), "boardContent": [] };
        tableaus.push(newTableau);
        // console.log('tableaus data in addTableau func (Colonne component) : ', tableaus);
        this.setState({ "tableaus": tableaus });
    }

    getUpdate(tableauId, propertyName, value): void {
		let index: number;
		let newTableaus = this.state.tableaus;
		newTableaus.forEach((value, i) => {
			if(value['boardId']===tableauId){
				index=i;
			}
		});
		newTableaus[index][propertyName] = value;
		this.setState( { "tableaus": newTableaus } );
    }

    rmTableauFromState(tableauId): void {
        const newTableaus = this.state.tableaus.filter((value) => {
            return value.boardId!==tableauId;
        });
        this.setState({ "tableaus": newTableaus });
    }

	getTabElems(): JSX.Element[] {
        const elems = this.state.tableaus.map((value) =>
            <li className="nav-item" key={value.boardId + "Tab"}>
                <button
                    type="button"
                    className={"nav-link " + ( this.state.tableaus[0].boardId===value.boardId ? "active" : "")}
                    data-bs-toggle="tab"
                    data-bs-target={ "#" + value.boardId }
                    role="tab"
                    aria-controls={ value.boardId }
                >
                    {value.boardTitle}
                </button>
            </li>
        );
        return elems;
    }

    render(): JSX.Element {
		return (
			<div className="App">
				<header>
					<nav className="navbar">
						<div className="container-fluid bg-light">
							<ul className="nav nav-tabs bg-light">
								{this.getTabElems()}
							</ul>
							<button
								type='button'
								className="btn btn-outline-secondary "
								onClick={ () => this.addTableauToState() }
							>
								Add board
							</button>
						</div>
					</nav>
				</header>
				<main className='tab-content'>

					{this.getTableauElems()}

				</main>
				<footer className='mt-5 bg-light p-3 text-center'>
					A project by <a href="https://github.com/flo-bou">flo-bou</a>.
					<br />
					Repo on <a href="https://github.com/flo-bou/my-kanban">GitHub</a>.
				</footer>
			</div>
		);
	}
}

export default App;
