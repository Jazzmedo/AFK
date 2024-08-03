import MNavbar from "./Components/navbar/MNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import './App.css';
import { ApiContext } from './Components/context/ApiContextProvider';

function App() {
  // let api1 = '63082c7fee104bc5a7ec3856ab97b01c'
  // let api1 = '54582cd735a340b89b17702eae51578b'
  // let api1 = '0a65a858315b421782e2f12cebd5b3d5'
  let api1 = '91131b2d0342499dbc6180fbdbc72d3b'

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
