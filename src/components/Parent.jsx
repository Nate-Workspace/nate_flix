import Home from '../pages/home/Home'
import React, { useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Details from '../pages/details/Details'
import Movies from '../pages/movies/Movies'
import MyList from '../pages/myList/MyList'
import Series from '../pages/series/Series'
import Login from './auth/Login'
import NotFound from './auth/NotFound'
import PublicRoute from './auth/PublicRoute'
import SignUp from './auth/SignUp'
import Footer from './footer/Footer'
import { auth } from '@/config/firebase'

const Parent = () => {
    const isAuth= useMemo(()=> (!!auth?.currentUser?.uid),[auth?.currentUser?.uid] );
    console.log(isAuth)
    
  return (
    <div className="app flex flex-col justify-between min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies location={location.pathname}/>}/>
              <Route path="/series" element={<Series />} />
              <Route path="/mylist" element={<MyList />} />
              <Route path="/movie/:id" element={<Details/>} />
              <Route path="/tv/:id" element={<Details/>} />
    
              {/* Protected routing */}
              <Route path="/signup" element={<PublicRoute><SignUp/></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
    
              {/* Page not found routing */}
              <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
          </div>
  )
}

export default Parent