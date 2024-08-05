import MNavbar from "./Components/navbar/MNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import './App.css';
import { ApiContext } from './Components/context/ApiContextProvider';

function App() {
  
  // let api1 = '88682be5c94f45ec86a72c163e1a3a09'
  // let api1 = 'ade6baffb598415a9e79d4ca7acfa74f'
  let api1 = '223cbd9b75454545a8743e05c64645ff'
  // let api1 = '752261bddc104be7860f16124d616255'

  return (
    <ApiContext.Provider value={{ api1 }}>
      <div className="App">
        <MNavbar />
        <Outlet />
      </div>
    </ApiContext.Provider>
  );
}

export default App;
