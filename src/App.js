import './App.css';
import Tableau from './component/Tableau/Tableau';
import db from './seed.json'; // array of colonne objects

function App() {
  return (
    <div className="App">
      <header className="bg-light">
        <p>
          Projet kanban.
        </p>
      </header>
      <main className='mb-0'>
        <Tableau dataTableau={db}></Tableau>
      </main>
    </div>
  );
}

export default App;