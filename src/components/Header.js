import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { red } from 'react-color/lib/helpers/color'



const Header = ({ active }) => {
  // const [checked,setChecked]=useState(false,{setValue:()=>setChecked({toggle})})
  const [checked, setChecked] = useState(false)
  function toggle(value) {
    return !value;
  }

  
  const Color = (value) => {
    if (value) {
      // return window.getComputedStyle(window.document.getElementsByClassName('slider')[0],':before').getPropertyValue('background-color')
      return 'var(--secondary-color)'

    } else {

      // return window.getComputedStyle(window.document.getElementsByClassName('slider')[0]).getPropertyValue('background-color')
      return '#ccc'

    }

  }

  return (
    <div className='Header'>

      <ul className='app__navbar-links'>

        {['Home', 'Selection', 'Affichage', 'Insertion', 'Database'].map((item) => (
          <li className='p-text' key={`${item}`} >
            <Link to={`/${item}`}  style={active === item? {backgroundColor:"var(--secondary-color)",color:'#f5f5f5'}:{}}>{item.toUpperCase()}</Link>
            {/* <Link to={`/${item}`} style={active === item ? { backgroundColor: Color(checked), color: '#f5f5f5' } : {}}>{item.toUpperCase()}</Link> */}
          </li>
        ))}


{/* 
        <label className='switch' key={"switch"}>
          {['Home','Selection','Affichage','Insertion','Database'].filter((item)=>(
            <input type={'checkbox'} checked={checked} onChange={active===item?()=>setChecked(toggle):{}} />
          ))}
          <input type={'checkbox'} checked={checked} onChange={() => setChecked(toggle)} />

          <span className='slider round' />
        </label> */}

        {/* <input type={'range'} min={10} max={100}  id='range' className='slider' onChange={(e)=>{console.log(e.target.style.accentColor)}}/> */}
        <input type={'range'} min='0' max='113' defaultValue={0} id='range' className='slider' style={{accentColor:'var(--secondary-color)'}} onChange={(e)=>{{console.log(e.target.defaultValue);e.target.style.accentColor=`rgb(0,140,${(142+ parseInt(e.target.value))})`};document.querySelector(':root').style.setProperty('--secondary-color',`rgb(0,140,${142+parseInt(e.target.value)})`)}}/>

      </ul>





    </div>
  )
}

export default Header