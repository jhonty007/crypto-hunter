import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import './LineChart.css'

const LineChart = ({historicalData}) => {

  const [data,setData]=useState([["Date","Prices"]])

  useEffect(()=>{
let dataCopy= [["Date","Prices"]];
    if(historicalData.prices)
      {
        historicalData.prices.map((item)=>{
          dataCopy.push([`${new Date(item[0]).toLocaleDateString()}`,item[1]])
        })
        setData(dataCopy)
      }


  },[historicalData]);

  return (
    <div className="chart">
    <Chart 
    chartType='LineChart'
    data={data}
    
    width="80%"/>
   </div>
  )
}

export default LineChart
