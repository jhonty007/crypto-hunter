import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../Context/CoinContext'
import {Link} from 'react-router-dom'


const Home = () => {

const {allCoin,currency} =useContext(CoinContext);
const [displayCoin, setDisplayCoin]=useState([]);

const [input, setInput]=useState('');

const inputHandler = (event) =>{
  setInput(event.target.value);
  if(event.target.value===''){
    setDisplayCoin(allCoin);
  }
}

const searchHandler = async (event) =>{
  event.preventDefault();
  const coins=await allCoin.filter ((item)=>{
    return item.name.toLowerCase().includes(input.toLowerCase())
  })
  setDisplayCoin(coins);
}

useEffect(()=>{
setDisplayCoin(allCoin);
},[allCoin])

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br/>Crypto Marketplace</h1>
        <p>Welcome to the worlds largest cryptocurrency marketplace. SignUp to explore more about cryptos.</p>

        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search Crypto...'  required/>

          <datalist id='coinlist'>
            {allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}
          </datalist>

          <button type='Submit'>Search</button>
        </form>
      </div>

     {/* to display the crypto table */}
     <div className="crypto-table">
      <div className="table-layout">
        <p style={{fontSize:"15px"}}>#</p>
        <p style={{fontSize:"15px"}}>COINS</p>
        <p style={{fontSize:"15px"}}>PRICE</p>
        <p style={{textAlign:"center",fontSize:"15px"}}>24 H Change</p>
        <p className='market-cap'>MARKET CAP</p>
      </div>
      {
        displayCoin.slice(0,10).map((item,index)=>(
          <Link to={`/coin/${item.id}`} className="table-layout" id='values' key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
              <p>{item.name + "-" +item.symbol}</p>
              </div>
              
              <p>{currency.symbol}{item.current_price.toLocaleString()}</p>

              <p className={item.price_change_24h*100>0?"green":"red"}>
                {Math.floor(item.price_change_24h*100)/100}</p>

              <p style={{textAlign:"right"}} className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
          </Link>
        ))
      }
     </div>
      
    </div>
  )
}

export default Home