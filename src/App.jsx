import React from 'react'

import './Style.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Navbar from './Component/Navbar'


import AddmissionForm from './Pages/AddmissionForm';
import StudentList from './Pages/StudentList';
import Update from './Pages/Update';


const App = () => {
  return (
    <BrowserRouter>

    <Navbar/>

    <Routes>
      <Route path="/" element={<AddmissionForm/>}/>
      <Route path="/list" element={<StudentList/>}/>
      <Route path="/update/:id" element={<Update/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App