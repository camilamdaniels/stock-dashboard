// import React, { useMemo, useState, useEffect }from 'react'
// import ChartBox from './ChartBox'
// import {
//   Box,
//   useMediaQuery,
//   Button,
//   Typography,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   Select
// } from '@mui/material'
// import FlexBetween from './FlexBetween'
// import {
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
//   Bar,
//   BarChart,
//   ScatterChart,
//   Scatter,
//   Label,
//   ComposedChart
// } from 'recharts'
// import regression, { DataPoint } from 'regression'
// import axios from 'axios'
// import regressionData from '../data'


// const data = [
//   { index: 10000, red: 1643, blue: 790 },
//   { index: 1666, red: 182, blue: 42 },
//   { index: 625, red: 56, blue: 11 },
//   // Calculation of line of best fit is not included in this demo
//   { index: 300, redLine: 0 },
//   { index: 10000, redLine: 1522 },
//   { index: 600, blueLine: 0 },
//   { index: 10000, blueLine: 678 },
// ];

// const Regression = () => {
//   // const [isPredictions, setIsPredictions] = useState(false)
//   // const [data, setData] = useState([])
//   // const [stock, setStock] = useState('AAPL')

//   // const handleChange = (e) => {
//   //   setStock(e.target.value)
//   //   setData([])
//   // }

//   // const options = {
//   //   method: 'GET',
//   //   url: `https://yfapi.net/v8/finance/chart/${stock}`,
//   //   headers: {
//   //     'x-api-key': 'eDwjmEGms52LdN07k1UCvawWqw7pHDFo86gE6xw8'
//   //   },
//   //   params: {
//   //     range: '6mo',
//   //     region: 'US',
//   //     interval: '1d',
//   //     ticker: stock
//   //   }
//   // }

//   // const stocks = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'NVDA', 'TSLA', 'META', 'XOM', 'WMT', 'JPM', 'KO', 'BAC', 'CSCO', 'MCD', 'PFE', 'NFLX', 'AMD', 'DIS', 'INTC', 'GE']
//   // const menuItems = stocks.map(stock => <MenuItem key={stock} value={stock}>{stock}</MenuItem>)

//   // const formatData = (x, high, low) => {
//   //   return { x, high, low }
//   // }

//   // const regressionDataFormatted = (i, avg) => {
//   //   return [i, avg]
//   // }

//   // const regressionCoordinatesFormatted = (x, y) => {
//   //   return { x, y }
//   // }

//   // useEffect(() => {
//   //   let timestamps = []
//   //   let stockData = []
//   //   let formatted = []
//   //   let regressionData = []

//   //   axios.request(options).then((res) => {
//   //     if (res.data.chart.error != 'null') {
//   //       stockData = res.data.chart.result[0].indicators.quote[0]
//   //       timestamps = res.data.chart.result[0].timestamp

//   //       for (let i=0; i<100; i++) {
//   //         const time = timestamps[i]
//   //         const date = new Date(timestamps[i]*1000)

//   //         const formattedDate = date.getMonth()+'-'+date.getDate()
//   //         const high = stockData.high[i]
//   //         const low = stockData.low[i]
//   //         const avg = Math.floor((high + low)/2)
//   //         const curr = formatData(formattedDate, high, low)
//   //         const currRegression = regressionDataFormatted(i, avg)

//   //         formatted.push(curr)
//   //         regressionData.push(currRegression)
//   //         // console.log(curr)
//   //         // setData([...data, curr])
//   //       }

//   //       // setData(formatted)
//   //       // console.log(data)
//   //       const regressionCoefficients = regression.linear(regressionData)

//   //       for (let i=0; i<regressionCoefficients.points.length; i++) {
//   //         const curr = regressionCoordinatesFormatted(regressionCoefficients.points[i][0], regressionCoefficients.points[i][1])
//   //         formatted.push(curr)
//   //         // console.log(curr)
//   //         // setData([...data, curr])
//   //       }
//   //       // console.log(formatted)
//   //       // setData([...data, formatted])
//   //       // setData(formatted)
//   //     }
//   //     return formatted;
//   //   })
//   //   .then((res) => {
//   //     setData(res)
//   //     // console.log(data)
//   //   })
//   //   .catch(err => {
//   //     console.error(err)
//   //   })
//   // }, [stock])

//   // console.log(regressionData.data)
  

//   return (
    
//       /* <FlexBetween
//                 mb='0.25rem'
//                 p='1rem 1rem'
//             >
//                 <FlexBetween gap='2rem' color='lightgray'>
//                     90-Day Summary
//                 </FlexBetween>

//                 <FlexBetween gap='2rem'>
//                     <FormControl 
//                         variant='standard' 
//                         sx={{ 
//                             m: 1, 
//                             minWidth: 120, 
//                             justifyContent: 'space-between'
//                         }}
//                     >
//                         <InputLabel id='demo-simple-select-standard-label'>Stock</InputLabel>
//                         <Select
//                             labelId='demo-simple-select-standard-label'
//                             id='demo-simple-select-standard'
//                             value={stock}
//                             onChange={handleChange}
//                             label='Stock'
//                             sx={{ color: 'white', float: 'right', position: 'relative' }}
//                         >
//                             {menuItems}
//                         </Select>
//                     </FormControl>
//                 </FlexBetween>
//             </FlexBetween> */

//             /* <ResponsiveContainer width="95%" height={800}>
//               <ScatterChart
//                 margin={{
//                   top: 20,
//                   right: 20,
//                   bottom: 20,
//                   left: 20,
//                 }}
//               >
//                 <XAxis type="category" dataKey="x" name="date" axisLine={false} tick={false}/>
//                 <YAxis type="number" dataKey="high" name="high" unit=" USD" tickLine={false} axisLine={false}/>
//                 <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//                 <Scatter name={stock} data={data} fill="#8884d8" />
//               </ScatterChart>
//             </ResponsiveContainer> */

//             /* <ResponsiveContainer width='100%' height='100%'>
//               <ComposedChart
//                 width={500}
//                 height={400}
//                 data={regressionData.data}
//                 margin={{
//                   top: 20,
//                   right: 80,
//                   bottom: 20,
//                   left: 20
//                 }}
//               >
//                 <Tooltip />
//                 <CartesianGrid stroke="#f5f5f5" />
//                 <XAxis dataKey='x' type='number' label={{ value: 'Index', position: 'insideBottomRight', offset: 0 }} />
//                 <YAxis unit='USD' type='number' label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
//                 <Scatter name='high' dataKey='high' fill='white' />
//                 <Scatter name='low' dataKey='low' fill='purple' />
//                 <Line dataKey='y' stroke='lightgrey' dot={false} activeDot={false} legendType='none' />
//                 <Line dataKey='y' stroke='lightgrey' dot={false} activeDot={false} legendType='none' />
//               </ComposedChart>
//             </ResponsiveContainer> */

// <ResponsiveContainer width="100%" height="100%">
//         <ComposedChart
//           width={500}
//           height={400}
//           data={data}
//           margin={{
//             top: 20,
//             right: 80,
//             bottom: 20,
//             left: 20,
//           }}
//         >
//           <CartesianGrid stroke="#f5f5f5" />
//           <Tooltip />
//           <Legend />

//           <XAxis dataKey="index" type="number" label={{ value: 'Index', position: 'insideBottomRight', offset: 0 }} />
//           <YAxis unit="ms" type="number" label={{ value: 'Time', angle: -90, position: 'insideLeft' }} />
//           <Scatter name="red" dataKey="red" fill="red" />
//           <Scatter name="blue" dataKey="blue" fill="blue" />
//           <Line dataKey="blueLine" stroke="blue" dot={false} activeDot={false} legendType="none" />
//           <Line dataKey="redLine" stroke="red" dot={false} activeDot={false} legendType="none" />
//         </ComposedChart>
//       </ResponsiveContainer>

  
//   )
// }

// export default Regression

import React, { useMemo, useState, useEffect }from 'react'
import ChartBox from './ChartBox'
import {
  Box,
  useMediaQuery,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'
import FlexBetween from './FlexBetween'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ScatterChart,
  Scatter
} from 'recharts'
import regression, { DataPoint } from 'regression'
import axios from 'axios'

const Regression = () => {
  const [isPredictions, setIsPredictions] = useState(false)
  const [data, setData] = useState([])
  const [stock, setStock] = useState('AAPL')

  const handleChange = (e) => {
    setStock(e.target.value)
    setData([])
  }

  const options = {
    method: 'GET',
    url: `https://yfapi.net/v8/finance/chart/${stock}`,
    headers: {
      'x-api-key': 'eDwjmEGms52LdN07k1UCvawWqw7pHDFo86gE6xw8'
    },
    params: {
      range: '6mo',
      region: 'US',
      interval: '1d',
      ticker: stock
    }
  }

  const stocks = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'NVDA', 'TSLA', 'META', 'XOM', 'WMT', 'JPM', 'KO', 'BAC', 'CSCO', 'MCD', 'PFE', 'NFLX', 'AMD', 'DIS', 'INTC', 'GE']
  const menuItems = stocks.map(stock => <MenuItem key={stock} value={stock}>{stock}</MenuItem>)

  const formatData = (date, high) => {
    return { date, high}
  }

  let formatted = []

  useEffect(() => {
    let timestamps = []
    let stockData = []

    axios.request(options).then((res) => {
      if (res.data.chart.error != 'null') {
        stockData = res.data.chart.result[0].indicators.quote[0]
        timestamps = res.data.chart.result[0].timestamp

        for (let i=0; i<100; i++) {
          const time = timestamps[i]
          const date = new Date(timestamps[i]*1000)

          const formattedDate = date.getMonth()+'-'+date.getDate()
          const high = stockData.high[i]
          const low = stockData.low[i]
          const curr = formatData(formattedDate, high)

          formatted.push(curr)
          setData(data => [...data, curr])
        }
      }
    })
    .catch(err => {
      console.error(err)
    })
  }, [stock])

  return (
    <div width='100%'>
      <FlexBetween
                mb='0.25rem'
                p='1rem 1rem'
            >
                <FlexBetween gap='2rem' color='lightgray'>
                    90-Day Summary
                </FlexBetween>

                <FlexBetween gap='2rem'>
                    <FormControl 
                        variant='standard' 
                        sx={{ 
                            m: 1, 
                            minWidth: 120, 
                            justifyContent: 'space-between'
                        }}
                    >
                        <InputLabel id='demo-simple-select-standard-label'>Stock</InputLabel>
                        <Select
                            labelId='demo-simple-select-standard-label'
                            id='demo-simple-select-standard'
                            value={stock}
                            onChange={handleChange}
                            label='Stock'
                            sx={{ color: 'white', float: 'right', position: 'relative' }}
                        >
                            {menuItems}
                        </Select>
                    </FormControl>
                </FlexBetween>
            </FlexBetween>

            <ResponsiveContainer width="95%" height={800}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <XAxis type="category" dataKey="date" name="date" axisLine={false} tick={false}/>
                <YAxis type="number" dataKey="high" name="high" unit=" USD" tickLine={false} axisLine={false}/>
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name={stock} data={data} fill="lightgreen" />
              </ScatterChart>
            </ResponsiveContainer>
    </div>
  )
}

export default Regression