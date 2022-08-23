import React from 'react'
import {Header,Footer} from '../components'
import {default as Getjson} from './Getjson/Getjson'



const PageWrapper = (Component,idName,classNames) => function HOC() {
  
  return (
    <div id={idName} className={`app__container ${classNames}`}>
        
        <Header active={idName}/>
        <Getjson/>
        <br/>
        <Component/>
        <Footer/>
    </div >
  )
}

export default PageWrapper