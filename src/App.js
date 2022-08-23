import React from 'react'
import {Home,Selection,Insertion,Affichage,Database}  from './container'
import {BrowserRouter,Router,Route,Routes} from 'react-router-dom'
import '../src/App.css'


const App = () => {
  return (
    <>
    <BrowserRouter >
      <Routes >
        <Route exact path='/Home' element={<Home/>}/>
          <Route  exact path='/Selection' element={<Selection/>}/>
          <Route  exact path='/Affichage' element={<Affichage/>}/>
          <Route exact path='/Insertion' element={<Insertion/>}/>
          <Route exact  path='/Database' element={<Database/>}/>
      </Routes>

    </BrowserRouter>
    </>
  )
}
export default App
