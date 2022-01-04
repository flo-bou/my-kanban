import './App.css';
import Tableau from './component/Tableau/Tableau';

function App() {
  return (
    <div className="App">
      <header className="bg-light">
        <p>
          Projet kanban.
        </p>
      </header>
      <main className='mb-0'>
        <Tableau></Tableau>
      </main>
    </div>
  );
}

export default App;