import './App.css';
import Tableau from './component/Tableau/Tableau';
import seed from './seed.json'; // array of colonne objects
const db = seed;

function App() {
  return (
    <div className="App">
      <header className="bg-light">
        <p>
          Selectionnez un tableau (bientôt)
        </p>
      </header>
      <main className='mb-0'>
        <Tableau dataTableau={db[0]}></Tableau>
      </main>
    </div>
  );
}

export default App;