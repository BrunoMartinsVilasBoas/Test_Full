import './App.css';
import UseAlgo from './hooks/use-algo';

function App() {
  const { handleCheckFizzbuzz, result } = UseAlgo();

  return (
    <>
      <h1>{result}</h1>
      <div>
        <input type="number" onChange={(e) => handleCheckFizzbuzz(e.target.value)} />
      </div>
    </>
  );
}

export default App;
