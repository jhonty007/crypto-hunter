import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../Context/CoinContext';
import LineChart from '../../Components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-57H7LagTm2Huomqfc6aBVjvj' },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-57H7LagTm2Huomqfc6aBVjvj' },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=365`, options)
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

 

  if (coinData && historicalData) {
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image.large} alt={coinData.name} />
          <p><b>{coinData.name} {" - "} {coinData.symbol.toUpperCase()}</b></p>
        </div>

        {/* line chart */}
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank: {coinData.market_cap_rank}</li>
            <li>Price: {currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
            <li>Market Cap: {currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
            <li>24 Hours High: {currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
            <li>24 Hours Low: {currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
            
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
