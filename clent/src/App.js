import { Route, Routes } from 'react-router-dom'
import './App.css';
import Register from "./components/Register";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Newposiotion from './components/Newposition'
import PositionDetails from './components/PositionDetails'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/orgs/Register' element={<Register />} />
        <Route path='/orgs/Dashboard' element={<Dashboard />} />
        <Route path='/orgs/Login' element={<Login />} />
        <Route path='/orgs/jobs/new' element={<Newposiotion/> } />
        <Route path="/orgs/jobs/:positionId" element={<PositionDetails />} />


      </Routes>
    </div>
  );
}

export default App;
