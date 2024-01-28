import { Route, Routes } from 'react-router-dom'
import './App.css';
import Register from "./components/Register";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Newposiotion from './components/Newposition'
import PositionDetails from './components/PositionDetails'
import DevRegister from './components/DevRegister';
import Languages from './components/Languages';
import Frameworks from './components/Frameworks';
import DevLogin from './components/DevLogin';
import AvailabeJobs from './components/AvailableJobs';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/style.css';


function App() {
  const [devId, setDevId] = useState("")
  return (
    <div className="App">
      <Routes>
        <Route element={<DevRegister setDevId={setDevId} />} path="/" default />
        <Route element={<Languages devId={devId} />} path="/devs/skills/languages" />
        <Route element={<Frameworks devId={devId} />} path="/devs/skills/frameworks/:id" />
        <Route element={<DevLogin />} path="/devs/login" />
        <Route element={<AvailabeJobs />} path="/devs/jobs" />
        <Route path='/orgs/Register' element={<Register />} />
        <Route path='/orgs/Dashboard' element={<Dashboard />} />
        <Route path='/orgs/Login' element={<Login />} />
        <Route path='/orgs/jobs/new' element={<Newposiotion />} />
        <Route path="/orgs/jobs/:positionId" element={<PositionDetails />} />


      </Routes>
    </div>
  );
}

export default App;
