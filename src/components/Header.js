import React,{useState} from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = ({ active }) => {
  const [Value,setValue]=useState(0)
  return (
    <div className='Header'>

      <ul className='app__navbar-links'>

        {['Home', 'Selection', 'Affichage', 'Insertion', 'Database'].map((item) => (
          <li className='p-text' key={`${item}`} >
            <Link to={`/${item}`}  style={active === item? {backgroundColor:"var(--secondary-color)",color:'#f5f5f5'}:{}}>{item.toUpperCase()}</Link>
          </li>
        ))}
        <input type={'range'} min='0' max='0' defaultValue={Value} id='range' className='slider' style={{accentColor:'var(--secondary-color)'}} onChange={(e)=>{{console.log(e.target.defaultValue);e.target.style.accentColor=`rgb(0,140,${(142+ parseInt(e.target.value))})`};document.querySelector(':root').style.setProperty('--secondary-color',`rgb(0,140,${142+parseInt(e.target.value)})`); setValue(e.target.value)}}/>
      </ul>
    </div>
  )
}

export default Header