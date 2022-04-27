import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard"
import Register from "../pages/Register"
import Profile from "../pages/Profile"
import Details from "../pages/Details"
import NewBlog from "../pages/NewBlog"
import UpdateBlog from "../pages/UpdateBlog"
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/" element={<PrivateRouter />}>
        <Route path='/details' element={<Details/>}/>
        </Route>
        <Route path="/" element={<PrivateRouter />}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path="/" element={<PrivateRouter />}>
        <Route path='/new-blog' element={<NewBlog/>}/>
        </Route>
        <Route path="/" element={<PrivateRouter />}>
        <Route path='/update-blog' element={<UpdateBlog/>}/>
        </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter