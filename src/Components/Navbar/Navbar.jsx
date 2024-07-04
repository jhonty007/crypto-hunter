import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assests/logo.png'
import arrow_icon from '../../assests/arrow_icon.png'
import { CoinContext } from '../../Context/CoinContext'
import {Link} from 'react-router-dom'


const Navbar = () => {

  const {setCurrency} =useContext(CoinContext);

  const currencyhandler= (event) =>{
    switch(event.target.value){
       case "USD":{
        setCurrency({ name:"usd", symbol:"$"});
        break;
       }
       case "INR":{
        setCurrency({ name:"inr", symbol:"₹"});
        break;
       }

       case "EUR":{
        setCurrency({ name:"eur", symbol:"€"});
        break;
       }

        default:{
        setCurrency({ name:"usd", symbol:"$"});
        break;
       }
      
    }
  }
  return (
    <div className='navbar'>
      <Link to={'/'}>
          <img src={logo} alt="" className='logo'/>
      </Link>
      <ul>
        <Link to={'/'}><li>HOME</li></Link>
        <li>FEATURES</li>
        <li>PRICING</li>
        <li>BLOG</li>

      </ul>

      <div className="nav-right">
        <select name="options" id="currency" onChange={currencyhandler}>
        <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
          

        </select>
        <button>Sign Up <img src={arrow_icon} alt="" /></button>

      </div>
    </div>
  )
}

export default Navbar
